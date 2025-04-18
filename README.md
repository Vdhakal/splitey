# Splitey - Splitwise Clone

This project is a clone of Splitwise, built with:

*   **Frontend:** Expo (React Native) with React Native Paper
*   **Backend:** .NET Core Web API
*   **Database:** MySQL (planned)
*   **Containerization:** Docker
*   **CI/CD:** GitHub Actions

## Project Structure

```
splitey/
├── .github/        # GitHub Actions workflows
│   └── workflows/
├── backend/        # .NET Core API project
├── database/       # SQL scripts, schema definitions
├── docker/         # Dockerfiles, docker-compose.yml
├── frontend/       # Expo (React Native) project
├── .gitignore      # Git ignore file
└── README.md       # This file
```

## Running Locally

### Prerequisites

*   Node.js and npm/yarn
*   .NET SDK (version 8.0 or later recommended)
*   Docker Desktop (optional, for running containerized)
*   Expo Go app (optional, for running on mobile device)

### Frontend (Expo)

1.  Navigate to the `frontend` directory: `cd frontend`
2.  Install dependencies: `npm install` (or `yarn install`)
3.  Run the development server:
    *   Web: `npm run web`
    *   Android: `npm run android`
    *   iOS: `npm run ios`

### Backend (.NET Core API)

1.  Navigate to the `backend` directory: `cd backend`
2.  Trust the HTTPS development certificate (if not already done):
    ```bash
    dotnet dev-certs https --trust
    ```
3.  Run the API: `dotnet run`
    *   The API will be available at `http://localhost:5000` and `https://localhost:5001`.
    *   Swagger UI is available at `https://localhost:5001/swagger`.

### Docker (Optional)

1.  Ensure Docker Desktop is running.
2.  Navigate to the `docker` directory: `cd docker`
3.  Build and run the services (backend only for now): `docker-compose up --build`
    *   *(Note: Database service is currently commented out in `docker-compose.yml`)*
