import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as jwtDecode from 'jwt-decode';

@Injectable()
export class AuthService {

	BASE_URL = 'http://localhost:4201/auth'

  constructor(private http: Http){ }

  	login(credentials){
  		return this.http.post(`${this.BASE_URL}/login`, credentials)
  						 .map(res => res.json());
  	}
  	
  	userIsLoggedIn() {
  		return localStorage.getItem('jbb-data');
  	}

  	logOut() {
  		localStorage.removeItem('jbb-data');
  	}

    register(credentials){
      // console.log("register", credentials);
     return this.http.post(`${this.BASE_URL}/register`, credentials)
               .map(res => res.json());
    }
    
    decodeToken(token) {
      return jwtDecode(token);
    }

   }
