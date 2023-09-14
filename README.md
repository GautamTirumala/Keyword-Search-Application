# Keyword-Search-Application

### Overview :
This is a single-page web application that allows users to upload PDF, Excel, and Word files, and then search for specific keywords within those files. The application will extract and display sentences containing the keyword(s) along with the document's name in a table format. Additionally, to ensure data privacy, all uploaded files are automatically deleted when the user's session ends or on page reload.

### Table of Contents

- [Keyword-Search-Application](#keyword-search-application)
    - [Overview :](#overview-)
    - [Table of Contents](#table-of-contents)
  - [Functionalities:](#functionalities)
    - [1. User Interface:](#1-user-interface)
    - [2. Search Functionality:](#2-search-functionality)
    - [3. Result Presentation:](#3-result-presentation)
    - [4. Error Handling:](#4-error-handling)
  - [Example:](#example)
  - [Installation](#installation)
      - [How to Setup](#how-to-setup)
  - [How to Run](#how-to-run)
  - [API Documentation](#api-documentation)
  - [Base URL](#base-url)
  - [Endpoints](#endpoints)
    - [Upload Files](#upload-files)
    - [Clean Up Files](#clean-up-files)
    - [Search for Keyword](#search-for-keyword)






## Functionalities:

### 1. User Interface:
- A user-friendly single-page web application.
- An upload feature that accepts PDF, Excel, and Word files.
- Includes a search bar where users can enter one or more keywords.
- Displays the results in a table format on the same page.
  
### 2. Search Functionality:
- Allows users to enter one or more keywords in the search bar.
- Performes a case-insensitive search for keywords in the text content of uploaded documents.
- Identifies and extract sentences containing the keyword(s).
  
### 3. Result Presentation:
- Displays the sentences containing the keyword(s) along with the name of the document in a
table format.
- Highlights the keyword(s) within the displayed sentences for easy identification.
  
### 4. Error Handling:
- Implements error handling and provides informative error messages for common issues, such
as invalid file formats.


## Example:
Let's say a user visits the application and uploads three files: "Document1.pdf,"
"Spreadsheet.xlsx," and "TextDocument.docx." They then enter the keyword "project" into the
search bar. The application processes the files and displays the following table:
| Document Name    | Sentence                                                                                         |
|------------------|-------------------------------------------------------------------------------------------------|
| Document1.pdf    | "The project team has been working diligently on the project plan."                                |
| Spreadsheet.xlsx | "The project budget spreadsheet needs to be updated."                                             |
| TextDocument.docx| "The project timeline has been revised due to unexpected delays in the project schedule."       |
                                            

The table lists all the sentences containing the keyword "project" along with the respective
document names.

## Installation

#### How to Setup

To set up the Keyword-Search-Application on your local system, follow these steps:

1. **Download or Clone the Project**

   - You have two options:
     - Download the project as a zip file.
     - Use Git to clone the project to your local system:
       ```bash
       git clone https://github.com/GautamTirumala/Keyword-Search-Application.git
       ```

   This will provide you with the project files and directories. Which will look like :

<details open>
  <summary>Keyword-Search-Application</summary>
  
  - client
  - server

</details>


To install the necessary dependencies for both the "client" and "server" components, follow these steps:

1. **Client Installation**

   - Open your terminal.
   - Navigate to the "client" directory using the `cd` command:
     ```bash
     cd client
     ```
   - Run the following command to install all the dependent `node_modules`:
     ```bash
     npm install
     ```

2. **Server Installation**

   - Open your terminal.
   - Navigate to the "server" directory using the `cd` command:
     ```bash
     cd server
     ```
   - Run the following command to install all the dependent `node_modules`:
     ```bash
     npm install
     ```

   These commands will ensure that all required dependencies are installed for both the client and server components.

## How to Run

To start using the Keyword-Search-Application, follow these steps:

1. **Client**

   - Open your terminal.
   - Navigate to the "client" directory:
     ```bash
     cd client
     ```
   - Run the following command to start the client application:
     ```bash
     npm start
     ```

   The client application will automatically start and run on `http://localhost:3000`.

2. **Server**

   - Open your terminal.
   - Navigate to the "server" directory:
     ```bash
     cd server
     ```
   - Run the following command to start the server application:
     ```bash
     node app.js
     ```

   The server application will be running on `http://localhost:5000`.

   These steps will launch the client and server components of the Keyword-Search-Application.

## API Documentation

The Keyword Search Application provides API endpoints for uploading files, searching for a keyword within those files (PDF, Excel, and Word documents), and cleaning up uploaded files.

## Base URL

- Base URL: `http://localhost:5000` (Change the URL if your server is running on a different address or port)

## Endpoints

### Upload Files

- **URL:** `/api/upload`
- **Method:** POST
- **Description:** Upload one or more files to the server.
- **Request Body:** Multipart/form-data with files attached.
- **Response:**
  - Status: 200 OK
  - Body: `{ message: 'Files uploaded successfully' }`

### Clean Up Files

- **URL:** `/api/cleanup`
- **Method:** DELETE
- **Description:** Delete all uploaded files and the upload directory.
- **Response:**
  - Status: 200 OK (If no files exist)
  - Status: 200 OK (If files are successfully deleted)
  - Status: 500 Internal Server Error (If an error occurs during cleanup)

### Search for Keyword

- **URL:** `/api/search`
- **Method:** POST
- **Description:** Search for a keyword within uploaded files (PDF, Excel, and Word documents).
- **Request Body:** JSON object with the following structure:
  ```json
  {
    "keyword": "your_keyword_here"
  }
- **Response:**
    - **Status:** 200 OK
    - **Body:** An array of search results, each containing:
        - `fileName`: The name of the file.
        - `fileType`: The file type (e.g., "pdf").
        - `results`: An array of search results within the file.

### Deployment

### Deploying the Node.js Server

To deploy the Node.js server of the Keyword-Search-Application, follow these steps:

1. **Navigate to the Server Directory:**

   Use the `cd` command in your terminal to navigate to the "server" directory of your project:

   ```bash
   cd server
    ```
2. **Prepare Your Server:**

    Set up your hosting environment or server, ensuring Node.js is installed, and dependencies are installed using npm install.

3. **Start the Server:**

    Start your Node.js server with:
        ```
        node app.js
        ```
4. **Deployment:**

    Configure your server for continuous operation. You can use tools like PM2 or deploy on platforms like Heroku, AWS, or Azure. Remember to update your URL endpoints as needed for the deployment environment.

    Ensure your server is configured securely and can handle required-level traffic.


### Deploying the React Client

To deploy the React client of the Keyword-Search-Application, follow these steps:

1. **Adjust URL Endpoints:** Ensure that you adjust your URL endpoints to align with the Node.js backend when deploying. This step is crucial to ensure the proper functioning of your application in its new environment.
2. **Navigate to the Client Directory:**

   Use the `cd` command in your terminal to navigate to the "client" directory of your project:

   ```bash
   cd client 
   ```
3. **Build the Client Application:**

    To build the React client application, follow these steps:

    ```bash
    npm run build
    ```
    This command will create a production-ready build in the "build" directory.
4. **Deployment:**
    To deploy the application, follow these steps:
        
    - **Upload Files:** Deploy the contents of the "build" folder to your chosen hosting platform or server.

