'use strict'

/**
 * A reference to the login form.
 * @type {HTMLFormElement}
 */
const loginForm = document.getElementById('login-form')

/**
 * A reference to the register button
 * @type {HTMLButtonElement}
 */
const registerBtn = document.getElementById('register-btn')

/**
 * Listens to result of the login request.
 * @param {ProgressEvent<EventTarget>} event the progress event for the login request
 */
function loginRequestResultListener() {
  switch (this.status) {
    case 500:
      new Notification({
        title: 'Unable to log you in!',
        message: 'An unexpected error has occurred. Please try again later.',
        level: NOTIFICATION_ERROR,
      }).show()
      break

    case 401:
      const response = JSON.parse(this.response);
      new Notification({
        title: 'Unable to log you in!',
        message: response.error,
        level: NOTIFICATION_ERROR,
      }).show()
      break

    case 200:
      window.location.href = '/home'
      break

    default:
      break
  }
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const form = new FormData(loginForm)

  new Request({
    form,
    method: POST,
    url: '/login',
  })
    .addListener(loginRequestResultListener)
    .send()
})

registerBtn.addEventListener('click', () => {
  window.location.href = '/register'
})
