import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { ClientServiceService } from '../client-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-password',
  templateUrl: './add-password.component.html',
  styleUrls: ['./add-password.component.css'],
  providers:[{provide:NG_VALUE_ACCESSOR, useExisting:forwardRef(()=>AddPasswordComponent), multi:true}]
})
export class AddPasswordComponent implements OnInit, ControlValueAccessor {
  onChange = (_:any)=>{}

  writeValue(val:any){

  }
  registerOnChange(fn:any){
    this.onChange = fn;
  }

  registerOnTouched(val:any){}
  success:boolean = false;
  categoryList: any;
  categoryType:string;

  addPassworddata:any={
    type:'',
    category:'',
    password:''
  }

  constructor(private fb : FormBuilder, private _cService: ClientServiceService, private snack: MatSnackBar) { }

  addPasswordData = this.fb.group({
    typeCategory:['', Validators.required],
    category:['', Validators.required],
    password:['', Validators.required]
  })

  ngOnInit(): void {
    this.categoryList = this._cService.getClientList();
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
