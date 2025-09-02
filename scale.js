export class Scale {
	constructor(scale = (window.devicePixelRatio * 96)
) {
		this.dpi = window.devicePixelRatio * 96
		this.scale = scale / this.dpi
		console.log("dpr", window.devicePixelRatio)
	}

	/**
	@param {Unit} unit1 
	@param {Unit} unit2 
	*/
	add(unit1, unit2) {
		if (unit1.unit == unit2.unit) {
			return {
				unit: unit1.unit,
				value: unit1.value+unit2.value,
				px: unit1.px+unit2.px,
			}
		}

		return this.px_raw(unit1.px + unit2.px)
	}

	/**
	@param {Unit} unit1 
	@param {Unit} unit2 
	*/
	sub(unit1, unit2) {
		return this.px_raw(unit1.px - unit2.px)
	}

	/**
	@param {Unit} unit1 
	@param {number} unit2 
	*/
	mul(unit1, unit2) {
		return this.px_raw(unit1.px * unit2)
	}

	/**
	@param {Unit} unit1 
	@param {Unit} unit2 
	*/
	div(unit1, unit2) {
		return this.px_raw(unit1.px / unit2.px)
	}

	/**
	@param {number} value 
	@returns {Unit} 
	*/
	em(value) {
		return {
			unit: "em",
			value,
			px: this.inch(value / 6).px
		}
	}

	/**
	@param {number} value 
	@returns {Unit} 
	*/
	px(value) {
		return {
			unit: "pixel",
			value,
			px: value * this.scale
		}
	}

	/**
	@param {number} value 
	@returns {Unit} 
	*/
	px_raw(value) {
		return {
			unit: "pixel",
			value,
			px: value
		}
	}

	pixel(value) { return this.px(value) }

	/**
	@param {number} value 
	@returns {Unit} 
	*/
	inch(value) {
		return {
			unit: "inch",
			value,
			px: value * this.dpi * this.scale
		}
	}

	/**
	@param {number} value 
	@returns {Unit} 
	*/
	pica(value) { return this.em(value) }


	/**
	@param {number} value 
	@returns {Unit} 
	*/
	point(value) {
		return {
			unit: "point",
			value,
			px: this.pica(value).px / 12
		}
	}
}
export let s = new Scale()
