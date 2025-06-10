document.getElementById("contactForm").addEventListener("submit", function (e) {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (name === "") {
      alert("Name is required!");
      e.preventDefault();
    } else if (!emailPattern.test(email)) {
      alert("Enter a valid email address!");
      e.preventDefault();
    }
  });

  function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") return;

    const li = document.createElement("li");
    li.innerHTML = `${taskInput.value} <span class="delete" onclick="this.parentElement.remove()">×</span>`;
    taskList.appendChild(li);
    taskInput.value = "";
  }