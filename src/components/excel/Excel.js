import { $ } from "../../core/dom"

export class Excel {

	constructor(selector, options) {
		this.$el = $(selector)
		this.components = options.components || []
	}

	getRoot() {
		const $root = $.create('div', 'excel')

		this.components = this.components.map(Component => {
			const $el = $.create('div', Component.className)
			const component = new Component($el)

			$el.html(component.toHTML())
			$root.append($el)

			return component
		});

		return $root
	}

	rendor() {
		// * this.$el.insertAdjacentHTML('afterbegin', `<h1>Test</h1>`)
		// ! Render DOM elements
		this.$el.append(this.getRoot())

		// ! Add event listeners
		this.components.forEach(component => component.init());
	}
}