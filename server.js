import express from "express"
import cors from "cors"
import fs from "fs"

const app = express()
app.use(cors())
app.use(express.json());
app.use(express.static('.'))

let port = 7462
app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})

app.post('/save', (req, res) => {
	console.log(req.body)
	fs.writeFileSync('./data.json', JSON.stringify(req.body, null, 2))
	let read = fs.readFileSync('./data.json', {encoding: 'utf-8'})
	res.send({wrote: read})
})

app.post('/offsets', (req, res) => {
	console.log(req.body)
	fs.writeFileSync('./offsets.json', JSON.stringify(req.body, null, 2))
	let read = fs.readFileSync('./offsets.json', {encoding: 'utf-8'})
	res.send({wrote: read})
})
