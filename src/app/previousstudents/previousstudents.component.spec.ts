import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousstudentsComponent } from './previousstudents.component';

describe('PreviousstudentsComponent', () => {
  let component: PreviousstudentsComponent;
  let fixture: ComponentFixture<PreviousstudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousstudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousstudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
