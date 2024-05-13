const messageButton = document.querySelector('.message-btn')
let lastMessageTop = 500

const formElement = document.querySelector('.toast-form')

if(formElement) {
  formElement.addEventListener('submit', getFormData)
}

function getFormData(e) {
  e.preventDefault()
  const formData = serializeFormData(this)
  displayMessage(formData.title, formData.description)
}

function serializeFormData(form) {
  const result = {}
  const formData = new FormData(form)
 for(const [key, value] of formData.entries()) {
  if(result.hasOwnProperty(key)) {
    if(Array.isArray(result[key])) {
      result[key].push(value)
    } else {
      result[key] = [result[key], value]
    }
  }  else {
    result[key] = value
  }
 }

 return result
}

function displayMessage(title, description) {
  const originalElement = document.getElementById('example-message')
  const messageElement = originalElement.cloneNode(true)
  document.body.appendChild(messageElement)
  const closeButton = messageElement.querySelector('.close-button')
  
  if(closeButton) {
    closeButton.addEventListener('click', closeMessage)
  }
  
  if(messageElement) {
    messageElement.id = ''
    const titleElement = messageElement.querySelector('.title')
    if(titleElement) {
      titleElement.innerText = title
    }
    const descElement = messageElement.querySelector('.description')
    if(descElement) {
      descElement.innerText = description
    }
    lastMessageTop = lastMessageTop - 50
    messageElement.style.top = `${lastMessageTop}px`
  }
  
  setTimeout(() => {
    messageElement.style.opacity = '0'
    lastMessageTop = lastMessageTop + 50
  }, 3000);
}

function closeMessage(e) {
  e.preventDefault()
  const button = e.target
  const message = button.closest('.toast-message')
  if(message) {
    message.style.opacity = '0'
    lastMessageTop = lastMessageTop + 50
  }
}
