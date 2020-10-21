import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientServiceService } from '../client-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emp: any = {}
  show:boolean = false;
  constructor(private _router: Router, private fb: FormBuilder, private _cService: ClientServiceService, private snack: MatSnackBar) { }

  loginform = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  ngOnInit(): void {
  }

  signUpAction() {
    this._router.navigate(['signup']);
  }

  loginAction() {
    if (this.loginform.valid) {
      this._cService.sendPostRequest('/login/loginuser', this.loginform.value).subscribe(
        (data) => {
          if (data == 'NoAccount') {
            this.snack.open('Invalid Username and Password', '', {
              duration: 3000
            })
          }
          else {
            this.emp = data;
            localStorage.setItem('token', this.emp.token);
            localStorage.setItem('SiteUserId', this.emp.user);
            this._router.navigate(['dashboard']);
          }
        },
        (err) => {
          console.log(err);
          this.snack.open('Server Error!', '', {
            duration: 3000
          })
        }
      )
    }
    else {
      console.log('invalid')
    }
  }

  changePassword() {
    this._router.navigate(['changepassword']);
  }

}
