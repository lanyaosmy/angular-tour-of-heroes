import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  // 此处是public，因为会在模板中使用到它
  constructor(public messageService: MessageService) {}

  ngOnInit(): void {}
}
