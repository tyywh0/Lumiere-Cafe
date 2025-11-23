const SUPABASE_URL = 'https://isticmrrszpueieovlqq.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzdGljbXJyc3pwdWVpZW92bHFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4MzEwMjcsImV4cCI6MjA3OTQwNzAyN30.M3NNmuKrVFm-i4wQTHpVI0s-M3SCwHtB5CK93RZ2QL4'; 

// Inicializa o cliente Supabase
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const serviceOptions = [
    {
        id: 1,
        title: "Fazer reserva de mesa",
        description: "Escolha a data e venha ao café",
        icon: "https://c.animaapp.com/2rCwzqnx/img/icons8-reserva-50-1@2x.png",
        action: "nextStep(2)" // Ação principal alterada para ir para o Passo 2
    },
    {
        id: 2,
        title: "Ver eventos",
        description: "Vá para a página dos eventos",
        icon: "https://c.animaapp.com/2rCwzqnx/img/icons8-clapperboard-24-1@2x.png",
        action: "alert('Funcionalidade de Eventos ainda não implementada.')"
    },
    {
        id: 3,
        title: "Ver cardápio",
        description: "Vá para a página do cardápio",
        icon: "https://c.animaapp.com/2rCwzqnx/img/icons8-card-pio-50-1@2x.png",
        action: "alert('Funcionalidade de Cardápio ainda não implementada.')"
    },
];

const container = document.getElementById('service-options-container');

/**
 * Gera e insere o HTML das opções de serviço no container do Passo 1.
 */
function renderServiceOptions() {
    let htmlContent = '';
    
    serviceOptions.forEach(service => {
        htmlContent += `
            <button 
                class="option-button" 
                aria-label="${service.title}"
                onclick="${service.action}"
            >
                <img src="${service.icon}" alt="${service.title} Icon" class="option-icon">
                <div class="option-content">
                    <h2 class="option-title">${service.title}</h2>
                    <p class="option-description">${service.description}</p>
                </div>
            </button>
        `;
    });

    container.innerHTML = htmlContent;
}


// --- LÓGICA DE NAVEGAÇÃO MULTI-PASSO (Passos 1, 2, 3) ---

const steps = document.querySelectorAll('.step');
let currentStep = 1;

/**
 * Avança ou volta para um passo específico da reserva.
 * @param {number} stepNumber - O número do passo para onde navegar.
 */
function nextStep(stepNumber) {
    if (stepNumber === 3) {
        // Valida o formulário antes de ir para o passo 3 (resumo)
        if (!validateStep2()) {
            return; // Interrompe se a validação falhar
        }
        // Se válido, coleta e exibe os dados
        updateSummary();
    }
    
    // Esconde todos os passos
    steps.forEach(step => {
        step.classList.add('hidden');
        step.classList.remove('active');
    });

    // Mostra o passo desejado
    const nextStepElement = document.getElementById(`step-${stepNumber}`);
    if (nextStepElement) {
        nextStepElement.classList.remove('hidden');
        nextStepElement.classList.add('active');
        currentStep = stepNumber;
    }
}

/**
 * Lógica para o botão "Voltar" (volta um passo na reserva)
 */
function goBack() {
    if (currentStep > 1) {
        nextStep(currentStep - 1);
    } else {
        // Se estiver no Passo 1, usa a navegação padrão do navegador (history.back())
        history.back();
    }
}

/**
 * Valida se todos os campos do Passo 2 (Detalhes) foram preenchidos.
 */
function validateStep2() {
    const dateInput = document.getElementById('date');
    const timeSelect = document.getElementById('time');
    const peopleSelect = document.getElementById('people');

    if (!dateInput.value || !timeSelect.value || !peopleSelect.value) {
        alert('Por favor, preencha a data, o horário e o número de pessoas para continuar.');
        return false;
    }
    return true;
}

/**
 * Coleta os dados do formulário e atualiza o resumo no Passo 3.
 */
function updateSummary() {
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const people = document.getElementById('people').value;

    // Formata a data para português
    const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const summaryHtml = `
        <p><strong>Dia:</strong> <span>${formattedDate}</span></p>
        <p><strong>Horário:</strong> <span>${time}</span></p>
        <p><strong>Pessoas:</strong> <span>${people}</span></p>
    `;

    document.querySelector('.detail-summary').innerHTML = summaryHtml;
}

/**
 * Ação final de confirmação.
 */
function finalConfirmation() {
    alert('Reserva concluída! Seu pedido de reserva foi enviado.');
    // Aqui você faria o envio real dos dados.
    // Redireciona para a página inicial (ou de sucesso)
    window.location.href = '/'; 
}

// Inicia a aplicação: Renderiza as opções do Passo 1
document.addEventListener('DOMContentLoaded', renderServiceOptions);