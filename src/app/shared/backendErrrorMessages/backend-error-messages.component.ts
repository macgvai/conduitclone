import {Component, Input, OnInit} from '@angular/core';
import {BackendErrorsInterface} from '../types/backendErrors.interface';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'mc-backend-error-messages',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './backend-error-messages.component.html',
  styleUrl: './backend-error-messages.component.scss'
})
export class BackendErrorMessagesComponent implements OnInit{
  @Input('backendErrors') backendErrorsProps: BackendErrorsInterface

  errorMessages: string[]

  ngOnInit():void {
    this.errorMessages = Object.keys(this.backendErrorsProps).map((name) => {
      const messages  = this.backendErrorsProps[name].join(', ')

      // console.log(`${name} ${messages}`)

      // return `${name} ${messages}`
      return messages
    })
  }
}
