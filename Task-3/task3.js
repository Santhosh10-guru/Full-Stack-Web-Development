const quizData = [
    {
      question: "What does CSS stand for?",
      options: ["Cascading Style Sheets", "Computer Styled Sections", "Creative Style System"],
      answer: "Cascading Style Sheets"
    },
    {
      question: "Which language runs in a web browser?",
      options: ["Java", "C", "JavaScript"],
      answer: "JavaScript"
    }
  ];

  const quizContainer = document.getElementById("quiz-container");

  quizData.forEach((q, index) => {
    const div = document.createElement("div");
    div.innerHTML = `<p>${q.question}</p>` + q.options.map(opt =>
      `<label><input type="radio" name="q${index}" value="${opt}"> ${opt}</label><br>`
    ).join("");
    quizContainer.appendChild(div);
  });

  function submitQuiz() {
    let score = 0;
    quizData.forEach((q, index) => {
      const selected = document.querySelector(`input[name="q${index}"]:checked`);
      if (selected && selected.value === q.answer) score++;
    });
    document.getElementById("quiz-result").textContent = `You scored ${score} out of ${quizData.length}`;
  }

  // Joke API Code
  function getJoke() {
    fetch("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" }
    })
    .then(res => res.json())
    .then(data => {
      document.getElementById("joke").textContent = data.joke;
    })
    .catch(err => {
      document.getElementById("joke").textContent = "Failed to fetch joke.";
      console.error(err);
    });
  }

  const images = document.querySelectorAll('#carousel img');
  let current = 0;

  function showImage(index) {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
  }

  function nextImage() {
    current = (current + 1) % images.length;
    showImage(current);
  }

  function prevImage() {
    current = (current - 1 + images.length) % images.length;
    showImage(current);
  }