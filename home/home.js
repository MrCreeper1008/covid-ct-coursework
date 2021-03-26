/** @type {HTMLDivElement} */
const mapContainer = document.getElementById('map-container')

/** @type {HTMLParagraphElement} */
const statusText = document.getElementById('status-text')

function infectionRequestResultListener() {
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
      console.log(this.response)
      /**
       * @type {{
       * x: number,
       * y: number,
       * contacted: boolean
       * }[]}
       */
      const visits = JSON.parse(this.response)

      let hasContact = false

      for (const visit of visits) {
        if (!hasContact && visit.contacted) {
          hasContact = true
        }

        const marker = document.createElement('img')
        marker.src = `../static/images/marker_${visit.contacted ? 'red' : 'black'}.webp`
        marker.classList.add('location-marker', 'visit-marker')
        marker.alt = `Marker of visit at x = ${visit.x} and y = ${visit.y}`
        marker.style.top = `${visit.x}px`
        marker.style.left = `${visit.y}px`

        mapContainer.appendChild(marker)
      }

      if (hasContact) {
        statusText.innerText +=
          ', you might have had a connection to an infected person at the location shown in red.'
      }

      break

    default:
      break
  }
}

function updateUsername() {
  const { username } = JSON.parse(this.response)

  statusText.innerText = `Hi ${username}${statusText.innerText}`
}

function fetchUsername() {
  new Request({
    method: GET,
    url: '/username',
  })
    .addListener(updateUsername)
    .send()
}

function fetchInfections() {
  new Request({
    method: GET,
    url: '/infection',
  })
    .addListener(infectionRequestResultListener)
    .send()
}

function logout() {
  new Request({
    method: GET,
    url: '/logout',
  }).send()
}

document.addEventListener('DOMContentLoaded', () => {
  fetchUsername()
  fetchInfections()
})
