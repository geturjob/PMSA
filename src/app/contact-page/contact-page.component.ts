import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from '../client-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditPasswordComponent } from '../edit-password/edit-password.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {
  dataList:any;

  constructor(private route: Router, private snack: MatSnackBar, private _cService: ClientServiceService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this._cService.sendGetRequest('/notes/getnoteslist').subscribe(
      (data)=>{
        this.dataList = data;
      },
      (err)=>{
        this.snack.open('Server Error', '',{
          duration:3000
        });
      }
    )
  }

  addRecords(){
    this.dialog.open(EditPasswordComponent,{
      width: '400px',
      data:{isAdd:true, isDelete:false, isEdit:false}
    })
  }

  deleteRecords(row:any){
    const dialogRef = this.dialog.open(EditPasswordComponent, {
      width:'200px',
      data:{isAdd:false, isDelete:true, isEdit:false}
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(result == true)
      {
       this._cService.sendPostRequest('/notes/deletenotesdata', row).subscribe(
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

  editRecords(row:any){
    this.dialog.open(EditPasswordComponent,{
      width: '400px',
      data:{notetitle:row.NoteTitle, notedesc:row.NoteDesc, isNodeEdit:true, isAdd:false, isDelete:false, isEdit:false}
    })
  }

}
