let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

function saveData() {
  localStorage.setItem("students", JSON.stringify(students));
}

function renderTable() {
  let table = document.getElementById("tableBody");
  table.innerHTML = "";

  students.forEach((s, index) => {
    let row = document.createElement("tr");

    row.innerHTML = `
      <td>${s.name}</td>
      <td>${s.email}</td>
      <td>${s.age}</td>
      <td>${s.course}</td>
      <td>
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;

    table.appendChild(row);
  });
}

function addStudent() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let age = document.getElementById("age").value.trim();
  let course = document.getElementById("course").value;

  //  validation
  if (name === "" || email === "" || age === "" || course === "") {
    alert("Please fill all fields");
    return;
  }

  if (!email.includes("@")) {
    alert("Invalid email");
    return;
  }

  let data = { name, email, age, course };

  if (editIndex === -1) {
    students.push(data);
  } else {
    students[editIndex] = data;
    editIndex = -1;
  }

  saveData();
  renderTable();
  clearForm();
}

function editStudent(index) {
  let s = students[index];

  document.getElementById("name").value = s.name;
  document.getElementById("email").value = s.email;
  document.getElementById("age").value = s.age;
  document.getElementById("course").value = s.course;

  editIndex = index;
}

function deleteStudent(index) {
  students.splice(index, 1);
  saveData();
  renderTable();
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("age").value = "";
  document.getElementById("course").value = "";
}

//  load data
renderTable();