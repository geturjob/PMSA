import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ClientServiceService } from '../client-service.service';
import {MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {

  constructor(private route: Router, private fb : FormBuilder, private _cService:ClientServiceService, private snack:MatSnackBar, public dialogRef:MatDialogRef<EditPasswordComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  addPasswordData = this.fb.group({
    typepassword:[{value: this.data.typePassword, disabled: true}, Validators.required],
    category:[{value:this.data.Category, disabled: true}, Validators.required],
    password:[this.data.password, Validators.required]
  });

  editNoteData = this.fb.group({
    notetitle:[{value: this.data.notetitle, disabled: true}, Validators.required],
    notedesc:[this.data.notedesc, Validators.required]
  });

  addNoteData = this.fb.group({
    notetitle:['', Validators.required],
    notedesc:['', Validators.required]
  });

  ngOnInit(): void {
  }

  cancelProcess(){
    this.dialogRef.close();
  }
  updateData(){
    if(this.addPasswordData.valid)
    {
      this._cService.sendPostRequest('/password/SavePassword',this.addPasswordData.getRawValue()).subscribe(
        (data)=>{
          this.dialogRef.close();
          this.snack.open('data saved','',{
            duration:3000
          });
          this.route.navigate(['dashboard']);
        },
        (err)=>{
          console.log(err);
          this.snack.open('Server Error! please try again','',{
            duration:3000
          });
        });
    }
    else{

    }
  }

  updateNotesData(){
    if(this.editNoteData.valid)
    {
      this._cService.sendPostRequest('/notes/savenotesdata',this.editNoteData.getRawValue()).subscribe(
        (data)=>{
          this.dialogRef.close();
          this.snack.open('data saved','',{
            duration:3000
          });
          this.route.navigate(['dashboard']);
        },
        (err)=>{
          console.log(err);
          this.snack.open('Server Error! please try again','',{
            duration:3000
          });
        });
    }
    else{

    }
  }

  addData(){
    if(this.addNoteData.valid)
    {
      this._cService.sendPostRequest('/notes/savenotesdata', this.addNoteData.value).subscribe(
        (data)=>{
          this.snack.open('Date Saved', '',{
            duration:3000
          })
          this.dialogRef.close();
          this.route.navigate(['dashboard']);
        },
        (err)=>{
          this.snack.open('Server Error! Try Again', '',{
            duration:3000
          })
        }
      )
    }
    else{
      this.snack.open('All fields are required', '',{
        duration:3000
      })
    }
  }

}
