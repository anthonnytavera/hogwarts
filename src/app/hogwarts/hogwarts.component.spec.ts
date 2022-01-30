import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HogwartsComponent } from './hogwarts.component';

describe('HogwartsComponent', () => {
  let component: HogwartsComponent;
  let fixture: ComponentFixture<HogwartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HogwartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HogwartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
