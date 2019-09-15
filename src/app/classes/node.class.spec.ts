import { Node } from './node.class';

describe('Node', () => {
  it('should create an instance', () => {
    const node = new Node({});
    expect(node).toBeTruthy();
    node.data = { id: 1 };
    expect(node.data).toEqual({ id: 1 });
    const next = new Node({});
    node.next = next;
    expect(node.next).toEqual(next);
  });
});
