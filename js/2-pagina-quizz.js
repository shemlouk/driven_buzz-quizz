// axios
//   .get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
//   .then((response) => {
//     const quizz = response.data[3];
//     });
  const local = localStorage.getItem("StringSelectedQuizz");
  const quizz = JSON.parse(local);

    console.log(quizz);
    loadPage(quizz);

function loadPage(obj) {
  loadBanner(obj.title, String(obj.image));
  loadQuestions(obj.questions);
}

//======= LOAD PAGE ===========================================================

function loadBanner(text, imageUrl) {
  const image = document.querySelector('[data-quizz="image"]');
  const title = document.querySelector('[data-quizz="title"]');
  image.setAttribute("src", imageUrl);
  title.innerHTML = text;
}

function loadQuestions(qts) {
  const questions = document.querySelector('[data-quizz="questions"]');
  questions.innerHTML = "";
  qts.forEach((obj) => {
    const constrast = adjustContrastFor(obj.color);
    const question = createHtmlElement("li", ["question"]);
    const title = createHtmlElement("p", ["question__title"], obj.title);
    title.setAttribute(
      "style",
      `background-color:${obj.color}; color: ${constrast};`
    );
    const answers = loadAnswers(obj.answers);
    question.appendChild(title);
    question.appendChild(answers);
    questions.appendChild(question);
  });
}

function adjustContrastFor(color) {
  const hex = color.substring(1);
  let colors = hex.match(/(..)/g);
  colors = colors.map((code) => {
    return parseInt(code, 16);
  });
  const sumColors = colors.reduce((sum, element) => sum + element, 0);
  const ratio = (sumColors / 255) * 3;
  const newColor = ratio <= 0.5 ? "#FFFFFF" : "#000000";
  return newColor;
}

function loadAnswers(ans) {
  const answers = createHtmlElement("div", ["question__answers"]);
  const list = [];
  ans.forEach((obj) => {
    const booleanString = obj.isCorrectAnswer === true ? "true" : "";
    const html = `<figure class="answer__image">
                    <img src="${obj.image}" alt="imagem da resposta" />
                  </figure>
                  <p class="answer__text">${obj.text}</p>`;
    const answer = createHtmlElement("div", ["answer"], html);
    answer.setAttribute("data-answer", booleanString);
    list.push(answer);
  });
  addSelectEvent(list);
  list.sort(() => {
    return Math.random() - 0.5;
  });
  list.forEach((item) => {
    answers.appendChild(item);
  });

  return answers;
}

//======= SELECT EVENTS =======================================================

function addSelectEvent(answers) {
  answers.forEach((answer) => {
    answer.addEventListener("click", (e) => {
      const selectedAnswer = e.currentTarget;
      selectAnswer(selectedAnswer);
    });
  });
}

function selectAnswer(answer) {
  const answersContainer = answer.parentNode;
  const validation = answersContainer.getAttribute("data-answers");
  if (!validation) {
    const allAnswers = answersContainer.querySelectorAll(".answer");
    allAnswers.forEach((ans) => {
      const answerText = ans.querySelector(".answer__text");
      const answerValue = ans.getAttribute("data-answer");
      const style = answerValue ? "right-answer" : "wrong-answer";
      answerText.classList.add(style);
      if (ans === answer) return;
      ans.classList.add("opaque");
    });
    answersContainer.setAttribute("data-answers", "locked");
    setTimeout(() => {
      scrollToNextQuestion(answer);
    }, 1500);
  }
}

function scrollToNextQuestion(answer) {
  const currentQuestion = answer.parentNode.parentNode;
  const allQuestions = Array.from(document.querySelectorAll(".question"));
  const currentIndex = allQuestions.indexOf(currentQuestion);
  const index =
    currentIndex === allQuestions.length - 1 ? currentIndex : currentIndex + 1;
  allQuestions[index].scrollIntoView({ behavior: "smooth", block: "center" });
}

//======= GENERAL =============================================================

function createHtmlElement(tag, classes, content) {
  const element = document.createElement(tag);
  if (classes !== undefined) {
    classes.forEach((htmlClass) => {
      element.classList.add(htmlClass);
    });
  }
  if (content !== undefined) {
    element.innerHTML = content;
  }
  return element;
}
