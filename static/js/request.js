const GET = 'GET'
const POST = 'POST'

/**
 * Describes a RESTful request to the server.
 */
class Request {
  SERVER_URL = 'http://localhost:8081/api'

  constructor({ method, data = null, form = null, url }) {
    this.method = method
    this.data = data
    this.form = form
    this.url = `${this.SERVER_URL}${url}/index.php`
    this.xhr = new XMLHttpRequest()
  }

  addListener = (listener) => {
    this.xhr.addEventListener('load', listener)
    return this
  }

  send = () => {
    this.xhr.open(this.method, this.url)

    if (this.data) {
      this.xhr.setRequestHeader('Content-Type', 'application/json')
      this.xhr.send(JSON.stringify(this.data))
    } else if (this.form) {
      this.xhr.send(this.form)
    } else {
      this.xhr.send()
    }
  }
}
