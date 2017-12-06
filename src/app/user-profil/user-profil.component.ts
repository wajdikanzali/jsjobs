import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'cc-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})

export class UserProfilComponent implements OnInit {

	decodedToken = null;

  constructor(private authService:AuthService) { }

  ngOnInit() {
  	if(this.authService.userIsLoggedIn()){
  		const jbbToken = JSON.parse(localStorage.getItem('jbb-data'));
  		this.decodedToken = this.authService.decodeToken(jbbToken.token);
  		console.log(this.decodedToken);
  	}
  }

}
