import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Video } from './video';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private getUrl = '/api/videos';
  private postUrl = '/api/video';
  private putUrl = '/api/video/';
  private deleteUrl = '/api/video/';

  constructor(private http: HttpClient) {}

  getVideos(): Observable<Video[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get<Video[]>(this.getUrl, httpOptions);
  }

  addVideo(video: Video): Observable<Video> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<Video>(
      this.postUrl,
      JSON.stringify(video),
      httpOptions
    );
  }

  updateVideo(video: Video): Observable<Video> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put<Video>(
      this.putUrl + video._id,
      JSON.stringify(video),
      httpOptions
    );
  }

  removeVideo(video: Video): Observable<Video> {
    return this.http.delete<Video>(this.deleteUrl + video._id);
  }
}
