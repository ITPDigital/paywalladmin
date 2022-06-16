import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { Title } from '@angular/platform-browser';
import { Constants } from '../../../common/constants';

@Component({
  selector: 'app-messaging-templates',
  templateUrl: './messaging-templates.component.html',
  styleUrls: ['./messaging-templates.component.scss']
})
export class MessagingTemplatesComponent implements OnInit {
  constructor(private commonService: CommonService, private cdr: ChangeDetectorRef, private titleService: Title) {
    this.commonService.subNavSelect(Constants.NAV_EMAILS);
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
    this.titleService.setTitle("Messaging Templates");
    this.commonService.setTitle("Messaging Templates");
  }
}
