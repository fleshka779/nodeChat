import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap';
import { ChatComponent } from './chat.component';
import { RoomComponent } from './room/room.component';
import { RoomsComponent } from './rooms/rooms.component';

@NgModule({
    declarations: [ChatComponent, RoomComponent, RoomsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: ChatComponent, redirectTo: 'rooms', pathMatch: 'full' },
            { path: 'rooms', component: RoomsComponent, pathMatch: 'full' },
            { path: 'room/:id', component: RoomComponent }
        ]),
        AlertModule.forRoot()
    ],
    exports: [],
    providers: []
})
export class ChatModule {}
