import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { VoidMessage } from '../void-message';

@Component({
  selector: 'app-void-response',
  templateUrl: './void-response.component.html',
  styleUrls: ['./void-response.component.scss']
})
export class VoidResponseComponent implements OnInit {
  @Input() response!: VoidMessage;
  @Output() isDone = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit(): void {
  }

  goAgain(): void {
    this.isDone.emit();
  }

}
