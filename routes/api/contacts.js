const express = require('express')

const router = express.Router()

const contacts = require('../../controllers/contacts')

router.get('/', async (req, res, next) => {
  const result = await contacts.listContacts()
  res.json(result)
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
