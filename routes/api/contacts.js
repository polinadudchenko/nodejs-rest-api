const express = require('express')
const CreateError = require('http-errors')
const router = express.Router()

const contacts = require('../../controllers/contacts')
const contactsSchema = require('../../schemas/contacts')

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts()
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contacts.getContactById(contactId)
    if (!result) {
      throw new CreateError(404, 'Not found')
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body)
    if (error) {
      throw new CreateError(400, error.message)
    }
    const { name, email, phone } = req.body
    const result = await contacts.addContact(name, email, phone)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body)
    if (error) {
      throw new CreateError(400, error.message)
    }
    const { contactId } = req.params
    const { name, email, phone } = req.body
    const result = await contacts.updateById(contactId, name, email, phone)
    if (!result) {
      throw new CreateError(404, 'Not found')
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contacts.removeContact(contactId)
    if (!result) {
      throw new CreateError(404, 'Not found')
    }
    res.json({ message: 'Contact deleted' })
  } catch (error) {
    next(error)
  }
})

module.exports = router
