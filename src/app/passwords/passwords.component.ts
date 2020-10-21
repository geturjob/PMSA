import { Component, AfterViewInit , ViewChild, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ClientServiceService } from '../client-service.service';
import { MatDialog } from '@angular/material/dialog';
import { EditPasswordComponent } from '../edit-password/edit-password.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.css']
})
export class PasswordsComponent implements AfterViewInit, OnInit  {

  displayedColumns: string[] = ['Type', 'Category', 'Password','Edit', 'Delete'];

  dataSource : any;

  @ViewChild(MatPaginator) paginator : MatPaginator;

  constructor(private route: Router, private snack: MatSnackBar, private _cService : ClientServiceService, private dialog : MatDialog) { 
  }

  ngAfterViewInit (): void {
  }

  ngOnInit(){
    this.getAllPasswordList();
  }

  getAllPasswordList(){
    this._cService.sendGetRequest('/password/GetPasswordList').subscribe(
      (data)=>{
        this.dataSource = new MatTableDataSource(<any>data);
        this.dataSource.paginator = this.paginator;
      },
      (err)=>{
        console.log(err);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editRecords(row:any){
    console.log(row.Category);
     this.dialog.open(EditPasswordComponent,{
      width: '400px',
      data: {Category: row.Category, password: row.Password, isEdit:true, isDelete:false, isAdd:false}
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
