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
    expect(service.getShelves()[0][0][0]).toEqual(bookOne);
    expect(service.getShelves()[0][0][1]).toEqual(bookTwo);
    expect(service.getShelves()[0][1][2]).toEqual(bookThree);
    service.setSize(1, 1);
    expect(() => service.getShelves()).toThrow(Error);
    service.setSize(3, 1);
    expect(service.getShelves()[0][0][0]).toEqual(bookOne);
    expect(service.getShelves()[0][0][1]).toEqual(bookTwo);
    expect(service.getShelves()[1][0][2]).toEqual(bookThree);
    service.delete(0);
    expect(service.books.getFirst().data).toEqual(bookTwo);
    expect(service.books.getLast().data).toEqual(bookThree);
    expect(service.toArray().length).toBe(2);
  });
});
