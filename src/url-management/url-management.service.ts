import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UrlService {
  private apiUrl = 'https://localhost:7072/api/Url'; 

  constructor(private http: HttpClient) { }

  getAllUrls(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'/getPublicUrl');
  }

  shortenUrl(longUrl: string, isPrivate: boolean): Observable<any> {
    const payload = {
      url: longUrl,
      isPrivate: isPrivate
    };
    return this.http.post<any>(this.apiUrl+'/shorten', payload);
  }

  deleteUrl(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  clickUrl(id: any){
    return this.http.get(`${this.apiUrl+'/redirect'}/${id}`);
  }
}