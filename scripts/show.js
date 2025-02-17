const loboSelecionado = JSON.parse(localStorage.getItem('loboSelecionado'))
const showSection = document.querySelector('.visualiza-lobo')

try{
    if(loboSelecionado == null){
        throw new Error(`Erro ao buscar loboSelecionado`);
    }

    carregarDados().then((listaLobo) => {

        if(listaLobo == null){
            throw new Error(`Erro ao buscar a lista de Lobos`);
        }
        carregarLobo(loboSelecionado)
    });

}catch(error){
    console.error('Erro ao acessar dado:', error);
    alert('Erro 4Au4: Lobo não encontrado')
    window.location.replace("lista-de-lobinhos.html");
}

function carregarLobo(lobo){
    showSection.innerHTML = ''
    showSection.innerHTML = `
            <h3 class="title-show">${lobo.nome}</h3>
            <div class="examples-container" id="lobos-container">
                <div class="card-example">
                    <div class="image-container">
                        <img src="${lobo.imagem}">
                        <div class="button-container">
                            <a href="adotar-lobinho.html" class="button button--adocao">
                                Adotar
                            </a>
                            <a href="#" class="button button--exclusao">
                                Excluir
                            </a>
                        </div>
                    </div>
                    <div class="content-container">

                        <p class="description">
                            ${lobo.descricao}
                        </p>
                    </div>
                </div>
            </div>`
    const btnTrash = document.querySelector('.button--exclusao')
    btnTrash.addEventListener('click', (e)=>{
        e.preventDefault()
        excluirLobo(lobo)
        setTimeout(() => {
            console.log('Redirecionando para lista-de-lobinhos.html');
            window.location.replace("lista-de-lobinhos.html");
        }, 100);
        
    })

}

async function excluirLobo(loboAExcluir){
    try {
        const response = await fetch(`http://localhost:3000/lobos/${loboAExcluir.id}`, {
            method: 'DELETE',
        });
        if (!response.ok){ 
            throw new Error(`Erro: ${response.status}`)
        }else{
            alert(`Lobo ${loboAExcluir.nome} excluído com sucesso.`);
        }
    } catch (error) {
        console.error('Erro ao excluir dados:', error);
    }
}


async function carregarDados() {
    try {
        const lobos =  await fetch('http://localhost:3000/lobos');

        if (!lobos.ok) {
            throw new Error(`Erro na requisição: ${lobos.status}`);
        }
        
        const resposta = await lobos.json()
        console.log(resposta)
        return resposta; 
    } catch (error) {
        console.error("Erro ao carregar JSON:", error);
    }
}