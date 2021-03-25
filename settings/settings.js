/**
 * A reference to the settings form.
 * @type {HTMLFormElement}
 */
const settingsForm = document.getElementById('settings-form')

const FIELDS = {
  window: 'window',
  distance: 'distance',
}

function saveSettingsResultListener() {
  switch (this.status) {
    case 200:
      new Notification({
        title: 'Settings saved successfully.',
        level: NOTIFICATION_SUCCESS,
      }).show()
      break

    case 500:
      const { error } = JSON.parse(this.response)
      new Notification({
        title: 'Settings saved successfully.',
        message: error,
        level: NOTIFICATION_SUCCESS,
      }).show()
      break

    default:
      break
  }
}

/**
 * Called when the settings form is submitted
 * @param {Event} event The associated submit event.
 */
function saveSettings(event) {
  event.preventDefault()

  const submittedForm = new FormData(settingsForm)

  filterMissingFieldInForm(submittedForm)

  new Request({
    method: POST,
    form: submittedForm,
    url: '/settings',
  })
    .addListener(saveSettingsResultListener)
    .send()
}

settingsForm.addEventListener('submit', saveSettings)
