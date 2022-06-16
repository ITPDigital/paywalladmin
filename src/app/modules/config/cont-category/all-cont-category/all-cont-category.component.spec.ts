import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllContCategoryComponent } from './all-cont-category.component';

describe('AllContCategoryComponent', () => {
  let component: AllContCategoryComponent;
  let fixture: ComponentFixture<AllContCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllContCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllContCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
