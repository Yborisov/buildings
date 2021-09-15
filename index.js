const express = require('express')
const path = require('path')
const app = express()
const port = (process.env.PORT || 5000)

app.use(express.static(path.join(__dirname, 'frontend/build')))

app.get('/api/buildings', (req, res) => {
    const buildings = require('./buildings.json')
    console.log(buildings);
    res.send(buildings)
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'))
});


app.listen(port, () => {
    console.log(`Example app listening at ${__dirname}:${port}`)
  })