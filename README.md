# GradeFlow — Student Result & Grade Calculator

A responsive student result calculator built with plain HTML, CSS and JavaScript.

## Files
- `index.html` — page structure and form
- `style.css` — responsive styling, themes, animations and print layout
- `script.js` — validation, calculations, grading and interactions

## Run the project
1. Download and extract the ZIP.
2. Open the `student-result-grade-calculator` folder in VS Code.
3. Open `index.html` in your browser, or use the VS Code Live Server extension.

No build tools or dependencies are required. Google Fonts are loaded online; system fonts will be used if offline.

## 🚀 Live Demo

Check out the live website here:

🔗[**GradeFlow – Student Result Calculator**](https://gradeflow-student-result-calculator-nine.vercel.app/)

## Features
- Student name and five subject mark inputs
- Validation for missing marks and values outside 0–100
- Total, percentage, average, grade and pass/fail result
- Subject-wise status table
- Animated percentage progress bar and performance message
- Dark/light theme toggle (saved in localStorage)
- Reset and print-results options
- Responsive layout for desktop, tablet and mobile

## Grading criteria
| Percentage | Grade |
|---|---|
| 90–100% | A+ |
| 80–89.99% | A |
| 70–79.99% | B |
| 60–69.99% | C |
| 50–59.99% | D |
| 35–49.99% | E |
| Below 35% | F |

A student passes only if they score at least 35 marks in **each** subject. A score below 35 in any one subject results in an overall Fail, even if the overall percentage is 35% or higher.

Each subject is out of 100, so the maximum total is 500.
