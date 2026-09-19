import { SinglePostResponse } from './../../features/details/models/single-post.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PostDataResponse } from '../models/post-data.interface';
import { PostMutationResponse } from '../models/post-mutation.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly httpClient = inject(HttpClient);

  getAllPosts(): Observable<PostDataResponse> {
    return this.httpClient.get<PostDataResponse>(`${environment.baseUrl}/posts`);
  }
  createPost(data: FormData): Observable<PostMutationResponse> {
    return this.httpClient.post<PostMutationResponse>(`${environment.baseUrl}/posts`, data);
  }
  getSinglePost(postId: string): Observable<SinglePostResponse> {
    return this.httpClient.get<SinglePostResponse>(`${environment.baseUrl}/posts/${postId}`);
  }
  updatePost(postId: string, data: FormData): Observable<PostMutationResponse> {
    return this.httpClient.put<PostMutationResponse>(
      `${environment.baseUrl}/posts/${postId}`,
      data,
    );
  }
  deletePost(postId: string): Observable<PostMutationResponse> {
    return this.httpClient.delete<PostMutationResponse>(`${environment.baseUrl}/posts/${postId}`);
  }
}
