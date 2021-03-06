import { Node } from './node.class';

export interface Sizeable {
  size: number;
}

export class LinkedList<T> {
  private head: Node<T> = null;
  private tail: Node<T> = null;
  private size = 0;

  constructor() {}

  *[Symbol.iterator](): IterableIterator<T> {
    let node = this.head;
    let counter = 0;
    while (node) {
      yield node.data;
      node = node.next;
      counter++;
    }
  }

  insertAtBeginning(data: T): T {
    const newNode = new Node<T>(data);
    this.sumSize(data);
    if (null === this.head) {
      this.head = this.tail = newNode;

      return newNode.data;
    }

    newNode.next = this.head;
    this.head = newNode;

    return newNode.data;
  }

  insertAtEnd(data: T): T {
    const newNode = new Node<T>(data);
    this.sumSize(data);
    if (null === this.head) {
      this.head = this.tail = newNode;

      return newNode.data;
    }

    this.tail.next = newNode;
    this.tail = newNode;

    return newNode.data;
  }

  insertAt(index: number, data: T): T {
    if (index < 0) {
      throw new Error('Index not valid');
    }

    if (0 === index) {
      return this.insertAtBeginning(data);
    }

    const previous = this.getAt(index - 1);
    if (null === previous) {
      throw new Error('Node not found');
    }
    const newNode = new Node<T>(data);
    this.sumSize(data);
    newNode.next = previous.next;
    previous.next = newNode;
    if (previous === this.tail) {
      this.tail = newNode;
    }

    return newNode.data;
  }

  sortedInsert(data: T, by: string): T {
    const newNode = new Node<T>(data);
    this.sumSize(data);
    if (null === this.head || this.head.data[by] >= newNode.data[by]) {
      newNode.next = this.head;
      this.head = newNode;
      if (null === this.head.next) {
        this.tail = this.head;
      }
    } else {
      let current = this.head;
      while (
        current.next !== null &&
        current.next.data[by] < newNode.data[by]
      ) {
        current = current.next;
      }

      newNode.next = current.next;
      if (this.tail === current) {
        this.tail = newNode;
      }
      current.next = newNode;
    }

    return newNode.data;
  }

  deleteAt(index: number): T | null {
    if (null === this.head) {
      throw new Error('Empty list');
    }
    if (index < 0) {
      throw new Error('Index not valid');
    }

    if (0 === index) {
      this.subtractSize(this.head.data);
      this.head = this.head.next;
      if (null === this.head) {
        this.tail = null;
      } else if (null === this.head.next) {
        this.tail = this.head;
      }

      return this.head ? this.head.data : null;
    }

    const previous = this.getAt(index - 1);
    if (null === previous || null === previous.next) {
      throw new Error('Node not found');
    }

    this.subtractSize(previous.next.data);
    previous.next = previous.next.next;
    if (null === previous.next) {
      this.tail = previous;

      return this.tail.data;
    }

    return this.head ? this.head.data : null;
  }

  deleteFirst(): T | null {
    if (null === this.head) {
      throw new Error('Empty list');
    }
    this.subtractSize(this.head.data);
    if (this.head === this.tail) {
      this.tail = this.head.next;
    }
    this.head = this.head.next;

    return this.head ? this.head.data : null;
  }

  deleteLast(): T | null {
    if (null === this.head) {
      throw new Error('Empty list');
    }

    this.subtractSize(this.tail.data);
    if (null === this.head.next) {
      this.head = this.tail = null;

      return null;
    }
    let previous = this.head;
    let tail = this.head.next;

    while (null !== tail.next) {
      previous = tail;
      tail = tail.next;
    }

    previous.next = null;
    this.tail = previous;

    return this.tail.data;
  }

  getAt(index: number): Node<T> | null {
    let counter = 0;
    let node = this.head;
    while (node) {
      if (counter === index) {
        return node;
      }
      counter++;
      node = node.next;
    }

    return null;
  }

  getFirst(): T | null {
    return this.head ? this.head.data : null;
  }

  getLast(): T | null {
    return this.tail ? this.tail.data : null;
  }

  deleteList() {
    this.size = 0;
    this.head = null;
    this.tail = null;
  }

  getSize(): number {
    return this.size;
  }

  private sumSize(data: T | (T & Sizeable)) {
    if (this.isSizeable(data)) {
      this.size += data.size;
    }
  }

  private subtractSize(data: T | (T & Sizeable)) {
    if (this.isSizeable(data)) {
      this.size -= data.size;
    }
  }

  isSizeable(x: T | Sizeable): x is T & Sizeable {
    return 'size' in x;
  }
}
