import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    invalidAlert: any = {
        show: false,
        text: 'Default'
    };

    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.createForm();
    }

    createForm(): void {
        this.form = this.fb.group(
            {
                email: ['', Validators.compose([Validators.required, Validators.email])],
                password: ['', Validators.required]
            },
            { updateOn: 'submit' }
        );
    }

    submit() {
        if (this.form.valid) {
            this.invalidAlert.show = false;

            this.authService.login(this.form.value).then(
                x => {
                    console.log('Success', x);
                    this.router.navigate(['../chat'], { relativeTo: this.route });
                },
                err => {
                    console.log('Error', err);
                    this.invalidAlert = {
                        show: true,
                        text: 'Request Error. Please try again.'
                    };
                }
            );
            this.form.reset();
        } else {
            this.invalidAlert = {
                show: true,
                text: 'Please fill out the form'
            };
        }
    }
}
