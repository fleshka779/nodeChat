import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginData } from '../models/login.model';
import { IRegisterData } from '../models/register.model';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {}

    login(data: ILoginData): Promise<any> {
        return this.http
            .post('api/auth/login', data)
            .map((response: any) => response)
            .toPromise();
    }

    register(data: IRegisterData): Promise<any> {
        return this.http.post('api/auth/register', data).toPromise();
    }
}
