import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMarkcheetComponent } from './test-markcheet.component';

describe('TestMarkcheetComponent', () => {
  let component: TestMarkcheetComponent;
  let fixture: ComponentFixture<TestMarkcheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestMarkcheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestMarkcheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
