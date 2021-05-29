import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  // Gelen Data
  data: any;
  public loading: boolean = true;
  public api: string = 'http://api.exchangeratesapi.io/v1/latest?access_key=';
  //Token Değişebilir diye ayrı ayrı tanımladım.
  public accessToken = '0d8548f4ef6f6dd8f3a343537ac94374';

  apiUrl: string = `${this.api}${this.accessToken}`;

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(this.apiUrl).pipe((x) => {
      return (this.data = x);
    });
  }
}
