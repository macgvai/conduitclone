import { Component, Inject, Input, OnInit } from '@angular/core';
import { UtilsService } from '../services/utils.service';
import { NgClass, NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'mc-pagination',
    standalone: true,
    imports: [NgForOf, RouterLink, NgClass],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit {
    // private utilsService = Inject(UtilsService);

    @Input('total') totalProps: number;
    @Input('currentPage') currentPageProps: number;
    @Input('limit') limitProps: number;
    @Input('url') urlProps: string;

    pagesCount: number;
    pages: number[];
    constructor(private utilsService: UtilsService) {}

    ngOnInit(): void {
        this.pagesCount = Math.ceil(this.totalProps / this.limitProps);
        this.pages = this.utilsService.range(1, this.pagesCount);
    }
}
