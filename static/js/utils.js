/**
 * Append the given character to the left of the given string until the final string
 * is equal to the given length.
 * @param {String} string The string to be padded
 * @param {String} char The character to be used for padding
 * @param {String} len The length of the final string
 * @returns {String} the padded string.
 */
function leftPad(string, char, len) {
  const stringLength = string.length

  if (stringLength >= len) return string

  const padding = len - stringLength

  return `${char.repeat(padding)}${string}`
}

/**
 * Finds the first missing field in a form.
 * @param {FormData} form The form to be checked.
 * @param {object} fields Fields in the form that must be present.
 * @returns {String} The name of the missing field. null if no field is missing.
 */
function findMissingField(form, fields) {
  for (const field in fields) {
    if (!form.get(field)) {
      return field
    }
  }
  return null
}

function filterMissingFieldInForm(form, fields) {
  let field
  do {
    field = findMissingField(form, fields)
    if (field) {
      submittedForm.delete(field)
    }
  } while (field)
}

/**
 * Check if a given date is valid.
 * @param {Date} date The date to be checked
 */
function isDateValid(date) {
  return !isNaN(date)
}

/**
 * @param {String} dateStr A date string in the format of yyyy-mm-dd
 * @param {String} timeStr A time string in the format of hh:mm
 * @returns New instance of Date from date string and time string returned by
 * date field and time field.
 */
function getDateFromDateTimeString(dateStr, timeStr) {
  const [year, month, date] = dateStr.split('-')
  const [hour, minute] = timeStr.split(':')

  return new Date(year, month - 1, date, hour, minute, 0, 0)
}

/**
 * @param {Date} date The source date
 * @returns The unix timestamp of the given date in seconds.
 */
function unixTimestamp(date) {
  return Math.floor(date.getTime() / 1000)
}
