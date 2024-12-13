# React + TypeScript + Vite

# Dynamic Event Calendar Application

## Summary of Features

The **Dynamic Event Calendar Application** is a robust and interactive calendar tool designed to help users manage events efficiently. Below are the key features:

### Core Features
- **Calendar View**:
  - Displays a monthly calendar grid with proper alignment for days.
  - Allows navigation between months using "Previous" and "Next" buttons.
- **Event Management**:
  - Add, edit, or delete events for any selected day.
  - Events include details like name, start time, end time, and an optional description.
  - Prevents overlapping events to ensure scheduling accuracy.
- **Event List**:
  - Shows all events for the selected day in a modal or side panel.
- **Data Persistence**:
  - Events are saved using **localStorage** to ensure they persist across page refreshes.

### Advanced Features
- **Responsive UI**:
  - Clean and modern design built with **shadcn/ui**.
  - Highlights the current day and selected day visually.
  - Differentiates weekends and weekdays for better usability.
- **Complex Logic**:
  - Handles month transitions seamlessly (e.g., from Jan 31 to Feb 1).
  - Allows filtering of events by keywords.

### Bonus Features
- Drag-and-drop functionality to reschedule events between days.
- Color-coded events based on categories (e.g., Work, Personal, Others).
- Export event data for a specific month as **JSON** or **CSV**.

---

## Instructions to Run the App Locally

### Prerequisites
- Ensure **Node.js** and **npm** are installed on your system.

### Steps to Run

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/dynamic-event-calendar.git
   cd dynamic-event-calendar
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm start
   ```

4. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000` to view the app.

---

## Deployment

The application is deployed for easy access. You can try it out here: [Live Demo Link](https://your-deployment-link.vercel.app).

---

## Contribution

Contributions are welcome! If you have ideas or improvements, feel free to fork the repository, make changes, and submit a pull request.
