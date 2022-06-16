import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { Title } from '@angular/platform-browser';
import { Constants } from '../../../common/constants';

@Component({
  selector: 'app-st-manage-admin',
  templateUrl: './st-manage-admin.component.html',
  styleUrls: ['./st-manage-admin.component.scss']
})
export class StManageAdminComponent implements OnInit {

  constructor(private commonService: CommonService, private cdr: ChangeDetectorRef, private titleService: Title) {
    this.commonService.subNavSelect(Constants.NAV_MANAGE_ADMIN);
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
    this.titleService.setTitle("Manage Admin");
    this.commonService.setTitle("Manage Admin");
  }

}
