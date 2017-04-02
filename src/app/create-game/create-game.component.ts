import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {GameService} from '../services/game.service';

@Component({
  selector: 'create',
  templateUrl: './create-game.template.html'
})
export class CreateGameComponent {

  constructor(
    private router: Router,
    private gameService: GameService
  ) {}

  games = []
  game = {
    date: '',
    location: 'Better (Gosling Sports Park)',
    startTime: '18:00',
    finishTime: '19:00',
    yellowTeam: [],
    redTeam: [],
    kris: false,
    jamie: false
  }

  Create(){
    if(this.game.kris == true){
      this.game.redTeam.push({
        "_id" : "58d5a59faa81afb332a96641",
        "fullName" : "Kris Reid"
      });
    }
    if(this.game.jamie == true){
      this.game.redTeam.push({
        "_id" : "58d5a5caaa81afb332a96642",
        "fullName" : "Jamie Brooks"
      });
    }

    this.gameService.postGame(this.game).subscribe(
      res => {
        const newGame = res.json();
        this.games.push(newGame);
      },
      error => console.log(error)
    );
    this.router.navigate(['/play'])

  }


}
