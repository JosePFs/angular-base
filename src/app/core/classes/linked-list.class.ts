import { Node } from './node.class';

export class LinkedList {
  private head: Node = null;

  constructor() {}

  insertAtBeginning(data: any) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;

    return this.head;
  }
}
