import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClientServiceService } from '../client-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditPasswordComponent } from '../edit-password/edit-password.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  dataList:any;
  constructor(private dialog: MatDialog,private route : Router, private aroute:ActivatedRoute,  private _cService: ClientServiceService, private snack : MatSnackBar ) { }

  ngOnInit(): void {
    this.aroute.params.subscribe((params: Params) => {
      this._cService.sendGetRequest('/password/GetPasswordList/' + params.type.substring(0, params.type.indexOf(" ")).toLowerCase()).subscribe(
        (data)=>{
          this.dataList = data;
        },
        (err)=>{
          this.snack.open('Error occured','',{
            duration:3000
          });
        }) 
    });
}

editRecords(row:any){
  console.log(row.Category);
   this.dialog.open(EditPasswordComponent,{
    width: '400px',
    data: {Category: row.Category, password: row.Password, typePassword:row.TypePassword, isEdit:true, isDelete:false, isAdd:false}
   });
}

deleteRecords(row:any){
  const dialogRef = this.dialog.open(EditPasswordComponent,{
    width: '250px',
    data: {isEdit:false, isDelete:true, isAdd:false}
   });

   dialogRef.afterClosed().subscribe(result=>{
     if(result == true)
     {
      this._cService.sendPostRequest('/password/deletePassword', row).subscribe(
        (data)=>{
          this.snack.open('Delete Success','',{
            duration:3000
          });
          this.route.navigate(['dashboard']);
        },
        (err)=>{
          this.snack.open('Server Error','',{
            duration:3000
          });
        });
     }
   });
}

}
