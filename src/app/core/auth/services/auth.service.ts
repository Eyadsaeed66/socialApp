import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDataResponse } from '../../models/user-data.interface';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

   signUp(data:object): Observable<UserDataResponse> {
    return this.httpClient.post<UserDataResponse>(`${environment.baseUrl}/users/signup`,data);
  }
   signIn(data:object): Observable<UserDataResponse> {
    return this.httpClient.post<UserDataResponse>(`${environment.baseUrl}/users/signin`,data);
  }

  signOut():void {
    localStorage.removeItem('socialToken');
    localStorage.removeItem('socialUser');

   this.router.navigate(['/login']);
  }
}
