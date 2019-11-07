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

  /**
      Checks if the queue is full by comparing the item length with the max length.

  */
  isFull() {
    return this.items.length === this.maxItems;
  }

  /**
    Adds an element in the queue if it isn't full.

  */
  enqueue(element) {
    if (this.isFull()) {
      console.log("Full");
      return;
    } else {
      console.log("Pushing a: " + element);
      this.items.push(element);
    }
  }

  /**
    Removes an element from the queue if it isn't empty.

  */
  dequeue() {
    if (this.isEmpty()) {
      return "Queue is empty: underflow.";
    } else {
      return this.items.shift();
    }
  }

  /**
    Checks the first item in the queue if it isn't empty.

  */
  front() {
    if (this.isEmpty()) {
      return "Queue is empty of elements.";
    } else {
      return this.items[0];
    }
  }

  /**
    Checks the last item of the queue.

  */
  peek() {
    return this.items[this.items.length - 1];
  }
}
