import { Component, Input, OnInit, ChangeDetectorRef, AfterViewInit, HostListener, HostBinding  } from '@angular/core';
import { CommonService } from '../../services/common.service'
import { LoginService} from '../../services/login.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent {
  title : string = "Dashboard";
  isSelected: boolean = false;
  alerts: any[];
  changePwdPrmsn : boolean = true;
  constructor(public commonService: CommonService, private cdr: ChangeDetectorRef, private loginService : LoginService) { }

  @HostListener('mouseleave') closeDropdown() {
    this.isSelected = false;
  }

  logout() {
    this.loginService.logout();
  }

  functionClick($event) {
    if(this.isSelected) {
      this.isSelected = false;
    }
  }

  ngAfterViewInit() {
    this.commonService.currentPage.subscribe(title => {
      this.title = title;
      this.cdr.detectChanges();
    }, err => {
      console.log(err);
    });
    
  }

}
