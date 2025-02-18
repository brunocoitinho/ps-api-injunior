const saveBtn = document.querySelector(".save-btn");
    try {
        if (saveBtn == null) {
            throw new Error("Botão de Salvar não encontrado");
        }
        saveBtn.addEventListener("click", (e) => {
            adicionaNovoLobo(e);
            
        })
    } catch (error) {
        console.log(error);
    }

async function adicionaNovoLobo(event) {
    event.preventDefault();
    const nameInput = document.querySelector("#name");
    const ageInput = document.querySelector("#age");
    const linkInput = document.querySelector("#link");
    const descriptionInput = document.querySelector("#description");
    const name = nameInput.value.trim();
    const age = parseInt(ageInput.value.trim(), 10);
    const link = linkInput.value.trim();
    const description = descriptionInput.value.trim();
    // Validações
    if (!name) {
        alert("O nome não pode estar vazio.");
        return;
    }
    if (isNaN(age) || age <= 0) {
        alert("A idade deve ser um número válido e maior que zero.");
        return;
    }
    if (!link) {
        alert("O link da foto não deve estar vazio.");
        return;
    }
    if (!description) {
        alert("A descrição não pode estar vazia.");
        return;
    }
    // Criando o objeto Lobinho caso os dados sejam válidos
    const loboNovo = {
        "nome": name,
        "idade": age,
        "descricao": description,
        "imagem":link,
        "adotado":false,
        "nomeDono":null,
        "idadeDono":null,
        "emailDono":null
    }

    try{
        const response = await fetch('http://localhost:3000/lobos',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loboNovo),
        });

        if (!response.ok) throw new Error(`Erro: ${response.status}`);

        const data = await response.json();

        console.log('POST - Dados criados:', data);
        alert(`Lobinho "${name}" adicionado com sucesso! 🐺`);
    }catch(error){
        console.error('Erro ao criar dados:', error);
    }

    // Limpa os campos do formulário
    nameInput.value = "";
    ageInput.value = "";
    linkInput.value = "";
    descriptionInput.value = "";
}