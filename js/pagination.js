document.addEventListener('DOMContentLoaded', () => {
    // Проверяем, на какой странице находимся
    const pageType = window.location.pathname.split('/').pop().split('.')[0];
    
    // Если это страница клипов - выходим (пагинация не нужна)
    if (pageType === 'clips') return;

    // Элементы пагинации
    const container = document.getElementById('cards-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageInfo = document.getElementById('page-info');
    
    // Настройки
    let currentPage = 1;
    const itemsPerPage = 3; // Количество карточек на странице
    let totalPages = 1;
    let data = [];

    // Загрузка данных
    async function loadData() {
        try {
            const response = await fetch(`data/${pageType}.json`);
            data = await response.json();
            totalPages = Math.ceil(data.length / itemsPerPage);
            renderPage();
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
        }
    }

    // Отрисовка текущей страницы
    function renderPage() {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageData = data.slice(start, end);

        container.innerHTML = '';
        
        // Генерация карточек в зависимости от типа страницы
        pageData.forEach(item => {
            let cardHtml = '';

            if (pageType === 'concerts') {
                cardHtml = `
                    <div class="concert-card">
                        <div class="concert-image" style="background-image: url('${item.image}')"></div>
                        <div class="concert-glass">
                            <h2 class="concert-title">${item.title}</h2>
                            <p class="concert-date">${formatDate(item.date)}</p>
                            <p class="concert-location">${item.location}</p>
                        </div>
                        <button class="register-button">Зарегистрироваться</button>
                    </div>
                `;
            } else if (pageType === 'lectures') {
                cardHtml = `
                    <div class="lecture-card">
                        <div class="lecture-image" style="background-image: url('${item.image}')"></div>
                        <div class="lecture-info">
                            <div class="lecture-glass">
                                <h2 class="lecture-title">${item.title}</h2>
                                <p class="lecture-description">${item.description}</p>
                                <p class="lecture-date">${formatDate(item.date)}</p>
                            </div>
                            <button class="register-button">Зарегистрироваться</button>
                        </div>
                    </div>
                `;
            }

            container.insertAdjacentHTML('beforeend', cardHtml);
        });

        // Обновление информации о странице
        pageInfo.textContent = `Страница ${currentPage} из ${totalPages}`;
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    }

    // Форматирование даты
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Обработчики кнопок
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderPage();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderPage();
        }
    });

    // Первая загрузка
    loadData();
});