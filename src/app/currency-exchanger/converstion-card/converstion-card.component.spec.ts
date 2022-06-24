import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConverstionCardComponent } from './converstion-card.component';

describe('ConverstionCardComponent', () => {
  let component: ConverstionCardComponent;
  let fixture: ComponentFixture<ConverstionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConverstionCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConverstionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
