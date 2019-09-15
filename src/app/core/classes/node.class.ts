export class Node {
  constructor(private _data: any, private _next: Node = null) {}

  get data(): any {
    return this._data;
  }

  set data(data: any) {
    this._data = data;
  }

  get next(): Node {
    return this._next;
  }

  set next(next: Node) {
    this._next = next;
  }
}
