import { Component, OnInit, inject } from '@angular/core';
import { PostsService } from '../../core/services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from './models/single-post.interface';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {

  post: Post | null = null;

  postId: string = '';
  userId: string = '';
  openDropdownId: string | null = null;

  private readonly postsService = inject(PostsService);
  private readonly activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.getPostId();
  }

  getPostId(): void {
    this.activatedRoute.paramMap.subscribe((param) => {

      this.postId = param.get('id') ?? '';

      if (this.postId) {
        this.getSinglePostData(this.postId);
      }

    });
  }

  getSinglePostData(postId: string): void {

    this.postsService.getSinglePost(postId).subscribe({

      next: (response) => {

        if (response.success) {

          this.post = response.data.post;

          console.log('Post:', this.post);

        }

      },

     

    });

  }

  toggleDropdown(postId: string): void {

    if (this.openDropdownId === postId) {
      this.openDropdownId = null;
    } else {
      this.openDropdownId = postId;
    }

  }

  editPost(post: Post): void {

    console.log('Edit post:', post);

  }

  deletePost(postId: string): void {

    console.log('Delete post:', postId);

  }

}