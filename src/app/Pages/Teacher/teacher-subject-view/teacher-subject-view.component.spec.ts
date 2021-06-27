import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSubjectViewComponent } from './teacher-subject-view.component';

describe('TeacherSubjectViewComponent', () => {
  let component: TeacherSubjectViewComponent;
  let fixture: ComponentFixture<TeacherSubjectViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherSubjectViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherSubjectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
