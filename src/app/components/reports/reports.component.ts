import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  constructor(private commonService: CommonService, private cdr: ChangeDetectorRef, private titleService: Title) { }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
    this.titleService.setTitle("Reports");
    this.commonService.setTitle("Reports");
  }

}
