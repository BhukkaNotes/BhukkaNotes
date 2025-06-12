 // Mobile Menu Toggle
 const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
 const navLinks = document.querySelector(".nav-links");

 mobileNavToggle.addEventListener("click", () => {
   navLinks.classList.toggle("active");
   const icon = mobileNavToggle.querySelector("i");
   if (icon.classList.contains("fa-bars")) {
     icon.classList.remove("fa-bars");
     icon.classList.add("fa-times");
   } else {
     icon.classList.remove("fa-times");
     icon.classList.add("fa-bars");
   }
 });

// Grade point values
const gradePoints = {
  "A+": 4.0,
  A: 3.6,
  "B+": 3.2,
  B: 2.8,
  "C+": 2.4,
  C: 2.0,
  "D+": 1.6,
  D: 1.2,
  F: 0.0,
};

// Grade ranking for comparison (higher index = better grade)
const gradeRanking = ["F", "D", "D+", "C", "C+", "B", "B+", "A", "A+"];

// Default subjects with credit hours
const defaultSubjects = [
  { name: "Nepali", theoryCredit: 3.75, practicalCredit: 1.25 },
  { name: "English", theoryCredit: 3.75, practicalCredit: 1.25 },
  { name: "Science", theoryCredit: 3.75, practicalCredit: 1.25 },
  { name: "Compulsory Math", theoryCredit: 3.75, practicalCredit: 1.25 },
  { name: "Social", theoryCredit: 3, practicalCredit: 1 },
  { name: "Computer Science", theoryCredit: 2, practicalCredit: 2 },
  { name: "Optional Math", theoryCredit: 3, practicalCredit: 1 },
];

// DOM elements
const subjectsContainer = document.getElementById("subjects-container");
const addSubjectBtn = document.getElementById("add-subject-btn");
const calculateBtn = document.getElementById("calculate-btn");
const resultCard = document.getElementById("result-card");
const resultBody = document.getElementById("result-body");
const totalCreditHoursEl = document.getElementById("total-credit-hours");
const totalQualityPointsEl = document.getElementById("total-quality-points");
const finalGpaEl = document.getElementById("final-gpa");
const finalGradeEl = document.getElementById("final-grade");
const downloadBtn = document.getElementById("download-btn");

// Count to keep track of subject rows
let subjectCounter = 0;

// Initialize default subjects
window.onload = function () {
  defaultSubjects.forEach((subject) => {
    addSubjectRow(subject.name, subject.theoryCredit, subject.practicalCredit);
  });
};

// Add new subject row
function addSubjectRow(name = "", theoryCredit = "", practicalCredit = "") {
  const subjectId = subjectCounter++;

  const subjectRow = document.createElement("div");
  subjectRow.className = "subject-row";
  subjectRow.id = `subject-${subjectId}`;

  subjectRow.innerHTML = `
        <div class="subject-name">
            <input class="inputs" type="text" id="name-${subjectId}" value="${name}" placeholder="Subject Name" required>
            <div class="error-message">Please enter a subject name</div>
        </div>
        
        <div class="credit-hours">
            <input class="inputs" type="number" id="theory-credit-${subjectId}" value="${theoryCredit}" placeholder="Theory" min="0" step="0.25" required>
            <div class="error-message">Enter valid credit (0 or positive)</div>
        </div>
        
        <div class="grade-select">
            <select id="theory-grade-${subjectId}" required>
                <option value="">Grade</option>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
                <option value="D+">D+</option>
                <option value="D">D</option>
                <option value="F">F</option>
            </select>
            <div class="error-message">Please select a grade</div>
        </div>
        
        <div class="credit-hours">
            <input class="inputs" type="number" id="practical-credit-${subjectId}" value="${practicalCredit}" placeholder="Practical" min="0" step="0.25" required>
            <div class="error-message">Enter valid credit (0 or positive)</div>
        </div>
        
        <div class="grade-select">
            <select id="practical-grade-${subjectId}" required>
                <option value="">Grade</option>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
                <option value="D+">D+</option>
                <option value="D">D</option>
                <option value="F">F</option>
            </select>
            <div class="error-message">Please select a grade</div>
        </div>
        
        <button class="button remove-subject" onclick="removeSubject(${subjectId})">×</button>
    `;

  subjectsContainer.appendChild(subjectRow);
}

// Remove subject row
function removeSubject(id) {
  const subjectRow = document.getElementById(`subject-${id}`);
  if (subjectRow) {
    subjectRow.remove();
  }
}

// Add new subject when button is clicked
addSubjectBtn.addEventListener("click", () => {
  addSubjectRow();
});

// Validate input
function validateInput(
  element,
  isRequired = true,
  isNumber = false,
  min = null
) {
  let isValid = true;
  let errorMsg = element.nextElementSibling;

  // Reset
  element.classList.remove("error");
  errorMsg.style.display = "none";

  // Check required
  if (isRequired && !element.value.trim()) {
    isValid = false;
    errorMsg.style.display = "block";
  }

  // Check number validation
  if (isNumber && isValid) {
    const value = parseFloat(element.value);
    if (isNaN(value) || (min !== null && value < min)) {
      isValid = false;
      errorMsg.style.display = "block";
    }
  }

  // Apply error styling
  if (!isValid) {
    element.classList.add("error");
  }

  return isValid;
}

// Get higher grade between two grades
function getHigherGrade(grade1, grade2) {
  const rank1 = gradeRanking.indexOf(grade1);
  const rank2 = gradeRanking.indexOf(grade2);
  return rank1 > rank2 ? grade1 : grade2;
}

// Convert GPA to letter grade
function gpaToGrade(gpa) {
  if (gpa >= 3.8) return "A+";
  if (gpa >= 3.4) return "A";
  if (gpa >= 3.0) return "B+";
  if (gpa >= 2.6) return "B";
  if (gpa >= 2.2) return "C+";
  if (gpa >= 1.8) return "C";
  if (gpa >= 1.4) return "D+";
  if (gpa >= 1.0) return "D";
  return "F";
}

// Calculate overall grade for a subject
function calculateOverallGrade(
  theoryGrade,
  practicalGrade,
  theoryCredit,
  practicalCredit
) {
  // If only one type of credit exists, return that grade
  if (theoryCredit === 0) return practicalGrade;
  if (practicalCredit === 0) return theoryGrade;

  // Calculate weighted average to determine the overall grade
  const theoryPoints = theoryCredit * gradePoints[theoryGrade];
  const practicalPoints = practicalCredit * gradePoints[practicalGrade];
  const totalPoints = theoryPoints + practicalPoints;
  const totalCredit = theoryCredit + practicalCredit;
  const weightedGPA = totalPoints / totalCredit;
  const calculatedGrade = gpaToGrade(weightedGPA);

  // Apply the "higher of similar grades" rule
  // For example, if calculated grade is B and one of the grades is B+, use B+
  const higherGrade = getHigherGrade(theoryGrade, practicalGrade);

  // Check if the higher grade is in the same "family" as the calculated grade
  const calculatedFirstChar = calculatedGrade.charAt(0);
  const higherFirstChar = higherGrade.charAt(0);

  if (calculatedFirstChar === higherFirstChar) {
    return higherGrade;
  }

  return calculatedGrade;
}

// Check if any subject has an F grade
function hasFailingGrade(subjects) {
  return subjects.some(
    (subject) => subject.theoryGrade === "F" || subject.practicalGrade === "F"
  );
}

// Calculate GPA
calculateBtn.addEventListener("click", () => {
  const subjectRows = document.querySelectorAll(".subject-row");
  if (subjectRows.length === 0) {
    alert("Please add at least one subject to calculate GPA.");
    return;
  }

  let isFormValid = true;
  let subjects = [];

  // Validate and collect data
  subjectRows.forEach((row) => {
    const id = row.id.split("-")[1];

    const nameEl = document.getElementById(`name-${id}`);
    const theoryCreditEl = document.getElementById(`theory-credit-${id}`);
    const theoryGradeEl = document.getElementById(`theory-grade-${id}`);
    const practicalCreditEl = document.getElementById(`practical-credit-${id}`);
    const practicalGradeEl = document.getElementById(`practical-grade-${id}`);

    // Validate each input
    const nameValid = validateInput(nameEl);
    const theoryCreditValid = validateInput(theoryCreditEl, true, true, 0);
    const theoryGradeValid = validateInput(theoryGradeEl);
    const practicalCreditValid = validateInput(
      practicalCreditEl,
      true,
      true,
      0
    );
    const practicalGradeValid = validateInput(practicalGradeEl);

    if (
      !(
        nameValid &&
        theoryCreditValid &&
        theoryGradeValid &&
        practicalCreditValid &&
        practicalGradeValid
      )
    ) {
      isFormValid = false;
    } else {
      subjects.push({
        name: nameEl.value,
        theoryCredit: parseFloat(theoryCreditEl.value),
        theoryGrade: theoryGradeEl.value,
        practicalCredit: parseFloat(practicalCreditEl.value),
        practicalGrade: practicalGradeEl.value,
      });
    }
  });

  if (!isFormValid) {
    return;
  }

  // Calculate GPA
  let totalCredits = 0;
  let totalQualityPoints = 0;
  let hasFailed = hasFailingGrade(subjects);

  // Clear previous results
  resultBody.innerHTML = "";

  // Calculate and display each subject's points
  subjects.forEach((subject) => {
    const theoryPoints =
      subject.theoryCredit * gradePoints[subject.theoryGrade];
    const practicalPoints =
      subject.practicalCredit * gradePoints[subject.practicalGrade];
    const totalSubjectCredit = subject.theoryCredit + subject.practicalCredit;
    const totalSubjectPoints = theoryPoints + practicalPoints;

    totalCredits += totalSubjectCredit;
    totalQualityPoints += totalSubjectPoints;

    // Calculate overall grade for the subject
    const overallGrade = calculateOverallGrade(
      subject.theoryGrade,
      subject.practicalGrade,
      subject.theoryCredit,
      subject.practicalCredit
    );

    // Add to results table with highlighting for failed subjects
    const row = document.createElement("tr");

    // Check if this subject has any failing grade
    const hasTheoryF = subject.theoryGrade === "F";
    const hasPracticalF = subject.practicalGrade === "F";

    row.innerHTML = `
            <td>${subject.name}</td>
            <td>${subject.theoryCredit.toFixed(2)}</td>
            <td class="${hasTheoryF ? "failed-subject" : ""}">${
      subject.theoryGrade
    }</td>
            <td>${subject.practicalCredit.toFixed(2)}</td>
            <td class="${hasPracticalF ? "failed-subject" : ""}">${
      subject.practicalGrade
    }</td>
            <td>${overallGrade}</td>
        `;
    resultBody.appendChild(row);
  });

  // Update summary
  totalCreditHoursEl.textContent = totalCredits.toFixed(2);
  totalQualityPointsEl.textContent = totalQualityPoints.toFixed(2);

  // If any subject has failing grade, show NG instead of GPA
  if (hasFailed) {
    finalGpaEl.textContent = "NG";
    finalGradeEl.textContent = "NG";
  } else {
    // Calculate final GPA
    const finalGPA = totalQualityPoints / totalCredits;
    const finalGrade = gpaToGrade(finalGPA);

    finalGpaEl.textContent = finalGPA.toFixed(2);
    finalGradeEl.textContent = finalGrade;
  }

  // Show result card
  resultCard.style.display = "block";

  // Scroll to results
  resultCard.scrollIntoView({ behavior: "smooth" });
});

// Download as PDF using proper method
downloadBtn.addEventListener("click", () => {
  // Get the content of the result card
  const resultCardContent = document
    .getElementById("result-card")
    .cloneNode(true);

  // Remove the download button from the cloned content
  const downloadBtnToRemove = resultCardContent.querySelector(".download-btn");
  if (downloadBtnToRemove) {
    downloadBtnToRemove.remove();
  }

  // Create a new window for printing
  const printWindow = window.open("", "_blank");

  if (!printWindow) {
    alert("Please allow pop-ups to download the grade sheet.");
    return;
  }

  // Write the HTML content to the new window
  printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>GPA Grade Sheet</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                }
                h2 {
                    color: #1e88e5;
                    font-size: 1.8rem;
                    margin-bottom: 20px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 30px;
                }
                th, td {
                    padding: 12px 15px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }
                th {
                    background-color: #f5f5f5;
                    font-weight: bold;
                    color: #333;
                }
                .summary {
                    background-color: #f9f9f9;
                    padding: 15px;
                    border-radius: 5px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .gpa-display {
                    font-size: 2.5rem;
                    color: #1e88e5;
                    font-weight: bold;
                }
                .grade-display {
                    font-size: 2.5rem;
                    color: #4caf50;
                    font-weight: bold;
                    margin-left: 20px;
                }
                .failed-subject {
                    color: #ff5252;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <h2>GPA Grade Sheet</h2>
            ${resultCardContent.querySelector("table").outerHTML}
            ${resultCardContent.querySelector(".summary").outerHTML}
        </body>
        </html>
    `);

  // Close the document writing
  printWindow.document.close();

  // Wait for content to load before printing
  setTimeout(() => {
    printWindow.print();
    // After printing is done/canceled, focus back on the original window
    window.focus();
  }, 500);
});
