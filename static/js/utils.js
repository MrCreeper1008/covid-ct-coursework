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

/**
 * Check if a given date is valid.
 * @param {Date} date The date to be checked
 */
function isDateValid(date) {
  return !isNaN(date)
}
