import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import {PlayerService} from './services/player.service';
import {GameService} from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  players = [];
  games = [];

  constructor(private http: Http,
              private playerService: PlayerService,
              private gameService: GameService
            ) {}

  ngOnInit() {
    this.getPlayers();
    this.getGames();
  }

  getPlayers() {
    this.playerService.getPlayers().subscribe(
      data => this.players = data,
      error => console.log(error)
    );
  }

  getGames() {
    this.gameService.getGames().subscribe(
      data => this.games = data,
      error => console.log(error)
    );
  }


}
