import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  isSelected: boolean = false;
  activeLink: string = "brands";
  constructor(private commonService: CommonService) { }

  ngOnInit(): void {  
    this.commonService.activeLink$.subscribe((activeLink: string) => {
      this.activeLink = activeLink;
    });
  }
  toggleSideNav() {
    this.isSelected = !this.isSelected;
  }
}
