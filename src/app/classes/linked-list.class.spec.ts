import { Book } from 'src/app/core/interfaces/book.interface';
import { LinkedList } from './linked-list.class';

describe('LinkedList', () => {
  it('should be able to retrieve and insert nodes', () => {
    let linkedList: LinkedList<Book>;
    const bookOne: Book = { title: '0', author: '0', size: 1 };
    const bookTwo: Book = { title: '1', author: '1', size: 2 };
    const bookThree: Book = { title: '2', author: '2', size: 3 };
    const bookFour: Book = { title: '3', author: '3', size: 4 };

    linkedList = new LinkedList();
    let beginningNode = linkedList.insertAtBeginning(bookOne);
    expect(beginningNode).toEqual(linkedList.getFirst());
    expect(linkedList.getFirst()).toEqual(linkedList.getLast());
    beginningNode = linkedList.insertAtBeginning(bookTwo);
    expect(beginningNode).toEqual(linkedList.getFirst());
    expect(linkedList.getFirst()).not.toEqual(linkedList.getLast());

    linkedList = new LinkedList();
    let endNode = linkedList.insertAtEnd(bookOne);
    expect(endNode).toEqual(linkedList.getFirst());
    expect(linkedList.getFirst()).toEqual(linkedList.getLast());
    endNode = linkedList.insertAtEnd(bookTwo);
    expect(endNode).toEqual(linkedList.getLast());

    linkedList = new LinkedList();
    expect(() => linkedList.insertAt(-1, bookOne)).toThrow(Error);
    expect(() => linkedList.insertAt(2, bookOne)).toThrow(Error);
    const firstNode = linkedList.insertAt(0, bookOne);
    expect(firstNode).toEqual(linkedList.getFirst());
    expect(firstNode).toEqual(linkedList.getLast());
    const secondNode = linkedList.insertAt(1, bookTwo);
    expect(firstNode).toEqual(linkedList.getFirst());
    expect(secondNode).toEqual(linkedList.getLast());
    const thirdNode = linkedList.insertAt(2, bookThree);
    expect(thirdNode).toEqual(linkedList.getLast());
    const middleNode = linkedList.getAt(1);
    expect(middleNode.data).toEqual(secondNode);
    const fourthNode = linkedList.insertAt(1, bookFour);
    expect(fourthNode).toEqual(linkedList.getAt(1).data);
    const newFirstNode = linkedList.insertAt(0, bookOne);
    expect(newFirstNode).toEqual(linkedList.getAt(0).data);
    expect(thirdNode).toEqual(linkedList.getLast());
  });

  it('should be able to delete nodes', () => {
    let linkedList: LinkedList<Book>;
    const bookOne: Book = { title: '0', author: '0', size: 1 };
    const bookTwo: Book = { title: '1', author: '1', size: 2 };
    const bookThree: Book = { title: '2', author: '2', size: 3 };
    const bookFour: Book = { title: '3', author: '3', size: 4 };
    const bookFive: Book = { title: '4', author: '4', size: 5 };

    linkedList = new LinkedList();
    expect(() => linkedList.deleteFirst()).toThrow(Error);
    linkedList.insertAt(0, bookOne);
    linkedList.deleteFirst();
    expect(linkedList.getFirst()).toBeNull();
    expect(linkedList.getLast()).toBeNull();
    linkedList.insertAt(0, bookOne);
    const lastnode = linkedList.insertAt(1, bookTwo);
    linkedList.deleteFirst();
    expect(lastnode).toEqual(linkedList.getFirst());

    linkedList = new LinkedList();
    expect(() => linkedList.deleteLast()).toThrow(Error);
    const firstNode = linkedList.insertAt(0, bookOne);
    const middleNode = linkedList.insertAt(1, bookTwo);
    linkedList.insertAt(2, bookThree);
    linkedList.deleteLast();
    expect(middleNode).toEqual(linkedList.getLast());
    linkedList.deleteLast();
    expect(firstNode).toEqual(linkedList.getLast());
    linkedList.deleteLast();
    expect(linkedList.getFirst()).toBeNull();
    expect(linkedList.getLast()).toBeNull();

    linkedList = new LinkedList();
    expect(() => linkedList.deleteAt(0)).toThrow(Error);
    linkedList.insertAt(0, bookOne);
    expect(() => linkedList.deleteAt(-1)).toThrow(Error);
    expect(() => linkedList.deleteAt(1)).toThrow(Error);
    expect(() => linkedList.deleteAt(2)).toThrow(Error);
    linkedList.deleteAt(0);
    expect(linkedList.getFirst()).toBeNull();
    expect(linkedList.getLast()).toBeNull();

    linkedList = new LinkedList();
    linkedList.insertAt(0, bookOne);
    const nextFirst = linkedList.insertAt(1, bookTwo);
    linkedList.deleteAt(0);
    expect(nextFirst).toEqual(linkedList.getAt(0).data);
    linkedList.deleteAt(0);
    expect(linkedList.getFirst()).toBeNull();
    expect(linkedList.getLast()).toBeNull();

    linkedList = new LinkedList();
    linkedList.insertAt(0, bookOne);
    const atSecondNode = linkedList.insertAt(1, bookTwo);
    linkedList.insertAt(2, bookThree);
    const atFourthNode = linkedList.insertAt(3, bookFive);
    linkedList.insertAt(4, bookFour);
    linkedList.deleteAt(0);
    expect(atSecondNode).toEqual(linkedList.getAt(0).data);
    linkedList.deleteAt(1);
    expect(atFourthNode).toEqual(linkedList.getAt(1).data);
    linkedList.deleteAt(2);
    expect(atFourthNode).toEqual(linkedList.getLast());
    expect(atSecondNode).toEqual(linkedList.getFirst());

    linkedList = new LinkedList();
    linkedList.insertAt(0, bookOne);
    linkedList.insertAt(1, bookTwo);
    linkedList.deleteList();
    expect(linkedList.getFirst()).toBeNull();
    expect(linkedList.getLast()).toBeNull();

    linkedList = new LinkedList();
    linkedList.insertAt(0, bookOne);
    linkedList.insertAt(1, bookTwo);
    linkedList.insertAt(2, bookThree);
    linkedList.insertAt(3, bookFour);
    expect(linkedList.deleteAt(1)).toEqual(linkedList.getFirst());
    expect(linkedList.deleteAt(2)).toEqual(linkedList.getLast());

    linkedList = new LinkedList();
    const sortedBookOne: Book = { title: '2', author: '0', size: 1 };
    const sortedBookTwo: Book = { title: '3', author: '1', size: 2 };
    const sortedBookFirst: Book = { title: '0', author: '0', size: 1 };
    linkedList.sortedInsert(sortedBookOne, 'title');
    linkedList.sortedInsert(sortedBookOne, 'title');
    linkedList.sortedInsert(sortedBookTwo, 'title');
    linkedList.sortedInsert(sortedBookFirst, 'title');
    expect(sortedBookTwo).toEqual(linkedList.getLast());
    expect(sortedBookFirst).toEqual(linkedList.getFirst());

    linkedList = new LinkedList();
    linkedList.insertAt(0, bookOne);
    linkedList.insertAt(1, bookTwo);
    const linkedToArray = Array.from(linkedList);
    expect(linkedToArray[0]['title']).toEqual(bookOne.title);
  });

  it('should be able to calculate size', () => {
    const linkedList: LinkedList<Book> = new LinkedList<Book>();
    const bookOne: Book = { title: '0', author: '0', size: 2 };
    const bookTwo: Book = { title: '1', author: '1', size: 4 };
    const bookThree: Book = { title: '2', author: '2', size: 6 };
    const bookFour: Book = { title: '3', author: '3', size: 10 };

    linkedList.insertAtBeginning(bookOne);
    expect(linkedList.getSize()).toBe(2);
    linkedList.insertAt(0, bookTwo);
    expect(linkedList.getSize()).toBe(6);
    linkedList.insertAt(1, bookThree);
    linkedList.insertAtEnd(bookFour);
    expect(linkedList.getSize()).toBe(22);
    linkedList.deleteAt(0);
    expect(linkedList.getSize()).toBe(18);
    linkedList.deleteLast();
    expect(linkedList.getSize()).toBe(8);
    linkedList.deleteFirst();
    expect(linkedList.getSize()).toBe(2);
    linkedList.deleteAt(0);
    expect(linkedList.getSize()).toBe(0);
  });

  it('should be able to manage objects without size', () => {
    const linkedList: LinkedList<{
      title: string;
      author: string;
    }> = new LinkedList<{ title: string; author: string }>();
    const bookOne: { title: string; author: string } = {
      title: '1',
      author: '1'
    };
    linkedList.insertAtBeginning(bookOne);
    linkedList.sortedInsert(bookOne, 'title');
    linkedList.sortedInsert({ title: '0', author: '0' }, 'title');
    linkedList.deleteFirst();
    expect(linkedList.getSize()).toBe(0);
  });
});
