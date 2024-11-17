import { Component, Input } from '@angular/core';

@Component({
    selector: 'mc-error-message',
    standalone: true,
    imports: [],
    templateUrl: './error-message.component.html',
    styleUrl: './error-message.component.scss',
})
export class ErrorMessageComponent {
    @Input('message') messageProps: string = 'Something went wrong';
}
