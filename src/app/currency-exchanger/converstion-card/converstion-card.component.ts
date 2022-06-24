import { Component, Input, OnInit } from '@angular/core';
import { Converter } from 'src/app/models/converter.model';

@Component({
  selector: 'app-converstion-card',
  templateUrl: './converstion-card.component.html',
  styleUrls: ['./converstion-card.component.scss']
})
export class ConverstionCardComponent implements OnInit {
  @Input() converter: Converter;
  constructor() { }

  ngOnInit(): void {
  }

}
