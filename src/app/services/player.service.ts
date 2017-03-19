import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PlayerService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getPlayers(): Observable<any> {
    return this.http.get('/players').map(res => res.json());
  }

  getPlayer(id): Observable<any> {
    return this.http.get(`/player/${id}`).map(res => res.json());
  }

  postPlayer(player): Observable<any> {
    console.log("POST PLAYER MEYTHOD: " + player);
    return this.http.post('/players', JSON.stringify(player), this.options);
  }

  updatePlayer(player): Observable<any> {
    return this.http.put(`/player/${player._id}`, JSON.stringify(player), this.options);
  }

}
