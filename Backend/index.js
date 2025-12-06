const form = document.getElementById('formCliente');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const dados = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            dataNascimento: document.getElementById('data_nascimento').value,
            observacoes: document.getElementById('observacoes').value
        };

        fetch('http://localhost:3001/clientes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        })
        .then(r => r.json())
        .then(() => alert('Cliente salvo com sucesso!'));
    });
}
