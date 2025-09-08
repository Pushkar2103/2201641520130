import axios from 'axios'

const LOG_URL = import.meta.env.LOG_URL
const AUTH_TOKEN = import.meta.env.AUTH_TOKEN

export function Log(stack, level, pkg, message) {
  axios.post(LOG_URL, {
    stack,
    level,
    package: pkg,
    message
  }, {
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
      'Content-Type': 'application/json'
    }
  })
}
