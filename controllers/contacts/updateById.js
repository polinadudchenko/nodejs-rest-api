const fs = require('fs/promises')
const path = require('path')
const listContacts = require('./listContacts')

const contactsPath = path.join(__dirname, 'contacts.json')

const updateById = async (id, name, price) => {
  const products = await listContacts()
  const idx = products.findIndex(item => item.id === id)
  if (idx === -1) {
    return null
  }
  products[idx] = { id, name, price }
  await fs.writeFile(contactsPath, JSON.stringify(products, null, 2))
  return products[idx]
}

module.exports = updateById
