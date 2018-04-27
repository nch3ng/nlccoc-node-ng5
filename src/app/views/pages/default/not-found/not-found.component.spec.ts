import { NotFoundComponent } from './not-found.component';
import { RequestOptions } from '@angular/http';
import { Http, ConnectionBackend } from '@angular/http';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('UserComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotFoundComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    let userService = fixture.debugElement.injector.get(NotFoundComponent);
    expect(component).toBeTruthy();
  });

  it("shoud use service", () => {
  })
});