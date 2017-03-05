import {Component, Input, OnInit} from '@angular/core';
import { Http } from '@angular/http';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import {AbstractControl, FormBuilder} from '@angular/forms'
import {Router} from '@angular/router';

import {PlayerService} from '../services/player.service';


@Component({
  selector: 'signup',
  templateUrl: './signup.template.html',
  styleUrls: ['./signup.styles.css']
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
  fullName = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  // debt = new FormControl('', Validators.required);
  // terms = new FormControl('', Validators.required);

  constructor(
    private http: Http,
    private router: Router,
    private formBuilder: FormBuilder,
    private playerService: PlayerService) { }

  ngOnInit() {
    this.addPlayerForm = this.formBuilder.group({
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      terms: true,
      debt: 0
    });

    // this.signupForm = this.builder.group({
    //   fullName: [this.entry.fullName,
    //     [Validators.required, Validators.pattern('[A-Z a-z]*')]],
    //   email: [this.entry.email,
    //     [Validators.required, Validators.pattern("^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$")]],
    //   password: [this.entry.password,
    //     [Validators.required, Validators.minLength(3)]],
    //   terms: [this.entry.terms,
    //     [this.mustBeChecked]],
    //   debt: [this.entry.debt, []]
    // });
  }

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
