import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { Title } from '@angular/platform-browser';
import { Constants } from '../../../common/constants';

@Component({
  selector: 'app-promo-codes',
  templateUrl: './promo-codes.component.html',
  styleUrls: ['./promo-codes.component.scss']
})
export class PromoCodesComponent implements OnInit {

  constructor(private commonService: CommonService, private cdr: ChangeDetectorRef, private titleService: Title) {
    this.commonService.subNavSelect(Constants.NAV_PROMO);
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
    this.titleService.setTitle("Promo codes");
    this.commonService.setTitle("Promo codes");
  }

}
