/**
 * A reference to the table that shows recently visited locations.
 * @type {HTMLTableElement}
 */
const locationTable = document.getElementById('location-table')

/**
 * @type {HTMLParagraphElement}
 */
const noRecordLabel = document.getElementById('no-record-label')

function clearTable() {
  let rowCount = locationTable.rows.length
  while (rowCount > 1) {
    locationTable.deleteRow(rowCount-- - 1)
  }
}

function locationsRequestResultListener() {
  console.log(this.response)

  /**
   * @type {{
   * id: number,
   * visited_on_timestamp: string,
   * duration: number,
   * location_x: number,
   * location_y: number
   * }[]}
   */
  const locations = JSON.parse(this.response)

  if (locations.length <= 0) {
    noRecordLabel.classList.remove('hidden')
    locationTable.classList.add('hidden')
  } else {
    clearTable()

    for (const location of locations) {
      const { id, visited_on_timestamp, duration, location_x, location_y } = location
      const date = new Date(visited_on_timestamp * 1000)

      const dateStr = leftPad(date.getDate().toString(), '0', 2)
      const monthStr = leftPad((date.getMonth() + 1).toString(), '0', 2)
      const yearStr = leftPad(date.getFullYear().toString(), '0', 4)
      const hourStr = leftPad(date.getHours().toString(), '0', 2)
      const minStr = leftPad(date.getMinutes().toString(), '0', 2)

      const formattedDate = `${dateStr}/${monthStr}/${yearStr}`
      const formattedTime = `${hourStr}:${minStr}`

      const removeButton = document.createElement('img')
      removeButton.src = '../static/images/cross.webp'
      removeButton.classList.add('remove-button')
      removeButton.addEventListener('click', removeVisit(id))

      const row = locationTable.insertRow()

      row.insertCell().innerText = formattedDate
      row.insertCell().innerText = formattedTime
      row.insertCell().innerText = duration
      row.insertCell().innerText = location_x
      row.insertCell().innerText = location_y
      row.insertCell().appendChild(removeButton)
    }
    locationTable.classList.remove('hidden')
  }
}

function deleteVisitResultListener() {
  switch (this.status) {
    case 500:
      const { error } = JSON.parse(this.response)

      new Notification({
        title: 'Oops! Something went wrong.',
        message: error,
        level: NOTIFICATION_ERROR,
      }).show()

      break

    case 200:
      new Notification({
        title: 'The visit has been deleted successfully.',
        level: NOTIFICATION_SUCCESS,
      }).show()
      fetchLocations()
      break

    default:
      break
  }
}

function fetchLocations() {
  new Request({
    method: GET,
    url: '/location',
  })
    .addListener(locationsRequestResultListener)
    .send()
}

function removeVisit(id) {
  return () => {
    new Request({
      method: DELETE,
      url: '/location',
      params: { id },
    })
      .addListener(deleteVisitResultListener)
      .send()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchLocations()
})
