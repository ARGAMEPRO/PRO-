document.querySelector('.img-wrapper').addEventListener('mousemove', (e) => {
    const wrapper = e.currentTarget;
    const rect = wrapper.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    wrapper.style.setProperty('--highlight-x', `${x}%`);
    wrapper.style.setProperty('--highlight-y', `${y}%`);
    wrapper.style.setProperty('--highlight-opacity', '0.6');

    const rotateX = (y - 50) / 10;
    const rotateY = -(x - 50) / 10;
    wrapper.style.transform = `scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

document.querySelector('.img-wrapper').addEventListener('mouseleave', (e) => {
    const wrapper = e.currentTarget;
    wrapper.style.setProperty('--highlight-opacity', '0');
    wrapper.style.transform = 'scale(1)';
});

document.querySelector('.img-wrapper-ab').addEventListener('mousemove', (e) => {
    const wrapper = e.currentTarget;
    const rect = wrapper.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    wrapper.style.setProperty('--highlight-x', `${x}%`);
    wrapper.style.setProperty('--highlight-y', `${y}%`);
    wrapper.style.setProperty('--highlight-opacity', '0.6');

    const rotateX = (y - 50) / 10;
    const rotateY = -(x - 50) / 10;
    wrapper.style.transform = `scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

document.querySelector('.img-wrapper-ab').addEventListener('mouseleave', (e) => {
    const wrapper = e.currentTarget;
    wrapper.style.setProperty('--highlight-opacity', '0');
    wrapper.style.transform = 'scale(1)';
});

// Бургер-меню для мобилки
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.getElementById('burger');
    const menu = document.getElementById('menu');
    
    burger.addEventListener('click', function() {
        menu.classList.toggle('active');
        // Дополнительно можно добавить анимацию или изменение иконки бургера
    });
});




document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.register-button');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            alert('Регистрация на мероприятие');
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Обработка кнопок регистрации
    const registerButtons = document.querySelectorAll('.register-button');
    registerButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            alert('Регистрация на концерт');
        });
    });

    // Обработка кнопки "Показать еще"
    const showMoreBtn = document.querySelector('.show-more');
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', function () {
            // Здесь будет загрузка дополнительных концертов
            alert('Загрузка дополнительных концертов...');
        });
    }
});

// Добавьте в основной JS сайта
if (window.location.pathname.includes('/confirm')) {
    const token = new URLSearchParams(window.location.search).get('token');
    if (token) {
        window.netlifyIdentity.confirm(token);
    }
}