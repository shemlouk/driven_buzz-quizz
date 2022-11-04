axios
  .get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
  .then((response) => {
    const quizz = response.data[35];
    console.log(quizz);

    loadPage(quizz);
  });

function loadPage(obj) {
  loadBanner(obj.title, String(obj.image));
  loadQuestions(obj.questions);
}

//======= LOADING PAGE ========================================================

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
    const question = createHtmlElement("li", ["question"]);
    const title = createHtmlElement(
      "p",
      ["question__title", "lilac-background"],
      obj.title
    );

    title.setAttribute("style", `background-color:${obj.color}`);

    const answers = loadAnswers(obj.answers);

    question.appendChild(title);
    question.appendChild(answers);
    questions.appendChild(question);
  });
}

function loadAnswers(ans) {
  const answers = createHtmlElement("div", ["question__answers"]);
  const list = [];

  ans.forEach((obj) => {
    const html = `<figure class="answer__image">
                    <img src="${obj.image}" alt="imagem da resposta" />
                  </figure>
                  <p class="answer__text">${obj.text}</p>`;
    const answer = createHtmlElement("div", ["answer"], html);
    answer.setAttribute("data-answer", obj.isCorrectAnswer);
    list.push(answer);
  });
  list.sort(() => {
    return Math.random() - 0.5;
  });
  list.forEach((item) => {
    answers.appendChild(item);
  });

  return answers;
}

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