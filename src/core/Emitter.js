export class Emmiter {
  constructor() {
    this.listeners = {};
  }

  emit(eventName, ...args) {
    if (!this.listeners[eventName]) {
      return;
    }
    this.listeners[eventName].forEach((listener) => {
      listener(...args);
    });
  }

  subscribe(eventType, callback) {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    this.listeners[eventType].push(callback);
    return () => {
      this.listeners[eventType] = this.listeners[eventType].filter(
        (listener) => listener !== callback,
      );
    };
  }
}
