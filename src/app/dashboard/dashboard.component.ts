import { Component, OnInit } from '@angular/core';
import { onSideNavChange, onMainContentChange, animateText} from './sidenavAnimation';
import { Router } from '@angular/router';
import { ClientServiceService } from '../client-service.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations:[onSideNavChange, onMainContentChange, animateText]
})
export class DashboardComponent implements OnInit {
  openedMenu:boolean = true;
  sidenavChange:boolean = true;
  contentChange:boolean = true;
  textChange:boolean= true;
  clientList:any;

   TREE_DATA: any[] = [
    {
      name: 'Categories',
      children: [
        {name: 'Social Accounts', value:'social'},
        {name: 'Bank Accounts', value:'banks'},
        {name: 'Others ', value:'others'},
      ],
      value:'xyz'
    }
  ];

  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<any>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  constructor(private _route : Router, private _cService : ClientServiceService) {
    this.dataSource.data = this.TREE_DATA;
   }

   hasChild = (_: number, node: any) => node.expandable;

  ngOnInit(): void {
    this.clientList = this._cService.getClientList();
  }

  changeSideNav(){
    this.sidenavChange = !this.sidenavChange;
    this.contentChange = this.sidenavChange;

    setTimeout(()=>{
      this.textChange = this.sidenavChange;
    }, 100);

  }
  navigateToLogin(){
    localStorage.setItem('token', null);
    localStorage.setItem('SiteUserId', null);
    this._route.navigate(['/']);
  }

}
