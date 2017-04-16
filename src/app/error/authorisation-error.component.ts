import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'authorisation-error',
    templateUrl: 'authorisation-error.template.html'
})
export class AuthorisationErrorComponent {

    constructor(
        private router: Router,
    ) {}

}
