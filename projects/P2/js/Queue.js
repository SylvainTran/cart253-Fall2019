/**
  Queue data structure for managing screen transitions.
  ...And other things.

*/
class Queue {
  constructor(maxItems) {
    this.items = [];
    this.maxItems = maxItems;
  }

  /**
      Helper functions to check if the queue is empty or full.

  */
  isEmpty() {
    return this.items.length === 0;
  }

  isFull() {
    return this.items.length == this.maxItems;
  }

  enqueue(element) {
    if (this.isFull()) {
      alert("Full");
      return;
    } else {
      this.items.push(element);
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      return "Queue is empty: underflow.";
    } else {
      return this.items.shift();
    }
  }

  front() {
    if (this.isEmpty()) {
      return "Queue is empty of elements.";
    } else {
      return this.items[0];
    }
  }

  peek() {
    return this.items[this.items.length - 1];
  }
}
