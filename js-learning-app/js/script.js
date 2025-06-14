document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme') || 'light';

    body.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
      const newTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      body.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
      const icon = themeToggle.querySelector('i');
      if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }
    }

    const lessons = [
      { title: 'Day 1: Variables', content: 'Learn about <code>let</code>, <code>const</code>, and <code>var</code>:', code: "let message = 'Hello World';\nconsole.log(message);" },
      { title: 'Day 2: Data Types', content: 'Learn about different data types in JavaScript:', code: "let number = 42;\nlet string = 'Hello';\nlet boolean = true;\nconsole.log(number, string, boolean);" },
      { title: 'Day 3: Operators', content: 'Learn about different operators in JavaScript:', code: "let a = 10;\nlet b = 5;\nconsole.log(a + b);\nconsole.log(a - b);\nconsole.log(a * b);\nconsole.log(a / b);" },
      { title: 'Day 4: Control Structures', content: 'Learn about if, else, and switch statements:', code: "let age = 18;\nif (age >= 18) {\n  console.log('Adult');\n} else {\n  console.log('Minor');\n}" },
      { title: 'Day 5: Loops', content: 'Learn about for, while, and do-while loops:', code: "for (let i = 0; i < 5; i++) {\n  console.log(i);\n}" },
      // Add more lessons here up to Day 60
    ];

    const quizzes = [
      { question: 'What does <code>let</code> do?', options: ['A. Declares a constant', 'B. Declares a block-scoped variable', 'C. Declares a global variable'], answer: 'B' },
      { question: 'What is the output of <code>console.log(typeof 42)</code>?', options: ['A. "number"', 'B. "string"', 'C. "boolean"'], answer: 'A' },
      { question: 'What is the result of <code>10 + 5</code>?', options: ['A. 15', 'B. 105', 'C. 5'], answer: 'A' },
      { question: 'Which statement is used to make decisions in JavaScript?', options: ['A. if', 'B. for', 'C. while'], answer: 'A' },
      { question: 'Which loop will execute at least once?', options: ['A. for', 'B. while', 'C. do-while'], answer: 'C' },
      // Add more quizzes here
    ];

    let currentDay = 0;

    function loadLesson(day) {
      const lesson = lessons[day];
      document.getElementById('lesson-title').innerHTML = lesson.title;
      document.getElementById('lesson-content').innerHTML = lesson.content;
      document.getElementById('code-editor').value = lesson.code;
      document.getElementById('progress').textContent = `Day ${day + 1}/60`;
    }

    function loadQuiz(day) {
      const quiz = quizzes[day % quizzes.length];
      document.getElementById('quiz-question').innerHTML = quiz.question;
      const options = document.querySelectorAll('.quiz-option');
      options.forEach((option, index) => {
        option.textContent = quiz.options[index];
        option.onclick = () => {
          const feedback = document.getElementById('quiz-feedback');
          if (quiz.options[index].includes(quiz.answer)) {
            feedback.textContent = 'Correct!';
            feedback.style.color = 'green';
          } else {
            feedback.textContent = 'Incorrect. Try again!';
            feedback.style.color = 'red';
          }
        };
      });
    }

    document.getElementById('run-code').addEventListener('click', () => {
      const code = document.getElementById('code-editor').value;
      const output = document.getElementById('output');
      try {
        const result = eval(code);
        output.textContent = result !== undefined ? result : 'Code executed successfully!';
      } catch (error) {
        output.textContent = `Error: ${error.message}`;
      }
    });

    document.getElementById('prev-day').addEventListener('click', () => {
      if (currentDay > 0) {
        currentDay--;
        loadLesson(currentDay);
        loadQuiz(currentDay);
      }
    });

    document.getElementById('next-day').addEventListener('click', () => {
      if (currentDay < lessons.length - 1) {
        currentDay++;
        loadLesson(currentDay);
        loadQuiz(currentDay);
      }
    });

    loadLesson(currentDay);
    loadQuiz(currentDay);
  });
