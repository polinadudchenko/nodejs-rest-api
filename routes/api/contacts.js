const express = require('express')
const router = express.Router()

const contactsCtrl = require('../../controllers/contacts')
const authenticate = require('../../middlewares/authentication/authenticate')

router.get('/', authenticate, contactsCtrl.listContacts)

router.get('/:contactId', contactsCtrl.getContactById)

router.post('/', authenticate, contactsCtrl.addContact)

router.put('/:contactId', contactsCtrl.updateById)

router.patch('/:contactId/favorite', contactsCtrl.updateStatus)

router.delete('/:contactId', contactsCtrl.removeContact)

module.exports = router
