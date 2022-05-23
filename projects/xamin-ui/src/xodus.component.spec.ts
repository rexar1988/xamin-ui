import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XodusComponent } from './xodus.component';

describe('XodusComponent', () => {
  let component: XodusComponent;
  let fixture: ComponentFixture<XodusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XodusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XodusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
