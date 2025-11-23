const products = [
    {
        id: 1,
        name: 'Bolo Cítrico Matinée',
        price: 'R$ 20,50',
        image: 'https://c.animaapp.com/sqnQevmt/img/bolo-de-lim-o-no-lumi-re-caf--1.png', // <<< Seu link aqui
        category: 'bolos'
    },
    {
        id: 2,
        name: 'Bolo Ouro Negro',
        price: 'R$ 30,30',
        image: 'https://c.animaapp.com/sqnQevmt/img/chatgpt-image-29-de-out--de-2025--11-53-54--1--2.png', // <<< Seu link aqui
        category: 'bolos'
    },
    {
        id: 3,
        name: 'Petit Lumière',
        price: 'R$ 25,00',
        image: 'https://c.animaapp.com/sqnQevmt/img/chatgpt-image-29-de-out--de-2025--12-03-25-1.png', // <<< Seu link aqui
        category: 'bolos'
    },
    {
        id: 4,
        name: 'Bolo Rubi de Hollywood',
        price: 'R$ 35,00',
        image: 'https://c.animaapp.com/sqnQevmt/img/fatia-de-red-velvet-do-lumi-re-1.png', // <<< Seu link aqui
        category: 'bolos'
    },
    {
        id: 5,
        name: 'Bolo Esmeralda Gourmet',
        price: 'R$ 38,00',
        image: 'https://c.animaapp.com/sqnQevmt/img/chatgpt-image-3-de-nov--de-2025--08-34-35-1.png', // <<< Seu link aqui
        category: 'bolos'
    },
    {
        id: 6,
        name: 'Quiche de Queijo e Tomate',
        price: 'R$ 15,90',
        image: 'https://c.animaapp.com/sqnQevmt/img/bolo-de-lim-o-no-lumi-re-caf--2.png', // <<< Seu link aqui
        category: 'salgados'
    },
    {
        id: 7,
        name: 'Pão de queijo (Und.)',
        price: 'R$ 9,00',
        image: 'https://c.animaapp.com/sqnQevmt/img/chatgpt-image-12-de-nov--de-2025--09-52-14-1.png', // <<< Seu link aqui
        category: 'salgados'
    },
    {
        id: 8,
        name: 'Coxinha de Frango',
        price: 'R$ 19,40',
        image: 'https://c.animaapp.com/sqnQevmt/img/chatgpt-image-29-de-out--de-2025--12-03-25-2.png', // <<< Seu link aqui
        category: 'salgados'
    },
    {
        id: 9,
        name: 'Croissant',
        price: 'R$ 27,50',
        image: 'https://c.animaapp.com/sqnQevmt/img/chatgpt-image-3-de-nov--de-2025--08-34-35-2.png', // <<< Seu link aqui
        category: 'salgados'
    },
    {
        id: 10,
        name: 'Sanduíche Estrela',
        price: 'R$ 12,90',
        image: 'https://c.animaapp.com/sqnQevmt/img/image-2.png', // <<< Seu link aqui
        category: 'salgados'
    },
    {
        id: 11,
        name: 'Affogato Clássico',
        price: 'R$ 15,90',
        image: 'https://c.animaapp.com/sqnQevmt/img/a3d4a8ca-75f2-44e4-a0ed-02b9b1904387-1.png', // <<< Seu link aqui
        category: 'bebidas'
    },
    {
        id: 12,
        name: 'Latte Simples',
        price: 'R$ 9,00',
        image: 'https://c.animaapp.com/sqnQevmt/img/image-3.png', // <<< Seu link aqui
        category: 'bebidas'
    },
    {
        id: 13,
        name: 'Café Expresso Americano',
        price: 'R$ 12,00',
        image: 'https://c.animaapp.com/sqnQevmt/img/chatgpt-image-29-de-out--de-2025--12-03-25-3.png', // <<< Seu link aqui
        category: 'bebidas'
    },
    {
        id: 14,
        name: 'Cappuccino Lumière',
        price: 'R$ 27,50',
        image: 'https://c.animaapp.com/sqnQevmt/img/fatia-de-red-velvet-do-lumi-re-3.png', // <<< Seu link aqui
        category: 'bebidas'
    },
    {
        id: 15,
        name: 'Mocha Especial',
        price: 'R$ 18,90',
        image: 'https://c.animaapp.com/sqnQevmt/img/chatgpt-image-3-de-nov--de-2025--08-34-35-3.png', // <<< Seu link aqui
        category: 'bebidas'
    }
];

// ------------------------------------------------------------------
// ESTADO E ROTEAMENTO
// ------------------------------------------------------------------
let historyStack = []; // Pilha para simular o histórico (Back)
const app = document.getElementById('desktop-container');

/**
 * Navega para uma nova página, salvando o estado atual no histórico.
 * @param {string} pageName - Nome da página ('home', 'product', 'category').
 * @param {string} [data] - Dados adicionais (nome do produto ou categoria).
 */
function navigateTo(pageName, data = null) {
    // Salva o estado atual (se não for a primeira navegação ou um refresh)
    const currentState = { page: pageName, data: data };
    if (historyStack.length === 0 || JSON.stringify(historyStack[historyStack.length - 1]) !== JSON.stringify(currentState)) {
        historyStack.push(currentState);
    }
    
    // Renderiza a página
    renderPage(pageName, data);
}

/**
 * Volta para o estado anterior do histórico.
 */
function goBack() {
    if (historyStack.length > 1) {
        historyStack.pop(); // Remove o estado atual
        const previousState = historyStack[historyStack.length - 1];
        // Renderiza o estado anterior (sem salvar no histórico novamente)
        renderPage(previousState.page, previousState.data);
    } else {
        // Se estiver na home, não faz nada ou pode redirecionar se estivesse em um SPA maior
        console.log("Já está na página inicial.");
    }
}

/**
 * Função principal que decide qual tela renderizar.
 */
function renderPage(pageName, data) {
    switch (pageName) {
        case 'home':
            renderHome();
            break;
        case 'product':
            renderProductPage(data);
            break;
        case 'category':
            renderCategoryPage(data);
            break;
        default:
            renderHome();
    }
}

// ------------------------------------------------------------------
// FUNÇÕES DE SLIDER (CARROSSEL HORIZONTAL)
// ------------------------------------------------------------------

/**
 * Move o carrossel horizontalmente.
 * @param {number} direction - 1 para direita (próximo), -1 para esquerda (anterior).
 */
function scrollProducts(direction) {
    const carousel = document.querySelector('.product-carousel');
    if (!carousel) return;

    // A distância de rolagem deve ser o tamanho do item + o espaço (gap)
    // O 300px é a largura do item no CSS (280px item + 40px gap, arredondado)
    const scrollDistance = 320; 

    // Calcula a nova posição de rolagem
    const newScrollLeft = carousel.scrollLeft + (direction * scrollDistance);
    
    // Rola suavemente
    carousel.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
    });
}

// ------------------------------------------------------------------
// RENDERIZAÇÕES DE TELA
// ------------------------------------------------------------------

function renderHome() {
    let productsHtml = products.map(product => `
        <div class="product-item">
            <button class="product-image-button" onclick="navigateTo('product', '${product.name}')">
                <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null; this.src='https://placehold.co/280x280/F0E5D5/780000?text=Sem+Foto';" />
            </button>
            <button class="product-name" onclick="navigateTo('product', '${product.name}')">
                ${product.name}
            </button>
            <div class="product-price">${product.price}</div>
        </div>
    `).join('');

    app.innerHTML = `
        <div class="home-layout">
            
            <div class="header">
                <!-- Botão Voltar (aparece se houver histórico, mas fica na posição correta) -->
                <button class="back-button" onclick="goBack()" style="${historyStack.length > 1 ? 'visibility: visible;' : 'visibility: hidden;'}">
                    <span class="back-button-arrow">←</span>
                    <span class="back-button-text">Voltar</span>
                </button>
                
                <!-- Logo no Centro -->
                <button class="logo-button" onclick="navigateTo('home')" style="grid-column: 2;">
                    <img alt="Logo Lumière Café" src="https://c.animaapp.com/sqnQevmt/img/group@4x.png" onerror="this.onerror=null; this.src='https://placehold.co/180x40/FDF0D5/780000?text=LOGO';" />
                </button>
                
                <!-- Ícone Carrinho -->
                <img class="cart-icon" alt="Carrinho" src="https://c.animaapp.com/sqnQevmt/img/icons8-carrinho-32-1@2x.png" style="grid-column: 3;" />
            </div>

            <h1 class="title">Cardápio</h1>

            <div class="categories-container">
                <button class="category-button" onclick="navigateTo('category', 'bolos')">
                    Bolos →
                </button>
                <button class="category-button" onclick="navigateTo('category', 'salgados')">
                    Salgados →
                </button>
                <button class="category-button" onclick="navigateTo('category', 'bebidas')">
                    Bebidas →
                </button>
            </div>
            
            <div class="carousel-wrapper">
                <!-- Setas de navegação do carrossel -->
                <button id="arrow-left" class="scroll-arrow" onclick="scrollProducts(-1)">
                    <span style="margin-right: 2px;">&#x2190;</span> 
                </button>
                
                <div class="product-carousel">
                    ${productsHtml}
                </div>
                
                <button id="arrow-right" class="scroll-arrow" onclick="scrollProducts(1)">
                    <span style="margin-left: 2px;">&#x2192;</span> 
                </button>
            </div>

        </div>
    `;
}

function renderProductPage(productName) {
    const product = products.find(p => p.name === productName);
    
    app.innerHTML = `
        <div class="home-layout">
             <div class="header">
                <button class="back-button" onclick="goBack()">
                    <span class="back-button-arrow">←</span>
                    <span class="back-button-text">Voltar</span>
                </button>
                <button class="logo-button" onclick="navigateTo('home')" style="grid-column: 2;">
                    <img alt="Logo Lumière Café" src="https://c.animaapp.com/sqnQevmt/img/group@4x.png" onerror="this.onerror=null; this.src='https://placehold.co/180x40/FDF0D5/780000?text=LOGO';" />
                </button>
                <img class="cart-icon" alt="Carrinho" src="https://c.animaapp.com/sqnQevmt/img/icons8-carrinho-32-1@2x.png" style="grid-column: 3;" />
            </div>

            <h1 class="page-title">${productName}</h1>
            
            <div class="page-content product-detail">
                ${product ? `<img src="${product.image}" alt="${product.name}" onerror="this.onerror=null; this.src='https://placehold.co/350x350/F0E5D5/780000?text=Sem+Foto';" />` : ''}
                <p class="page-price-detail">${product ? product.price : 'Preço sob consulta'}</p>
                <p>
                    O ${productName} é a nossa estrela do cardápio. Preparado com os melhores ingredientes e a paixão que só o Lumière Café oferece. 
                    Adicione ao seu carrinho agora e desfrute de um momento de pura magia! 
                </p>
                <button class="category-button" style="margin-top: 20px;">Adicionar ao Carrinho</button>
            </div>
        </div>
    `;
}

function renderCategoryPage(category) {
    const filteredProducts = products.filter(p => p.category === category);
    
    let productsHtml = filteredProducts.map(p => `
        <div class="category-product-item" onclick="navigateTo('product', '${p.name}')" style="cursor: pointer;">
            <img src="${p.image}" alt="${p.name}" onerror="this.onerror=null; this.src='https://placehold.co/60x60/F0E5D5/780000?text=P';" />
            <div class="category-product-info">
                <strong>${p.name}</strong><br>
                <span>${p.price}</span>
            </div>
        </div>
    `).join('');

    app.innerHTML = `
        <div class="home-layout">
            <div class="header">
                <button class="back-button" onclick="goBack()">
                    <span class="back-button-arrow">←</span>
                    <span class="back-button-text">Voltar</span>
                </button>
                <button class="logo-button" onclick="navigateTo('home')" style="grid-column: 2;">
                    <img alt="Logo Lumière Café" src="https://c.animaapp.com/sqnQevmt/img/group@4x.png" onerror="this.onerror=null; this.src='https://placehold.co/180x40/FDF0D5/780000?text=LOGO';" />
                </button>
                <img class="cart-icon" alt="Carrinho" src="https://c.animaapp.com/sqnQevmt/img/icons8-carrinho-32-1@2x.png" style="grid-column: 3;" />
            </div>

            <h1 class="page-title">${category.toUpperCase()}</h1>
            
            <div class="page-content">
                <div class="category-products-list">
                    ${productsHtml || '<p style="font-family: Poppins; color: #780000;">Nenhum produto encontrado nesta categoria.</p>'}
                </div>
            </div>
        </div>
    `;
}

// ------------------------------------------------------------------
// INICIALIZAÇÃO
// ------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa a aplicação carregando a tela Home e garantindo o primeiro estado no histórico
    if (historyStack.length === 0) {
        navigateTo('home');
    } else {
        // Se a página for recarregada e já houver estado, renderiza o último estado
        const lastState = historyStack[historyStack.length - 1];
        renderPage(lastState.page, lastState.data);
    }
});