import { Injectable } from '@angular/core';
import { LinkedList } from 'src/app/classes/linked-list.class';
import { Book } from 'src/app/core/interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  books: LinkedList<Book> = new LinkedList<Book>();

  constructor() {}

  add(book: Book) {
    this.books.sortedInsert(book, 'title');
  }

  delete(index: number) {
    this.books.deleteAt(index);
  }

  shelves(shelfSize: number, shelvesSize: number) {
    let shelvesCounter = 0;
    let shelfsCounter = 0;
    let shelfSizeAccumulate = 0;
    return this.toArray().reduce((accumulator, current, index) => {
      if (current.size > shelfSize) {
        throw new Error('Book too big');
      }
      if (shelfSizeAccumulate + current.size > shelfSize) {
        shelfsCounter++;
        shelfSizeAccumulate = current.size;
      } else {
        shelfSizeAccumulate += current.size;
      }
      if (shelfsCounter > 0 && shelfsCounter % shelvesSize === 0) {
        shelvesCounter++;
        shelfsCounter = 0;
      }

      if (typeof accumulator[shelvesCounter] === 'undefined') {
        accumulator[shelvesCounter] = [];
      }
      if (typeof accumulator[shelvesCounter][shelfsCounter] === 'undefined') {
        accumulator[shelvesCounter][shelfsCounter] = {};
      }
      accumulator[shelvesCounter][shelfsCounter][index] = current;

      return accumulator;
    }, []);
  }

  toArray(): Book[] {
    return Array.from(this.books).map(node => node.data);
  }
}
