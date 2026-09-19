import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../../../environments/environment.development';
import { CommentsResponse } from '../models/comments-data.interface';
import { CreateCommentResponse } from '../models/create-comments.interface';
import { DeleteCommentResponse } from '../models/delete-comment.interface';
import { UpdateCommentResponse } from '../models/update-comment.interface';

@Injectable({
  providedIn: 'root',
})
export class PostCommentsService {
  private readonly httpClient = inject(HttpClient);
  myHeaders: object = {
    headers: {
      AUTHORIZATION: `Bearer ${localStorage.getItem('socialToken')}`,
    },
  };

  getPostComments(postId: string): Observable<CommentsResponse> {
    return this.httpClient.get<CommentsResponse>(
      `${environment.baseUrl}/posts/${postId}/comments?page=1&limit=10`,
      this.myHeaders,
    );
  }
  createComment(postId: string, data: FormData): Observable<CreateCommentResponse> {
    return this.httpClient.post<CreateCommentResponse>(
      `${environment.baseUrl}/posts/${postId}/comments`,
      data,
      this.myHeaders,
    );
  }
  deleteComment(postId: string, commentId: string): Observable<DeleteCommentResponse> {
    return this.httpClient.delete<DeleteCommentResponse>(
      `${environment.baseUrl}/posts/${postId}/comments/${commentId}`,
      this.myHeaders,
    );
   
  }

  updateComment(
  postId: string,
  commentId: string,
  data: FormData
): Observable<UpdateCommentResponse> {
  return this.httpClient.put<UpdateCommentResponse>(
    `${environment.baseUrl}/posts/${postId}/comments/${commentId}`,
    data,
    this.myHeaders
  );
}
}
