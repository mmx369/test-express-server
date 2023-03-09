const express = require('express')
const path = require('path')
const app = express()
const port = 5000
const cors = require('cors')
const multer = require('multer')

app.use(express.static('public'))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

app.use(cors())

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '/index.html'))
// })

app.get('/', (req, res) => {
  res.send('Server is Ok')
})

app.post('/upload', upload.single('file'), function (req, res) {
  res.json({
    id: 'p1',
    title: 'Молоко Простоквашино отборное 3.2%',
    weight: 900,
    measure: 'гр',
    article: 12345,
    kkal: 60,
    protein: 8,
    fats: 5,
    carbohydrates: 3.3,
    description: 'Волшебное молоко. Неповторимый вкус.',
    price: 65,
  })
})

app.listen(port, () => {
  console.log(`Test server running on port ${port}`)
})
