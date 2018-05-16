import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';

@NgModule({
    declarations: [AppComponent, LoginComponent, RegisterComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: 'my-app' }),
        RouterModule.forRoot([
            { path: '', component: LoginComponent, pathMatch: 'full' },
            { path: 'register', component: RegisterComponent },
            { path: 'chat', loadChildren: './chat/chat.module#ChatModule' }
        ]),
        TransferHttpCacheModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
