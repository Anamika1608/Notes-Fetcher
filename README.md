# NotesFetcher

This project allows users to fetch and view notes based on selected branch, semester, and subject. It includes a dynamic selection process and displays notes in an embedded iframe. 

## Features 

- **Step-by-Step Selection**: Users select their branch, semester, and subject in a guided process.
- **Dynamic Dropdowns**: Subject options are dynamically populated based on the selected branch and semester.
- **Loader Component**: Displays a spinning loader while the notes are being fetched.
- **Error Handling**: Custom error messages are displayed if notes are not available.
- **Responsive Design**: The component layout adjusts for different screen sizes.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Anamika1608/Notes-Fetcher.git
   cd Notes-Fetcher
   ```

2. **Install dependencies**:

   Ensure that you have Node.js and npm installed. Then, run:

   ```bash
   npm install
   ```

## Usage

1. **Run the development server**:

   Start the development server with:

   ```bash
   npm run dev
   ```

   This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

2. **Accessing the Component**:

   The `NotesFetcher` component can be accessed through the main page. Use the dropdowns to select your branch, semester, and subject, then click "Get Notes" to fetch and view the notes.

## Code Overview

### `NotesFetcher.js`

- **State Management**: 
  - `useState` is used for managing branch, semester, subject, note URL, current step, loading, and error states.
  - `useEffect` is utilized to update the current step based on the user's selection.
  - `useMemo` is employed for memoizing the subject options based on selected branch and semester.

- **Components**:
  - **Loader**: A simple spinner that displays while loading.
  - **renderSelectBox**: A reusable function for rendering dropdown select boxes.
  - **renderStep**: A function that renders each step in the selection process.
  - **fetchNoteUrl**: Fetches the URL of the notes based on user selections.

- **Layout**:
  - The component is divided into two main sections:
    - **Sidebar**: Contains the selection steps.
    - **Main Content Area**: Displays the notes in an iframe or a placeholder when no notes are selected.

