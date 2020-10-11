import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ClientServiceService } from '../client-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  showSuccess:boolean = false;
  isEmailVerification:boolean = false;
  verified:boolean=false;

  constructor(private _router: Router, private fb: FormBuilder, private _cService: ClientServiceService, private _route: ActivatedRoute, private snack: MatSnackBar) { }

  signupform = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    passwordGroup: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmpassword: ['', [Validators.required]]
    }, { validator: this.matchPasswords })

  })

  get f() { return this.signupform.controls; }

  ngOnInit(): void {
    if(this._route.snapshot.queryParamMap.has('token'))
    {
      this.isEmailVerification = true;
      var data = {
        token:''
      };
      data.token = this._route.snapshot.queryParamMap.get('token');
      this._cService.sendPostRequest('/login/activateaccount',data).subscribe(
        (data)=>{
          console.log(data);
          this.verified = true;
          this.snack.open('Email verified!','',{
            duration:3000
          })
        },
        (err)=>{
          console.log(err);
          this.snack.open('Server Error or the token expired!','',{
            duration:3000
          })
        }
      )
    }
  }

  matchPasswords(group: AbstractControl): { [key: string]: any } | null {
    var password = group.get('password');
    var confirmpassword = group.get('confirmpassword');
    if (password.value === confirmpassword.value) {
      return null;
    }
    else {
      return { 'mismatch': true }
    }
  }
  
  signUpAction() {
    if (this.signupform.valid) {
      this._cService.sendPostRequest('/login/register', this.signupform.value).subscribe(
        (data) => {
          console.log(data);
          this.showSuccess = true;
        },
        (err) => {
          console.log(err);
        });
    }
    else {
      console.log(this.signupform.get('passwordGroup').get('password').errors);
    }
  }

  backToLogin() {
    this._router.navigate(['/']);
  }

}
