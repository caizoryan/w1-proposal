import { process_property } from "./processor.js"
import { s } from "./scale.js"
import { apply } from "./script.js"

const snakeToCamel = str =>
  str.toLowerCase().replace(/([-_][a-z])/g, group =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', '')
  );
const css = (props) => {
	let c = {}

	Object.entries(props).forEach(([key, value]) => {
		let v
		if (typeof value == "string") v = value
		else if (typeof valuve == "number") v = value
		else if (value.px) v = value.px + 'px'

		if (key.includes('_')) {
			key = snakeToCamel(key)
		}
		c[key] = v
	})

	return c
}

export class TextFrame {
	constructor(props) {
		this.props = {
			top : s.em(5),
			left : s.em(1),
			width : s.px(100),
			height : s.px(100),
		}

		Object.assign(this.props, props)

		this.root = null
	}

	dimensions(structure) {
		let left = this.props.left
		let width = this.props.width
		let height = this.props.height
		let top = this.props.top

		if (typeof this.props.top == "function") top = this.props.top(structure)
		if (typeof this.props.width == "function") width = this.props.width(structure)
		if (typeof this.props.height == "function") height = this.props.height(structure)
		if (typeof this.props.left == "function") left = this.props.left(structure)

		return { left, width, height, top }
	}

	/**@param {Structure} structure*/
	init(structure, verso, recto) {
		if (this.root) {this.root.remove()}

		this.root = document.createElement("div")

		let root = this.root
		root.innerText = this.props.text

		let { left, width, height, top } = this.dimensions(structure)

		if (this.props.side) {
			this.props.side == "recto" ? recto.appendChild(root) : null
			this.props.side == "verso" ? verso.appendChild(root) : null
		} else if (this.props.left.px > structure.spine().x.px) {
			this.props.left = s.sub(this.props.left, structure.spine().x)
			recto.appendChild(root)
		}

		else {
			verso.appendChild(root)
		}

		/**@type {CSSStyleDeclaration}*/
		let c = css({ position: "absolute", ...this.props, top, width, height, left,  })
		apply(root, c)
		console.log(root.style.fontWeight)

		// if (this.props.css) apply(root, this.props.css)
	}

	update(structure) {
		let root = this.root
		root.innerText = this.props.text

		let { left, width, height, top } = this.dimensions(structure)
		if (left.px > structure.spine().x.px) {
			left = s.sub(left, structure.spine().x)
		}

		/**@type {CSSStyleDeclaration}*/
		let c = css({ position: "absolute", ...this.props, top, width, height, left})

		apply(root, c)
		// if (this.props.css) apply(root, this.props.css)
	}
}
export class ImageFrame {
	constructor(props) {
		this.props = {
			top : s.em(5),
			left : s.em(1),
			width : s.px(100),
			height : s.px(100),
		}

		Object.assign(this.props, props)

		this.root = null
	}

	dimensions(structure) {
		let left = this.props.left
		let width = this.props.width
		let height = this.props.height
		let top = this.props.top

		if (typeof this.props.top == "function") top = this.props.top(structure)
		if (typeof this.props.width == "function") width = this.props.width(structure)
		if (typeof this.props.height == "function") height = this.props.height(structure)
		if (typeof this.props.left == "function") left = this.props.left(structure)

		return { left, width, height, top }
	}

	/**@param {Structure} structure*/
	init(structure, verso, recto) {
		if (this.root) {this.root.remove()}

		this.root = document.createElement("img")

		let root = this.root
		root.src = this.props.src

		let { left, width, height, top } = this.dimensions(structure)

		if (this.props.side) {
			this.props.side == "recto" ? recto.appendChild(root) : null
			this.props.side == "verso" ? verso.appendChild(root) : null
		} else if (this.props.left.px > structure.spine().x.px) {
			this.props.left = s.sub(this.props.left, structure.spine().x)
			recto.appendChild(root)
		}

		else {
			verso.appendChild(root)
		}

		/**@type {CSSStyleDeclaration}*/
		let c = css({ position: "absolute", ...this.props, top, width, height, left,  })
		apply(root, c)
	}

	update(structure) {
		let root = this.root

		let { left, width, height, top } = this.dimensions(structure)
		if (left.px > structure.spine().x.px) {
			left = s.sub(left, structure.spine().x)
		}

		/**@type {CSSStyleDeclaration}*/
		let c = css({ position: "absolute", ...this.props, top, width, height, left})

		apply(root, c)
		// if (this.props.css) apply(root, this.props.css)
	}
}
// export class Frame {
// 	constructor({ top = s.em(5), left = s.em(1), width = s.px(100), height = s.px(100), html, side }) {
// 		this.top = Array.isArray(top) ? process_property(top) : top
// 		this.left = Array.isArray(left) ? process_property(left) : left
// 		this.width = Array.isArray(width) ? process_property(width) : width
// 		this.height = Array.isArray(height) ? process_property(height) : height
// 		this.html = html
// 		this.root = null
// 		this.side = side
// 	}

// 	/**@param {Structure} structure*/
// 	init(structure, verso, recto) {
// 		if (this.root) {
// 			this.root.remove()
// 		}

// 		this.root = document.createElement("div")

// 		let root = this.root
// 		root.innerHTML = typeof this.html == "function" ? this.html(root) : this.html

// 		let left = this.left
// 		let width = this.width
// 		let height = this.height
// 		let top = this.top

// 		if (typeof this.top == "function") top = this.top(structure)
// 		if (typeof this.width == "function") width = this.width(structure)
// 		if (typeof this.height == "function") height = this.height(structure)
// 		if (typeof this.left == "function") left = this.left(structure)

// 		if (this.side) {
// 			this.side == "recto" ? recto.appendChild(root) : null
// 			this.side == "verso" ? verso.appendChild(root) : null
// 		}

// 		else if (left.px > structure.spine().x.px) {
// 			left = s.sub(left, structure.spine().x)
// 			recto.appendChild(root)
// 		}

// 		else {
// 			verso.appendChild(root)
// 		}

// 		/**@type {CSSStyleDeclaration}*/
// 		let css = {
// 			position: "absolute",
// 			top: top.px + "px",
// 			width: width.px + "px",
// 			height: height.px + "px",
// 			// border: "1px solid black",
// 			left: left.px + "px",
// 			fontFamily: "Arial Narrow",
// 			fontSize: s.point(11).px + "px",
// 		}

// 		apply(root, css)
// 	}

// 	update(structure) {
// 		let root = this.root

// 		let left = this.left
// 		let width = this.width
// 		let height = this.height
// 		let top = this.top

// 		if (typeof this.top == "function") top = this.top(structure)
// 		if (typeof this.width == "function") width = this.width(structure)
// 		if (typeof this.height == "function") height = this.height(structure)
// 		if (typeof this.left == "function") left = this.left(structure)

// 		if (left.px > structure.spine().x.px) {
// 			left = s.sub(left, structure.spine().x)
// 		}

// 		/**@type {CSSStyleDeclaration}*/
// 		let css = {
// 			position: "absolute",
// 			top: top.px + "px",
// 			width: width.px + "px",
// 			height: height.px + "px",
// 			// border: "1px solid black",
// 			left: left.px + "px",
// 			fontFamily: "Arial Narrow",
// 			fontSize: s.point(11).px + "px"
// 		}

// 		apply(root, css)
// 	}
// }
