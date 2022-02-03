const express = require('express')
const router = express.Router()

const contactsCtrl = require('../../controllers/contacts')

router.get('/', contactsCtrl.listContacts)

router.get('/:contactId', contactsCtrl.getContactById)

router.post('/', contactsCtrl.addContact)

router.put('/:contactId', contactsCtrl.updateById)

router.delete('/:contactId', contactsCtrl.removeContact)

module.exports = router
