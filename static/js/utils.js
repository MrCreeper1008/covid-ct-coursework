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
 * Checks whether all the specified fields are present in the given form.
 * @param {FormData} form The form to be checked.
 * @param {object} fields Fields in the form that must be present.
 * @returns {Boolean} Whether all given fields are present in the given form.
 */
function checkFieldExistence(form, fields) {
  for (const field in fields) {
    if (!form.get(field)) {
      return false;
    }
  }
  return true;
}
