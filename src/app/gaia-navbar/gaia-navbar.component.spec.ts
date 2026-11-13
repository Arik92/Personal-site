import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GaiaNavbarComponent } from './gaia-navbar.component';

describe('GaiaNavbarComponent', () => {
  let component: GaiaNavbarComponent;
  let fixture: ComponentFixture<GaiaNavbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GaiaNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaiaNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
