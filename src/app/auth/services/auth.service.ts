import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { tap, Observable, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = environment.baseUrl;
  private _auth:Auth | undefined;

  constructor(  private http:HttpClient ) { }


  get auth(): Auth{
    return { ...this._auth! };
  }

  verificaAutentificacion(): Observable<boolean>{
    if( !localStorage.getItem('token') ){
      return of(false);
    }
    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/1`)
      .pipe(
        map( auth => {
          this._auth = auth;
          return true;
        })
      );
  }

  login(){
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        tap( auth => this._auth = auth),
        tap( auth => localStorage.setItem('token',auth.id ))
      );
  }

  logout() {
    this._auth = undefined;
  }
}
