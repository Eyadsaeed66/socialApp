import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl:'./profile.component.css'
})
export class ProfileComponent implements OnInit {

  currentUser: any = null;

  defaultAvatar = 'assets/images/default-avatar.png';

  posts = signal<any[]>([]);

  loading = signal<boolean>(false);

  errorMessage = signal<string>('');

  ngOnInit(): void {
    // هنضيف جلب الـ user والـ posts هنا بعدين
  }

  editPost(post: any): void {
    console.log('Edit post:', post);
  }

  deletePost(postId: string): void {
    console.log('Delete post:', postId);
  }
}
