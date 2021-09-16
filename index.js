const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const { sleep, imageFilter } = require('./utils')
const fs = require('fs')
const { v4: uuid } = require('uuid')

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'icons/')
    },
    filename: function (req, file, cb) {
        const buildings = require('./buildings.json')

        const buildingId = req.params.id
        const foundBuilding = buildingId && buildings.find(b => b.id === buildingId)
        if (foundBuilding && file && foundBuilding.image && fs.existsSync(path.join(__dirname, foundBuilding.image))) {
            fs.unlinkSync(`.${foundBuilding.image}`)
            cb(null, foundBuilding.id + path.extname(file.originalname))
            return
        }
      cb(null, uuid() + path.extname(file.originalname))
    }
})
  
const port = (process.env.PORT || 8000)

app.use(cors())
app.use(express.json());

app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, 'frontend/build')))

app.get('/api/buildings', async (req, res) => {
    try {
        const buildings = require('./buildings.json')
    res.send(await sleep(buildings, 500))
    } catch (error) {
        res.sendStatus(400).send({
            error: 'something went wrong'
        })
    }
})

app.post('/api/buildings', (req, res) => {
    try {
        const buildings = require('./buildings.json')
        
        const upload = multer({ storage: storage, fileFilter: imageFilter }).single('image');

        upload(req, res, (err) => {
            if (req.fileValidationError) {
                return res.status(400).send({error: req.fileValidationError});
            } else if (err instanceof multer.MulterError) {
                return res.status(400).send(err);
            }
            else if (err) {
                return res.status(400).send(err);
            } else {
                const currentBuilding = {
                    id: !!req.file ? req.file.filename.split('.')[0] : uuid(),
                    image: req.file ? `/${req.file.path}` : '',
                    ...req.body
                }

                buildings.unshift(currentBuilding)
                const content = JSON.stringify(buildings)
                fs.writeFile('./buildings.json', content, err => {
                    if (err) {
                        res.statusCode(400).send({
                            err
                        })
                    }
                res.send({data: currentBuilding})

                })

            }
        })
        
    } catch (error) {
        
    }
})

app.put('/api/buildings/:id', (req, res) => {
    const buildings = require('./buildings.json')
    const buildingId = req.params.id

    const upload = multer({ storage: storage, fileFilter: imageFilter }).single('image');

    upload(req, res, (err) => {
        
        if (req.fileValidationError) {
            return res.status(400).send({error: req.fileValidationError});
        } else if (err instanceof multer.MulterError) {
            return res.status(400).send(err);
        }
        else if (err) {
            return res.status(400).send(err);
        } else {

            const currentBuildings = buildings
            .map(b => b.id === buildingId ?
                { ...b, ...req.body, image: req.file ?  `/icons/${buildingId}${path.extname(req.file.originalname)}` : b.image}
                : b)
            
            const currentBuilding = currentBuildings.find(b => b.id === buildingId)

            const content = JSON.stringify(currentBuildings)

            fs.writeFileSync('./buildings.json', content)

            res.send({ data: currentBuilding })
            


        }

    })
    
})

app.delete('/api/buildings/:id', (req, res) => {
    try {
        const buildings = require('./buildings.json')
        const buildingId = req.params.id
        const buildingIcon = buildings.find(building => building.id === buildingId).image
        
        const updatedBuildings = buildings.filter(building => building.id !== buildingId)

        const content = JSON.stringify(updatedBuildings)

        fs.writeFile('./buildings.json', content, err => {
            if (err) {
                res.status(400).send({
                    error: 'something went wrong'
                })
                return
            }

            if (buildingIcon) {
                fs.unlink(`.${buildingIcon}`, (err) => {
                    if (err) {
                        res.status(400).send({
                        error: 'something went wrong'
                        })
                        return
                    }
    
                
                    res.send({
                        data: buildingId
                    })
                })
            } else {
                res.send({
                    data: buildingId
                })
            }
        })
        } catch (error) {
            res.status(400).send({
                error: 'something went wrong'
            })
        }

    
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'))
});

app.get('/icons/:id')


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })