document.getElementById('formCliente').addEventListener('submit', function (e) {
    e.preventDefault();

    const dados = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        data_nascimento: document.getElementById('data_nascimento').value,
        observacoes: document.getElementById('observacoes').value
    };

    console.log('Enviando:', dados);

    fetch('http://localhost:3000/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(res => res.json())
    .then(resposta => {
        console.log('Resposta backend:', resposta);
        alert('Cliente salvo com sucesso!');
    })
    .catch(err => console.error(err));
});
