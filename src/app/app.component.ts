import { Component } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';

@Component({
    selector: 'app-root',
    template: `
  <router-outlet></router-outlet>
  `,
    styles: []
})
export class AppComponent {
    constructor() {
        setTheme('bs4');
    }
}
