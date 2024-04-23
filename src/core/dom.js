class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector;
  }

  html(html) {
    if (typeof html === "string") {
      // додавання елемента в дом
      this.$el.innerHTML = html;

      return this;
    }
    // повертає улемент та видаляє пробіли
    return this.$el.outerHTML.trim();
  }

  text(text) {
    if (typeof text !== "undefined") {
      this.$el.textContent = text;
      return this;
    }
    if (this.$el.tagName.toLowerCase() === "input") {
      return this.$el.value.trim();
    }
    return this.$el.textContent.trim();
  }

  clear() {
    this.html("");

    return this;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);

    return this;
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);

    return this;
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }

    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }

    return this;
  }

  get data() {
    return this.$el.dataset;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  css(style = {}) {
    // for (const key in style) {
    // 	if (Object.hasOwnProperty.call(style, key)) {
    // 		this.$el.style[key] = style[key]
    // 	}
    // }

    Object.keys(style).forEach((key) => {
      return (this.$el.style[key] = style[key]);
    });
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(":");
      return {
        row: +parsed[0],
        col: +parsed[1],
      };
    }
    return this.data.id;
  }

  focus() {
    this.$el.focus();
    return this;
  }

  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = "") => {
  const el = document.createElement(tagName);

  if (classes) {
    el.classList.add(classes);
  }

  return $(el);
};
