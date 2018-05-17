import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { AuthService } from './auth/components/services/auth.service';

@NgModule({
    declarations: [AppComponent, LoginComponent, RegisterComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserModule.withServerTransition({ appId: 'my-app' }),
        RouterModule.forRoot(
            [
                { path: '', redirectTo: 'login', pathMatch: 'full' },
                { path: 'login', component: LoginComponent },
                { path: 'register', component: RegisterComponent },
                { path: 'chat', loadChildren: './chat/chat.module#ChatModule' }
            ],
            { useHash: true }
        ),
        TransferHttpCacheModule
    ],
    providers: [AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {}
