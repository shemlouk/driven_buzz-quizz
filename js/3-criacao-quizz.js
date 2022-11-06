let urlBase = "https://mock-api.driven.com.br/api/v4/buzzquizz/";
let tituloQuizz = "";
let URLImagemQuizz = "";
let questions = [];
let numeroPerguntas = 0;
let numeroNiveis = 0;
let levels = [];
let quizzclicado = null;

document.querySelector(".cq-button-comeco").onclick = function () {
  if (validaInputInicio()) {
    document
      .querySelector(".cq-container-comeco")
      .classList.add("cq-escondido");
    renderizaPerguntas();
  }
};

function validaInputInicio() {
  let isValid = true;
  //  titulo
  const inputTitulo = document.querySelector(".cq-titulo-quizz");
  const tituloQuizzinput = inputTitulo.value;
  if (
    !tituloQuizzinput ||
    tituloQuizzinput.length < 20 ||
    tituloQuizzinput.length > 65
  ) {
    isValid = false;
    inputTitulo.classList.add("cq-input-validate");
    document.querySelector(".cq-input-titulo-quizz").innerHTML =
      "O título deve ter entre 20 - 65 caracteres";
  } else {
    tituloQuizz = tituloQuizzinput;
    inputTitulo.classList.remove("cq-input-validate");
    document.querySelector(".cq-input-titulo-quizz").innerHTML = "";
  }
  // URL imagem
  const inputURL = document.querySelector(".cq-url-imagem-quizz");
  const URLImagem = inputURL.value;
  if (!isURL(URLImagem)) {
    isValid = false;
    inputURL.classList.add("cq-input-validate");
    document.querySelector(".cq-input-url-imagem-quizz").innerHTML =
      "O valor informado não é uma URL válida";
  } else {
    URLImagemQuizz = URLImagem;
    inputURL.classList.remove("cq-input-validate");
    document.querySelector(".cq-input-url-imagem-quizz").innerHTML = "";
  }
  // Quantidade de perguntas
  const inputQtsPerguntas = document.querySelector(".cq-qtd-perguntas");
  const qtdPerguntas = inputQtsPerguntas.value;
  if (Number(qtdPerguntas) < 3) {
    isValid = false;
    inputQtsPerguntas.classList.add("cq-input-validate");
    document.querySelector(".cq-input-qtd-perguntas-quizz").innerHTML =
      "Deve ter no mínimo 3 perguntas";
  } else {
    numeroPerguntas = qtdPerguntas;
    inputQtsPerguntas.classList.remove("cq-input-validate");
    document.querySelector(".cq-input-qtd-perguntas-quizz").innerHTML = "";
  }
  // Quantidade de niveis
  const inputQtsNiveis = document.querySelector(".cq-qtd-niveis");
  const qtdNiveis = inputQtsNiveis.value;
  if (Number(qtdNiveis) < 2) {
    isValid = false;
    inputQtsNiveis.classList.add("cq-input-validate");
    document.querySelector(".cq-input-qtd-niveis-quizz").innerHTML =
      "Deve ter no mínimo 2 niveis";
  } else {
    numeroNiveis = qtdNiveis;
    inputQtsNiveis.classList.remove("cq-input-validate");
    document.querySelector(".cq-input-qtd-niveis-quizz").innerHTML = "";
  }
  return isValid;
}

function isURL(url) {
  var expression =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  var regex = new RegExp(expression);
  return url.match(regex);
}

function renderizaPerguntas() {
  if (numeroPerguntas && numeroPerguntas >= 3) {
    let perguntasHTML = "";
    for (let i = 0; i < numeroPerguntas; i++) {
      if (i === 0) {
        perguntasHTML += `<p class="cq-titulo-pagina">Crie suas perguntas</p>
                            <div class="cq-container-central cq-pergunta-1">
                              <div class="cq-container-inputs">
                                <p class="cq-titulo-p">Pergunta 1</p>
                                <div class="cq-caixa-input-individual">
                                  <input class="cq-input-texto-pergunta-1" type="text" placeholder="Texto da pergunta" />
                                  <div class="cq-validacao-texto-pergunta-1 cq-validacao"></div>
                                </div>
                                <div class="cq-caixa-input-individual">
                                  <input class="cq-input-cor-fundo-pergunta-1" type="text" placeholder="Cor de fundo da pergunta" />
                                  <div class="cq-validacao-cor-fundo-pergunta-1 cq-validacao"></div>
                                </div>
                              </div>
                              <div class="cq-container-inputs">
                                <p class="cq-titulo-p">Resposta Correta</p>
                                <div class="cq-caixa-input-individual">
                                  <input class="cq-input-correta-text-pergunta-1" type="text" placeholder="Resposta correta" />
                                  <div class="cq-validacao-correta-text-pergunta-1 cq-validacao"></div>
                                </div>
                                <div class="cq-caixa-input-individual">
                                  <input class="cq-input-correta-url-pergunta-1" type="text" placeholder="URL da imagem" />
                                  <div class="cq-validacao-correta-url-pergunta-1 cq-validacao"></div>
                                </div>
                              </div>
                              <div class="cq-container-inputs">
                                <p class="cq-titulo-p">Respostas Incorretas</p>
                                <div class="cq-caixa-input-individual">
                                  <input class="cq-input-incorreta1-text-pergunta-1" type="text" placeholder="Resposta incorreta 1" />
                                  <div class="cq-validacao-incorreta1-text-pergunta-1 cq-validacao"></div>
                                </div>
                                <div class="cq-caixa-input-individual">
                                  <input class="cq-input-incorreta1-url-pergunta-1" type="text" placeholder="URL da imagem 1" />
                                  <div class="cq-validacao-incorreta1-url-pergunta-1 cq-validacao"></div>
                                </div>
                              </div>
                              <div class="cq-container-inputs">
                                <div class="cq-caixa-input-individual">
                                  <input class="cq-input-incorreta2-text-pergunta-1" type="text" placeholder="Resposta incorreta 2" />
                                  <div class="cq-validacao-incorreta2-text-pergunta-1 cq-validacao"></div>
                                </div>
                                <div class="cq-caixa-input-individual">
                                  <input class="cq-input-incorreta2-url-pergunta-1" type="text" placeholder="URL da imagem 2" />
                                  <div class="cq-validacao-incorreta2-url-pergunta-1 cq-validacao"></div>
                                </div>
                              </div>
                              <div class="cq-container-inputs">
                                <div class="cq-caixa-input-individual">
                                  <input class="cq-input-incorreta3-text-pergunta-1" type="text" placeholder="Resposta incorreta 3" />
                                  <div class="cq-validacao-incorreta3-text-pergunta-1 cq-validacao"></div>
                                </div>
                                <div class="cq-caixa-input-individual">
                                  <input class="cq-input-incorreta3-url-pergunta-1" type="text" placeholder="URL da imagem 3" />
                                  <div class="cq-validacao-incorreta3-url-pergunta-1 cq-validacao"></div>
                                </div>
                              </div>
                            </div>`;
      } else {
        perguntasHTML += `<div class="cq-container-central">
                            <div class="cq-container-pre-perguntas cq-container-inputs pergunta-${
                              i + 1
                            }">
                              <p class="cq-titulo-p">Pergunta ${i + 1}</p>
                              <ion-icon name="create-outline" onclick="renderPergunta('cq-content-pergunta-${
                                i + 1
                              }', ${i + 1}, this)"></ion-icon>
                            </div>
                            <div class="cq-content-pergunta-${i + 1}"></div>
                          </div>`;
      }
    }
    perguntasHTML += `<button class="cq-button cq-button-perguntas" onclick="salvarPerguntas()" type="button">
                        Prosseguir pra criar niveis
                      </button>`;
    const containerPerguntas = document.querySelector(".cq-perguntas-quizz");
    containerPerguntas.innerHTML = perguntasHTML;
    containerPerguntas.classList.remove("cq-escondido");
  }
}

function renderPergunta(classNameContent, perguntaNumber, icon) {
  icon.classList.add("cq-escondido");
  const content = document.querySelector(`.${classNameContent}`);
  let contentHTML = `<div class="cq-container-central cq-pergunta-${perguntaNumber}">
                      <div class="cq-container-inputs">
                        <div class="cq-caixa-input-individual">
                          <input class="cq-input-texto-pergunta-${perguntaNumber}" type="text" placeholder="Texto da pergunta" />
                          <div class="cq-validacao-texto-pergunta-${perguntaNumber} cq-validacao"></div>
                        </div>
                        <div class="cq-caixa-input-individual">
                          <input class="cq-input-cor-fundo-pergunta-${perguntaNumber}" type="text" placeholder="Cor de fundo da pergunta" />
                          <div class="cq-validacao-cor-fundo-pergunta-${perguntaNumber} cq-validacao"></div>
                        </div>
                      </div>
                      <div class="cq-container-inputs">
                        <p class="cq-titulo-p">Resposta Correta</p>
                        <div class="cq-caixa-input-individual">
                          <input class="cq-input-correta-text-pergunta-${perguntaNumber}" type="text" placeholder="Resposta correta" />
                          <div class="cq-validacao-correta-text-pergunta-${perguntaNumber} cq-validacao"></div>
                        </div>
                        <div class="cq-caixa-input-individual">
                          <input class="cq-input-correta-url-pergunta-${perguntaNumber}" type="text" placeholder="URL da imagem" />
                          <div class="cq-validacao-correta-url-pergunta-${perguntaNumber} cq-validacao"></div>
                        </div>
                      </div>
                      <div class="cq-container-inputs">
                        <p class="cq-titulo-p">Respostas Incorretas</p>
                        <div class="cq-caixa-input-individual">
                          <input class="cq-input-incorreta1-text-pergunta-${perguntaNumber}" type="text" placeholder="Resposta incorreta 1" />
                          <div class="cq-validacao-incorreta1-text-pergunta-${perguntaNumber} cq-validacao"></div>
                        </div>
                        <div class="cq-caixa-input-individual">
                          <input class="cq-input-incorreta1-url-pergunta-${perguntaNumber}" type="text" placeholder="URL da imagem 1" />
                          <div class="cq-validacao-incorreta1-url-pergunta-${perguntaNumber} cq-validacao"></div>
                        </div>
                      </div>
                      <div class="cq-container-inputs">
                        <div class="cq-caixa-input-individual">
                          <input class="cq-input-incorreta2-text-pergunta-${perguntaNumber}" type="text" placeholder="Resposta incorreta 2" />
                          <div class="cq-validacao-incorreta2-text-pergunta-${perguntaNumber} cq-validacao"></div>
                        </div>
                        <div class="cq-caixa-input-individual">
                          <input class="cq-input-incorreta2-url-pergunta-${perguntaNumber}" type="text" placeholder="URL da imagem 2" />
                          <div class="cq-validacao-incorreta2-url-pergunta-${perguntaNumber} cq-validacao"></div>
                        </div>
                      </div>
                      <div class="cq-container-inputs">
                        <div class="cq-caixa-input-individual">
                          <input class="cq-input-incorreta3-text-pergunta-${perguntaNumber}" type="text" placeholder="Resposta incorreta 3" />
                          <div class="cq-validacao-incorreta3-text-pergunta-${perguntaNumber} cq-validacao"></div>
                        </div>
                        <div class="cq-caixa-input-individual">
                          <input class="cq-input-incorreta3-url-pergunta-${perguntaNumber}" type="text" placeholder="URL da imagem 3" />
                          <div class="cq-validacao-incorreta3-url-pergunta-${perguntaNumber} cq-validacao"></div>
                        </div>
                      </div>
                    </div>`;
  content.innerHTML = contentHTML;
}

function salvarPerguntas() {
  if (validaPerguntas()) {
    document.querySelector(".cq-perguntas-quizz").classList.add("cq-escondido");
    renderizaNiveis();
  }
}

function validaPerguntas() {
  questions = [];
  let perguntasValidas = 0;
  for (let i = 1; i <= numeroPerguntas; i++) {
    let question = {
      title: null,
      color: null,
      answers: [],
    };
    const tituloPergunta = validaTituloUrlPergunta(i, question);
    const respostaCorreta = validaRespostaCorreta(i, question);
    let primeiraRespostaIncorreta = validaPrimeiraIncorreta(i, question);
    let segundaRespostaIncorreta = validaSegundaIncorreta(i, question);
    let terceiraRespostaIncorreta = validaTerceiraIncorreta(i, question);
    if (
      question.title != null &&
      question.color != null &&
      question.answers.length >= 2
    ) {
      questions.push(question);
      perguntasValidas++;
    }
  }
  return Number(perguntasValidas) === Number(numeroPerguntas) ? true : false;
}

function validaTerceiraIncorreta(num, question) {
  let answer = {
    text: null,
    image: null,
    isCorrectAnswer: false,
  };
  let textoRespostaIncorreta = false;
  let URLRespostaIncorreta = false;
  const texto = document.querySelector(
    `.cq-input-incorreta3-text-pergunta-${num}`
  );
  const url = document.querySelector(
    `.cq-input-incorreta3-url-pergunta-${num}`
  );
  if (texto) {
    if (!texto.value || texto.value.length === 0) {
      textoRespostaIncorreta = false;
      texto.classList.add("cq-input-validate");
      document.querySelector(
        `.cq-validacao-incorreta3-text-pergunta-${num}`
      ).innerHTML = "Deve digitar um texto valido!";
    } else {
      textoRespostaIncorreta = true;
      answer.text = texto.value;
      texto.classList.remove("cq-input-validate");
      document.querySelector(
        `.cq-validacao-incorreta3-text-pergunta-${num}`
      ).innerHTML = "";
    }
  }
  if (url) {
    if (!isURL(url.value)) {
      URLRespostaIncorreta = false;
      url.classList.add("cq-input-validate");
      document.querySelector(
        `.cq-validacao-incorreta3-url-pergunta-${num}`
      ).innerHTML = "Deve digitar uma URL valida!";
    } else {
      URLRespostaIncorreta = true;
      answer.image = url.value;
      url.classList.remove("cq-input-validate");
      document.querySelector(
        `.cq-validacao-incorreta3-url-pergunta-${num}`
      ).innerHTML = "";
    }
  }
  if (textoRespostaIncorreta && URLRespostaIncorreta) {
    question.answers.push(answer);
  }
  return textoRespostaIncorreta && URLRespostaIncorreta ? true : false;
}

function validaSegundaIncorreta(num, question) {
  let answer = {
    text: null,
    image: null,
    isCorrectAnswer: false,
  };
  let textoRespostaIncorreta = false;
  let URLRespostaIncorreta = false;
  const texto = document.querySelector(
    `.cq-input-incorreta2-text-pergunta-${num}`
  );
  const url = document.querySelector(
    `.cq-input-incorreta2-url-pergunta-${num}`
  );
  if (texto) {
    if (!texto.value || texto.value.length === 0) {
      textoRespostaIncorreta = false;
      texto.classList.add("cq-input-validate");
      document.querySelector(
        `.cq-validacao-incorreta2-text-pergunta-${num}`
      ).innerHTML = "Deve digitar um texto valido!";
    } else {
      textoRespostaIncorreta = true;
      answer.text = texto.value;
      texto.classList.remove("cq-input-validate");
      document.querySelector(
        `.cq-validacao-incorreta2-text-pergunta-${num}`
      ).innerHTML = "";
    }
  }
  if (url) {
    if (!isURL(url.value)) {
      URLRespostaIncorreta = false;
      url.classList.add("cq-input-validate");
      document.querySelector(
        `.cq-validacao-incorreta2-url-pergunta-${num}`
      ).innerHTML = "Deve digitar uma URL valida!";
    } else {
      URLRespostaIncorreta = true;
      answer.image = url.value;
      url.classList.remove("cq-input-validate");
      document.querySelector(
        `.cq-validacao-incorreta2-url-pergunta-${num}`
      ).innerHTML = "";
    }
  }
  if (textoRespostaIncorreta && URLRespostaIncorreta) {
    question.answers.push(answer);
  }
  return textoRespostaIncorreta && URLRespostaIncorreta ? true : false;
}

function validaPrimeiraIncorreta(num, question) {
  let answer = {
    text: null,
    image: null,
    isCorrectAnswer: false,
  };
  let textoRespostaIncorreta = false;
  let URLRespostaIncorreta = false;
  const texto = document.querySelector(
    `.cq-input-incorreta1-text-pergunta-${num}`
  );
  const url = document.querySelector(
    `.cq-input-incorreta1-url-pergunta-${num}`
  );
  if (texto) {
    if (!texto.value || texto.value.length === 0) {
      textoRespostaIncorreta = false;
      texto.classList.add("cq-input-validate");
      document.querySelector(
        `.cq-validacao-incorreta1-text-pergunta-${num}`
      ).innerHTML = "Deve digitar um texto valido!";
    } else {
      textoRespostaIncorreta = true;
      answer.text = texto.value;
      texto.classList.remove("cq-input-validate");
      document.querySelector(
        `.cq-validacao-incorreta1-text-pergunta-${num}`
      ).innerHTML = "";
    }
  }
  if (url) {
    if (!isURL(url.value)) {
      URLRespostaIncorreta = false;
      url.classList.add("cq-input-validate");
      document.querySelector(
        `.cq-validacao-incorreta1-url-pergunta-${num}`
      ).innerHTML = "Deve digitar uma URL valida!";
    } else {
      URLRespostaIncorreta = true;
      answer.image = url.value;
      url.classList.remove("cq-input-validate");
      document.querySelector(
        `.cq-validacao-incorreta1-url-pergunta-${num}`
      ).innerHTML = "";
    }
  }
  if (textoRespostaIncorreta && URLRespostaIncorreta) {
    question.answers.push(answer);
  }
  return textoRespostaIncorreta && URLRespostaIncorreta ? true : false;
}

function validaRespostaCorreta(num, question) {
  let answer = {
    text: null,
    image: null,
    isCorrectAnswer: true,
  };
  let textoRespostaCorreta = false;
  let URLRespostaCorreta = false;
  const texto = document.querySelector(
    `.cq-input-correta-text-pergunta-${num}`
  );
  const url = document.querySelector(`.cq-input-correta-url-pergunta-${num}`);
  if (texto) {
    if (!texto.value || texto.value.length === 0) {
      textoRespostaCorreta = false;
      texto.classList.add("cq-input-validate");
      document.querySelector(
        `.cq-validacao-correta-text-pergunta-${num}`
      ).innerHTML = "Deve digitar um texto valido!";
    } else {
      textoRespostaCorreta = true;
      answer.text = texto.value;
      texto.classList.remove("cq-input-validate");
      document.querySelector(
        `.cq-validacao-correta-text-pergunta-${num}`
      ).innerHTML = "";
    }
  }
  if (url) {
    if (!isURL(url.value)) {
      URLRespostaCorreta = false;
      url.classList.add("cq-input-validate");
      document.querySelector(
        `.cq-validacao-correta-url-pergunta-${num}`
      ).innerHTML = "Deve digitar uma URL valida!";
    } else {
      URLRespostaCorreta = true;
      answer.image = url.value;
      url.classList.remove("cq-input-validate");
      document.querySelector(
        `.cq-validacao-correta-url-pergunta-${num}`
      ).innerHTML = "";
    }
  }
  if (textoRespostaCorreta && URLRespostaCorreta) {
    question.answers.push(answer);
  }
  return textoRespostaCorreta && URLRespostaCorreta ? true : false;
}

function validaTituloUrlPergunta(num, question) {
  let tituloPergunta = false;
  let URLPergunta = false;
  const titulo = document.querySelector(`.cq-input-texto-pergunta-${num}`);
  const corFundo = document.querySelector(
    `.cq-input-cor-fundo-pergunta-${num}`
  );
  if (titulo) {
    if (!titulo.value || titulo.value.length < 20) {
      tituloPergunta = false;
      titulo.classList.add("cq-input-validate");
      document.querySelector(`.cq-validacao-texto-pergunta-${num}`).innerHTML =
        "Deve ter no mínimo 20 caracteres";
    } else {
      tituloPergunta = true;
      question.title = titulo.value;
      titulo.classList.remove("cq-input-validate");
      document.querySelector(`.cq-validacao-texto-pergunta-${num}`).innerHTML =
        "";
    }
  }
  if (corFundo) {
    if (!corFundo.value || !isHexadecimal(corFundo.value)) {
      URLPergunta = false;
      corFundo.classList.add("cq-input-validate");
      document.querySelector(
        `.cq-validacao-cor-fundo-pergunta-${num}`
      ).innerHTML = "Codigo hexadecimal inválido!";
    } else {
      URLPergunta = true;
      question.color = corFundo.value;
      corFundo.classList.remove("cq-input-validate");
      document.querySelector(
        `.cq-validacao-cor-fundo-pergunta-${num}`
      ).innerHTML = "";
    }
  }
  return tituloPergunta && URLPergunta ? true : false;
}

function renderizaNiveis() {
  if (numeroNiveis && numeroNiveis >= 2) {
    let niveisHTML = "";
    for (let i = 0; i < numeroNiveis; i++) {
      if (i === 0) {
        niveisHTML += `<p class="cq-titulo-pagina">Agora, decida os níveis</p>
                        <div class="cq-container-central cq-nivel-1">
                          <div class="cq-container-inputs">
                            <p class="cq-titulo-p">Nível 1</p>
                            <div class="cq-caixa-input-individual">
                              <input class="cq-input-titulo-nivel-1" type="text" placeholder="Título do nível" />
                              <div class="cq-validacao-titulo-nivel-1 cq-validacao"></div>
                            </div>
                            <div class="cq-caixa-input-individual">
                              <input class="cq-input-porcentagem-nivel-1" type="text" placeholder="% de acerto mínima" />
                              <div class="cq-validacao-porcentagem-nivel-1 cq-validacao"></div>
                            </div>
                            <div class="cq-caixa-input-individual">
                              <input class="cq-input-url-nivel-1" type="text" placeholder="URL da imagem do nível" />
                              <div class="cq-validacao-url-nivel-1 cq-validacao"></div>
                            </div>
                            <div class="cq-caixa-input-individual">
                              <textarea class="cq-input-descricao-nivel-1" rows="3" placeholder="Descrição do nível" > </textarea>
                              <div class="cq-validacao-descricao-nivel-1 cq-validacao"></div>
                            </div>
                          </div>
                        </div>`;
      } else {
        niveisHTML += `<div class="cq-container-central">
                        <div class="cq-container-pre-niveis cq-container-inputs nivel-${
                          i + 1
                        }">
                          <p class="cq-titulo-p">Nível ${i + 1}</p>
                          <ion-icon name="create-outline" onclick="renderNivel('cq-content-nivel-${
                            i + 1
                          }', ${i + 1}, this)"></ion-icon>
                        </div>
                        <div class="cq-content-nivel-${i + 1}"></div>
                      </div>`;
      }
    }
    niveisHTML += ` <button class="cq-button cq-button-niveis" onclick="salvarNiveis()" type="button">
                      Finalizar Quizz
                    </button>`;
    const containerPerguntas = document.querySelector(".cq-niveis-quizz");
    containerPerguntas.innerHTML = niveisHTML;
    containerPerguntas.classList.remove("cq-escondido");
  }
}

function salvarNiveis() {
  console.log();
  levels = [];
  for (let i = 0; i < numeroNiveis; i++) {
    let level = {
      title: null,
      image: null,
      text: null,
      minValue: null,
    };
    validaNiveis(i + 1, level);
    if (
      level.title != null &&
      level.image != null &&
      level.text != null &&
      level.minValue != null
    ) {
      levels.push(level);
    }
  }
  axios
    .post(`${urlBase}quizzes`, {
      title: tituloQuizz,
      image: URLImagemQuizz,
      questions: questions,
      levels: levels,
    })
    .then((response) => {
      let localIds = localStorage.getItem("quizzes-id");
      let quizzesIds = localIds ? JSON.parse(localIds) : [];
      quizzesIds.push(response.data.id);
      localStorage.setItem("quizzes-id", JSON.stringify(quizzesIds));
      document.querySelector(".cq-niveis-quizz").classList.add("cq-escondido");
      let sucessoHTML = ` <p class="cq-titulo-pagina">Seu quizz está pronto!</p>
                          <div class="cq-container-image-success">
                            <img class="cq-image-success" src="${URLImagemQuizz}" alt="" />
                            <p>${tituloQuizz}</>
                          </div>
                          <button type="button" class="cq-button cq-button-acessar-quizz" onclick="direcionaParaVisualizacao(${response.data.id})">
                            Acessar Quizz
                          </button>
                          <a class="cq-home" href="./index.html">
                            Voltar pra home
                          </a>
                          `;
      const sucesso = document.querySelector(".cq-sucesso-quizz");
      sucesso.innerHTML = sucessoHTML;
      sucesso.classList.remove("cq-escondido");
    })
    .catch((error) => {
      console.log(error);
    });
}

function renderNivel(classNameContent, niveisNumber, icon) {
  icon.classList.add("cq-escondido");
  const content = document.querySelector(`.${classNameContent}`);
  let nivelHTML = ` <div class="cq-container-central cq-nivel-${niveisNumber}">
                      <div class="cq-container-inputs">
                        <div class="cq-caixa-input-individual">
                          <input class="cq-input-titulo-nivel-${niveisNumber}" type="text" placeholder="Título do nível" />
                          <div class="cq-validacao-titulo-nivel-${niveisNumber} cq-validacao"></div>
                        </div>
                        <div class="cq-caixa-input-individual">
                          <input class="cq-input-porcentagem-nivel-${niveisNumber}" type="text" placeholder="% de acerto mínima" />
                          <div class="cq-validacao-porcentagem-nivel-${niveisNumber} cq-validacao"></div>
                        </div>
                        <div class="cq-caixa-input-individual">
                          <input class="cq-input-url-nivel-${niveisNumber}" type="text" placeholder="URL da imagem do nível" />
                          <div class="cq-validacao-url-nivel-${niveisNumber} cq-validacao"></div>
                        </div>
                        <div class="cq-caixa-input-individual">
                          <textarea class="cq-input-descricao-nivel-${niveisNumber}" rows="3" placeholder="Descrição do nível" > </textarea>
                          <div class="cq-validacao-descricao-nivel-${niveisNumber} cq-validacao"></div>
                        </div>
                      </div>
                    </div>`;
  content.innerHTML = nivelHTML;
}

function validaNiveis(num, level) {
  const titulo = document.querySelector(`.cq-input-titulo-nivel-${num}`);
  const porcentagem = document.querySelector(
    `.cq-input-porcentagem-nivel-${num}`
  );
  const url = document.querySelector(`.cq-input-url-nivel-${num}`);
  const descricao = document.querySelector(`.cq-input-descricao-nivel-${num}`);
  if (titulo) {
    if (!titulo.value || titulo.value.length < 10) {
      titulo.classList.add("cq-input-validate");
      document.querySelector(`.cq-validacao-titulo-nivel-${num}`).innerHTML =
        "Deve digitar um título valido!";
    } else {
      level.title = titulo.value;
      titulo.classList.remove("cq-input-validate");
      document.querySelector(`.cq-validacao-titulo-nivel-${num}`).innerHTML =
        "";
    }
  }
  if (porcentagem) {
    if (
      !porcentagem.value ||
      porcentagem.value < 0 ||
      porcentagem.value > 100
    ) {
      porcentagem.classList.add("cq-input-validate");
      document.querySelector(
        `.cq-validacao-porcentagem-nivel-${num}`
      ).innerHTML = "Deve digitar um valor entre 0 - 100";
    } else {
      level.minValue = Number(porcentagem.value);
      porcentagem.classList.remove("cq-input-validate");
      document.querySelector(
        `.cq-validacao-porcentagem-nivel-${num}`
      ).innerHTML = "";
    }
  }
  if (url) {
    if (!isURL(url.value)) {
      url.classList.add("cq-input-validate");
      document.querySelector(`.cq-validacao-url-nivel-${num}`).innerHTML =
        "Deve digitar uma URL valida!";
    } else {
      level.image = url.value;
      url.classList.remove("cq-input-validate");
      document.querySelector(`.cq-validacao-url-nivel-${num}`).innerHTML = "";
    }
  }
  if (descricao) {
    if (!descricao.value || descricao.value < 30) {
      descricao.classList.add("cq-input-validate");
      document.querySelector(`.cq-validacao-descricao-nivel-${num}`).innerHTML =
        "Deve digitar uma descrição com pelo menos 30 caracteres!";
    } else {
      level.text = descricao.value;
      descricao.classList.remove("cq-input-validate");
      document.querySelector(`.cq-validacao-descricao-nivel-${num}`).innerHTML =
        "";
    }
  }
}

function isHexadecimal(char) {
  var expression = /^#[0-9A-F]{6}$/i;
  var regex = new RegExp(expression);
  return char.match(regex);
}

function direcionaParaVisualizacao(id) {
  axios
    .get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`)
    .then((response) => {
      console.log(response);
      const StringSelectedQuizz = JSON.stringify(response.data);
      localStorage.setItem("StringSelectedQuizz", StringSelectedQuizz);

      window.location.href = "./2-pagina-quizz.html";
    })
    .catch((error) => {
      console.log(error);
    });
}
