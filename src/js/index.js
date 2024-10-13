const listaSelecaoPokedevs = document.querySelectorAll(".pokedev");
let currentIndex = 0;
let intervalId;
let userInteracted = false;  // Para rastrear a interação manual do usuário

function selecionarPokedev(index) {
    const pokedev = listaSelecaoPokedevs[index];

    // Remove classe "aberto" do cartão atual
    const cartaoPokedevAberto = document.querySelector(".aberto");
    if (cartaoPokedevAberto) cartaoPokedevAberto.classList.remove("aberto");

    // Abrir o novo cartão
    const idPokedevSelecionado = pokedev.attributes.id.value;
    const idDoCartaoPokedevParaAbrir = "cartao-" + idPokedevSelecionado;
    const cartaoPokedevParaAbrir = document.getElementById(idDoCartaoPokedevParaAbrir);
    cartaoPokedevParaAbrir.classList.add("aberto");

    // Remover classe "ativo" da lista de seleção anterior
    const pokedevAtivoNaListagem = document.querySelector(".ativo");
    if (pokedevAtivoNaListagem) pokedevAtivoNaListagem.classList.remove("ativo");

    // Adicionar classe "ativo" ao pokedev atual
    pokedev.classList.add("ativo");

    // Adicionar classe "piscando" ao pokedev atual
    pokedev.classList.add("piscando");

    // Remover classe "piscando" dos outros pokedevs
    listaSelecaoPokedevs.forEach((otherPokedev, i) => {
        if (i !== index) {
            otherPokedev.classList.remove("piscando");
        }
    });

    currentIndex = index;  // Atualizar o índice atual para manter a sequência correta
}

// Função para alternar automaticamente entre os pokedevs
function alternarPokedevAutomaticamente() {
    selecionarPokedev(currentIndex);
    currentIndex = (currentIndex + 1) % listaSelecaoPokedevs.length;
}

// Iniciar a alternância automática a cada 3 segundos
function iniciarAlternanciaAutomatica() {
    intervalId = setInterval(alternarPokedevAutomaticamente, 3000);
}

// Parar a alternância automática temporariamente
function pararAlternanciaAutomaticaTemporariamente() {
    clearInterval(intervalId);
    userInteracted = true;  // Indica que o usuário interagiu manualmente

    // Retomar a alternância automática após 5 segundos sem interação do usuário
    setTimeout(() => {
        userInteracted = false;
        iniciarAlternanciaAutomatica();
    }, 5000);
}

// Adicionar eventos de clique para cada pokedev
listaSelecaoPokedevs.forEach((pokedev, index) => {
    pokedev.addEventListener("click", () => {
        pararAlternanciaAutomaticaTemporariamente();
        selecionarPokedev(index);
    });
});

// Iniciar a alternância automática
iniciarAlternanciaAutomatica();
