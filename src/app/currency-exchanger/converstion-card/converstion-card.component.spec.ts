import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { ConverstionCardComponent } from './converstion-card.component';

xdescribe('ConverstionCardComponent', () => {
  let component: ConverstionCardComponent;
  let fixture: ComponentFixture<ConverstionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConverstionCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConverstionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', async () => {
    await component.ngOnInit();
    tick(2000);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
