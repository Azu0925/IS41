const express = require('express')
const fs = require("fs")
const csv = require("csv")
const app = express()

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    const csvData = fs.readFileSync('data/output.csv', 'utf-8')
    const result = csvData.split('\n')
    let showResult = [];
    result.map(row => {
        showResult.push(row.split(','))
    });

    console.log(result)

    res.render('./index.ejs', {data: showResult})
})

app.get("/result", (req, res) => {
    const title = req.query.title
    const detail = req.query.detail
    fs.appendFileSync('data/output.csv', '\n' + title + ',' + detail + '\n', { encoding: 'utf8' });
    res.redirect('/')
})

app.post("/result", (req, res) => {
    console.log(req)
    res.send('done')
})
app.listen(9000)