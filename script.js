const form = document.getElementById("scheduleForm");
const nameInput = document.getElementById("name");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const scheduleList = document.getElementById("scheduleList");
const btnLimpar = document.getElementById("btnLimpar");

let escalas = JSON.parse(localStorage.getItem("escalas")) || [];

function renderizarEscalas() {
  scheduleList.innerHTML = "";

  escalas.forEach((escala, index) => {
    const li = document.createElement("li");
    li.textContent = `${escala.nome} - ${escala.data} às ${escala.horario}`;

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

renderizarEscalas();

btnLimpar.addEventListener("click", function() {
  localStorage.removeItem("escalas");
  escalas = [];
  renderizarEscalas();
});

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const nome = nameInput.value.trim();
  const data = dateInput.value;
  const horario = timeInput.value;

  if (!nome || !data || !horario) {
    alert("Preencha todos os campos!");
    return;
  }

  const novaEscala = {
    nome: nome,
    data: data,
    horario: horario
  };

  escalas.push(novaEscala);
  localStorage.setItem("escalas", JSON.stringify(escalas));

  renderizarEscalas();

  nameInput.value = "";
  dateInput.value = "";
  timeInput.value = "";
});