
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()
const multer = require('multer')
const path = require('path')
const fs = require('fs');
const {nanoid} = require('nanoid')

const authRouter = require('./routes/api/auth')
const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static('public'));

const tempDir = path.join(__dirname, 'temp')

const multerConfig = multer.diskStorage({
  destination: tempDir, 
  filename: (req, file,cb) => {
    cb(null, file.originalname);
  }
})

const upload = multer({
  storage: multerConfig
})

const avatars = [];

app.get('/api/avatars', (req, res) => {
res.json(avatars);
})
const avatarDir = path.join(__dirname, 'public', 'avatars');
app.post('/api/avatars', upload.single('avatar'), async(req, res) => {
  const {path: tempUpload, originalname} = req.files;
  const resultUpload = path.join(avatarDir, originalname)
  await fs.rename(tempUpload, resultUpload);
  const avatar = path.join('avatars', originalname);
  const newContact = {
    id: nanoid(),
    ...req.body,
    avatar,
  }
  avatars.push(newContact);
  res.status(201).json(newContact);
})

app.use('/api/contacts', contactsRouter)
app.use('/api/auth', authRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const {status = 500, message = "Server error"} = err; 
  res.status(status).json({ message });
})

module.exports = app
