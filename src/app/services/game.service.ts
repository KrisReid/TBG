import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class GameService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getGames(): Observable<any> {
    return this.http.get('/games').map(res => res.json());
  }

  postGame(game): Observable<any> {
    console.log("POST PLAYER MEYTHOD: " + game);
    return this.http.post('/games', JSON.stringify(game), this.options);
  }

  editGame(game): Observable<any> {
    return this.http.put(`/game/${game._id}`, JSON.stringify(game), this.options);
  }

}
