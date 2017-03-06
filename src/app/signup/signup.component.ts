import {Component, Input, OnInit} from '@angular/core';
// import { Http } from '@angular/http';
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
  // isLoading = true;

  player = {};
  // isEditing = false;

  submitted = false;

  addPlayerForm: FormGroup;
  fullName = new FormControl();
  email = new FormControl();
  password = new FormControl();
  terms = new FormControl();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private playerService: PlayerService) { }

  ngOnInit() {

    this.addPlayerForm = this.formBuilder.group({
      fullName: [this.fullName,
        [Validators.required, Validators.pattern('[A-Z a-z]*')]],
      email: [this.email,
        [Validators.required, Validators.pattern("^[A-Za-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$")]],
      password: [this.password,
        [Validators.required, Validators.pattern("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$")]],
      terms: [this.terms,
        [Validators.required, this.mustBeChecked]],
      debt: 0,
    });

    // // This clears the form so its not populated on load, but also clears the 0 value of debt
    // console.log('Form reset happens');
    // this.addPlayerForm.reset();

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
      console.log(control);
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
      pattern: 'Password contain at least one cpaital letter, one number and be greater than 6 characters long.'
    },
    terms: {
      required: 'Please accept the terms'
    }
  };



  SignUp() {
    console.log(this.addPlayerForm.value);
    this.playerService.postPlayer(this.addPlayerForm.value).subscribe(
      res => {
        const newPlayer = res.json();
        this.players.push(newPlayer);
        this.submitted = true;
      },
      error => console.log(error)
    );

  }


  Cancel() {
    this.router.navigate(['/login']);
  }

  SignIn(){
    this.router.navigate(['/login']);
  };

}
