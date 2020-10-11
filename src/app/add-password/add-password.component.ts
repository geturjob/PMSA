import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientServiceService } from '../client-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-password',
  templateUrl: './add-password.component.html',
  styleUrls: ['./add-password.component.css']
})
export class AddPasswordComponent implements OnInit {
  success:boolean = false;
  

  constructor(private fb : FormBuilder, private _cService: ClientServiceService, private snack: MatSnackBar) { }

  addPasswordData = this.fb.group({
    category:['', Validators.required],
    password:['', Validators.required]
  })

  ngOnInit(): void {
    
  }

  addPassword(){
    if(this.addPasswordData.valid)
    {
      this._cService.sendPostRequest('/password/SavePassword', this.addPasswordData.value).subscribe(
        (data)=>{
            this.snack.open('Saved Successfully','',{
              duration:3000
            });
            this.success = true;
            this.addPasswordData.reset();
        },
        (err)=>
        {
          this.snack.open('Error Occured. Please try again','',{
            duration:3000
          });
        })
    }
  }

}
