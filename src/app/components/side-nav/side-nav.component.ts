import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Constants } from '../../common/constants';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  isSelected: boolean = false;
  activeLink: string = "brands";
  settingsPrmns : boolean = false;
  constructor(private commonService: CommonService) { 
    if(parseInt(localStorage.getItem('pw_role'))===Constants.ADMIN_ROLE_SUPER_ADMIN) {
      this.settingsPrmns = true;
    }
  }

  ngOnInit(): void {  
    this.commonService.activeLink$.subscribe((activeLink: string) => {
      this.activeLink = activeLink;
    });
  }
  toggleSideNav() {
    this.isSelected = !this.isSelected;
  }

  toggleSubMenu(event : Event) {
    event.stopPropagation();
    event.preventDefault();
    let currElem = event?.target as HTMLElement;
    currElem.closest("li").classList.toggle("show-sub-menu");
  }
}
