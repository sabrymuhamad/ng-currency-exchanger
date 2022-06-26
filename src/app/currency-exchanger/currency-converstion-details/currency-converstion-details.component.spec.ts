import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialsModule } from 'src/app/materials/materials.module';
import { CustomDatePipe } from 'src/app/pipes/custom-date.pipe';

import { CurrencyConverstionDetailsComponent } from './currency-converstion-details.component';

describe('CurrencyConverstionDetailsComponent', () => {
  let component: CurrencyConverstionDetailsComponent;
  let fixture: ComponentFixture<CurrencyConverstionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrencyConverstionDetailsComponent],
      imports: [HttpClientModule, RouterTestingModule, MaterialsModule, FormsModule],
      providers:[CustomDatePipe]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CurrencyConverstionDetailsComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
