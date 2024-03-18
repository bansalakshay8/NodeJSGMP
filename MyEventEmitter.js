export default class MyEventEmitter {
  listeners = {}; // key-value pair

  addListener(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);
    return this;
  }

  on(eventName, fn) {
    return this.addListener(eventName, fn);
  }

  removeListener(eventName, fn) {
    let attachedListeners = this.listeners[eventName];
    if (!attachedListeners) return this;
    for (let i = attachedListeners.length; i > 0; i--) {
      if (attachedListeners[i] === fn) {
        attachedListeners.splice(i, 1);
        break;
      }
    }
    return this;
  }

  off(eventName, fn) {
    return this.removeListener(eventName, fn);
  }

  once(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    const onceInner = () => {
      fn();
      this.off(eventName, onceInner);
    };
    this.listeners[eventName].push(onceInner);
    return this;
  }

  emit(eventName, ...args) {
    let attachedFns = this.listeners[eventName];
    if (!attachedFns) return false;
    attachedFns.forEach((attachedFn) => {
      attachedFn(...args);
    });
    return true;
  }

  listenerCount(eventName) {
    const listernersArr = this.listeners[eventName] || [];
    return listernersArr.length;
  }

  rawListeners(eventName) {
    return this.listeners[eventName];
  }
}
