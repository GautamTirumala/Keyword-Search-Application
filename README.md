# Keyword-Search-Application

**Overview:**
This is a single-page web application that allows users to upload PDF, Excel, and Word files,
and then search for specific keywords within those files. The application will extract and
display sentences containing the keyword(s) along with the document's name in a table format.

**Functionalities:**

1. **User Interface:**
- A user-friendly single-page web application.
- An upload feature that accepts PDF, Excel, and Word files.
- Includes a search bar where users can enter one or more keywords.
- Displays the results in a table format on the same page.
  
2. **Search Functionality:**
- Allows users to enter one or more keywords in the search bar.
- Performes a case-insensitive search for keywords in the text content of uploaded documents.
- Identifies and extract sentences containing the keyword(s).
  
4. **Result Presentation:**
- Displays the sentences containing the keyword(s) along with the name of the document in a
table format.
- Includes pagination for large result sets.
- Highlights the keyword(s) within the displayed sentences for easy identification.
  
5. **Error Handling:**
- Implements error handling and provides informative error messages for common issues, such
as invalid file formats.


**Example:**
Let's say a user visits the application and uploads three files: "Document1.pdf,"
"Spreadsheet.xlsx," and "TextDocument.docx." They then enter the keyword "project" into the
search bar. The application processes the files and displays the following table:
| Document Name       | Sentence                                                           |
|---------------------|-------------------------------------------------------------------|
| Document1.pdf       | "The project team has been working diligently on the project plan." |
| Spreadsheet.xlsx    | "The project budget spreadsheet needs to be updated."              |
| TextDocument.docx   | "The project timeline has been revised due to unexpected delays in the project schedule."                                               

The table lists all the sentences containing the keyword "project" along with the respective
document names.
