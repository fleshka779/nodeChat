import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-rooms-component',
    templateUrl: './rooms.component.html',
    styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
    constructor(private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {}

    goToRoom(): void {
        this.router.navigate(['../room/24'], { relativeTo: this.route });
    }
}
