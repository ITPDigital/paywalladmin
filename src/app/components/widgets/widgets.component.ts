import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
export class WidgetsComponent implements OnInit {

  constructor(private commonService: CommonService, private cdr: ChangeDetectorRef, private titleService: Title) { }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
    this.titleService.setTitle("Widgets");
    this.commonService.setTitle("Widgets");
  }

}
