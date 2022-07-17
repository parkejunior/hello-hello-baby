const form = document.getElementById('addContactForm')
const table = document.getElementById('contactsTable')
const contacts = getContactsStorage() || []

initContactsTable()

form.addEventListener('submit', function (event) {
  event.preventDefault()
  
  const data = new FormData(form)
  const name        = data.get('name')
  const phoneNumber = data.get('phoneNumber')

  addContact(name, phoneNumber)
})

function addContact(name, phoneNumber) {
  const contact = {
    name,
    phoneNumber
  }
  
  contacts.push(contact)
  addContactRow(contact)
  addContactsStorage(contacts)
}

function addContactRow(contact) {
  const tableBody = table.getElementsByTagName('tbody')[0]

  const row         = document.createElement('tr')
  const name        = document.createElement('td')
  const phoneNumber = document.createElement('td')
  const action      = createActionElement(contact.phoneNumber)

  name.innerText        = contact.name
  phoneNumber.innerText = contact.phoneNumber

  row.appendChild(name)
  row.appendChild(phoneNumber)
  row.appendChild(action)
  
  tableBody.appendChild(row)
}

function createActionElement(phoneNumber) {
  const action = document.createElement('a')
  action.href = `tel:${phoneNumber}`
  action.innerText = 'Ligar'

  return action
}

function addContactsStorage(contacts) {
  const data = JSON.stringify(contacts)

  localStorage.setItem('contacts', data)
}

function getContactsStorage() {
  const data = localStorage.getItem('contacts')

  return JSON.parse(data)
}

function initContactsTable() {
  for (const i in contacts) {
    addContactRow(contacts[i])
  }
}