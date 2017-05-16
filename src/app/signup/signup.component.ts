import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AbstractControl, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';

import {PlayerService} from '../services/player.service';

@Component({
  selector: 'signup',
  templateUrl: 'signup.template.html',
  styleUrls: ['signup.styles.css']
})
export class SignupComponent implements OnInit {

  location = 'Gosling Sports Park'
  time = '18:00 - 19:00'
  dates = 'Tuesdays'

  players = [];
  player = {};

  existingPlayer = {
    'email': ''
  }

  submitted = false;

  addPlayerForm: FormGroup;
  fullName = new FormControl();
  email = new FormControl();
  password = new FormControl();
  terms = new FormControl();
  admin = new FormControl();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private playerService: PlayerService) {}

  ngOnInit() {

    this.addPlayerForm = this.formBuilder.group({
      fullName: [this.fullName,
        [Validators.required, Validators.pattern('[A-Z a-z]*')]],
      email: [this.email,
        [Validators.required, Validators.pattern("^[A-Za-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$")]],
      password: [this.password,
        [Validators.required, Validators.pattern("^(?=.*\)(?=.*[a-z])(?=.*[A-Z]).{6,35}$")]],
      terms: [this.terms,
        [this.mustBeChecked]],
      debt: 0,
      admin: false
    });


    // // This clears the form so its not populated on load
    this.addPlayerForm.reset();

  }

  mustBeChecked(control: AbstractControl): {[key: string]: string} {
    if (!control.value) {
      return {mustBeCheckedError: 'Must be checked'};
    } else {
      return null;
    }
  }

  isInvalid(controlName: string){
    return this.addPlayerForm.controls[controlName].invalid
  }

  getValidationMessage(controlName: string) {
    let message = '';
    let control = this.addPlayerForm.get(controlName);
    if (control) {
      let messages = this.validationMessages[controlName];
      if (messages && control.errors) {
        for (const key in control.errors) {
          message += messages[key] + ' ';
        }
      }
    }
    return message == ''
      ? 'Control value is invalid.'
      : message;
  }

  validationMessages = {
    fullName: {
      required: 'Please specify your full name',
      pattern: 'Please ensure there are only letters in here'
    },
    email: {
      required: 'Please specify your email address.',
      pattern: 'please ensure an actual email address is entered'
    },
    password: {
      required: 'Please specify your password.',
      pattern: 'Password must be over 6 characters long and contain at least one lower case letter and one cpaital letter.'
    }
  };

  getPlayer() {
    this.playerService.getPlayerByEmail(this.addPlayerForm.value.email).subscribe(
      data => this.existingPlayer = data,
      error => console.log(error),
    );
    setTimeout(2000);
  }

  SignUp() {

    if(this.existingPlayer.email == this.addPlayerForm.value.email) {
      // console.log("Email address already exists ")
    }
    else{
      this.addPlayerForm.value.debt = 0;
      this.addPlayerForm.value.admin = false;

      this.playerService.postPlayer(this.addPlayerForm.value).subscribe(
        res => {
          const newPlayer = res.json();
          this.players.push(newPlayer);
          this.submitted = true;
        },
        error => console.log(error)
      );
    }

  }

  Cancel() {
    this.router.navigate(['/login']);
  }

  SignIn(){
    this.router.navigate(['/login']);
  };

}
