import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCommandComponent } from './user-command.component';

describe('UserCommandComponent', () => {
  let component: UserCommandComponent;
  let fixture: ComponentFixture<UserCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCommandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
