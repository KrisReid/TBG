import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: 'toast.component.html',
  styleUrls: ['toast.component.css']
})
export class ToastComponent {
  @Input() message = {
    body: '',
    type: ''
  };

  setMessage(body, type, time = 3000) {
    console.log("in toast setMessage")
    console.log(body + " - This is the body that has been sent")
    console.log(type + " - This is the type that has been sent")
    this.message.body = body;
    this.message.type = type;
    setTimeout(() => { this.message.body = ''; }, time);
  }
}
