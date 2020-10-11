import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, AfterViewInit , ViewChild, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ClientServiceService } from '../client-service.service';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.css']
})
export class PasswordsComponent implements AfterViewInit, OnInit  {

  displayedColumns: string[] = ['Category', 'Password'];

  dataSource : any;

  @ViewChild(MatPaginator) paginator : MatPaginator;

  constructor(private _cService : ClientServiceService) { 
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

}
