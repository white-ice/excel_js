import { DomListener } from "./DomListener";

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || "";
    this.emitter = options.emitter;
    this.unsubscribers = [];

    this.prepare();
  }

  // * Подготовка данных
  prepare() {}

  // * Возвращает шаблон
  toHTML() {
    return "";
  }

  // * Отправляет событие
  $emit(eventName, ...args) {
    this.emitter.emit(eventName, ...args);
  }

  // * Подписывает слушателя
  $on(eventName, callback) {
    const unsub = this.emitter.subscribe(eventName, callback);
    this.unsubscribers.push(unsub);
  }

  // * Инициализация DOM слушателя
  init() {
    this.initDOMListener();
  }

  // * Уничтожает DOM слушателя
  destroy() {
    this.removeDOMListener();

    this.unsubscribers.forEach((unsub) => unsub());
  }
}
