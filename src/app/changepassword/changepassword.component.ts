import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientServiceService } from '../client-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  isVarified: boolean = false;
  codesent: boolean = false;
  changed:boolean = false;

  constructor(private fb: FormBuilder, 
              private _cService: ClientServiceService, 
              private snack: MatSnackBar,
              private _route: Router) { }

  changePasswordData = this.fb.group({
    username: ['', Validators.required],
    code: ['', Validators.required],
    passwordGroup: this.fb.group({
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    })
  })

  ngOnInit(): void {
  }

  sendCode() {
    if (!this.changePasswordData.get('username').hasError('required')) {
      this._cService.sendPostRequest('/login/verifyuser', this.changePasswordData.value).subscribe(
        (data)=>{
          this.snack.open('User Verified. A code is sent to Email','',{
            duration:3000
          })
          this.codesent = true;
        },
        (err)=>{
          this.snack.open('Invalid User','',{
            duration:3000
          })
        }
      )
    }
  }

  verifyCode() {
    if (!this.changePasswordData.get('code').hasError('required')) {
      this._cService.sendPostRequest('/login/verifycode', this.changePasswordData.value).subscribe(
        (data)=>{
          this.snack.open('Code Verified','',{
            duration:3000
          })
          this.isVarified = true;
        },
        (err)=>{
          this.snack.open('Invalid Code','',{
            duration:3000
          })
        })
  }
}

  changePassword() {
    if (this.changePasswordData.valid) {
      this._cService.sendPostRequest('/login/changepassword', this.changePasswordData.value).subscribe(
        (data) => {
          this.snack.open('Password Changed Successfully', '', {
            duration: 3000
          });
          this.changed = true;
        },
        (err) => {
          this.snack.open('Server Error! Please try again', '', {
            duration: 3000
          });
        }
      )
    }
  }

  backToLogin() {
    this._route.navigate(['/']);
  }

}
