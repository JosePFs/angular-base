import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LinkedList } from 'src/app/classes/linked-list.class';
import { Book } from 'src/app/core/interfaces/book';
import { SearchResult } from 'src/app/core/interfaces/search-result.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private books: LinkedList<Book> = new LinkedList<Book>();
  private shelfSize: number = environment.shelfSize;
  private shelvesSize: number = environment.shelvesSize;
  private shelves = new BehaviorSubject<Array<Array<Book>>>([]);
  shelves$ = this.shelves.asObservable();

  constructor() {}

  add(book: Book) {
    this.books.sortedInsert(book, 'title');
    this.shelves.next(this.getShelves());
  }

  delete(index: number) {
    this.books.deleteAt(index);
    this.shelves.next(this.getShelves());
  }

  setSize(shelfSize: number, shelvesSize: number) {
    this.shelfSize = shelfSize;
    this.shelvesSize = shelvesSize;
    this.shelves.next(this.getShelves());
  }

  getShelfSize(): number {
    return this.shelfSize;
  }

  getShelvesSize(): number {
    return this.shelvesSize;
  }

  getShelves(): Array<Array<Book>> {
    let shelvesCounter = 0;
    let shelfsCounter = 0;
    let shelfSizeAccumulate = 0;
    return this.toArray().reduce((accumulator, current, index) => {
      if (current.size > this.shelfSize) {
        throw new Error('Book too big');
      }
      if (shelfSizeAccumulate + current.size > this.shelfSize) {
        shelfsCounter++;
        shelfSizeAccumulate = current.size;
      } else {
        shelfSizeAccumulate += current.size;
      }
      if (shelfsCounter > 0 && shelfsCounter % this.shelvesSize === 0) {
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

  search(title: string): SearchResult {
    let shelves = 1;
    let shelf = 1;
    let position = 1;
    for (const shelve of this.getShelves()) {
      for (const books of shelve) {
        for (const book of Object.values(books)) {
          if (book.title === title) {
            return { shelves, shelf, position };
          }
          position++;
        }
        shelf++;
        position = 1;
      }
      shelf = 1;
      shelves++;
    }
  }

  toArray(): Book[] {
    return Array.from(this.books).map(node => node.data);
  }
}
