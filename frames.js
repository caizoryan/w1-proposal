import { process_property } from "./processor.js"
import { s } from "./scale.js"
import { apply } from "./script.js"

export class TextFrame {
	constructor({ top = s.em(5), left = s.em(1), width = s.px(100), height = s.px(100), font_size = s.em(1), text, side, css }) {
		this.top = top
		this.left = left
		this.width = width
		this.height = height
		this.font_size = font_size
		this.text = text
		this.root = null
		this.side = side
		this.css = css
	}

	/**@param {Structure} structure*/
	init(structure, verso, recto) {
		if (this.root) {
			this.root.remove()
		}

		this.root = document.createElement("div")

		let root = this.root
		root.innerText = this.text

		let left = this.left
		let width = this.width
		let height = this.height
		let top = this.top

		if (typeof this.top == "function") top = this.top(structure)
		if (typeof this.width == "function") width = this.width(structure)
		if (typeof this.height == "function")height = this.height(structure)
		if (typeof this.left == "function") left = this.left(structure)

		if (this.side){
			this.side == "recto" ? recto.appendChild(root) : null
			this.side == "verso" ? verso.appendChild(root) : null
		} else if (this.left.px > structure.spine().x.px) {
			this.left  = s.sub(this.left, structure.spine().x)
			recto.appendChild(root)
		}


		else {
			verso.appendChild(root)
		}


		/**@type {CSSStyleDeclaration}*/
		let css = {
			position: "absolute",
			top: top.px + "px",
			width: width.px + "px",
			height: height.px + "px",
			// border: "1px solid black",
			left: left.px+"px",
			fontFamily: "Arial Narrow",
			fontSize: this.font_size.px + "px"
		}

		apply(root, css)
		if (this.css) apply(root, this.css)
	}

	update(structure){
		let root = this.root
		root.innerText = this.text

		let left = this.left
		let width = this.width
		let height = this.height
		let top = this.top

		if (typeof this.top == "function") top = this.top(structure)
		if (typeof this.width == "function") width = this.width(structure)
		if (typeof this.height == "function")height = this.height(structure)
		if (typeof this.left == "function") left = this.left(structure)

		if (left.px > structure.spine().x.px) {
			left = s.sub(left, structure.spine().x)
		}

		/**@type {CSSStyleDeclaration}*/
		let css = {
			position: "absolute",
			top: top.px + "px",
			width: width.px + "px",
			height: height.px + "px",
			left: left.px+"px",
			fontSize: this.font_size.px + "px"
		}

		apply(root, css)
		if (this.css) apply(root, this.css)
	}
}
export class ImageFrame {
	constructor({ top = s.em(5), left = s.em(1), width = s.px(100), height = s.px(100), url }) {
		this.top = Array.isArray(top) ? process_property(top) : top
		this.left = Array.isArray(left) ? process_property(left) : left
		this.width = Array.isArray(width) ? process_property(width) : width
		this.height = Array.isArray(height) ? process_property(height) : width
		this.url = url
		this.root = null
	}

	/**@param {Structure} structure*/
	init(structure, verso, recto) {
		if (this.root) {
			this.root.remove()
		}

		this.root = document.createElement("div")

		let root = this.root

		let left = this.left
		let width = this.width
		let height = this.height
		let top = this.top

		if (typeof this.top == "function") top = this.top(structure)
		if (typeof this.width == "function") width = this.width(structure)
		if (typeof this.height == "function")height = this.height(structure)
		if (typeof this.left == "function") left = this.left(structure)

		if (this.left.px > structure.spine().x.px) {
			this.left  = s.sub(this.left, structure.spine().x)
			recto.appendChild(root)
		}

		else {
			verso.appendChild(root)
		}

		/**@type {CSSStyleDeclaration}*/
		let css = {
			position: "absolute",
			top: top.px + "px",
			width: width.px + "px",
			height: height.px + "px",
			// border: "1px solid black",
			left: left.px+"px",
			fontFamily: "Arial Narrow",
			fontSize: s.point(11).px + "px",
			backgroundImage: "url(" + this.url + ")",
			backgroundSize: "cover",
		}

		apply(root, css)
	}

	update(structure){
		let root = this.root

		let left = this.left
		let width = this.width
		let height = this.height
		let top = this.top

		if (typeof this.top == "function") top = this.top(structure)
		if (typeof this.width == "function") width = this.width(structure)
		if (typeof this.height == "function")height = this.height(structure)
		if (typeof this.left == "function") left = this.left(structure)

		if (left.px > structure.spine().x.px) {
			left = s.sub(left, structure.spine().x)
		}

		/**@type {CSSStyleDeclaration}*/
		let css = {
			position: "absolute",
			top: top.px + "px",
			width: width.px + "px",
			height: height.px + "px",
			// border: "1px solid black",
			left: left.px+"px",
			fontFamily: "Arial Narrow",
			fontSize: this.font_size.px + "px"
		}

		apply(root, css)
	}
}
export class Frame {
	constructor({ top = s.em(5), left = s.em(1), width = s.px(100), height = s.px(100), html, side }) {
		this.top = Array.isArray(top) ? process_property(top) : top
		this.left = Array.isArray(left) ? process_property(left) : left
		this.width = Array.isArray(width) ? process_property(width) : width
		this.height = Array.isArray(height) ? process_property(height) : height
		this.html = html
		this.root = null
		this.side = side
	}

	/**@param {Structure} structure*/
	init(structure, verso, recto) {
		if (this.root) {
			this.root.remove()
		}

		this.root = document.createElement("div")

		let root = this.root
		root.innerHTML = typeof this.html == "function" ? this.html(root) : this.html

		let left = this.left
		let width = this.width
		let height = this.height
		let top = this.top

		if (typeof this.top == "function") top = this.top(structure)
		if (typeof this.width == "function") width = this.width(structure)
		if (typeof this.height == "function") height = this.height(structure)
		if (typeof this.left == "function") left = this.left(structure)

		if (this.side){
			this.side == "recto" ? recto.appendChild(root) : null
			this.side == "verso" ? verso.appendChild(root) : null
		}

		else if (left.px > structure.spine().x.px) {
			left  = s.sub(left, structure.spine().x)
			recto.appendChild(root)
		}

		else {
			verso.appendChild(root)
		}

		/**@type {CSSStyleDeclaration}*/
		let css = {
			position: "absolute",
			top: top.px + "px",
			width: width.px + "px",
			height: height.px + "px",
			// border: "1px solid black",
			left: left.px+"px",
			fontFamily: "Arial Narrow",
			fontSize: s.point(11).px + "px",
		}

		apply(root, css)
	}

	update(structure){
		let root = this.root

		let left = this.left
		let width = this.width
		let height = this.height
		let top = this.top

		if (typeof this.top == "function") top = this.top(structure)
		if (typeof this.width == "function") width = this.width(structure)
		if (typeof this.height == "function")height = this.height(structure)
		if (typeof this.left == "function") left = this.left(structure)

		if (left.px > structure.spine().x.px) {
			left = s.sub(left, structure.spine().x)
		}

		/**@type {CSSStyleDeclaration}*/
		let css = {
			position: "absolute",
			top: top.px + "px",
			width: width.px + "px",
			height: height.px + "px",
			// border: "1px solid black",
			left: left.px+"px",
			fontFamily: "Arial Narrow",
			fontSize: s.point(11).px + "px"
		}

		apply(root, css)
	}
}
