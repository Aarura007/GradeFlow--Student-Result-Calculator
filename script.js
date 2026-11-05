// GradeFlow — result calculator logic
const subjects = [
  { id: "maths", name: "Mathematics" },
  { id: "physics", name: "Physics" },
  { id: "chemistry", name: "Chemistry" },
  { id: "english", name: "English" },
  { id: "computer", name: "Computer Science" }
];

const form = document.getElementById("resultForm");
const message = document.getElementById("formMessage");
const emptyState = document.getElementById("emptyState");
const resultContent = document.getElementById("resultContent");
const themeToggle = document.getElementById("themeToggle");

function getGrade(percentage) {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B";
  if (percentage >= 60) return "C";
  if (percentage >= 50) return "D";
  if (percentage >= 35) return "E";
  return "F";
}

function getPerformanceMessage(percentage, passed) {
  if (!passed) return "A setback is a setup for a comeback. Keep practising!";
  if (percentage >= 90) return "Outstanding work! You're setting the bar high.";
  if (percentage >= 80) return "Excellent performance. Keep that momentum going!";
  if (percentage >= 70) return "Great work! You're building strong progress.";
  if (percentage >= 60) return "Good effort. A little more focus can take you higher.";
  if (percentage >= 50) return "You're getting there. Keep showing up and improving.";
  return "You made it through. Keep learning and aim even higher!";
}

function showError(text, inputToFocus) {
  message.textContent = text;
  if (inputToFocus) inputToFocus.focus();
}

function calculateResult(event) {
  event.preventDefault();
  message.textContent = "";

  const studentName = document.getElementById("studentName").value.trim();
  const marks = [];

  for (const subject of subjects) {
    const input = document.getElementById(subject.id);
    const rawValue = input.value.trim();

    if (rawValue === "") {
      showError(`Please enter marks for ${subject.name}.`, input);
      return;
    }

    const mark = Number(rawValue);
    if (!Number.isFinite(mark) || mark < 0 || mark > 100) {
      showError(`${subject.name}: enter a valid mark between 0 and 100.`, input);
      return;
    }

    marks.push({ ...subject, mark });
  }

  const total = marks.reduce((sum, subject) => sum + subject.mark, 0);
  const average = total / subjects.length;
  const percentage = (total / 500) * 100;
  const passed = marks.every(subject => subject.mark >= 35);
  const grade = getGrade(percentage);

  document.getElementById("percentageValue").textContent = percentage.toFixed(2);
  document.getElementById("gradeValue").textContent = grade;
  document.getElementById("totalValue").innerHTML = `${formatNumber(total)} <small>/ 500</small>`;
  document.getElementById("averageValue").textContent = average.toFixed(2);
  document.getElementById("performanceMessage").textContent = getPerformanceMessage(percentage, passed);
  document.getElementById("progressCaption").textContent = `${percentage.toFixed(2)}% achieved`;
  document.getElementById("resultSubtitle").textContent = studentName ? `Here's the academic snapshot for ${studentName}.` : "Here's your academic snapshot.";
  document.getElementById("resultName").textContent = studentName ? `Prepared for ${studentName}` : "Prepared for student";

  const statusBadge = document.getElementById("statusBadge");
  statusBadge.textContent = passed ? "PASSED" : "NEEDS IMPROVEMENT";
  statusBadge.className = `result-status ${passed ? "status-pass" : "status-fail"}`;

  const gradeCircle = document.getElementById("gradeCircle");
  gradeCircle.classList.toggle("grade-fail", !passed);

  const tableBody = document.getElementById("subjectTableBody");
  tableBody.innerHTML = marks.map(subject => {
    const subjectPassed = subject.mark >= 35;
    return `<tr>
      <td>${subject.name}</td>
      <td>${formatNumber(subject.mark)} / 100</td>
      <td><span class="table-status ${subjectPassed ? "pass" : "fail"}">${subjectPassed ? "PASS" : "FAIL"}</span></td>
    </tr>`;
  }).join("");

  emptyState.classList.add("hidden");
  resultContent.classList.remove("hidden");

  // Update the progress bar after the browser paints the result card.
  requestAnimationFrame(() => {
    document.getElementById("progressFill").style.width = `${percentage}%`;
  });

  document.getElementById("resultPanel").scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function formatNumber(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

form.addEventListener("submit", calculateResult);

form.addEventListener("reset", () => {
  message.textContent = "";
  resultContent.classList.add("hidden");
  emptyState.classList.remove("hidden");
  document.getElementById("progressFill").style.width = "0%";
  document.getElementById("statusBadge").textContent = "AWAITING";
  document.getElementById("statusBadge").className = "result-status status-pending";
  document.getElementById("resultSubtitle").textContent = "Your academic summary will appear here.";
});

document.getElementById("printButton").addEventListener("click", () => window.print());

// Restore the selected theme during this browser session.
const savedTheme = localStorage.getItem("gradeflow-theme");
if (savedTheme === "light") document.body.classList.add("light-theme");
updateThemeButton();

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  const theme = document.body.classList.contains("light-theme") ? "light" : "dark";
  localStorage.setItem("gradeflow-theme", theme);
  updateThemeButton();
});

function updateThemeButton() {
  const isLight = document.body.classList.contains("light-theme");
  document.getElementById("themeIcon").textContent = isLight ? "☾" : "☀";
  document.getElementById("themeText").textContent = isLight ? "Dark mode" : "Light mode";
}
