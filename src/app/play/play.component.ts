import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {GameService} from '../services/game.service';
import {PlayerService} from '../services/player.service';
import {UserAuthService} from '../services/user-auth.service';

import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'play',
  templateUrl: 'play.template.html',
  styleUrls: ['play.styles.css']
})
export class PlayComponent {

  // Signed in as Jon
  player = {
    '_id': '58d5a720a65377b3c55d4d38'
  }

  // player = {
  //   '_id': ''
  // }

  reservePlayer = { }
  players = []

  redIdArray = []
  yellowIdArray = []
  reserveIdArray = []

  costOfGame = -4;
  lateDropOut = 2;
  earlyDropOut = 4;
  autoDebit = "Auto-Debit";
  autoCredit = "Auto-Credit";

  maxTeamSize = 8;
  game = {} //individual game used for the editGame
  games = []; //all games in getGame
  nextAvailableGames = [];
  gamesIAmIn = [];

  today = new Date().toISOString().slice(0,10);
  unfilteredToday = new Date();

  constructor(
    private router: Router,
    private gameService: GameService,
    private playerService: PlayerService,
    public authService: UserAuthService,
    // public toast: ToastComponent,
  ) { }

  ngOnInit() {
    // this.authService.player = this.player
    // console.log(this.player)
    this.getGames();
    this.getPlayers();
    this.getPlayerById();
  }

  getGames() {
    this.gameService.getGames().subscribe(
      data => {
        this.games = data,
        this.sortGames()
      },
      error => {
        console.log(error)}
    );
  }

  getPlayers() {
    this.playerService.getPlayers().subscribe(
      res => {
        const player = res;
        this.players = player;
      },
      error => console.log(error),
    );
  }

  getPlayerById() {
    this.playerService.getPlayer(this.player._id).subscribe(
      res => {
        const player = res;
        this.player = player;
      },
      error => console.log(error),
    );
  }

  sortGames() {
    //Clear the arrays first before reloading
    this.nextAvailableGames = []
    this.gamesIAmIn = [];

    for (let game of this.games) {

      let inReds = false;
      let inYellows = false;
      let inReserves = false;

      if(game.date >= this.today) {

        for (let reds of game.redTeam) {
          if (this.player._id == reds._id){
            inReds = true;
          }
        }
        for (let yellows of game.yellowTeam) {
          if (this.player._id == yellows._id){
            inYellows = true;
          }
        }
        for (let reserves of game.reserves) {
          if (this.player._id == reserves._id){
            inReserves = true;
          }
        }

        if (inReds == false && inYellows == false && inReserves == false){
          this.nextAvailableGames.push(game);
        }
        else if (inReds == true || inYellows == true || inReserves == true){
          this.gamesIAmIn.push(game);
        }
        else {
          // console.log("You are not signed up to a game yet")
        }
      }
      else {
        // console.log("The game is before todays date")
      }
    }
  }

  play(game) {
    this.allocatePlayer(game);
    this.updateGame(game);
    setTimeout(1000);
    this.sortGames();
  }

  allocatePlayer(game){
    let addedToReds = false;
    let addedToYellows = false;

    if(game.redTeam.length < this.maxTeamSize){
      // game.redTeam.push(this.player[0]);
      game.redTeam.push(this.player);
      addedToReds = true;
      this.updateCost(this.player);
    }
    else if (addedToReds == false && game.yellowTeam.length < this.maxTeamSize){
      // game.yellowTeam.push(this.player[0]);
      game.yellowTeam.push(this.player);
      addedToYellows = true;
      this.updateCost(this.player);
    }
    else if (addedToReds == false && addedToYellows == false){
      // game.reserves.push(this.player[0]);
      game.reserves.push(this.player);
    }
  }

  updateCost(player){
    //Update the player debt
    player.debt += this.costOfGame;

    //Update the debt history
    let debtHistory = {
      date : this.unfilteredToday,
      amount : this.costOfGame,
      who : this.autoDebit
    }

    player.debtHistory.push(debtHistory);

    this.playerService.updatePlayer(player).subscribe(
      res => {
        this.player = player;
        // this.toast.setMessage('You have been debted £4', 'success');
      },
      error => console.log(error)
    );
  }

  updateGame(game){
    this.gameService.editGame(game).subscribe(
      res => {
        this.game = game
      },
      error => console.log(error)
    );
  }

  dropOut(game) {
    this.removePlayerFromGame(game);
    this.updateGame(game);
    setTimeout(1000);
    this.sortGames();
  }

  removePlayerFromGame(game){
    //RED LOOP
    for (let reds of game.redTeam) {
      this.redIdArray.push(reds._id)
      var index = this.redIdArray.indexOf(this.player._id);
      if (this.player._id == reds._id){
        game.redTeam.splice(index, 1);
        this.reduceCost(game, this.player);
        //IF THERE IS A PLAYER IN THE RESERVES THEN PROMOTE THEM TO THIS TEAM AND REMOVE THEM FROM THE RESERVES
        if (game.reserves.length > 0) {
          //this bit of code is looping through all players, matching the ID and then storing the object against the variable reservePlayer
          for (let a of this.players){
            if(a._id == game.reserves[0]._id){
              this.reservePlayer = a;
            }
          }
          this.updateReserveCost(this.reservePlayer);
          game.redTeam.push(game.reserves[0]);
          game.reserves.shift(game.reserves[0]);
        }
        else {
          console.log("There are no reserves to promote")
        }
      }
    }
    //YELLOW LOOP
    for (let yellows of game.yellowTeam) {
      this.yellowIdArray.push(yellows._id)
      var index = this.yellowIdArray.indexOf(this.player._id);
      if (this.player._id == yellows._id){
        game.yellowTeam.splice(index, 1);
        this.reduceCost(game, this.player);
        //IF THERE IS A PLAYER IN THE RESERVES THEN PROMOTE THEM TO THIS TEAM AND REMOVE THEM FROM THE RESERVES
        if (game.reserves.length > 0) {
          //this bit of code is looping through all players, matching the ID and then storing the object against the variable res
          for (let a of this.players){
            if(a._id == game.reserves[0]._id){
              this.reservePlayer = a;
            }
          }
          this.updateReserveCost(this.reservePlayer);
          game.yellowTeam.push(game.reserves[0]);
          game.reserves.shift(game.reserves[0]);
        }
        else {
          console.log("There are no reserves to promote")
        }
      }
    }
    //RESERVE LOOP
    for (let reserves of game.reserves) {
      this.reserveIdArray.push(reserves._id)
      var index = this.reserveIdArray.indexOf(this.player._id);
      if (this.player._id == reserves._id){
        game.reserves.splice(index, 1);
        console.log("Player removed from the reserves list");
      }
    }
  }

  reduceCost(game, player){
    //IF GAME IS TODAY
    if(game.date == this.today) {
      player.debt += this.lateDropOut
      let debtHistory = {
        date : this.unfilteredToday,
        amount : this.lateDropOut,
        who : this.autoCredit
      }
      player.debtHistory.push(debtHistory);
    }
    //IF GAME IS LATR THAN TODAY
    else {
      player.debt += this.earlyDropOut
      let debtHistory = {
        date : this.unfilteredToday,
        amount : this.earlyDropOut,
        who : this.autoCredit
      }
      player.debtHistory.push(debtHistory);
    }
      this.playerService.updatePlayer(player).subscribe(
        res => {
          this.player = player;
          // this.toast.setMessage('You have been debted £4', 'success');
        },
        error => console.log(error)
      );
  }



  updateReserveCost(reserve){
    reserve.debt += this.costOfGame;
    let uToday = new Date();

    let debtHistory = {
      date : uToday,
      amount : this.costOfGame,
      who : this.autoDebit
    }

    reserve.debtHistory.push(debtHistory);
    this.playerService.updatePlayer(reserve).subscribe(
      res => {
        this.reservePlayer = reserve;
        // this.toast.setMessage('You have been debted £4', 'success');
      },
      error => console.log(error)
    );

  }

}
