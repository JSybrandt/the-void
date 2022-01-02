import { Component, OnInit } from '@angular/core';
import { TheVoidService } from '../the-void.service';
import { VoidMessage } from '../void-message';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit {

  message: string = ""
  max_length: number = 200
  response?: VoidMessage = undefined;

  constructor(private theVoid: TheVoidService) { }

  ngOnInit(): void {
  }

  submit(message: string): void {
    if(!this.isValid()) return;
    this.theVoid.send({"content": message}).subscribe(msg=>{
      this.response=msg;
      this.message = "";
    });
  }

  onResponseDone(): void {
    this.response = undefined;
  }

  isValid(): boolean {
    return this.message.length > 0 && this.message.length < this.max_length;
  }

  preventKeydown(event:any){
    event.preventDefault();
  }

}
