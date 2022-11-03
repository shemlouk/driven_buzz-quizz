document.querySelector(".cq-button-comeco").onclick = function () {
  validaInputInicio();
};

function validaInputInicio() {
  // titulo
  //   const inputTitulo = document.querySelector(".cq-titulo-quizz");
  //   const tituloQuizz = inputTitulo.value;
  //   if (!tituloQuizz || tituloQuizz.length < 20 || tituloQuizz.length > 65) {
  //     inputTitulo.classList.add("cq-input-validate");
  //     document.querySelector(".cq-input-titulo-quizz").innerHTML =
  //       "O título deve ser válido";
  //   } else {
  //     inputTitulo.classList.remove("cq-input-validate");
  //     document.querySelector(".cq-input-titulo-quizz").innerHTML = "";
  //   }
  // URL imagem
  const inputURL = document.querySelector(".cq-url-imagem-quizz");
  const URLImagem = inputURL.value;
  console.log(isURL(URLImagem));
  if (!isURL(URLImagem)) {
    console.log(URLImagem);
    inputURL.classList.add("cq-input-validate");
    document.querySelector(".cq-input-url-imagem-quizz").innerHTML =
      "O valor informado não é uma URL válida";
  } else {
    inputURL.classList.remove("cq-input-validate");
    document.querySelector(".cq-input-url-imagem-quizz").innerHTML = "";
  }
}

function isURL(url) {
  var expression =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  var regex = new RegExp(expression);
  return url.match(regex);
}
