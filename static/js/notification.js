'use strict'

const NOTIFICATION_NORMAL = 0
const NOTIFICATION_ERROR = 1
const NOTIFICATION_SUCCESS = 2

const __LEVEL_CLASS = ['', 'notification-error', 'notification-success']

/**
 * Creates a new notification that can be displayed on the screen.
 */
class Notification {
  TIMEOUT = 3000
  ANIMATION_DURATION = 200

  constructor({ title, message = '', level = NOTIFICATION_NORMAL }) {
    this.title = title
    this.message = message
    this.level = level
    this.dismissTimeout = null
    this.id = null
  }

  /**
   * Shows the notification. The notification will be dismissed automatically after 3 seconds
   * unless the mouse is hovered over it.
   */
  show = () => {
    const notification = document.createElement('div')

    const title = document.createElement('p')
    title.className = 'notification-header'
    title.innerHTML = this.title
    notification.appendChild(title)

    if (this.message) {
      const message = document.createElement('p')
      message.className = 'notification-content'
      message.innerHTML = this.message
      notification.appendChild(message)
    }

    this.id = this.generateId().toString()
    notification.className = `notification ${__LEVEL_CLASS[this.level]} notification-active`
    notification.id = this.id
    notification.addEventListener('mouseover', this.resetTimer)
    notification.addEventListener('mouseleave', this.startDismissTimer)

    document.body.appendChild(notification)

    this.startDismissTimer()
  }

  /**
   * Cancels the dismiss timer.
   */
  cancelDismissTimer = () => {
    clearTimeout(this.dismissTimeout)
  }

  /**
   * Starts the dismiss timer.
   */
  startDismissTimer = () => {
    this.dismissTimeout = setTimeout(this.dismissNotification, this.TIMEOUT)
  }

  /**
   * Dismisses the notification.
   */
  dismissNotification = () => {
    const elem = document.getElementById(this.id)
    const classes = elem.classList

    classes.remove('notification-active')
    classes.add('notification-dismissed')

    setTimeout(this.removeNotificationFromDOM, this.ANIMATION_DURATION)
  }

  removeNotificationFromDOM = () => {
    document.body.removeChild(document.getElementById(this.id))
  }

  generateId = () => Math.floor(Math.random() * 1000000000000000)
}
