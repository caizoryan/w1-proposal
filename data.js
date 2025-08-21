let COVER = {
		content: [["TextFrame",
		 ["text", `
Front Cover
----------- `],
		 ["side", "recto"],
		 ["top", ["hangline_recto", 0]],
		 ["left", ["em", .5]],
		 ["width", ["em", 2]],
		 ["height", ["em", 2]]
		],

		["TextFrame",
		 ["text", `(loose thread of notes, to do's and dont's + references)`],
		 ["side", "recto"],
		 ["top", ["hangline_recto", 2]],
		 ["left", ["em", 2]],
		 ["font_size", ["em", .5]],
		 ["width", ["column_width_recto", 6]],
		 ["height", ["em", 2]]
		]]
	}

let WHAT = {
	content: [
		["TextFrame",
		 ["text", `1.2.3 What are you going to make?`.toUpperCase()],
		 ["side", "recto"],
		 ["top", ["hangline_recto", 0]],
		 ["left", ["em", 2]],
		 ["width", ["column_width_recto", 6]],
		 ["height", ["em", 4]],
		 ["font_size", ["em", .8]],
		 ["css", {
			 background: "#2222",
			 fontWeight: 100,
			 borderBottom: '1px solid black',
			 fontFamily: 'monospace',
		 }]
		],

		["TextFrame",
		 ["text", `Through the course of the study I will be making publications, zines, newsprints, posters, websites, software sketches. Maybe some form of a printing aparatus and some writings (includeing a TBD techincal paper).`],
		 ["side", "recto"],
		 ["top", ["hangline_recto", 2]],
		 ["left", ["em", 2]],
		 ["font_size", ["em", .5]],
		 ["width", ["column_width_recto", 8]],
		 ["height", ["em", 2]]
		]]
	}
// 
// ---------------------------------


	

export const data = [
	COVER,
	WHAT,
]



// 1.2 Study Proposal
// ~~~~~~~~~~~~~~~~~~


// 1.2.2 Index
// -----------



// 1.2.4 What is your work aiming to do?
// -------------------------------------

//   Explore ways of desiging book procedurally. Reveal computations that
//   the (form and structure of the book) is capable of.  For instance,
//   1. Books in their structure compute odd or even as the side of the
//      page (recto odd, verso even)
//   2. offsetting sheet, light shining through can plot offset position of
//      pages - can be utilised as interactive arithmetics or vector math
//      computation.
//   3. Excel/spreadsheet/db kind of thing
//   4. OR/NOT/AND kind of stuff + Josef albers color?


// 1.2.5 Axioms
// ------------

//   1. Algorithms predate computers.
//   2. Books come in various forms.


// 1.2.6 If you had to give a statement for the line of study you are going to conduct ---
// ---------------------------------------------------------------------------------------

//   Explore procedural book making by conducting play (emergent, collage)
//   within a mechanical systems (venn diagram)

//   (reference: Huzinga) "the designer constructs a system of constraints,
//   such as a simulation or a set of simple instructions, and then allows
//   the player actively to learn by exploring and tinkering with the
//   system. In each case, there is no prior "course content" to be learnt,
//   no predefined terminus of the process, only a rough specification of
//   the general region to be explored, and so the player's individual
//   trajectory may surprise even the designer."

//   “Play is a way of operating a constrained system in a gratifying way.”
//   Bogost


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
