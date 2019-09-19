import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LinkedList } from 'src/app/classes/linked-list.class';
import { Book } from 'src/app/core/interfaces/book.interface';
import { IndexInterface } from 'src/app/core/interfaces/index.interface';
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
  private index: IndexInterface;
  shelves$ = this.shelves.asObservable();

  constructor() {
    this.initIndex();
  }

  add(book: Book): boolean {
    const size = this.books.getSize() + book.size;
    if (
      this.books.getSize() + book.size >
      this.getShelfSize() * this.getShelvesSize()
    ) {
      return false;
    }
    this.books.sortedInsert(book, 'title');
    this.shelves.next(this.getShelves());

    return true;
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

  search(title: string): SearchResult | null {
    const foundMap: Map<Book, SearchResult> = this.index[
      title.charAt(0).toLocaleLowerCase()
    ].find((map: Map<Book, SearchResult>) => {
      const [book] = map.entries().next().value;
      if (title === book.title) {
        return true;
      }
    });

    return foundMap ? foundMap.values().next().value : null;
  }

  private getShelves(): Array<Array<Book>> {
    const shelvesSize = this.getShelvesSize();
    const shelfSize = this.getShelfSize();
    let shelves = 0;
    let shelf = 0;
    let size = 0;
    let position = 0;

    this.initIndex();
    return this.toArray().reduce((accumulator, current, index) => {
      if (current.size > shelfSize) {
        throw new Error('Book too big');
      }
      if (size + current.size > shelfSize) {
        shelf++;
        if (size > shelvesSize) {
          shelves++;
          shelf = 0;
          position = 1;
        }
        size = current.size;
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
