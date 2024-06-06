async function searchStudent() {
  const searchName = document.getElementById('searchName').value;
  const searchRoom = document.getElementById('searchRoom').value;
  let query = '';

  if (searchName) {
    query = `name=${searchName}`;
  } else if (searchRoom) {
    query = `room=${searchRoom}`;
  }

  if (query) {
    const response = await fetch(`/students/search?${query}`);
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (response.ok) {
      const students = await response.json();
      students.forEach(student => {
        const studentDiv = document.createElement('div');
        studentDiv.className = 'bg-gray-700 p-4 rounded-lg shadow-md';
        studentDiv.innerHTML = `
          <p><strong>Name:</strong> ${student.name}</p>
          <p><strong>Roll Number:</strong> ${student.rollNumber}</p>
          <p><strong>Room Number:</strong> ${student.roomNumber}</p>
        `;
        resultDiv.appendChild(studentDiv);
      });
    } else {
      const error = await response.json();
      resultDiv.innerHTML = `<p class="text-red-500">${error.message}</p>`;
    }
  } else {
    alert('Please enter a student name or room number to search.');
  }
}
