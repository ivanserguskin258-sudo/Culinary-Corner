(function() {
    const burger = document.getElementById('burgerBtn');
    const navMenu = document.getElementById('navMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    
    function closeMenu() {
        navMenu.classList.remove('active');
        if(menuOverlay) menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    function openMenu() {
        navMenu.classList.add('active');
        if(menuOverlay) menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    if(burger) {
        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            if(navMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }
    
    if(menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }
    
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(window.innerWidth <= 768) closeMenu();
        });
    });
    
    window.addEventListener('resize', () => {
        if(window.innerWidth > 768 && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    const themeBtn = document.getElementById('themeToggle');
    const prefersDark = localStorage.getItem('theme');
    if(prefersDark === 'dark') {
        document.body.classList.add('dark-theme');
        if(themeBtn) themeBtn.textContent = '☀️';
    } else if(prefersDark === 'light') {
        document.body.classList.remove('dark-theme');
        if(themeBtn) themeBtn.textContent = '🌙';
    } else {
        if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-theme');
            if(themeBtn) themeBtn.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            if(themeBtn) themeBtn.textContent = '🌙';
        }
    }
    
    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            if(document.body.classList.contains('dark-theme')) {
                document.body.classList.remove('dark-theme');
                themeBtn.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            } else {
                document.body.classList.add('dark-theme');
                themeBtn.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            }
        });
    }
    
    const modal = document.getElementById('feedbackModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalSpan = document.querySelector('.close-modal');
    const feedbackForm = document.getElementById('feedbackForm');
    
    function openModal() {
        if(modal) modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    function closeModal() {
        if(modal) modal.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    if(openModalBtn) {
        openModalBtn.addEventListener('click', openModal);
    }
    if(closeModalSpan) {
        closeModalSpan.addEventListener('click', closeModal);
    }
    
    window.addEventListener('click', (e) => {
        if(e.target === modal) closeModal();
    });
    
    if(feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nameInput = document.getElementById('userName');
            const phoneInput = document.getElementById('userPhone');
            const emailInput = document.getElementById('userEmail');
            
            let nameVal= nameInput.value.trim();
            let phoneVal = phoneInput.value.trim();
            let emailVal = emailInput.value.trim();
            
            if(nameVal === '') {
                alert('Пожалуйста, введите ваше имя');
                nameInput.focus();
                return;
            }
            if(phoneVal === '') {
                alert('Введите номер телефона');
                phoneInput.focus();
                return;
            }
            if(emailVal === '' || !emailVal.includes('@') || !emailVal.includes('.')) {
                alert('Введите корректный email (пример: name@domain.com)');
                emailInput.focus();
                return;
            }
            
            alert(`Спасибо, ${nameVal}! Мы свяжемся с вами по телефону ${phoneVal} или почте ${emailVal} в ближайшее время.`);
            nameInput.value = '';
            phoneInput.value = '';
            emailInput.value = '';
            closeModal();
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
})();