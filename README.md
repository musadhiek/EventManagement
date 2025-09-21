# Event Management System

A Node.js-based REST API for managing events with user authentication and role-based access control.

## Features

- **User Authentication**: Register and login with JWT tokens
- **Role-based Access Control**: Support for regular users and organizers
- **Event Management**: Create, read, update, and delete events
- **Event Registration**: Users can register for events
- **Email Notifications**: Automatic email confirmation for event registrations
- **Protected Routes**: Secure API endpoints with authentication middleware

## Tech Stack

- **Backend**: Node.js, Express.js
- **Authentication**: JWT (JSON Web Tokens), bcryptjs
- **Email**: Nodemailer
- **Testing**: Jest, Supertest
- **Development**: Nodemon
- **Validation**: Express-validator

## Project Structure

```
src/
├── controllers/          # Request handlers
│   ├── authController.js # Authentication logic
│   └── eventController.js # Event management logic
├── middlewares/          # Custom middleware
│   └── authMiddleware.js # Authentication & authorization
├── models/              # Data models (in-memory storage)
│   ├── eventModel.js    # Events array
│   └── userModel.js     # Users array
├── routes/              # API routes
│   ├── authRoutes.js    # Authentication routes
│   └── eventRoutes.js   # Event routes
├── utils/               # Utility functions
│   └── email.js         # Email service
└── index.js             # Application entry point
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/musadhiek/EventManagement.git
cd EventManagement
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
JWT_SECRET=your_jwt_secret_here
PORT=3000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

4. Start the development server:
```bash
npm run dev
```

Or for production:
```bash
npm start
```

## API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/register` | Register a new user | Public |
| POST | `/api/login` | Login user | Public |

### Events

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/events` | Get all events | Public |
| GET | `/api/events/:id` | Get event by ID | Public |
| POST | `/api/events` | Create new event | Organizer only |
| PATCH | `/api/events/:id` | Update event | Organizer only |
| DELETE | `/api/events/:id` | Delete event | Organizer only |
| POST | `/api/events/:id/register` | Register for event | Authenticated users |

### Protected Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/protected` | Test protected route | Authenticated users |
| GET | `/api/organizer-only` | Organizer-only route | Organizers only |

## Usage Examples

### User Registration
```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }'
```

### User Login
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Event (Organizer)
```bash
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Tech Conference 2024",
    "description": "Annual technology conference",
    "date": "2024-06-15",
    "time": "09:00"
  }'
```

### Register for Event
```bash
curl -X POST http://localhost:3000/api/events/EVENT_ID/register \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## User Roles

- **User**: Can view events and register for them
- **Organizer**: Can create, update, and delete events, plus all user permissions

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Email Configuration

The system sends email notifications for event registrations. Configure your email settings in the `.env` file:

- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASS`: Your Gmail app password (not your regular password)

## Testing

Run the test suite:
```bash
npm test
```

## Development

Start the development server with auto-reload:
```bash
npm run dev
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `PORT` | Server port (default: 3000) | No |
| `EMAIL_USER` | Email address for notifications | Yes |
| `EMAIL_PASS` | Email password/app password | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

[musadhiek](https://github.com/musadhiek)

## Repository

[GitHub Repository](https://github.com/musadhiek/EventManagement)