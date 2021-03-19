/**
 * A reference to the table that shows recently visited locations.
 * @type {HTMLTableElement}
 */
const locationTable = document.getElementById('location-table')

/**
 * @type {HTMLParagraphElement}
 */
const noRecordLabel = document.getElementById('no-record-label')

function locationsRequestResultListener() {
  /**
   * @type{{
   * visited_on_timestamp: string,
   * duration: number,
   * location_x: number,
   * location_y: number
   * }[]}
   */
  const locations = JSON.parse(this.response)

  if (locations.length <= 0) {
    noRecordLabel.classList.remove('hidden')
  } else {
    for (const location of locations) {
      const { visited_on_timestamp, duration, location_x, location_y } = location
      const date = new Date(visited_on_timestamp * 1000)
      const formattedDate = `${date.getDate()}/${leftPad(
        date.getMonth() + 1,
        '0',
        2,
      )}/${date.getFullYear()}`
      const formattedTime = `${date.getHours()}/${date.getMinutes()}`

      const row = locationTable.insertRow()

      row.insertCell().innerText = formattedDate
      row.insertCell().innerText = formattedTime
      row.insertCell().innerText = duration
      row.insertCell().innerText = location_x
      row.insertCell().innerText = location_y
    }
    locationTable.classList.remove('hidden')
  }
}

function fetchLocations() {
  new Request({
    method: GET,
    url: '/locations',
  })
    .addListener(locationsRequestResultListener)
    .send()
}

document.addEventListener('DOMContentLoaded', () => {
  fetchLocations()
})
