// Menu mobile toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('show');
        });
    }
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav) nav.classList.remove('show');
        });
    });
    
    // Efeito de scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // Calcula a posição considerando o header fixo
                const headerOffset = 90;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Adicionar classe active ao header durante scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                header.style.background = 'linear-gradient(to right, var(--bege), var(--verde-claro))';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                header.style.background = 'linear-gradient(to right, var(--bege), var(--verde-claro))';
            }
        }
    });
    
    // CORREÇÃO: Animação de revelação dos elementos ao scroll
    function revealOnScroll() {
        const elements = document.querySelectorAll('.diferencial-card, .info-card, .sobre-content');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                // CORREÇÃO: Tornar o elemento visível com transição suave
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.classList.add('active');
            }
        });
    }
    
    // CORREÇÃO: Inicializar elementos como invisíveis apenas se não estiverem visíveis na tela inicialmente
    document.querySelectorAll('.diferencial-card, .info-card, .sobre-content').forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        // Só aplicar opacidade 0 se o elemento não estiver visível na tela inicialmente
        if (elementTop > window.innerHeight) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        } else {
            // Se já estiver visível, garantir que fique visível
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
    
    window.addEventListener('scroll', revealOnScroll);
    // Executar uma vez ao carregar a página
    revealOnScroll();
    
    // Modal para imagens da galeria
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (!img) return;
            
            const imgSrc = img.src;
            const altText = img.alt;
            
            // Criar modal
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.zIndex = '2000';
            modal.style.cursor = 'pointer';
            
            // Criar imagem no modal
            const modalImg = document.createElement('img');
            modalImg.src = imgSrc;
            modalImg.alt = altText;
            modalImg.style.maxWidth = '90%';
            modalImg.style.maxHeight = '90%';
            modalImg.style.objectFit = 'contain';
            modalImg.style.borderRadius = '5px';
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            
            // Fechar modal ao clicar
            modal.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
        });
    });
});