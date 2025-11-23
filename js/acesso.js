const SUPABASE_URL = 'https://isticmrrszpueieovlqq.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzdGljbXJyc3pwdWVpZW92bHFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4MzEwMjcsImV4cCI6MjA3OTQwNzAyN30.M3NNmuKrVFm-i4wQTHpVI0s-M3SCwHtB5CK93RZ2QL4';
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Referências aos elementos do Toggle e Formulários
    const showLoginBtn = document.getElementById('show-login');
    const showCadastroBtn = document.getElementById('show-cadastro');
    const loginForm = document.getElementById('login-form');
    const cadastroForm = document.getElementById('cadastro-form');
    
    // 2. Referências aos elementos do Modal
    const openModalBtn = document.getElementById('open-recovery-modal');
    const closeModalBtn = document.getElementById('close-recovery-modal');
    const recoveryModal = document.getElementById('recovery-modal');
    const recoveryForm = document.getElementById('recovery-form');

    // Função de Alternância
    function showForm(formToShow, buttonToActivate) {
        // 1. Oculta todos os formulários
        loginForm.classList.add('hidden-form');
        cadastroForm.classList.add('hidden-form');
        
        // 2. Remove o estado ativo de ambos os botões
        showLoginBtn.classList.remove('active');
        showCadastroBtn.classList.remove('active');

        // 3. Mostra o formulário desejado e ativa o botão
        formToShow.classList.remove('hidden-form');
        buttonToActivate.classList.add('active');

        // 4. Limpa as mensagens de feedback
        document.getElementById('login-message').innerHTML = '';
        document.getElementById('cadastro-message').innerHTML = '';
    }

    // --- Listeners para o Toggle ---
    
    // Alternar para Login
    if(showLoginBtn) {
        showLoginBtn.addEventListener('click', () => {
            showForm(loginForm, showLoginBtn);
        });
    }

    // Alternar para Cadastro
    if(showCadastroBtn) {
        showCadastroBtn.addEventListener('click', () => {
            showForm(cadastroForm, showCadastroBtn);
        });
    }

    // --- Lógica de Validação e Submissão do Cadastro ---

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', (e) => {
            // Previne o envio padrão do formulário para fazer a validação
            e.preventDefault(); 
            
            const passwordInput = document.getElementById('reg-senha');
            const confirmInput = document.getElementById('reg-confirmar-senha');
            const messageArea = document.getElementById('cadastro-message');

            const password = passwordInput.value;
            const confirmPassword = confirmInput.value;

            messageArea.innerHTML = ''; // Limpa a mensagem anterior

            // 1. Validação: Senhas diferentes
            if (password !== confirmPassword) {
                messageArea.innerHTML = '❌ As senhas digitadas não coincidem. Tente novamente.';
                messageArea.style.color = '#FFDEB4'; 
                return;
            }

            // 2. Validação: Comprimento mínimo
            if (password.length < 6) {
                messageArea.innerHTML = '❌ A senha deve ter no mínimo 6 caracteres.';
                messageArea.style.color = '#FFDEB4';
                return;
            }

            // Se chegou aqui, a validação front-end foi bem-sucedida
            
            // ***************************************************************
            // IMPORTANTE: Aqui você faria a chamada real para o Back-end
            // (Ex: usando `fetch(endpoint, { method: 'POST', body: formData })`)
            // ***************************************************************
            
            // Simulação de sucesso
            messageArea.innerHTML = '✅ Cadastro enviado! (Aguardando resposta do servidor)';
            messageArea.style.color = '#006600'; // Verde para sucesso
            
            // Exemplo de como limpar o formulário (opcional)
            // cadastroForm.reset(); 
        });
    }
    
    // --- Lógica do Modal de Recuperação ---

    if (openModalBtn && closeModalBtn && recoveryModal && recoveryForm) {
        
        // Abrir Modal
        openModalBtn.addEventListener('click', () => {
            recoveryModal.classList.remove('hidden-modal');
        });

        // Fechar Modal pelo botão X
        closeModalBtn.addEventListener('click', () => {
            recoveryModal.classList.add('hidden-modal');
        });

        // Fechar Modal clicando fora (no overlay)
        recoveryModal.addEventListener('click', (e) => {
            if (e.target === recoveryModal) {
                recoveryModal.classList.add('hidden-modal');
            }
        });

        // Submissão do formulário de Recuperação (Simulação)
        recoveryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const recoveryMessageArea = document.getElementById('recovery-message');
            recoveryMessageArea.innerHTML = '📧 Link de recuperação enviado para o e-mail.';
            recoveryMessageArea.style.color = '#006600';
            // Em uma implementação real, você faria a chamada ao servidor aqui
        });
    }
});