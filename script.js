export const DPI = 100
let mouse_x = 0
import { data } from "./data.js"
import { Frame, ImageFrame, TextFrame } from "./frames.js"
import { process, process_property } from "./processor.js"
import { s } from "./scale.js"

// let colors = ["#eee", "#ddd", "#ccc"]
let colors = ["#85A0B8", "#EDBB45", "#BDBBA8", "#A64C27"]
let increment = .5

// ------------------------
// UTILITIES
// ------------------------
let randomItem = arr => arr[Math.floor(Math.random() * arr.length)]
export let apply = (el, css) => {
	Object.entries(css).forEach(([key, value]) => el.style[key] = value)
}

// ------------------------
// GLOBALS
// ------------------------
let z = 0

let page_width = s.px(window.innerWidth * .7 * .5)
let page_height = s.px(window.innerHeight * .85)
let book_top = s.px(window.innerHeight * .05)
let book_left = s.px(window.innerWidth * .15)

/** 
@typedef {{
	margin: {
		top: Unit,
		bottom: Unit,
		inside: Unit,
		outside: Unit,
	}

	columns: number,
	columnSize?: number,
	gutter: Unit,
	hanglines: Unit[]

	width: Unit,
	height: Unit,
	top: Unit,
	left: Unit

}} GridProps
*/
class Structure {
	/**
	@param {[GridProps, GridProps]} props
	@param {Scale} s
	*/
	constructor(props) {
		this.verso = Object.assign({
			width: page_width,
			height: page_height,
			top: s.em(0),
			left: s.em(0),
			background: "#eee",

			hanglines: [
				s.em(1),
				s.em(2),
				s.em(3),
			],

			margin: {
				top: s.em(.5),
				bottom: s.em(.5),
				inside: s.em(1),
				outside: s.em(2),
			},

			columns: 5,
			gutter: s.em(.25),

		}, props[0])

		this.recto = Object.assign({
			width: page_width,
			height: page_height,
			top: this.verso.top,
			left: s.add(this.verso.width, this.verso.left),
			background: "#eee",

			hanglines: [
				s.em(1),
				s.em(2),
				s.em(3),
			],

			margin: {
				top: s.em(.5),
				bottom: s.em(.5),
				inside: s.em(1),
				outside: s.em(2),
			},

			columns: 5,
			gutter: s.em(.25),
		}, props[1])
	}

	verso_hanglines() { return this.verso.hanglines }
	recto_hanglines() { return this.recto.hanglines }

	/**@returns {{x:Unit, y:Unit, w:Unit, h: Unit}[]}*/
	recto_columns() {
		/**@type {{x:Unit, y:Unit, w:Unit, h: Unit}[]}*/
		const cols = []

		for (let i = 0; i < this.recto.columns; i++) {
			const y = this.recto.margin.top
			const w = this.column_width_recto()

			// outside + gutters + size
			const x = s.px_raw(this.recto.margin.inside.px + i * this.recto.gutter.px + i * this.column_width_recto().px);
			const h = s.px_raw(this.recto.height.px - (this.recto.margin.top.px + this.recto.margin.bottom.px))

			cols.push({ x, y, w, h })
		}

		return cols
	}
	recto_columns_global_pos() {
		/**@type {{x:Unit, y:Unit, w:Unit, h: Unit}[]}*/
		const cols = []

		for (let i = 0; i < this.recto.columns; i++) {
			const y = this.recto.margin.top
			const w = this.column_width_recto()

			// outside + gutters + size
			const x = s.px_raw(this.spine().x.px + this.recto.margin.inside.px + (i * this.recto.gutter.px) + (i * this.column_width_recto().px));
			const h = s.px_raw(this.recto.height.px - (this.recto.margin.top.px + this.recto.margin.bottom.px))

			cols.push({ x, y, w, h })
		}

		return cols
	}

	/**@returns {{x:Unit, y:Unit, w:Unit, h: Unit}[]}*/
	verso_columns() {
		/**@type {{x:Unit, y:Unit, w:Unit, h: Unit}[]}*/
		const cols = []

		for (let i = 0; i < this.verso.columns; i++) {
			const y = this.verso.margin.top
			const w = this.column_width_verso()

			// outside + gutters + size
			const x = s.px_raw(this.verso.margin.outside.px + i * this.verso.gutter.px + i * this.column_width_verso().px);
			const h = s.px_raw(this.verso.height.px - (this.verso.margin.top.px + this.verso.margin.bottom.px))

			cols.push({ x, y, w, h })
		}

		return cols
	}

	columns() { return [this.verso_columns(), this.recto_columns()] }

	updateVersoColumnCount() {
		let w = this.verso.width.px - (this.verso.margin.inside.px + this.verso.margin.outside.px);
		let x = this.verso.margin.outside.px
		let c = 0
		while (x < w) {
			c++
			x += this.verso.columnSize.px
			if (x > w) c--
		}
		this.verso.columns = c
	}
	updateRectoColumnCount() {
		let w = this.recto.width.px - (this.recto.margin.inside.px + this.recto.margin.outside.px);
		let x = this.recto.margin.outside.px
		let c = 0
		while (x < w) {
			c++
			x += this.recto.columnSize.px
			if (x > w) c--
		}
		this.recto.columns = c
	}

	/**@returns {Unit}*/
	column_width_verso(n = 1) {
		if (this.verso.columnSize != undefined) {
			this.updateVersoColumnCount()
			return s.add(
				s.mul(this.verso.columnSize, n),
				s.mul(this.verso.gutter, n - 1))
		}

		let w = this.verso.width.px - (this.verso.margin.inside.px + this.verso.margin.outside.px);
		let g = (n - 1) * this.verso.gutter.px
		let ret = s.px_raw(((w - (this.verso.gutter.px * (this.verso.columns - 1))) / this.verso.columns) * n + g);
		return ret
	}

	column_width_recto(n = 1) {
		if (this.recto.columnSize != undefined) {
			this.updateRectoColumnCount()

			return s.add(
				s.mul(this.recto.columnSize, n),
				s.mul(this.recto.gutter, n - 1))
		}

		// TODO: make for recto/verso
		let w = this.recto.width.px - (this.recto.margin.inside.px + this.recto.margin.outside.px);
		let g = (n - 1) * this.recto.gutter.px
		// console.log("w", w)
		let ret = s.px_raw(((w - (this.recto.gutter.px * (this.recto.columns - 1))) / this.recto.columns) * n + g);
		// console.log("ret", ret)
		return ret
	}

	/**@returns {{x: Unit, y: Unit}}*/
	spine() {
		// TODO: make use of where spine is...
		return {
			x: s.px_raw(this.verso.width.px),
			y: s.px_raw(this.verso.height.px / 2)
		}
	}

}

class Book {
	/**@param {Structure} structure */
	constructor(el, spreads, offsets) {
		/**@type {HTMLElement}*/
		this.el = el
		el.style.position = "fixed"
		el.style.top = book_top.px + "px"
		el.style.left = book_left.px + "px"

		this.current_spread = 0
		/**@type {Spread[]}*/
		this.spreads = spreads

		this.initPages()
		// console.log(this.pages())
		if (offsets) offsets.forEach(e => this.markPageOffset(...e))
	}

	initPages() {
		let _ = this
		_.el_recto = document.createElement("div")
		_.el_verso = document.createElement("div")

		for (let i = this.spreads.length - 1; i >= 0; i--) {
			let e = this.spreads[i]
			e.init(i)
			_.el.appendChild(e.el_recto)
			_.el.appendChild(e.el_verso)
		}
	}

	drawBook() {
		let c = 0

		for (let i = 0; i <= this.spreads.length - 1; i++) {
			let e = this.spreads[i]
			if (i > this.current_spread) {
				e.drawRecto();
			}

			if (i < this.current_spread) {
				e.drawVerso(i - this.current_spread);
			}

			if (i == this.current_spread) {
				e.drawVerso();
				e.drawRecto();
			}

			else {
				if (i > this.current_spread) e.hideVerso();
				if (i < this.current_spread) e.hideRecto()

			}
			if (i == 0) e.hideVerso()
			if (i == this.spreads.length - 1) e.hideRecto()

		}

	}

	pages() {
		/**@type {[number, number][]}*/
		let arr = []
		let is_odd = (num) => (num % 2) == 1

		// also make sure number of spreads is odd
		// TOD0: if it isn't, add a spread before last page in booklet binding... 
		if (is_odd(this.spreads.length)) {
			this.spreads.forEach((_, i) => {
				let last = i == this.spreads.length - 1
				let first = i == 0
				let num = i * 2
				let recto = last ? 0 : num + 1
				let verso = num
				arr.push([verso, recto])
			})

			return arr
		}
		else {
			console.log("FUCK NOT MULTIPLE OF 4", (this.spreads.length * 2) - 2)
		}
	}

	beforeSpine(page_num) {
		let spread = this.pages()
		let is = undefined
		let middle = Math.floor(spread.length / 2)

		spread.forEach((e, i) => {
			e.forEach((pg, side) => {
				if (pg == page_num) {
					if (i == middle) {
						if (side == 0) is = true
						else is = false
					}
					else {
						if (i < middle) is = true
						else is = false
					}
				}
			})
		})

		return is
	}

	pageToSheets(page) {
		let spreads = this.saddlePages()
		let index = -1

		spreads.forEach((e, i) => {
			e.forEach(pg => pg == page ? index = i : null)
		})

		let isOdd = e => e % 2 == 1
		let pair_index = isOdd(index) ? index - 1 : index + 1

		return [index, pair_index]
	}

	markOffset(index, offset, axis = "vertical", c = colors[0]) {
		//if (!this.validate_spread(index)) return

		let spreads = this.saddlePages()

		let sheet = spreads[index]
		let isOdd = e => e % 2 == 1
		let pair_index = isOdd(index) ? index - 1 : index + 1
		let pair = spreads[pair_index]

		let mark_with_num = (e) => {
			// if odd, mark recto
			let index = this.page_to_spread(e)
			let spread = this.spreads[index]
			let struct = spread.structure
			if (e % 2 == 1) {
				struct.recto.background = c
				if (axis == "vertical") struct.recto.top = s.add(struct.recto.top, offset)
				else {
					if (this.beforeSpine(e)) {
						struct.recto.width = s.sub(struct.recto.width, offset)
					}

					else {
						struct.recto.width = s.add(struct.recto.width, offset)
					}
				}

			}
			else {
				struct.verso.background = c
				if (axis == "vertical") struct.verso.top = s.add(struct.verso.top, offset)

				else {
					if (this.beforeSpine(e)) {
						struct.verso.width = s.sub(struct.verso.width, offset)
						struct.verso.left = s.add(struct.verso.left, offset)
					}
					else {
						struct.verso.width = s.add(struct.verso.width, offset)
						struct.verso.left = s.sub(struct.verso.left, offset)
					}
				}
			}

			spread.drawGrid()
			spread.update()
		}

		sheet.forEach((e) => mark_with_num(e))
		pair.forEach((e) => mark_with_num(e))
	}

	markPageOffset(page, offset, axis, c) {
		let spread = this.saddlePages()
		let index = -1

		spread.forEach((e, i) => {
			e.forEach(pg => pg == page ? index = i : null)
		})

		this.markOffset(index, offset, axis, c)
	}

	page_to_spread(num) {
		return Math.floor(num / 2)
	}

	saddlePages() {
		// get pages
		let pages = this.pages()

		//let pages = [[0, 1], [2, 3], [4, 5], [6, 7], [8, 9], [10, 11], [12, 13], [14, 15], [16, 17]]
		if (!Array.isArray(pages)) return

		let last = pages.length - 1
		let pair = (i) => pages[last - i]
		let pairskiplast = (i) => pages[last - i - 1]

		let middle = Math.ceil(last / 2)

		// switch each recto with pair spread recto till middle
		for (let i = 0; i < middle; i++) {
			let f_verso = pages[i][0]
			let p_verso = pair(i)[0]

			pages[i][0] = p_verso
			pair(i)[0] = f_verso
		}

		let pairedup = []

		// pair spreads up with each other
		for (let i = 0; i < middle; i++) {
			pairedup.push(pages[i])
			pairedup.push(pairskiplast(i))
		}

		return pairedup

	}

	destroy() {
		this.el.remove()
	}
}

class Spread {
	constructor(structure, elements) {
		/**@type {Structure}*/
		this.structure = structure
		this.elements = elements
		this.renderGrid = true

		// console.log(this.structure.columns())
	}

	init(index) {
		this.el_recto = document.createElement("div")
		this.el_recto.classList.add("hov")
		this.el_recto.classList.add("page")
		this.el_recto.classList.add("recto")
		this.el_recto.id = "r-" + Math.floor(Math.random() * 5000000)
		this.el_verso = document.createElement("div")
		this.el_verso.classList.add("hov")
		this.el_verso.classList.add("page")
		this.el_verso.classList.add("verso")
		this.el_verso.id = "v-" + Math.floor(Math.random() * 5000000)

		this.el_recto.onclick = () => {
			book.current_spread = index
			book.drawBook()
		}

		this.el_verso.onclick = () => {
			book.current_spread = index
			book.drawBook()
		}

		this.drawGrid()

		this.elements.forEach((element) => typeof element == "function"
			? element(this.structure, this.el_verso, this.el_recto)
			: element.init(this.structure, this.el_verso, this.el_recto))
	}

	update(structure) {
		this.elements.forEach((element) => typeof element == "function"
			? null
			: element.update(this.structure))
	}

	drawGrid() {
		if (!this.renderGrid) return
		Object.values(this.el_recto.children).forEach((el) => {
			if (el.classList.contains("grid")) {
				el.remove()
			}
		})

		Object.values(this.el_verso.children).forEach((el) => {
			if (el.classList.contains("grid")) el.remove()
		})


		this.structure.verso_columns().forEach((col) => {
			let child = document.createElement("div")
			child.classList.add("grid")
			let css = {
				top: col.y.px + "px",
				left: col.x.px + "px",
				width: col.w.px + "px",
				height: col.h.px + "px",
				position: "absolute",
				border: ".1px solid #111a"
			}

			apply(child, css)
			this.el_verso.appendChild(child)
		})
		this.structure.recto_columns().forEach((col) => {
			let child = document.createElement("div")
			child.classList.add("grid")
			let css = {
				top: col.y.px + "px",
				left: col.x.px + "px",
				width: col.w.px + "px",
				height: col.h.px + "px",
				position: "absolute",
				border: ".1px solid #111a"
			}

			apply(child, css)
			this.el_recto.appendChild(child)
		})
	}

	draw(el) {
		this.drawRecto(this.el_recto)
		this.drawVerso(this.el_verso)
	}

	drawRecto(layer = 0) {
		let el_recto = this.el_recto
		el_recto.style.transition = `all ${Math.random() * 150 + 150}ms`
		this.unhide()
		let w = this.structure.recto.width
		let h = this.structure.recto.height

		/**@type {CSSStyleDeclaration}*/
		let css = {
			position: "absolute",
			overflow: "hidden",
			zIndex: layer,
			top: this.structure.recto.top.px + "px",
			left: this.structure.recto.left.px + "px",
			width: w.px + "px",
			height: h.px + "px",
			// border: "2px solid black",
			background: this.structure.recto.background
		}


		apply(el_recto, css)
	}

	drawVerso(layer = 0) {
		let el_verso = this.el_verso
		el_verso.style.transition = 'none'
		this.unhide()
		let w = this.structure.verso.width
		let h = this.structure.verso.height
		let c = this.structure.verso.background

		/**@type {CSSStyleDeclaration}*/
		let css = {
			position: "absolute",
			overflow: "hidden",
			// border: "2px solid black",
			zIndex: layer,
			top: this.structure.verso.top.px + "px",
			left: this.structure.verso.left.px + "px",
			width: w.px + "px",
			height: h.px + "px",
			background: c,
		}


		apply(el_verso, css)
	}

	unhide() {
		this.el_recto.style.opacity = .95
		this.el_verso.style.opacity = .95
	}

	hideRecto() {
		this.el_recto.style.transition = `all ${Math.random() * 150 + 150}ms`
		this.el_recto.style.width = '0'
		this.el_recto.style.opacity = 0
	}

	hideVerso() {
		this.el_verso.style.transition = `all ${Math.random() * 150 + 150}ms`
		this.el_verso.style.width = '0'
		this.el_verso.style.opacity = 0
	}
}


// -------------------------
// CONSTRUCTION
// -------------------------

let meh = {
	columns: 8,
	gutter: s.em(.5),
	hanglines: [
		s.em(1),
		s.em(4),
		s.em(8)
	]
}

let boomm = [meh, meh]
let basic_spread = (pg, els = []) => {
	return new Spread(
		new Structure(boomm), [
		new TextFrame({
			text: pg,
			top: s.em(1),
			left: process_property(["verso", 0, "x"])
		}),
		...els
	])
}

let offsets = [
	[2, s.em(.1), "horizontal", colors[0]],
	[4, s.em(.5), "horizontal", colors[0]],
	[6, s.em(-.1), 'vertical', colors[0]],
	[3, s.em(.1), 'vertical', colors[2]],
	[8, s.em(.1), "horizontal", colors[2]]
]

let book_el = document.createElement("div")
let pages = [
	...data.map((e, i) => basic_spread(i * 2, e.content.map(process))),
	basic_spread(10),
	basic_spread(12),
	basic_spread(14),
	basic_spread(16),
]

let book = new Book(book_el, pages, offsets)
document.body.appendChild(book_el)
let ui = document.createElement('div')

ui.onmouseenter = () => {
	ui.style.left = '1vw'
}

ui.onmouseleave = () => {
	ui.style.left = '-20vw'
}

/**@type {CSSStyleDeclaration}*/
let css = {
	position: 'fixed',
	width: '30vw',
	height: '80vh',
	top: '2vh',
	left: '1vw',
	zIndex: 99,
	background: '#ddd',
	padding: '1em',
}


apply(ui, css)

let renderframeui = (items) => {
	let box = document.createElement('div')
	box.classList.add('box')
	ui.appendChild(box)

	items.forEach(
		(item, i) => {
			if (i == 0) return
			let property = document.createElement('div')
			property.classList.add('.property')

			let key = document.createElement('span')
			key.classList.add('key')
			key.innerText += item[0] + ' : '

			property.appendChild(key)

			if (Array.isArray(item[1])) {
				let key = item[1][0]
				if (key == 'em'
					|| key == 'hangline_verso'
					|| key == 'column_width_verso'
					|| key == 'hangline_recto'
					|| key == 'column_width_recto'
					|| key == 'recto'
					|| key == 'verso'
				) {
					let unit = document.createElement('span')
					unit.innerText = '(' + key.split('_')[0] + ')'
					unit.classList.add('unit')

					let input = document.createElement('input')
					input.value = item[1][1]
					input.oninput = (e) => {
						let lastvalue = item[1][1]
						let newvalue = parseFloat(e.target.value)
						if (newvalue == NaN) newvalue = lastvalue
						item[1][1] = newvalue
						input.value = item[1][1]
						refresh_redraw_pages()
					}

					input.onkeydown = (e) => {
						if (e.key == 'ArrowRight') {
							e.stopPropagation()
							item[1][1] += increment
							input.value = item[1][1]
							refresh_redraw_pages()
						}

						if (e.key == 'ArrowLeft') {
							e.stopPropagation()
							item[1][1] -= increment
							input.value = item[1][1]
							refresh_redraw_pages()
						}
					}

					property.appendChild(input)
					property.appendChild(unit)
				}

			}

			box.appendChild(property)
		})

}

let save = () => {
		fetch('/save', {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify(data)
		}).then((res) => res.json())
			.then((res) => console.log(res))
}

let updateui = () => {
	ui.innerHTML = ''
	if (Array.isArray(data[book.current_spread].content)) data[book.current_spread].content.forEach(renderframeui)
	let btn = document.createElement('button')
	btn.innerText = 'save'
	btn.onclick = () => save()

	ui.appendChild(btn)
}

let refresh_redraw_pages = () => {
	// save page and destroy
	let spread = book.current_spread
	book.destroy()

	// init and append
	let book_el = document.createElement("div")
	document.body.appendChild(book_el)
	let pages = [
		...data.map((e, i) => basic_spread(i * 2, e.content.map(process))),
		basic_spread(10),
		basic_spread(12),
		basic_spread(14),
		basic_spread(16),
	]
	book = new Book(book_el, pages, offsets)

	// reset saved page and draw
	book.current_spread = spread
	book.drawBook()
}

document.body.appendChild(ui)

let next = () => {
	if (book.current_spread == book.spreads.length - 1) book.current_spread = 0
	else book.current_spread++
	book.drawBook()

	updateui()
}
let prev = () => {
	if (book.current_spread == 0) book.current_spread = book.spreads.length - 1
	else book.current_spread--
	book.drawBook()

	updateui()
}
let moveAllBut = (pg, offset, axis = "vertical") => {
	let [ii, iii] = book.pageToSheets(pg)
	console.log(ii, iii)
	for (let i = 0; i < book.saddlePages().length - 1; i += 2) {
		if (i == ii || i == iii) {
			console.log("not moving")
		}

		else book.markOffset(i, offset, axis)
	}

	book.drawBook()
}

window.addEventListener("keydown", (e) => {
	console.log(e.key)

	let pgg = () => book.current_spread * 2 + (mouse_x > window.innerWidth / 2 ? 1 : 0)

	if (e.key == "s" && e.metaKey) { e.preventDefault(); save() }
	if (e.key == "ArrowLeft" && e.shiftKey && e.altKey) { moveAllBut(pgg(), s.em(.5), "horizontal") }
	else if (e.key == "ArrowRight" && e.shiftKey && e.altKey) { moveAllBut(pgg(), s.em(-.5), "horizontal") }
	else if (e.key == "ArrowUp" && e.shiftKey && e.altKey) { moveAllBut(pgg(), s.em(-.5)) }
	else if (e.key == "ArrowDown" && e.shiftKey && e.altKey) { moveAllBut(pgg(), s.em(.5)) }

	else if (e.key == "ArrowLeft" && e.shiftKey) {
		book.markPageOffset(pgg(), s.em(1), "horizontal")
		book.drawBook()
	}

	else if (e.key == "ArrowRight" && e.shiftKey) {
		book.markPageOffset(pgg(), s.em(-1), "horizontal")
		book.drawBook()
	}

	else if (e.key == "ArrowUp" && e.shiftKey) {
		book.markPageOffset(pgg(), s.em(-1), "vertical")
		book.drawBook()
	}

	else if (e.key == "ArrowDown" && e.shiftKey) {
		book.markPageOffset(pgg(), s.em(1), "vertical")
		book.drawBook()
	}
	else if (e.key == "ArrowRight") next()
	else if (e.key == "ArrowLeft") prev()
})
window.addEventListener("mousemove", (e) => {
	mouse_x = e.clientX
})
book.current_spread = 0
updateui()

book.drawBook()
