import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommentsComponent } from './components/comments/comments.component';
import { PostsService } from '../../../../core/services/posts.service';
import {Router, RouterLink} from '@angular/router';

import { Post } from '../../../../core/models/post-data.interface';

@Component({
  selector: 'app-feed-content',

  imports: [ReactiveFormsModule, CommentsComponent,RouterLink],

  templateUrl: './feed-content.component.html',

  styleUrl: './feed-content.component.css',
})
export class FeedContentComponent implements OnInit {

  // =========================
  // Create Post
  // =========================

  imagePreview: string | null = null;

  contentControl = new FormControl('');

  privacyControl = new FormControl('');

  selectedImage: File | null = null;


  // =========================
  // Edit Post
  // =========================

  editingPost: Post | null = null;

  isEditModalOpen = false;

  editContentControl = new FormControl('');

  editPrivacyControl = new FormControl('');

  editSelectedImage: File | null = null;

  editImagePreview: string | null = null;


  // =========================
  // General
  // =========================

  userId: string = '';

  openDropdownId: string | null = null;

  private readonly postsService = inject(PostsService);

  postList: Post[] = [];


  // =========================
  // Lifecycle
  // =========================

  ngOnInit(): void {
    this.getAllPostsData();
    this.getUserId();
  }


  // =========================
  // Create Post - Image
  // =========================

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (file.type.startsWith('image/')) {
        this.selectedImage = file;
        this.imagePreview = URL.createObjectURL(file);
      }
    }
  }


  // =========================
  // Get All Posts
  // =========================

  getAllPostsData(): void {
    this.postsService.getAllPosts().subscribe({
      next: (response) => {
        if (response.success) {
          this.postList = response.data.posts;
        }
      },

     
    });
  }


  // =========================
  // Dropdown
  // =========================

  toggleDropdown(postId: string): void {
    if (this.openDropdownId === postId) {
      this.openDropdownId = null;
    } else {
      this.openDropdownId = postId;
    }
  }


  // =========================
  // Get Current User ID
  // =========================

  getUserId(): void {
    if (localStorage.getItem('socialUser')) {
      this.userId = JSON.parse(
        localStorage.getItem('socialUser')!
      )?._id;
    }
  }


  // =========================
  // Create Post
  // =========================

  submitForm(
    e: SubmitEvent,
    formElement: HTMLFormElement
  ): void {

    e.preventDefault();

    const formData = new FormData();

    if (this.contentControl.value) {
      formData.append('body', this.contentControl.value);
    }

    if (this.privacyControl.value) {
      formData.append('privacy', this.privacyControl.value);
    }

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.postsService.createPost(formData).subscribe({

      next: (response) => {

        if (response.success) {

          this.getAllPostsData();

          console.log(response);

          formElement.reset();

          this.imagePreview = null;

          this.selectedImage = null;

          this.contentControl.reset('');

          this.privacyControl.reset('');
        }
      },

       

    });
  }


  // =========================
  // Open Edit Post
  // =========================

  editPost(post: Post): void {

    this.editingPost = post;

    // Put existing post body inside textarea
    this.editContentControl.setValue(post.body || '');

    // Put existing privacy
    this.editPrivacyControl.setValue(post.privacy || '');

    // Reset selected new image
    this.editSelectedImage = null;

    // Show existing image
    this.editImagePreview = post.image || null;

    // Open modal
    this.isEditModalOpen = true;

    // Close dropdown
    this.openDropdownId = null;
  }


  // =========================
  // Edit Post - Image
  // =========================

  onEditFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {

      const file = input.files[0];

      if (file.type.startsWith('image/')) {

        this.editSelectedImage = file;

        this.editImagePreview = URL.createObjectURL(file);
      }
    }
  }


  // =========================
  // Submit Edit
  // =========================

  submitEdit(): void {

    // Make sure there is a post being edited
    if (!this.editingPost) {
      return;
    }

    const formData = new FormData();


    // Body
    if (this.editContentControl.value) {
      formData.append(
        'body',
        this.editContentControl.value
      );
    }


    // Privacy
    if (this.editPrivacyControl.value) {
      formData.append(
        'privacy',
        this.editPrivacyControl.value
      );
    }


    // New Image
    if (this.editSelectedImage) {
      formData.append(
        'image',
        this.editSelectedImage
      );
    }


    // Call API
    this.postsService
      .updatePost(
        this.editingPost.id,
        formData
      )
      .subscribe({

        next: (response) => {

          if (response.success) {

            console.log('Post updated:', response);

            // Refresh posts
            this.getAllPostsData();

            // Close modal
            this.closeEditModal();
          }
        },

       

      });
  }


  // =========================
  // Close Edit Modal
  // =========================

  closeEditModal(): void {

    this.isEditModalOpen = false;

    this.editingPost = null;

    this.editContentControl.reset('');

    this.editPrivacyControl.reset('');

    this.editSelectedImage = null;

    this.editImagePreview = null;
  }


  // =========================
  // Delete Post
  // =========================

  deletePost(postId: string): void {

    this.postsService.deletePost(postId).subscribe({

      next: (response) => {

        if (response.success) {
          this.getAllPostsData();
        }
      },

     

    });
  }

}