// Pegando elementos do HTML
const form = document.getElementById("scheduleForm");
const nameInput = document.getElementById("name");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const scheduleList = document.getElementById("scheduleList");

// Função que roda ao enviar o formulário
form.addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que a página recarregue

    // Pega os valores
    const name = nameInput.value.trim();
    const date = dateInput.value;
    const time = timeInput.value;

    if (name === "" || date === "" || time === "") {
        alert("Preencha todos os campos!");
        return;
    }

    // Cria um item da lista
    const li = document.createElement("li");
    li.textContent = `${name} - ${date} às ${time}`;

    // Adiciona na lista
    scheduleList.appendChild(li);

    // Limpa os campos do formulário
    nameInput.value = "";
    dateInput.value = "";
    timeInput.value = "";
});
