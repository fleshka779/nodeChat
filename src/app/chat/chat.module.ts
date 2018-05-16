import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap';
import { ChatComponent } from './chat.component';

@NgModule({
    declarations: [ChatComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: ChatComponent, pathMatch: 'full' }]),
        AlertModule.forRoot()
    ],
    exports: [],
    providers: []
})
export class ChatModule {}
