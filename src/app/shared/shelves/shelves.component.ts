import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from 'src/app/core/interfaces/book.interface';

@Component({
  selector: 'app-shelves',
  templateUrl: './shelves.component.html',
  styleUrls: ['./shelves.component.scss']
})
export class ShelvesComponent implements OnInit {
  @Input() shelves: Book[][];
  @Output() addBook: EventEmitter<void> = new EventEmitter<void>();
  @Output() removeBook: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  trackByShelf(index: number) {
    return index;
  }

  trackByBook(index: number) {
    return index;
  }
}
