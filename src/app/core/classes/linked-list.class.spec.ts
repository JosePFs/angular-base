import { Node } from 'src/app/classes/node.class';
import { LinkedList } from './linked-list.class';

describe('LinkedList', () => {
  it('should create an instance', () => {
    const linkedList = new LinkedList();
    expect(linkedList).toBeTruthy();
    const node = new Node({});
    linkedList.insertAtBeginning(node);
    expect(node.data).toEqual({});
  });
});
