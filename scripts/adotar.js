const adotarBtn = document.querySelector('.adotar-btn');
const loboSelecionado = JSON.parse(localStorage.getItem('loboSelecionado'))
let lobinhos = JSON.parse(localStorage.getItem('lobos'))

adotarBtn.addEventListener('click', ()=>{
    let index = lobinhos.findIndex(x => x.id == loboSelecionado.id);
    console.log(index)
    adotarNovoLobo(index)
    //localStorage.setItem("lobos", JSON.stringify(lobinhos))
    //window.location.replace("lista-de-lobinhos.html");
})


function adotarNovoLobo(loboIndex) {

    let id = loboIndex
    let _nomeDono = document.querySelector('#nome-dono');
    let _idadeDono = document.querySelector('#idade-dono');
    let _emailDono = document.querySelector('#email-dono');

    const patch = {
        nomeDono: _nomeDono.value.trim(),
        idadeDono: parseInt(_idadeDono.value.trim(), 10),
        emailDono: _emailDono.value.trim(),
        adotado: true
    }

    alterarStatus(patch, id)
}


async function alterarStatus(patch, id) {
    try {
        const resposta = await fetch(`https://localhost:3000/lobos/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patch),
        })
        if (!resposta.ok) {
            throw new Error(`Erro: ${resposta.status}`);
        }
        const dados = await resposta.json()
        console.log(dados)

    } catch (error) {
        console.log(error.message)
    }
}