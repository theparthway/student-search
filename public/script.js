function searchStudent() {
    const name = document.getElementById('searchName').value;
    fetch(`/students/search?name=${name}`)
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          document.getElementById('result').innerText = data.message;
        } else {
          const resultDiv = document.getElementById('result');
          resultDiv.innerHTML = ''; // Clear previous results
          data.forEach(student => {
            const studentInfo = document.createElement('div');
            studentInfo.innerText = `Name: ${student.name}, Roll Number: ${student.rollNumber}, Room Number: ${student.roomNumber}`;
            resultDiv.appendChild(studentInfo);
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  