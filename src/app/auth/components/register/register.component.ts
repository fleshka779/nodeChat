import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-register-component',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    form: FormGroup;
    showInvalidAlert: boolean = false;

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
            this.showInvalidAlert = false;
            this.authService.register(this.form.value).then(
                x => {
                    console.log('Success', x);
                    this.router.navigate(['../login'], { relativeTo: this.route });
                },
                err => {
                    console.log('Error', err);
                }
            );
            this.form.reset();
        } else {
            this.showInvalidAlert = true;
        }
    }
}
