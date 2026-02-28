// Pegando elementos do HTML
const form = document.getElementById("scheduleForm");
const nameInput = document.getElementById("name");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const corenInput = document.getElementById("coren");
const funcaoInput = document.getElementById("funcao");
const mesSelecionado = document.getElementById("mes");
const scheduleList = document.getElementById("scheduleList");
const btnLimpar = document.getElementById("btnLimpar");

// Lista principal
let escalas = JSON.parse(localStorage.getItem("escalas")) || [];

// Função para criar a escala mensal
function criarEscala(nome, coren, funcao, horario, mes, totalDias) {
  const escala = {
    mes: mes,
    coren: coren,
    nome: nome,
    funcao: funcao,
    horario: horario,
    dias: {}
  };

  for (let i = 1; i <= totalDias; i++) {
    escala.dias[i] = "";
  }

  return escala;
}

// Função para renderizar tudo
function renderizarEscalas() {
  scheduleList.innerHTML = "";

  escalas.forEach((escala, index) => {
    const li = document.createElement("li");
    li.textContent = `${escala.nome} - ${escala.funcao} (${escala.horario}) - Mês: ${escala.mes}`;

    const removerBtn = document.createElement("button");
    removerBtn.textContent = "Remover";

    removerBtn.addEventListener("click", function() {
      escalas.splice(index, 1);
      localStorage.setItem("escalas", JSON.stringify(escalas));
      renderizarEscalas();
    });

    li.appendChild(removerBtn);
    scheduleList.appendChild(li);
  });
}

// Renderiza ao carregar
renderizarEscalas();

// Botão limpar tudo
btnLimpar.addEventListener("click", function() {
  localStorage.removeItem("escalas");
  escalas = [];
  renderizarEscalas();
});

// Envio do formulário
form.addEventListener("submit", function(event) {
  event.preventDefault();

  const nome = nameInput.value.trim();
  const coren = corenInput.value.trim();
  const funcao = funcaoInput.value.trim();
  const horario = timeInput.value;
  const mes = mesSelecionado.value;

  if (!nome || !coren || !funcao || !horario || !mes) {
    alert("Preencha todos os campos!");
    return;
  }

  // Calcula total de dias do mês selecionado
  const totalDiasDoMes = new Date(new Date().getFullYear(), mes, 0).getDate();

  // Cria o objeto de escala
  const novaEscala = criarEscala(nome, coren, funcao, horario, mes, totalDiasDoMes);

  // Adiciona ao array e salva no localStorage
  escalas.push(novaEscala);
  localStorage.setItem("escalas", JSON.stringify(escalas));

  // Renderiza na tela
  renderizarEscalas();

  // Limpa inputs
  nameInput.value = "";
  corenInput.value = "";
  funcaoInput.value = "";
  timeInput.value = "";
});