# URL Shortener Microservice

This is a backend microservice for shortening URLs and tracking basic analytics, developed as part of the Affordmed Campus Hiring Evaluation.

## Features

- Create globally unique short URLs
- Optional custom shortcode support
- Default validity of 30 minutes if not specified
- Redirection to original URLs
- Click tracking with timestamp, source, and coarse-grained location
- Retrieve statistics for each shortened URL
- MongoDB-based persistent storage
- Logging via external middleware (no console.log or inbuilt loggers)

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- Axios
- dotenv
- nanoid

## API Endpoints

### 1. Create Short URL

**POST** `/shorturls`

**Request Body:**

```json
{
  "url": "https://example.com",
  "validity": 45,
  "shortcode": "custom123"
}
```

**Response:**

```json
{
  "shortLink": "http://localhost:4000/custom123",
  "expiry": "2025-09-08T15:06:00.000Z"
}
```

### 2. Retrieve URL Statistics

**GET** `/shorturls/:shortcode`

**Response:**

```json
{
  "originalUrl": "https://example.com",
  "createdAt": "2025-09-08T14:21:00.000Z",
  "expiry": "2025-09-08T15:06:00.000Z",
  "totalClicks": 12,
  "clickDetails": [
    {
      "timestamp": "2025-09-08T14:30:00.000Z",
      "source": "https://referrer.com",
      "location": "192.168.x.x"
    }
  ]
}
```

### 3. Redirect to Original URL

**GET** `/:shortcode/redirect`

Redirects the user to the original long URL and records click metadata.

**Environment Variables**

Create a `.env` file in the root directory with the following keys:

```json
PORT=4000
MONGO_URI=mongodb://localhost:27017/urlshortener
AUTH_TOKEN=your_access_token_here
LOG_SERVER_URL=http://20.244.56.144/evaluation-service/logs
BASE_URL=http://localhost:4000
```
## Setup Instructions

- Clone the repository  
- Navigate to the `backend` folder  
- Run `npm install`  
- Set up your `.env` file  
- Start the server with `node server.js`
