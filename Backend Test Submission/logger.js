import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

let token = process.env.AUTH_TOKEN

function Log(stack, level, pkg, message) {
  axios.post(process.env.LOG_SERVER_URL, {
    stack,
    level,
    package: pkg,
    message
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export { Log }
