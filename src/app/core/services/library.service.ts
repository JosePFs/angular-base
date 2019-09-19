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
  private alphabet = 'abcdefghijklmnñopqrstuvxyz0123456789';
  private books: LinkedList<Book> = new LinkedList<Book>();
  private shelfSize: number = environment.shelfSize;
  private shelvesSize: number = environment.shelvesSize;
  private shelves = new BehaviorSubject<Array<Array<Book>>>([]);
  shelves$ = this.shelves.asObservable();
  index;

  constructor() {
    this.initIndex();
  }

  add(book: Book) {
    this.books.sortedInsert(book, 'title');
    this.shelves.next(this.getShelves());
  }

  delete(index: number) {
    this.books.deleteAt(index);
    this.initIndex();
    this.shelves.next(this.getShelves());
  }

  setSize(shelfSize: number, shelvesSize: number) {
    this.shelfSize = shelfSize;
    this.shelvesSize = shelvesSize;
    this.initIndex();
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

  search(title: string): SearchResult | null {
    let result: SearchResult;
    this.index[title.charAt(0).toLocaleLowerCase()].forEach(
      (map: Map<Book, SearchResult>) => {
        const [book, position] = map.entries().next().value;
        if (title === book.title) {
          result = position;
        }
      }
    );

    return result;
  }

  private getShelves(): Array<Array<Book>> {
    const shelvesSize = this.getShelvesSize();
    let shelves = 0;
    let shelf = 0;
    let size = 0;
    let position = 0;

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
          position = 1;
        }
      } else {
        size += current.size;
        position++;
      }
      this.addToIndex(current, {
        shelves: shelves + 1,
        shelf: shelf + 1,
        position
      });

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

  private addToIndex(book: Book, searchPosition: SearchResult) {
    const map = new Map();
    map.set(book, searchPosition);
    this.index[book.title.charAt(0).toLocaleLowerCase()].push(map);
  }

  private initIndex() {
    this.index = Array.from(this.alphabet).reduce((accu, character) => {
      accu[character.toLocaleLowerCase()] = [];
      return accu;
    }, {});
  }

  toArray(): Book[] {
    return Array.from(this.books).map(node => node);
  }
}
