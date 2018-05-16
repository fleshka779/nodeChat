import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    constructor(private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {}

    goToRegister(): void {
        this.router.navigate(['./register'], { relativeTo: this.route });
    }
}
