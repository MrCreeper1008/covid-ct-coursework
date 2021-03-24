/**
 * A reference of the infection report form
 * @type {HTMLFormElement}
 */
const infectionReportForm = document.getElementById('infection-report-form')

/** @type {HTMLButtonElement} */
const reportButton = document.getElementById('report-btn')

/** @type {HTMLButtonElement} */
const cancelButton = document.getElementById('cancel-btn')

const FIELDS = {
  infectionDate: 'infection-date',
  infectionTime: 'infection-time',
  infectionDateTime: 'infectionDateTime',
}

function toggleButtons({ disabled }) {
  reportButton.disabled = disabled
  cancelButton.disabled = disabled
}

/**
 * Validates the form the user has submitted
 * @param {FormData} form The form the user has submitted.
 * @returns {Boolean} Whether the form is valid.
 */
function validateForm(form) {
  const missingField = findMissingField(form)

  if (missingField) {
    toggleButtons({ disabled: false })
    new Notification({
      title: 'Missing required field!',
      message: `You must fill in the ${missingField} field.`,
      level: NOTIFICATION_ERROR,
    }).show()
    return false
  }

  return true
}

function infectionReportResultListener() {
  console.log(this.response)
  switch (this.status) {
    case 200:
      toggleButtons({ disabled: false })
      new Notification({
        title: 'Infection report submitted successfully.',
        level: NOTIFICATION_SUCCESS,
      }).show()
      break

    case 500:
      const { error } = JSON.parse(this.response)

      toggleButtons({ disabled: false })
      new Notification({
        title: 'Cannot process your report.',
        message: error,
        level: NOTIFICATION_ERROR,
      }).show()
      break

    default:
      break
  }
}

/**
 * Called when a form submission is made.
 * @param {Event} event The associated submit event.
 */
function handleFormSubmission(event) {
  event.preventDefault()
  toggleButtons({ disabled: true })

  const submittedForm = new FormData(infectionReportForm)
  const isFormValid = validateForm(submittedForm)

  if (isFormValid) {
    const infectionDate = submittedForm.get(FIELDS.infectionDate)
    const infectionTime = submittedForm.get(FIELDS.infectionTime)
    const infectionDateTime = getDateFromDateTimeString(infectionDate, infectionTime)

    submittedForm.delete(FIELDS.infectionDate)
    submittedForm.delete(FIELDS.infectionTime)
    submittedForm.set(FIELDS.infectionDateTime, unixTimestamp(infectionDateTime))

    new Request({
      method: POST,
      url: '/infection',
      form: submittedForm,
    })
      .addListener(infectionReportResultListener)
      .send()
  }
}

infectionReportForm.addEventListener('submit', handleFormSubmission)
