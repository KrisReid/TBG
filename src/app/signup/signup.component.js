"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var router_1 = require("@angular/router");
var player_api_service_1 = require("../api/player/player-api.service");
// import {SignupEntry} from './signup-entry';
var SignupComponent = (function () {
    function SignupComponent(router, builder, playerApi) {
        this.router = router;
        this.builder = builder;
        this.playerApi = playerApi;
        this.location = 'Gosling Sports Park';
        this.time = '18:00 - 19:00';
        this.dates = 'Tuesdays';
        this.submitted = false;
        this.entry = {
            fullName: '',
            email: '',
            password: '',
            debt: 0,
            terms: false
        };
        this.validationMessages = {
            fullName: {
                required: 'Please specify your full name',
                pattern: 'Only use letters please',
            },
            email: {
                required: 'Please specify your email address.',
                pattern: 'please ensure an actual email address is entered'
            },
            password: {
                required: 'Please specify your password.',
                minLength: 'Password needs to be longer'
            },
            terms: {
                required: 'Please accept the terms'
            }
        };
    }
    SignupComponent.prototype.ngOnInit = function () {
        this.signupForm = this.builder.group({
            fullName: [this.entry.fullName,
                [forms_1.Validators.required, forms_1.Validators.pattern('[A-Z a-z]*')]],
            email: [this.entry.email,
                [forms_1.Validators.required, forms_1.Validators.pattern("^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$")]],
            password: [this.entry.password,
                [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            terms: [this.entry.terms,
                [this.mustBeChecked]],
            debt: [this.entry.debt, []]
        });
    };
    SignupComponent.prototype.isInvalid = function (controlName) {
        return this.signupForm.controls[controlName].invalid;
    };
    SignupComponent.prototype.mustBeChecked = function (control) {
        if (!control.value) {
            return { mustBeCheckedError: 'Must be checked' };
        }
        else {
            return null;
        }
    };
    SignupComponent.prototype.getValidationMessage = function (controlName) {
        var message = '';
        var control = this.signupForm.get(controlName);
        if (control) {
            console.log(control);
            var messages = this.validationMessages[controlName];
            if (messages && control.errors) {
                for (var key in control.errors) {
                    message += messages[key] + ' ';
                }
            }
        }
        return message == ''
            ? 'Control value is invalid.'
            : message;
    };
    SignupComponent.prototype.SignUp = function () {
        this.submittedSignup = this.signupForm.value;
        this.playerApi.postPlayer({ id: 0, fullName: this.submittedSignup.fullName, email: this.submittedSignup.email, password: this.submittedSignup.password, debt: this.submittedSignup.debt, terms: this.submittedSignup.terms });
        this.submitted = true;
    };
    SignupComponent.prototype.Cancel = function () {
        this.router.navigate(['/login']);
    };
    SignupComponent.prototype.SignIn = function () {
        this.router.navigate(['/login']);
    };
    return SignupComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], SignupComponent.prototype, "signupForm", void 0);
SignupComponent = __decorate([
    core_1.Component({
        selector: 'signup',
        templateUrl: 'app/signup/signup.template.html',
        styleUrls: ['app/signup/signup.styles.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        forms_2.FormBuilder,
        player_api_service_1.PlayerApi])
], SignupComponent);
exports.SignupComponent = SignupComponent;
//# sourceMappingURL=signup.component.js.map