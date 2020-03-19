import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolClassSubjectsComponent } from './school-class-subjects.component';

describe('SchoolClassSubjectsComponent', () => {
  let component: SchoolClassSubjectsComponent;
  let fixture: ComponentFixture<SchoolClassSubjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolClassSubjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolClassSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
