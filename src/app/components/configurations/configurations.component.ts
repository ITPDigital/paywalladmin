import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss']
})
export class ConfigurationsComponent implements OnInit {

  constructor(private commonService: CommonService, private cdr: ChangeDetectorRef, private titleService: Title) { }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
    this.titleService.setTitle("Configurations");
    this.commonService.setTitle("Configurations");
  }

}
