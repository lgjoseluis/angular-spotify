import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@modules/auth/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  errorSession: boolean = false;
  formLogin: FormGroup = new FormGroup({});
  
  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl('',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(12)
          ])
      }
    )
  }

  sendLogin(): void {
    const { email, password } = this.formLogin.value; //-> Destructuración
        
    this._authService.sendCredentials(email, password)
      .subscribe({
        next: (response) => {
          console.log('Session iniciada', response);
          const { tokenSession, data } = response
          //this.cookie.set('token', tokenSession, 4, '/') 
          //this.router.navigate(['/', 'tracks'])
        },
        error: (error) => {
          this.errorSession = true;
          console.log('Login-error:> ', error.error);
        }
      });
  }
}
