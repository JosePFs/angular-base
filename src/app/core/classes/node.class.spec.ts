import { Node } from './node.class';

describe('Node', () => {
  it('should create an instance', () => {
    const node = new Node({});
    expect(node).toBeTruthy();
    node.data = {};
    expect(node.data).toEqual({});
    const next = new Node({});
    node.next = next;
    expect(node.next).toEqual(next);
  });
});
