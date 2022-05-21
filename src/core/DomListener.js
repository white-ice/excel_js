import { capitalize } from "./utils"

export class DomListener {
	constructor($root, listeners = []) {
		if (!$root) {
			throw new Error(`No $root provided for DomListener!`)
		}
		this.$root = $root
		this.listeners = listeners
	}

	initDOMListener() {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener)

			if (!this[method]) {
				throw Error(`Method ${method} is not implemented in ${this.name} Component`)
			}
			// ! Тоже самое что и addEventListener
			// ! this[method] - прокидываем метод класса для слушателя
			this[method] = this[method].bind(this)
			this.$root.on(listener, this[method])
		})
	}

	removeDOMListener() {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener)
			this.$root.off(listener, this[method])
		})
	}
}

// ! input => onInput
function getMethodName(eventName) {
	return 'on' + capitalize(eventName)
}