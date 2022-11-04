let tituloQuizz = "";
let URLImagemQuizz = "";
let numeroPerguntas = 0;
let numeroNiveis = 0;

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
                              <ion-icon name="create-outline"></ion-icon>
                            </div>
                            <div class="cq-content-pergunta-${i + 1}"></div>
                          </div>`;
      }
    }
    perguntasHTML += `<button class="cq-button-comeco" type="button">
                        Prosseguir pra criar niveis
                      </button>`;
    const containerPerguntas = document.querySelector(".cq-perguntas-quizz");
    containerPerguntas.innerHTML = perguntasHTML;
    containerPerguntas.classList.remove("cq-escondido");
  }
}
