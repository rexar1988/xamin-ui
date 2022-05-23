import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiMenuComponent } from './multi-menu.component';

describe('MultiMenuComponent', () => {
  let component: MultiMenuComponent;
  let fixture: ComponentFixture<MultiMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
