# Taskify : Project Management Web App

Taskify is a project management web application that allows users to manage their tasks efficiently. With features like user authentication, drag-and-drop task management, and data persistence, Taskify offers a robust platform for tracking tasks across different stages of a project.

## Visit:  [taskify-webapp-one.vercel.app](https://taskify-web-app-blush.vercel.app/dashboard)

## Features

1. **User Authentication**:
   - Signup and login functionality using email and password.
   - Secure password storage and user session management.

2. **Drag and Drop Functionality**:
   - Implement drag and drop feature to move tasks between columns.
   - Automatically updates the task's status when moved to a different column.

3. **Data Persistence**:
   - All user data (account information and tasks) is stored in a database.
   - Each user can only see and manage their own tasks.

4. **Board Columns**:
   - The board has four columns: "To-Do", "In Progress", "Under Review", and "Completed".

## Tech Stack

- **Frontend**:
  - React.js
  - Next.js
  - Tailwind CSS
  - Axios
  - Lucide React (icons)

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose

- **Database**:
  - MongoDB

- **Other Tools**:
  - Docker
  - Git & GitHub

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Docker (optional, for containerization)

### Clone the Repository

```bash
git clone https://github.com/ranjangupta4590/Taskify-Project-Management-Web-App.git
cd taskify
```

### Install Dependencies

```bash
npm install
```

### Setup Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection string.

### Run the Application

To run the application in development mode:

```bash
npm run dev
```

To build and run the application in production mode:

```bash
npm run build
npm start
```

### Docker Setup (Optional)

To build and run the application using Docker:

1. **Build the Docker image**:

    ```bash
    docker build -t taskify .
    ```

2. **Run the Docker container**:

    ```bash
    docker run -p 3000:3000 --env-file .env taskify
    ```

### API Endpoints

- **GET /api/newTask**: Fetch all tasks.
- **POST /api/newTask**: Create a new task.
- **PUT /api/newTask**: Update an existing task.
- **DELETE /api/newTask**: Delete a task.

## Contributing

Contributions are welcome! Please create a pull request or open an issue for any improvements or bugs.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to adjust any sections according to your project's specifics or preferences!
