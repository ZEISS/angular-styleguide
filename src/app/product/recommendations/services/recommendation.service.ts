import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Recommendation} from '../../../../model/recommendation';
import {HttpClient} from '../../../../../node_modules/@angular/common/http';

@Injectable()
export class RecommendationService {

  constructor(private httpClient: HttpClient) { }

  loadRecommendations(): Observable<Recommendation[]> {
    return this.httpClient.get<Recommendation[]>('http://www.mocky.io/v2/5b8d2fa33300007800c158be');
  }
}
