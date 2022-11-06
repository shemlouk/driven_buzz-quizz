const restartButton = document.querySelector('[data-quizz="restart"]');
const rightAnswerSound = new Audio("../assets/right-answer.mp3");
const wrongAnswerSound = new Audio("../assets/wrong-answer.mp3");
wrongAnswerSound.volume = 0.4;
const clickSound = new Audio("../assets/click-sound.mp3");
const quizz = getQuizz();
const selectedAnswers = [];

//======= START PAGE ==========================================================

restartButton.addEventListener("click", () => {
  clickSound.play();
  const result = document.querySelector(".quizz-result");
  const firstQuestion = document.querySelector(".question");
  result.classList.add("disappear");
  setTimeout(() => {
    firstQuestion.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 200);
  setTimeout(() => {
    resetQuizz();
    result.classList.remove("disappear");
  }, 500);
});

loadPage(quizz);

//======= GET QUIZZ ===========================================================

function getQuizz() {
  const local = localStorage.getItem("StringSelectedQuizz");
  const obj = JSON.parse(local);
  console.log(obj);
  return obj;
}

//======= LOAD PAGE ===========================================================

function loadPage(obj) {
  loadBanner(obj.title, String(obj.image));
  loadQuestions(obj.questions);
}

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
  const ratio = sumColors / (255 * 3);
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

//======= SELECT ANSWER =======================================================

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
  const validation = answersContainer.getAttribute("data-disable");
  if (!validation) {
    selectedAnswers.push(answer);
    answer.classList.add("grow");
    if (verifiesIfFinished()) {
      finishQuizz();
    }
    const allAnswers = answersContainer.querySelectorAll(".answer");
    allAnswers.forEach((ans) => {
      ans.classList.add("noHover");
      const answerText = ans.querySelector(".answer__text");
      const answerValue = ans.getAttribute("data-answer");
      const style = answerValue ? "right-answer" : "wrong-answer";
      answerText.classList.add(style);
      if (ans === answer) {
        answersContainer.parentNode.classList.add("outline-" + style);
        if (style === "right-answer") {
          rightAnswerSound.play();
        } else {
          wrongAnswerSound.play();
        }
        return;
      }
      ans.classList.add("opaque");
    });
    answersContainer.setAttribute("data-disable", "true");
    setTimeout(() => {
      scrollToNextQuestion(answer);
    }, 1500);
  }
}

function verifiesIfFinished() {
  const qtyQuestions = quizz.questions.length;
  return qtyQuestions === selectedAnswers.length;
}

function scrollToNextQuestion(answer) {
  const currentQuestion = answer.parentNode.parentNode;
  const allQuestions = Array.from(document.querySelectorAll(".question"));
  const currentIndex = allQuestions.indexOf(currentQuestion);
  if (currentIndex === allQuestions.length - 1) return;
  const index = currentIndex + 1;
  allQuestions[index].scrollIntoView({ behavior: "smooth", block: "center" });
}

//======= FINISH QUIZZ ========================================================

function finishQuizz() {
  const result = document.querySelector('[data-quizz="result"]');
  result.parentElement.classList.remove("hidden");
  setTimeout(() => {
    result.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, 2000);
  loadResult(result);
}

function loadResult(resultContainer) {
  const score = getScore();
  const level = getResultLevel(quizz.levels, score);
  const scoreText = `${score}% de acerto: `;
  const resultElements = resultContainer.querySelectorAll("[data-result]");
  resultElements.forEach((element) => {
    const attribute = element.getAttribute("data-result");
    switch (attribute) {
      case "image":
        element.setAttribute("src", level.image);
        break;
      case "title":
        element.innerHTML = scoreText + level.title;
        break;
      case "text":
        element.innerHTML = level.text;
        break;
    }
  });
}

function getResultLevel(levels, score) {
  let resultLevel;
  levels.forEach((level) => {
    if (level.minValue <= score) resultLevel = level;
  });
  return resultLevel;
}

function getScore() {
  const rightAnswers = selectedAnswers.filter(
    (answer) => answer.getAttribute(["data-answer"]) === "true"
  ).length;
  const score = Math.round((rightAnswers / quizz.questions.length) * 100);
  return score;
}

//======= RESET ===============================================================

function resetQuizz() {
  selectedAnswers.splice(0, selectedAnswers.length);
  loadPage(quizz);
  const result = document.querySelector('[data-quizz="result"]');
  result.parentElement.classList.add("hidden");
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
