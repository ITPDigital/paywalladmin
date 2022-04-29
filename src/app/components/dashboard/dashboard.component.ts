import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private commonService: CommonService, private cdr: ChangeDetectorRef, private titleService: Title) { }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
    this.titleService.setTitle("Dashboard");
    this.commonService.setTitle("Dashboard");
  }

}
