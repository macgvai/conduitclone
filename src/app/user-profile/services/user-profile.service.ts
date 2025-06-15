import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {lastValueFrom, map, Observable} from 'rxjs';
import {ProfileInterface} from '../../shared/types/profile.interface';
import {GetUserProfileResponseInterface} from '../types/get-user-profile-response';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  http = inject(HttpClient)

  getUserProfile(slug: string): Observable<ProfileInterface> {
    const url = `${environment.apiUrl}/profiles/${slug}`

    return this.http
      .get(url)
      .pipe(
        map((response: GetUserProfileResponseInterface) => response.profile)
      )
  }
  followUser(user: ProfileInterface): Observable<ProfileInterface> {
    const url = `${environment.apiUrl}/profiles/${user.username}/follow`

    console.log(user)
    if (!user.following) {
      return this.http.post(url, {}).pipe(
        map((response: GetUserProfileResponseInterface) => response.profile)
      )
    } else {
      return this.http.delete(url).pipe(
        map((response: GetUserProfileResponseInterface) => response.profile)
      )
    }
  }
}
