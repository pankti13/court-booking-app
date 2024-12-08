# Admin Panel Application
This repository contains a React-based Admin Panel application. The Admin Panel allows users to manage sports centres and their associated sports. It provides an intuitive interface to add new centres, associate sports with existing centres, and view all centres with their respective sports.
## Features
- Dashboard View: Displays all centres and their associated sports.
- Centre Management: Allows users to add new sports centres.
- Sport Management: Enables users to add sports to existing centres.
- Dynamic Dropdowns: Fetch centres dynamically for sport addition.
- Real-Time Notifications: Get feedback on actions like adding centres or sports.
- Responsive Design: A clean layout designed using Ant Design components.
## Installation
Clone the repository:
```
git clone https://github.com/pankti13/court-booking-app.git
```
Install dependencies:
```
npm install
```
Start the development server:
```
node server.js
```
Start the frontend server:
```
npm vite
```
The app will be accessible at http://localhost:5173
## API Endpoints
This application interacts with a backend server for data management. Ensure the backend server is running and accessible.

### Backend Requirements
Base URL: http://localhost:5000

### Endpoints:
GET /api/centre/all: Fetch all centres.
POST /api/centre/new: Add a new centre.
POST /api/centre/:centreId/addsport: Add a sport to a specific centre.

## Project Structure
```
src/
├── components/
├── pages/
│   ├── Home.jsx           # HomePage
│   ├── AddminPanel.jsx    # Main admin panel with layout
├── App.jsx                # Entry point for the app

```

## Usage
### Navigate Between Sections:
- Dashboard: View all centres and their sports.
- Centres: Add new sports centres.
- Sports: Add sports to a selected centre.
### Add a Centre: 
- Go to the Centres tab.
- Enter the name of the new centre and click Add Centre.
### Add a Sport: Go to the Sports tab.
- Select a centre from the dropdown.
- Enter the sport name and click Add Sport to Centre.
### View Dashboard: 
- Go to the Dashboard tab to view all centres and their associated sports.

## Dependencies
- React: Frontend framework.
- Ant Design: UI component library.
- Axios: HTTP client for API interactions.
- Node.js: Development runtime.

## Screenshots
![{8096160A-C008-41BB-8EE2-389ED7CD4849}](https://github.com/user-attachments/assets/3a947e91-54db-4dbe-9ea6-8aeb12756237)
![image](https://github.com/user-attachments/assets/f9b59d9a-1212-44fc-9b25-e739055a6274)
![image](https://github.com/user-attachments/assets/acaada82-9106-49a4-83b8-6bd8b6f9317c)
![image](https://github.com/user-attachments/assets/28021a27-77a6-4f4d-881e-2766bf8f7fc7)


