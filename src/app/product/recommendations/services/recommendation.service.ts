import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recommendation } from '@models/recommendation';
import { Observable } from 'rxjs';

@Injectable()
export class RecommendationService {

  constructor(private httpClient: HttpClient) { }

  public loadRecommendations(): Observable<Recommendation[]> {
    return this.httpClient.get<Recommendation[]>('http://www.mocky.io/v2/5b8d2fa33300007800c158be');
  }
}
