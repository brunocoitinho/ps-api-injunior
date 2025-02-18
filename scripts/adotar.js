const adotarBtn = document.querySelector('.adotar-btn');
const loboSelecionado = JSON.parse(localStorage.getItem('loboSelecionado'))
//let lobinhos = JSON.parse(localStorage.getItem('lobos'))

document.addEventListener('DOMContentLoaded', () => {mostrarLobo(loboSelecionado)});

function mostrarLobo(loboSelecionado) {
    const loboId = loboSelecionado.id
    const loboNome = loboSelecionado.nome
    const loboFoto = loboSelecionado.imagem

    let divFoto = document.querySelector(".foto")
    divFoto.innerHTML = `<img src="${loboFoto}" alt="Foto do Lobo">`
    let nomeH2 = document.querySelector(".adotar-lobinho-nome")
    let idP = document.querySelector(".adotar-lobinho-id")
    nomeH2.innerText = `Adote o(a) ${loboNome}`
    idP.innerText = `ID: ${loboId}`
}

adotarBtn.addEventListener('click', async(event)=>{
    event.preventDefault()
    let index = loboSelecionado.id
    console.log(index)
    await adotarNovoLobo(index)
    //localStorage.setItem("lobos", JSON.stringify(lobinhos))
    window.location.replace("lista-de-lobinhos.html");
})


async function adotarNovoLobo(loboIndex) {

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

    await alterarStatus(patch, id)
}


async function alterarStatus(patch, id) {
    try {
        const resposta = await fetch(`http://localhost:3000/lobos/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patch),
        })
        
        const dados = await resposta.json()
        console.log(dados)

    } catch (error) {
        console.log(error.message)
    }
}



