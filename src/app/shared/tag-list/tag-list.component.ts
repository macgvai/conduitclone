import {Component, Input} from '@angular/core';
import {PopularTagType} from '../types/popularTagType';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'mc-tag-list',
  standalone: true,
    imports: [
        NgForOf
    ],
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.scss'
})
export class TagListComponent {
    @Input('tags') tagsProps: PopularTagType[];

}
