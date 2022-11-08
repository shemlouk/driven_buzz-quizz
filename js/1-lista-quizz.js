let allquizzes = [];
let quizzclicado = {};
const locais = localStorage.getItem("quizzes-id")


const promessa = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
promessa.then(renderizarQuizzes);
promessa.catch(() => {
    if (confirm("Sem comunicação com o servidor, deseja recarregar a página?")) {
        window.location.reload();
    }
});

function renderizarQuizzes(obj) {
    allquizzes = obj.data
    console.log(allquizzes);

    const container = document.querySelector('.lq-quizzesContainer')
    container.innerHTML = ""

    allquizzes.forEach(element => {
        container.innerHTML += `<div id="${element.id}" onclick="renderizarQuizz(this)" 
        class="lq-quizz" style="background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 70.58%, #000000 100%), 
        url(${element.image}) ;">
        <p class="lq-title">${element.title}</p>
      </div>`

    });
    quizzesUsuario();
}


function quizzesUsuario() {
    const id = JSON.parse(locais)
    if (locais !== null && locais !== "") {
        const user = document.querySelector(".lq-container");
        const init = document.querySelector(".lq-containerQUsuario")
        user.classList.remove("lq-hidden")
        init.classList.add("lq-hidden")


        const containeruser = document.querySelector(".lq-quizzesUsuario")
        containeruser.innerHTML = ""

        const userq = allquizzes.filter(obj => id.includes(obj.id));
        console.log(userq);

        userq.forEach((e) => {
            containeruser.innerHTML += `<div id="${e.id}" onclick="renderizarQuizz(this)" 
                class="lq-quizz" style="background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 70.58%, #000000 100%), 
                url(${e.image}) ;">
                <p class="lq-title">${e.title}</p>
              </div> `
        });
    }
}


function renderizarQuizz(item) {

    allquizzes.forEach(element => {
        if (Number(item.id) === element.id) {
            quizzclicado = element;
        }
    });

    const StringSelectedQuizz = JSON.stringify(quizzclicado);
    localStorage.setItem("StringSelectedQuizz", StringSelectedQuizz);

    window.location.href = "./2-pagina-quizz.html"
}