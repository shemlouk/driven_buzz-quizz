
const promessa = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
promessa.then(renderizarQuizzes);
promessa.catch(()=> {if 
    (confirm("Sem comunicação com o servidor, deseja recarregar a página?")) {
    window.location.reload();
    }
});

function renderizarQuizzes(obj){
    const allquizzes = obj.data;
    console.log(allquizzes);

    const container = document.querySelector('.lq-quizzesContainer')
    container.innerHTML = ""

    allquizzes.forEach (element => {
        container.innerHTML += `<div id="${element.id}" onclick="renderizarQuizz(this)" 
        class="lq-quizz" style="background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), 
        url(${element.image}) ;">
        <p class="lq-title">${element.title}</p>
      </div>`
        
    });
}

function renderizarQuizz (item){
    console.log(item);
}