import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPosterComponent } from './user-poster.component';

describe('UserPosterComponent', () => {
  let component: UserPosterComponent;
  let fixture: ComponentFixture<UserPosterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPosterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
