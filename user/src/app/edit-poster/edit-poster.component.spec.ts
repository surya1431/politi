import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPosterComponent } from './edit-poster.component';

describe('EditPosterComponent', () => {
  let component: EditPosterComponent;
  let fixture: ComponentFixture<EditPosterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPosterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
