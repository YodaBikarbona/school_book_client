import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {API_URL} from '../app.constants';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthenticationRequest} from '../model';
import {headersToString} from 'selenium-webdriver/http';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  jwtService: JwtHelperService;

  constructor(public http: HttpClient) {
    this.jwtService = new JwtHelperService();
  }

  authenticate(request: AuthenticationRequest): Observable<boolean> {
    let sec_token: string;
    let role: string;
    return this.http.post(`${API_URL}/school_book/login`, request)
      .pipe(
        map((res: any) => {
          console.log(res);
          sec_token = res.result.token;
          role = res.result.role.name;
        }),
        map(token => this.resloveAuthentication(sec_token)),
        map(userRole => this.resloveAuthenticationRole(role)),
        //catchError(err => this.handleError(err, request))
      );
  }

  resloveAuthentication(token: string): boolean {
    if (token) {
      this.saveToken(token);
      return true;
    }
    return false;
  }

  resloveAuthenticationRole(role: string): boolean {
    if (role) {
      this.saveRole(role);
      return true;
    }
    return false;
  }

  handleError(err: HttpErrorResponse, request: AuthenticationRequest): Observable<any> {
    const obj: any = {};
    if (err.error.code === 403) {
      obj.password = request.password;
      obj.email = request.email;
    } else {
      obj.message = err.error.message;
    }
    return throwError(obj);
  }

  isAutheticated() {
    const token = this.getToken();
    return token ? true : false;
  }

  saveToken(token: string) {
    localStorage.setItem('auth-token', token);
  }

  saveRole(role: string) {
    localStorage.setItem('userRole', role);
  }

  getToken(): string {
    return localStorage.getItem('auth-token');
  }

  deleteToken() {
    localStorage.removeItem('auth-token');
  }

  get userId() {
    const token = this.getToken();
    const decodedToken = this.jwtService.decodeToken(token);
    return decodedToken['user_id'];
  }

  get role() {
    const token = this.getToken();
    const decodeToken = this.jwtService.decodeToken(token);
    return decodeToken['role'];
  }

  logout() {
  }

}


class AuthResponse {
  token: string;
}
