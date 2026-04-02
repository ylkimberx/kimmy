// Grading System JS
document.addEventListener('DOMContentLoaded', function() {
  const tbody = document.getElementById('studentRows');
  const addBtn = document.getElementById('addStudentBtn');
  const classSummary = document.getElementById('classSummary');
  const calculateBtn = document.getElementById('calculateBtn');
  const studentName = document.getElementById('studentName');

  // Weighted percentages
  const weights = [0.2, 0.3, 0.1, 0.1, 0.3]; // Quiz, Lab, Assign, Attend, Major

  function createRow(rowIndex = null) {
    const tr = document.createElement('tr');
    const rowId = rowIndex !== null ? rowIndex : tbody.children.length;
    tr.innerHTML = `
      <td><input type="text" placeholder="Student ${rowId + 1}" class="name-input"></td>
      <td><input type="number" min="0" max="100" class="grade-input quiz" placeholder="0"></td>
      <td><input type="number" min="0" max="100" class="grade-input lab" placeholder="0"></td>
      <td><input type="number" min="0" max="100" class="grade-input assign" placeholder="0"></td>
      <td><input type="number" min="0" max="100" class="grade-input attend" placeholder="0"></td>
      <td><input type="number" min="0" max="100" class="grade-input major" placeholder="0"></td>
      <td><span class="total">0.00</span></td>
      <td><button class="delete-btn">🗑</button></td>
    `;
    tbody.appendChild(tr);
    attachRowListeners(tr);
    updateClassAverage();
  }

  function attachRowListeners(row) {
    const gradeInputs = row.querySelectorAll('.grade-input');
    gradeInputs.forEach(input => {
      input.addEventListener('input', function() {
        calculateRowTotal(row);
        updateClassAverage();
      });
    });
    const deleteBtn = row.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
      row.remove();
      updateClassAverage();
    });
  }

  function calculateRowTotal(row) {
    const grades = Array.from(row.querySelectorAll('.grade-input')).map(input => parseFloat(input.value) || 0);
    const total = grades.reduce((sum, grade, i) => sum + grade * weights[i], 0).toFixed(2);
    const totalSpan = row.querySelector('.total');
    totalSpan.textContent = total;
    // Color code
    const color = total >= 90 ? 'green' : total >= 75 ? 'orange' : 'red';
    totalSpan.style.color = color;
  }

  function updateClassAverage() {
    const totals = Array.from(tbody.querySelectorAll('.total')).map(span => parseFloat(span.textContent));
    const avg = totals.length ? (totals.reduce((a, b) => a + b) / totals.length).toFixed(2) : 0;
    classSummary.textContent = `Class Average Final Grade: ${avg}`;
  }

  // Initial rows (6 student rows for 7 total with header)
  for (let i = 0; i < 6; i++) {
    createRow(i);
  }

  addBtn.addEventListener('click', () => createRow());

  // Repurpose calculateBtn for something else or remove old functionality
  calculateBtn.textContent = 'Calculate Class Average';
  calculateBtn.onclick = updateClassAverage;

  // Remove old student name input or repurpose
  studentName.style.display = 'none';
});
