import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatprofileComponent } from './catprofile.component';

describe('CatprofileComponent', () => {
  let component: CatprofileComponent;
  let fixture: ComponentFixture<CatprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
