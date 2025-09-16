
export let append_prop = (prop, into) => {
	let i = into.findIndex((e) => e[0] == prop[0])
	if (i != -1) into.splice(i, 1, JSON.parse(JSON.stringify(prop)))
	else into.push(JSON.parse(JSON.stringify(prop)))
}
let tt = t => ["TextFrame", ["text", t]]
let COVER = {
	content: [
		tt(`Proposal
----------- `), tt(`(loose thread of notes, to do's and dont's + references)`)]
}

let WHAT = {
	content: [
		tt(`1.2.3 What are you going to make?`.toUpperCase()),
		tt(`Through the course of the study I will be making publications, zines, newsprints, posters, websites, software sketches. Maybe some form of a printing aparatus and some writings (short-form essays and a TBD techincal paper).`)
	]
}


WHAT.content.push([
	"TextFrame",
	["text", 'WHAT']
])

let AIM = {
	content: [
		tt(`
// 1.2.4 What is your work aiming to do?
// -------------------------------------
`.toUpperCase()),
		tt(``)]

}


AIM.content.push(...[
	`
Catalgoue forms of books (genealogy), the properties that emerge from alternative structures of books and how structures affect the organisation and interpretation of the content within them.`,
	`Investigate whether computational tools[&/]environments can produce forms of publications that can stand as alternatives to digital computational practices (spreadsheets, calculations, generativitity). In doing so attempt to expand the domain of computation into print and engage the body[&/]material practices in the process. While the answer to this question is yes,, the aim is to explore how non-digital computation changes with the hindsight of several decades of digital computational practices and centuries of non-digital computational practices`,

	``,
	``].map(tt))

let basic = [
	["top", ["hangline_verso", 1]],
	["left", ["em", 1]],
	["side", "recto"],
	["width", ["column_width_verso", 5]],
	["height", ["em", 6]],
]

AIM.content.push([
	"ImageFrame",
	["src", "https://d2w9rnfcy7mm78.cloudfront.net/39239807/original_325db7a6d8815d648ada6d3ffad099bb.jpg"],
	["filter", "grayscale(1)"]
].concat(basic))

AIM.content.push([
	"ImageFrame",
	["src", "https://wiki.xxiivv.com/media/diary/867.jpg"],
	["filter", "grayscale(1)"]
].concat(basic))


AIM.content.push([
	"TextFrame",
	["text", 'AIM/STATEMENT']
])



let POV = {
	content: [
		// ["TextFrame", ["text",`Elaborate on the approach or lens you will be conducting\this study from.`] ,
		// 	["top", ["em", 1]],
		// 	["left", ["em", 1, "x"]],
		// 	["width", ["em", 5]],
		// 	["height", ["em", 6]],
		// ]
		tt(`Elaborate on the approach or lens you will be conducting\this study from.`.toUpperCase()),
		tt(`"the designer constructs a system of constraints, such as a simulation or a set of simple instructions, and then allows the player actively to learn by exploring and tinkering with the system. In each case, there is no prior "course content" to be learnt, no predefined terminus of the process, only a rough specification of the general region to be explored, and so the player's individual trajectory may surprise even the designer."`).concat([["tag-0", "quote"]]),
		tt(`https://gamestudies.org/0601/articles/rodriges`).concat([["tag-0", "link"]])
	],

}

POV.content.push([
	"ImageFrame",
	["src", "https://d2w9rnfcy7mm78.cloudfront.net/39242511/original_87bbdb36dbd8f05b0aaef220bd372c03.jpg"],
	["filter", "grayscale(1)"]
])

POV.content.push([
	"TextFrame",
	["text", 'Procedural book making by creating enviroments for play (emergent, collage) within a mechanical systems (venn diagram)']
])

POV.content.push([
	"TextFrame",
	["text", '“Play is a way of operating a constrained system in a gratifying way.” Bogost']
])

POV.content.push([
	"TextFrame",
	["text", 'General notes, thoughts']
])

POV.content.push([
	"TextFrame",
	["text", 'Abstraction like Math or Programming creates lenses for interpretation and helps in creation of meaningful play-grounds. Meaningful being, systems that can support interpretation of what the play performed could mean. The play that is performed however is the grounds for the actual making. Abstraction is the grid structure, play is the enactment of (FW) within this structure to produce something.']
])

POV.content.push([
	"TextFrame",
	["text", 'APPROACH']
])

let LIST = {
	content: [
		tt(`List of example exercises / todos`),
		tt(`
1. Somehow find a slime mold and see if you can interact with it for some form of navigational design (navigation of book?)

2. Explore Physarium Algorithm and use it to create layouts (spreads/inter-spreads)
   https://www.sciencedirect.com/science/article/abs/pii/S2210650221000511

3. Explore creating matrix with book spreads, (spreads, sheet, page)
   I don't know how this works, will have to study a little. But essentially, there would be a few dimensions,
   - the spread which is the visual spread that appears and you design on,
   - then the actual sheets before they are bound.
   - Z axis relationships between individual pages.
   And if you have a representation for this, you can use this space for physarium algorithms.

4. Wave function collapse with book spreads + spread layouts even...
   like taxonomic informations systems or puzzle books or smth. (RM book ali class)

5. Excel sheets, table generated printed out... Can be filled in with text and then can be scanned, do simple ocr and have easy access for data visualisation and stuff and also ease of handwriting...
   Can go further and think about what ways to interpret hand drawings/writing...  

		`),

		tt(`

6. Executing computations physically. 
   Like the typesize + leading relationship wheel, or graph multiplication, addition and stuff.

7. Printing methods based on print masters and stuff, but perhaps with paper. Eg. ink transfer kind of stuff. Waxy prints, negative for water based smth to pass thru and print? a sieve sort of? Ponder...

8. Desiginig italo calvino's books, or Arcadia  and incorporating structure of narrative or space in his books into the structure/form of the book
   https://en.wikipedia.org/wiki/Arcadia_(play)

9. Publishing a paper on procedural bookmaking?

10. What is the relationship of sin/cos and circles
    I'm just curious, probably a quick exercise and a quick zine (1 day project)

11. Voronoi typesetting/layouting?
    Use voronoi algorithms for typesetting text. Maybe plot text on points, or create a grid/structure using the algorithm and play in it.

12. Lisajous curve table for typographic ratios
    https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Lissajous_phase.svg/1200px-Lissajous_phase.svg.png
    The above as an interface to typography? Blackburn pendulum?`)
	]
}

let LIST2 = {
	content: [
		tt(`
13. Algorithms: physarium, WFC, its explainations as zines. Zines may incorporate these algorithms in its structure

14. making a super constrained model to run on a rasberri pi, assigning parameters to contrast (contrast as weight difference, size difference etc) and variations, business... and then training this model and running it. Not to run well but just to see how it works.

15. How would saddle stitch pages sound if it was a rhythm (drum beat or smth) 

16. Paper sizes, where do they come from?
`)
	]
}


// 
// ---------------------------------


export let data = [
	COVER,
	WHAT,
	AIM,
	POV,
	LIST,
	LIST2
]

let stylesheet = {

	link: [
		["font_family", 'Arial Narrow'],
		["font_style", 'italic'],
		["font_size", ["point", 4]],
	],
	quote: [
		["font_family", 'Arial Narrow'],
		["font_style", 'italic'],
		["font_size", ["point", 5]],
	]
}

await fetch('./data.json')
	.then((res) => res.json())
	.then((res) => {
		// make it so it rewrites the props, but not the text element...
		res.forEach((e, i) => {
			// iterate through frames 
			e.content.forEach((f, ii) => {
				// iterate through properties 
				if (
					f[0] == 'TextFrame'
					|| f[0] == 'ImageFrame'
				) {
					f.forEach((p, iii) => {
						if (iii == 0) return
						if (
							p[0] == 'text'
							|| p[0] == 'src'
						) return
						append_prop(p, data[i].content[ii])
					})
				} else data[i].content[ii] = f
			})
		})
	})
	.then(() => {
		// make it so it rewrites the props, but not the text element...
		data.forEach((e, i) => {
			// iterate through frames 
			e.content.forEach((f, ii) => {
				// iterate through properties 
				if (f[0] == 'TextFrame') {
					f.forEach((p, iii) => {
						if (iii == 0) return
						if (p[0] == 'text'
							|| p[0] == 'src'
							 ) return
						if (p[0].includes('tag')) {
							let sss = stylesheet[p[1].trim()]
							console.log(sss)
							if (sss) {sss.forEach((item) => append_prop(item, f))}
						}
					})
				} else data[i].content[ii] = f
			})
		})

	})



// 1.2.7 Do you have any general notes or terms that you have set for yourself?
// ----------------------------------------------------------------------------

//   1. Play, experiment and explore, but lean on the side of communicating
//      what you're doing and it's presentation
//   2. Keep making stuff, but also present them. As zines, newsprints,
//      posters, etc. All outcomes to be frozen(print/image/mp4), if there
//      is interactive components, make sure to document it with steps for
//      reproduction.
//   3. Keep W(I) for breadth and exploration, make divergent jumps and try
//      different small experiments
//   4. Keep W(II) for depth & presentation, explore projects in W(I) more
//      thoroughly, present well, and stitch together to make a coherent
//      point (or not).


// 1.2.8 List of example exercises / todos
// ---------------------------------------

//   1. Somehow find a slime mold and see if you can interact with it for
//      some form of navigational design (navigation of book?)
//   2. Explore Physarium Algorithm and use it to create layouts
//      (spreads/inter-spreads)
//   3. Explore creating matrix with book spreads, x, y, z (3 dimensional
//      matrix. math stuff?)
//   4. Wave function collapse with book spreads + spread layouts even...
//      like taxonomic informations systems or puzzle books or smth. (RM
//      book ali class)
//   5. Excel sheets, table generated printed out... Can be filled in with
//      text and then can be scanned, do simple ocr and have easy access
//      for data visualisation and stuff and also ease of handwriting...
//      Can go further and think about what ways to interpret hand
//      drawings/writing...
//   6. Executing computations physically.
//   7. Printing methods based on print masters and stuff, but perhaps with
//      paper. Eg. ink transfer kind of stuff. Waxy prints, negative for
//      water based smth to pass thru and print? a sieve sort of? Ponder...
//   8. Desiginig italo calvino's books and incorporating structure of
//      narrative or space in his books into the structure/form of the book
//   9. Publishing a paper on procedural bookmaking?
//   10. What is the relationship of sin/cos and circles
//   11. Voronoi typesetting/layouting?
//   12. Lisajous curve table for typographic ratios
//   13. Algorithms: physarium, WFC, its explainations as zines. Zines may
//       incorporate these algorithms in its structure
//   14. making a super constrained model to run on a rasberri pi,
//       assigning parameters to contrast (contrast as weight difference,
//       size difference etc) and variations, business... and then training
//       this model and running it. Not to run well but just to see how it
//       works.
//   15. How would saddle stitch pages sound if it was a rhythm (drum beat
//       or smth)
