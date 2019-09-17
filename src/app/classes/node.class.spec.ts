import { Book } from 'src/app/core/interfaces/book';
import { Node } from './node.class';

describe('Node', () => {
  it('should create an instance', () => {
    const node = new Node<Book>();
    const book: Book = { title: 'title', author: 'author', size: 1 };
    node.data = book;
    expect(node.data).toEqual(book);
    const next = new Node<Book>(book);
    node.next = next;
    expect(node.next).toEqual(next);
  });
});
