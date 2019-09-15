import { Node } from './node.class';

export class LinkedList {
  private head: Node = null;
  private tail: Node = null;

  constructor() {}

  insertAtBeginning(data: any): Node {
    const newNode = new Node(data);
    if (null === this.head) {
      this.head = this.tail = newNode;

      return newNode;
    }

    newNode.next = this.head;
    this.head = newNode;

    return newNode;
  }

  insertAtEnd(data: any): Node {
    const newNode = new Node(data);
    if (null === this.head) {
      this.head = this.tail = newNode;

      return newNode;
    }

    this.tail.next = newNode;
    this.tail = newNode;

    return newNode;
  }

  insertAt(index: number, data: any): Node {
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
    const newNode = new Node(data);
    newNode.next = previous.next;
    previous.next = newNode;
    if (previous === this.tail) {
      this.tail = newNode;
    }

    return newNode;
  }

  deleteAt(index: number): Node | null {
    if (null === this.head) {
      throw new Error('Empty list');
    }
    if (index < 0) {
      throw new Error('Index not valid');
    }

    if (0 === index) {
      this.head = this.head.next;
      if (null === this.head) {
        this.tail = null;
      } else if (null === this.head.next) {
        this.tail = this.head;
      }

      return this.head;
    }

    const previous = this.getAt(index - 1);
    if (null === previous || null === previous.next) {
      throw new Error('Node not found');
    }

    previous.next = previous.next.next;
    if (null === previous.next) {
      this.tail = previous;
    }

    return this.head;
  }

  deleteFirst(): Node | null {
    if (null === this.head) {
      throw new Error('Empty list');
    }
    if (this.head === this.tail) {
      this.tail = this.head.next;
    }
    this.head = this.head.next;

    return this.head;
  }

  deleteLast(): Node | null {
    if (null === this.head) {
      throw new Error('Empty list');
    }

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

    return this.tail;
  }

  getAt(index: number): Node | null {
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

  getFirst(): Node {
    return this.head;
  }

  getLast(): Node {
    return this.tail;
  }

  deleteList() {}
}
