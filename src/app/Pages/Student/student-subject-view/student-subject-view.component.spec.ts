import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSubjectViewComponent } from './student-subject-view.component';

describe('StudentSubjectViewComponent', () => {
  let component: StudentSubjectViewComponent;
  let fixture: ComponentFixture<StudentSubjectViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentSubjectViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSubjectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
