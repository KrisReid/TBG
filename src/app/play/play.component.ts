import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {GameService} from '../services/game.service';
import {PlayerService} from '../services/player.service';

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

  //sign in as Jamie
  // player = {
  //   '_id': '58d5a5caaa81afb332a96642'
  // }

  reservePlayer = { }

  players = []


  costOfGame = -4;
  autoDebit = "Auto-Debit";
  autoCredit = "Auto-Credit";
  lateDropOut = 2;
  earlyDropOut = 4;

  maxTeamSize = 8;
  game = {} //individual game used for the editGame
  games = []; //all games in getGame
  nextAvailableGames = []; //games that are filetered by the getGamesIAmNotPlayingInLaterThanToday function
  gamesIAmIn = [];

  today = new Date().toISOString().slice(0,10);
  unfilteredToday = new Date();

  constructor(
    private router: Router,
    private gameService: GameService,
    private playerService: PlayerService,
    // public toast: ToastComponent,
  ) { }

  ngOnInit() {
    this.getGames();
    this.getPlayers();
    this.getPlayerById();
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

  getPlayers() {
    this.playerService.getPlayers().subscribe(
      res => {
        const player = res;
        this.players = player;
      },
      error => console.log(error),
    );
  }

  getReserveById(id) {
    this.playerService.getPlayer(id).subscribe(
      res => {
        const player = res;
        this.reservePlayer = player;
      },
      error => console.log(error),
    );
  }

  getGames() {
    this.gameService.getGames().subscribe(
      data => {
        this.games = data,
        this.getGamesIAmNotPlayingInLaterThanToday(),
        this.getGamesIAmPlayingInLaterThanToday()
      },
      error => {
        console.log(error)}
    );
  }

  getGamesIAmNotPlayingInLaterThanToday() {
    console.log(this.games)
    //empty the array
    this.nextAvailableGames = []

    for (let game of this.games) {

      let inReds = false;
      let inYellows = false;
      let inReserves = false;

      if(game.date >= this.today) {

        for (let reds of game.redTeam) {
          // if (this.player[0]._id == reds._id){
          if (this.player._id == reds._id){
            inReds = true;
            console.log("player already exists in the red team")
          }
        }
        for (let yellows of game.yellowTeam) {
          // if (this.player[0]._id == yellows._id){
          if (this.player._id == yellows._id){
            inYellows = true;
            console.log("player already exists in the yellow team")
          }
        }
        for (let reserves of game.reserves) {
          // if (this.player[0]._id == reserves._id){
          if (this.player._id == reserves._id){
            inReserves = true;
            console.log("player already exists as a reserve")
          }
        }
        if (inReds == false && inYellows == false && inReserves == false){
          this.nextAvailableGames.push(game);
        }
        else {
          console.log("You are already involved in this game")
        }

      }
      else {
        console.log("The game is before todays date")
      }
    }
  }

  play(game) {
    this.allocatePlayer(game);
    this.updateGame(game);
    setTimeout(1000);
    this.getGamesIAmNotPlayingInLaterThanToday();
    this.getGamesIAmPlayingInLaterThanToday();
  }

  updateGame(game){
    this.gameService.editGame(game).subscribe(
      res => {
        this.game = game
      },
      error => console.log(error)
    );
  }

  updateCost(player){
    console.log(this.player)

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


  getGamesIAmPlayingInLaterThanToday() {
    //empty the array
    this.gamesIAmIn = [];

    for (let game of this.games) {

      let inReds = false;
      let inYellows = false;
      let inReserves = false;

      if(game.date >= this.today) {

        for (let reds of game.redTeam) {
          // if (this.player[0]._id == reds._id){
          if (this.player._id == reds._id){
            inReds = true;
            console.log("You are in the Red Team")
          }
        }
        for (let yellows of game.yellowTeam) {
          // if (this.player[0]._id == yellows._id){
          if (this.player._id == yellows._id){
            inYellows = true;
            console.log("You are in the Yellow Team")
          }
        }
        for (let reserves of game.reserves) {
          // if (this.player[0]._id == reserves._id){
          if (this.player._id == reserves._id){
            inReserves = true;
            console.log("You are a reserve")
          }
        }

        if (inReds == true || inYellows == true || inReserves == true){
          this.gamesIAmIn.push(game);
        }
        else {
          console.log("You are not signed up to a game yet")
        }

      }
      else {
        console.log("The game is before todays date")
      }


    }
  }

  dropOut(game) {
    this.removePlayerFromGame(game);
    this.updateGame(game);
    setTimeout(1000);
    this.getGamesIAmPlayingInLaterThanToday();
    this.getGamesIAmNotPlayingInLaterThanToday();
  }

  reduceCost(game, player){
    console.log(this.player)

    if(game.date == this.today) {

      player.debt += this.lateDropOut

      let debtHistory = {
        date : this.unfilteredToday,
        amount : this.lateDropOut,
        who : this.autoCredit
      }

      player.debtHistory.push(debtHistory);

      this.playerService.updatePlayer(player).subscribe(
        res => {
          this.player = player;
          // this.toast.setMessage('You have been debted £4', 'success');
        },
        error => console.log(error)
      );

    } else {
      player.debt += this.earlyDropOut

      let debtHistory = {
        date : this.unfilteredToday,
        amount : this.earlyDropOut,
        who : this.autoCredit
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

  }

  removePlayerFromGame(game){
    for (let reds of game.redTeam) {
      // if (this.player[0]._id == reds._id){
      if (this.player._id == reds._id){
        game.redTeam.pop(this.player);
        this.reduceCost(game, this.player);
        // game.redTeam.pop(this.player[0]);
        console.log("Player removed from Red Team");
        //IF THERE IS A PLAYER IN THE RESERVES THEN PROMOTE THEM TO THIS TEAM AND REMOVE THEM FROM THE RESERVES

        if (game.reserves.length > 0) {

          //this bit of code is looping through all players, matching the ID and then storing the object against the variable res
          // let res = {}
          for (let a of this.players){
            if(a._id == game.reserves[0]._id){
              // console.log(a);
              this.reservePlayer = a;
            }
          }

          this.updateReserveCost(this.reservePlayer);

          // this.updateCost(game.reserves[0]);

          game.redTeam.push(game.reserves[0]);
          game.reserves.pop(game.reserves[0]);
        }
        else {
          console.log("There are no reserves to promote")
        }


      }
    }
    for (let yellows of game.yellowTeam) {
      // if (this.player[0]._id == yellows._id){
      if (this.player._id == yellows._id){
        // game.yellowTeam.pop(this.player[0]);
        game.yellowTeam.pop(this.player);
        this.reduceCost(game, this.player);
        console.log("Player removed from Yellow Team");

        //IF THERE IS A PLAYER IN THE RESERVES THEN PROMOTE THEM TO THIS TEAM AND REMOVE THEM FROM THE RESERVES
        if (game.reserves.length > 0) {

          //this bit of code is looping through all players, matching the ID and then storing the object against the variable res
          // let res = {}
          for (let a of this.players){
            if(a._id == game.reserves[0]._id){
              // console.log(a);
              this.reservePlayer = a;
            }
          }

          this.updateReserveCost(this.reservePlayer);

          game.yellowTeam.push(game.reserves[0]);
          game.reserves.pop(game.reserves[0]);
        }
        else {
          console.log("There are no reserves to promote")
        }

      }
    }
    for (let reserves of game.reserves) {
      // if (this.player[0]._id == reserves._id){
      if (this.player._id == reserves._id){
        // game.reserves.pop(this.player[0]);
        game.reserves.pop(this.player);
        console.log("Player removed from the reserves list");
      }
    }
  }

  updateReserveCost(reserve){

    //Update the player debt
    reserve.debt += this.costOfGame;

    let uToday = new Date();

    //Update the debt history
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

  // belly(game) {
  //   console.log(game);
  //   console.log(game.reserves[0]._id);
  //
  //   this.getReserveById(game.reserves[0]._id);
  //
  //
  //   let res = {}
  //
  //   for (let a of this.players){
  //     if(a._id == game.reserves[0]._id){
  //       // console.log(a);
  //       res = a;
  //     }
  //   }
  //
  //   console.log(res);
  //
  //
  //
  // }

}
