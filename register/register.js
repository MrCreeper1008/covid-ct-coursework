'use strict'

/**
 * Defines all fields in the registration form.
 */
const FIELDS = {
  name: 'name',
  surname: 'surname',
  username: 'username',
  password: 'password',
}

const MIN_PASSWORD_LENGTH = 8

/**
 * A reference to the registration form.
 * @type {HTMLFormElement}
 */
const registrationForm = document.getElementById('registration-form')

/** @type {HTMLButtonElement} */
const submitButton = document.getElementsByClassName('register-btn')[0]

/**
 * Validates the values in the registration form.
 * @param {FormData} form The form that needs to be validated
 * @returns {boolean} true if form is valid, false otherwise.
 */
function validateForm(form) {
  // first, check if all fields are present.
  const missingField = findMissingField(form, FIELDS)

  if (missingField) {
    submitButton.disabled = false
    new Notification({
      title: 'Missing required field!',
      message: `You must fill in the ${missingField} field.`,
      level: NOTIFICATION_ERROR,
    }).show()
    return false;
  }

  const password = form.get(FIELDS.password)

  if (
    password.length < MIN_PASSWORD_LENGTH ||
    // password has to contain at least one uppercase, one lower case letter and one digit.
    !(/[A-Z]/g.test(password) && /[a-z]/g.test(password) && /[0-9]/g.test(password))
  ) {
    submitButton.disabled = false
    new Notification({
      title: 'Password is too weak!',
      message:
        'Your password has to contain at least one uppercase letter, one lowercase letter and one digit',
      level: NOTIFICATION_ERROR,
    }).show()
    return false
  }

  return true
}

/**
 * Handles registration form submission.
 * @param {Event} event
 */
function handleFormSubmission(event) {
  event.preventDefault()

  submitButton.disabled = true

  const submittedForm = new FormData(registrationForm)
  const isFormValid = validateForm(submittedForm)

  if (isFormValid) {
    new Request({
      method: POST,
      url: '/register',
      form: submittedForm,
    })
      .addListener(registrationRequestResultListener)
      .send()
  }
}

function registrationRequestResultListener() {
  switch (this.status) {
    case 409:
      submitButton.disabled = false
      new Notification({
        title: 'An account with the same username already exists!',
        message: 'Please try again with another username.',
        level: NOTIFICATION_ERROR,
      }).show()
      break

    case 500:
      submitButton.disabled = false
      new Notification({
        title: 'An error occurred when trying to register your details.',
        message: 'Please try again later.',
        level: NOTIFICATION_ERROR,
      })
      break

    case 200:
      window.location.href = '/home'
      break

    default:
      submitButton.disabled = false
      break
  }
}

registrationForm.addEventListener('submit', handleFormSubmission)
