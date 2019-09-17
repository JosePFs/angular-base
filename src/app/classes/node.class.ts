export class Node<T> {
  constructor(private _data: T = null, private _next: Node<T> = null) {}

  get data(): T {
    return this._data;
  }

  set data(data: T) {
    this._data = data;
  }

  get next(): Node<T> {
    return this._next;
  }

  set next(next: Node<T>) {
    this._next = next;
  }
}
