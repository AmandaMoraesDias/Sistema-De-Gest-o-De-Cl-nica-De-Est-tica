async function carregarDashboard() {
    const hoje = new Date().toISOString().slice(0, 10);

    const respAg = await fetch("http://localhost:3000/agendamentos");
    const respCli = await fetch("http://localhost:3000/clientes");
    const respServ = await fetch("http://localhost:3000/servicos");

    const agendamentos = await respAg.json();
    const clientes = await respCli.json();
    const servicos = await respServ.json();

    const agDia = agendamentos.filter(a => a.data === hoje);

    document.getElementById("total-dia").textContent = agDia.length;
    document.getElementById("pendentes-dia").textContent =
        agDia.filter(a => a.status !== "concluido").length;
    document.getElementById("concluidos-dia").textContent =
        agDia.filter(a => a.status === "concluido").length;

    const lista = document.getElementById("lista-agendamentos");
    lista.innerHTML = "";

    if (agDia.length === 0) {
        lista.innerHTML =
            `<p style="text-align:center;color:#777;">Nenhum agendamento hoje.</p>`;
        return;
    }

    agDia.forEach(a => {
        const cliente = clientes.find(c => c.id == a.clienteId);
        const servico = servicos.find(s => s.id == a.servicoId);

        lista.innerHTML += `
            <div class="agendamento">
                <div class="info">
                    <strong>${cliente?.nome || "Cliente não encontrado"}</strong>
                    <span>${a.hora} — ${servico?.nome || "Serviço desconhecido"}</span>
                </div>

                ${
                    a.status === "concluido"
                        ? `<span class="status concluido">Concluído</span>`
                        : `
                            <span class="status pendente">Pendente</span>
                            <button class="btn-concluir" data-id="${a.id}">
                                Concluir
                            </button>
                          `
                }
            </div>
        `;
    });
}

// ===============================
// 🔥 CONCLUIR AGENDAMENTO (EVENT DELEGATION)
// ===============================
document.addEventListener("click", async (event) => {
    const botao = event.target.closest(".btn-concluir");
    if (!botao) return; 

    const id = botao.dataset.id;

    if (!confirm("Marcar este agendamento como concluído?")) return;

    await fetch(`http://localhost:3000/agendamentos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "concluido" })
    });

    carregarDashboard();
});


carregarDashboard();
