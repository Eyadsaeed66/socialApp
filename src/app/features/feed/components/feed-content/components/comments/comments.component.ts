import { DatePipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { PostCommentsService } from './services/post-comments.service';
import { Comment as CommentModel } from './models/comments-data.interface';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit {
  private readonly postCommentsService = inject(PostCommentsService);

  comments: CommentModel[] = [];

  @Input({ required: true }) postId: string = '';

  commentControl = new FormControl('');

  selectedImage: File | null = null;
  imagePreview: string | null = null;

  isCreatingComment = false;
  isUpdatingComment = false;

  // =========================
  // User
  // =========================

  userId: string = '';

  // =========================
  // Comment Dropdown
  // =========================

  openCommentDropdownId: string | null = null;

  // =========================
  // Editing
  // =========================

  editingComment: CommentModel | null = null;

  ngOnInit(): void {
    this.getUserId();
    this.getSinglePostComments();
  }

  // =========================
  // Get User ID
  // =========================

  getUserId(): void {
    const socialUser = localStorage.getItem('socialUser');

    if (socialUser) {
      this.userId = JSON.parse(socialUser)?._id ?? '';
    }
  }

  // =========================
  // Get Comments
  // =========================

  getSinglePostComments(): void {
    this.postCommentsService.getPostComments(this.postId).subscribe({
      next: (response) => {
        if (response.success) {
          this.comments = response.data.comments;
        }
      },
    
    });
  }

  // =========================
  // Comment Image
  // =========================

  onCommentFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    if (!file.type.startsWith('image/')) {
      return;
    }

    this.selectedImage = file;

    if (this.imagePreview) {
      URL.revokeObjectURL(this.imagePreview);
    }

    this.imagePreview = URL.createObjectURL(file);
  }

  removeCommentImage(): void {
    this.selectedImage = null;

    if (this.imagePreview) {
      URL.revokeObjectURL(this.imagePreview);
    }

    this.imagePreview = null;
  }

  // =========================
  // Create Comment
  // =========================

  submitComment(): void {
    const content = this.commentControl.value?.trim() ?? '';

    if (!content && !this.selectedImage) {
      return;
    }

    const formData = new FormData();

    if (content) {
      formData.append('content', content);
    }

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.isCreatingComment = true;

    this.postCommentsService.createComment(this.postId, formData).subscribe({
      next: (response) => {
        console.log('CREATE COMMENT RESPONSE:', response);

        if (response.success) {
          this.getSinglePostComments();

          this.commentControl.reset('');
          this.removeCommentImage();
        }

        this.isCreatingComment = false;
      },

     
    });
  }

  // =========================
  // Dropdown
  // =========================

  toggleCommentDropdown(commentId: string): void {
    if (this.openCommentDropdownId === commentId) {
      this.openCommentDropdownId = null;
    } else {
      this.openCommentDropdownId = commentId;
    }
  }

  // =========================
  // Edit Comment
  // =========================

  editComment(comment: CommentModel): void {
    this.editingComment = comment;

    this.commentControl.setValue(comment.content);

    this.openCommentDropdownId = null;

    console.log('Editing comment:', comment);
  }

  // =========================
  // Update Comment
  // =========================

submitUpdateComment(): void {
  if (!this.editingComment) {
    return;
  }

  const content = this.commentControl.value?.trim() ?? '';

  if (!content && !this.selectedImage) {
    return;
  }

  const formData = new FormData();

  if (content) {
    formData.append('content', content);
  }

  if (this.selectedImage) {
    formData.append('image', this.selectedImage);
  }

  this.isUpdatingComment = true;

  this.postCommentsService
    .updateComment(
      this.editingComment.post,
      this.editingComment._id,
      formData
    )
    .subscribe({
      next: (response) => {
        console.log('UPDATE COMMENT RESPONSE:', response);

        if (response.success) {
          // الكومنت الجديد اللي رجع من الـ API
          const updatedComment = response.data.comment;

          // تحديث الكومنت داخل الـ array
          this.comments = this.comments.map((comment) =>
            comment._id === updatedComment._id
              ? {
                  ...comment,
                  content: updatedComment.content,
                  image: updatedComment.image,
                }
              : comment
          );

          // إنهاء وضع التعديل
          this.editingComment = null;

          // تنظيف الـ textarea
          this.commentControl.reset('');

          // تنظيف الصورة
          this.removeCommentImage();

          // قفل الـ dropdown
          this.openCommentDropdownId = null;
        }

        this.isUpdatingComment = false;
      },

     
    });
}


  // =========================
  // Cancel Edit
  // =========================

  cancelEditComment(): void {
    this.editingComment = null;

    this.commentControl.reset('');
    this.removeCommentImage();
  }

  // =========================
  // Delete Comment
  // =========================

  deleteComment(commentId: string): void {
    const comment = this.comments.find(
      (comment) => comment._id === commentId
    );

    if (!comment) {
      return;
    }

    this.postCommentsService
      .deleteComment(comment.post, commentId)
      .subscribe({
        next: (response) => {
          console.log('DELETE COMMENT RESPONSE:', response);

          if (response.success) {
            this.comments = this.comments.filter(
              (comment) => comment._id !== commentId
            );

            this.openCommentDropdownId = null;
          }
        },

         
      });
  }
}
