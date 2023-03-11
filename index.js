const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const app = express()
const port = 5000
const cors = require('cors')
const multer = require('multer')

app.use(bodyParser.json())
app.use(express.static('public'))

const DUMMY_PRODUCTS = [
  {
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
  },
  {
    id: 'p2',
    title: 'Кефир Простоквашино отборное 3.2%',
    weight: 1000,
    measure: 'гр',
    article: 12345,
    kkal: 63,
    protein: 8,
    fats: 7,
    carbohydrates: 3.6,
    description: 'Волшебный кефир. Неповторимый вкус.',
    price: 69,
  },
]

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

app.get('/', (req, res) => {
  res.send('Server is Ok')
})

app.post('/upload', upload.single('file'), function (req, res) {
  setTimeout(() => {
    res.json({ id: 'p1' })
  }, 3000)
})

app.post('/find', (req, res) => {
  const { id } = req.body.data
  const product = DUMMY_PRODUCTS.filter((product) => product.id === id)
  res.json(...product)
})

app.listen(port, () => {
  console.log(`Test server running on port ${port}`)
})
