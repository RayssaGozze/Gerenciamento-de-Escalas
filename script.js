// Pegando elementos do HTML
const form = document.getElementById("scheduleForm");
const nameInput = document.getElementById("name");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const scheduleList = document.getElementById("scheduleList");
const btnLimpar = document.getElementById("btnLimpar");

// Lista principal
let escalas = JSON.parse(localStorage.getItem("escalas")) || [];

// Função para renderizar tudo
function renderizarEscalas() {
  scheduleList.innerHTML = "";

  escalas.forEach((escala, index) => {
    const li = document.createElement("li");
    li.textContent = `${escala.nome} - ${escala.data} às ${escala.hora}`;

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

  const name = nameInput.value.trim();
  const date = dateInput.value;
  const time = timeInput.value;

  if (name === "" || date === "" || time === "") {
    alert("Preencha todos os campos!");
    return;
  }
// criar a escala usando a função
  const novaEscala = criarEscala(
    nameInput.value,  
    corenInput.value
    funcaoInput.value
    timeInput.value
    mesSelecionado.value
    totalDiasDoMes
  );

  escalas.push(novaEscala);
  localStorage.setItem("escalas", JSON.stringify(escalas));

  renderizarEscalas();

  nameInput.value = "";
  dateInput.value = "";
  timeInput.value = "";
});