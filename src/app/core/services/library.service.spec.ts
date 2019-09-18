import { TestBed } from '@angular/core/testing';
import { Book } from 'src/app/core/interfaces/book';
import { LibraryService } from './library.service';

describe('LibraryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be able to add, get and remove books', () => {
    const service: LibraryService = TestBed.get(LibraryService);
    const bookOne: Book = { title: 'a', author: '1', size: 1 };
    const bookTwo: Book = { title: 'b', author: '2', size: 2 };
    const bookThree: Book = { title: 'c', author: '3', size: 3 };

    service.add(bookOne);
    service.add(bookTwo);
    service.add(bookThree);

    service.setSize(5, 5);
    service.shelves$.subscribe(shelves => {
      expect(shelves[0][0][0]).toEqual(bookOne);
      expect(shelves[0][0][1]).toEqual(bookTwo);
      expect(shelves[0][1][2]).toEqual(bookThree);
      expect(() => service.setSize(1, 1)).toThrow(Error);
    });

    service.setSize(3, 1);
    service.shelves$.subscribe(shelves => {
      expect(shelves[0][0][0]).toEqual(bookOne);
      expect(shelves[0][0][1]).toEqual(bookTwo);
      expect(shelves[1][0][2]).toEqual(bookThree);
    });

    service.delete(0);
    service.shelves$.subscribe(shelves => {
      expect(service.getFirst()).toEqual(bookTwo);
      expect(service.getLast()).toEqual(bookThree);
      expect(service.toArray().length).toBe(2);
    });

    expect(service.search('c')).toEqual({ shelves: 2, shelf: 1, position: 1 });
  });
});
