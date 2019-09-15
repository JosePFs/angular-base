import { LinkedList } from './linked-list.class';

describe('LinkedList', () => {
  it('should be able to retrieve and insert nodes', () => {
    let linkedList: LinkedList;

    linkedList = new LinkedList();
    let beginningNode = linkedList.insertAtBeginning({ id: 0 });
    expect(beginningNode.data).toEqual(linkedList.getFirst().data);
    expect(linkedList.getFirst().data).toEqual(linkedList.getLast().data);
    beginningNode = linkedList.insertAtBeginning({ id: 1 });
    expect(beginningNode.data).toEqual(linkedList.getFirst().data);
    expect(linkedList.getFirst().data).not.toEqual(linkedList.getLast().data);

    linkedList = new LinkedList();
    let endNode = linkedList.insertAtEnd({ id: 0 });
    expect(endNode.data).toEqual(linkedList.getFirst().data);
    expect(linkedList.getFirst().data).toEqual(linkedList.getLast().data);
    endNode = linkedList.insertAtEnd({ id: 1 });
    expect(endNode.data).toEqual(linkedList.getLast().data);

    linkedList = new LinkedList();
    expect(() => linkedList.insertAt(-1, {})).toThrow(Error);
    expect(() => linkedList.insertAt(2, {})).toThrow(Error);
    const firstNode = linkedList.insertAt(0, { id: 0 });
    expect(firstNode.data).toEqual(linkedList.getFirst().data);
    expect(linkedList.getFirst().data).toEqual(linkedList.getLast().data);
    const secondNode = linkedList.insertAt(1, { id: 1 });
    const thirdNode = linkedList.insertAt(2, { id: 2 });
    expect(thirdNode.data).toEqual(linkedList.getLast().data);
    const middleNode = linkedList.getAt(1);
    expect(middleNode.data).toEqual(secondNode.data);
  });

  it('should be able to delete nodes', () => {
    let linkedList: LinkedList;

    linkedList = new LinkedList();
    expect(() => linkedList.deleteFirst()).toThrow(Error);
    linkedList.insertAt(0, { id: 0 });
    linkedList.deleteFirst();
    expect(linkedList.getFirst()).toBeNull();
    expect(linkedList.getLast()).toBeNull();
    linkedList.insertAt(0, { id: 0 });
    const lastnode = linkedList.insertAt(1, { id: 1 });
    linkedList.deleteFirst();
    expect(lastnode.data).toEqual(linkedList.getFirst().data);

    linkedList = new LinkedList();
    expect(() => linkedList.deleteLast()).toThrow(Error);
    linkedList.insertAt(0, { id: 0 });
    const middleNode = linkedList.insertAt(1, { id: 1 });
    linkedList.insertAt(2, { id: 2 });
    linkedList.deleteLast();
    expect(middleNode.data).toEqual(linkedList.getLast().data);

    linkedList = new LinkedList();
    expect(() => linkedList.deleteAt(0)).toThrow(Error);
    linkedList.insertAt(0, { id: 0 });
    expect(() => linkedList.deleteAt(-1)).toThrow(Error);
    expect(() => linkedList.deleteAt(1)).toThrow(Error);
    expect(() => linkedList.deleteAt(2)).toThrow(Error);
    linkedList.deleteAt(0);
    expect(linkedList.getFirst()).toBeNull();
    expect(linkedList.getLast()).toBeNull();
    linkedList.insertAt(0, { id: 0 });
    const nextFirstNode = linkedList.insertAt(1, { id: 1 });
    const nextLastNode = linkedList.insertAt(2, { id: 2 });
    linkedList.insertAt(3, { id: 3 });
    linkedList.deleteAt(0);
    expect(nextFirstNode.data).toEqual(linkedList.getFirst().data);
    linkedList.deleteAt(2);
    expect(nextLastNode.data).toEqual(linkedList.getLast().data);
  });
});
