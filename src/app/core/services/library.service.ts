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

  getFirst(): Book {
    return this.books.getFirst();
  }

  getLast(): Book {
    return this.books.getLast();
  }

  search(title: string): SearchResult {
    const shelfSize = this.getShelfSize();
    const shelvesSize = this.getShelvesSize();
    let shelves = 1;
    let shelf = 1;
    let position = 1;
    let size = 0;

    for (const book of this.books) {
      if (size + book.size > shelfSize) {
        size = book.size;
        shelf++;
        position = 1;
        if (shelf % shelvesSize === 0) {
          shelves++;
          shelf = 1;
          position = 1;
        }
      } else {
        size += book.size;
      }
      if (book.title === title) {
        return { shelves, shelf, position };
      }
      position++;
    }
  }

  private getShelves(): Array<Array<Book>> {
    const shelvesSize = this.getShelvesSize();
    let shelves = 0;
    let shelf = 0;
    let size = 0;

    return this.toArray().reduce((accumulator, current, index) => {
      if (current.size > this.shelfSize) {
        throw new Error('Book too big');
      }
      if (size + current.size > this.shelfSize) {
        shelf++;
        size = current.size;
        if (shelf % shelvesSize === 0) {
          shelves++;
          shelf = 0;
        }
      } else {
        size += current.size;
      }

      if (typeof accumulator[shelves] === 'undefined') {
        accumulator[shelves] = [];
      }
      if (typeof accumulator[shelves][shelf] === 'undefined') {
        accumulator[shelves][shelf] = {};
      }
      accumulator[shelves][shelf][index] = current;

      return accumulator;
    }, []);
  }

  toArray(): Book[] {
    return Array.from(this.books).map(node => node);
  }
}
