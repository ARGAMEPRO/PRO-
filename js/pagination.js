document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cards-container');
    if (!container) return;

    const pageType = window.location.pathname.split('/').pop().split('.')[0];
    const paginationContainer = document.querySelector('.pagination');
    
    if (pageType === 'clips') {
        loadAllClips();
        if (paginationContainer) paginationContainer.style.display = 'none';
        return;
    }

    setupPagination();
});

// Для клипов
async function loadAllClips() {
    try {
        const response = await fetch('data/clips.json');
        const clips = await response.json();
        const container = document.getElementById('cards-container');
        
        container.innerHTML = clips.map(clip => `
            <div class="clip-card">
                <div class="clip-preview" style="background-image: url('${clip.image}')"></div>
                <div class="clip-glass">
                    <h2 class="clip-title">${clip.title}</h2>
                    <p class="clip-artist">${clip.artist}</p>
                    <p class="clip-views">${clip.views}</p>
                </div>
                <button class="watch-button" onclick="window.open('${clip.videoLink || '#'}', '_blank')">
                    Смотреть
                </button>
            </div>
        `).join('');
    } catch (error) {
        console.error('Ошибка загрузки клипов:', error);
    }
}

// Для концертов/лекций
async function setupPagination() {
    const container = document.getElementById('cards-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageInfo = document.getElementById('page-info');
    
    let currentPage = 1;
    const itemsPerPage = 3;
    let totalPages = 1;
    let data = [];
    const pageType = window.location.pathname.split('/').pop().split('.')[0];

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

    function renderPage() {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageData = data.slice(start, end);

        container.innerHTML = pageData.map(item => {
            // Общая структура для кнопки регистрации
            const registerButton = item.registrationLink ? `
                <button class="register-button" 
                        onclick="window.open('${item.registrationLink}', '_blank')">
                    Зарегистрироваться
                </button>
            ` : '<button class="register-button disabled">Регистрация закрыта</button>';

            if (pageType === 'concerts') {
                return `
                    <div class="concert-card">
                        <div class="concert-image" style="background-image: url('${item.image}')"></div>
                        <div class="concert-glass">
                            <h2>${item.title}</h2>
                            <p>${formatDate(item.date)}</p>
                            <p>${item.location}</p>
                        </div>
                        ${registerButton}
                    </div>
                `;
            } else {
                return `
                    <div class="lecture-card">
                        <div class="lecture-image" style="background-image: url('${item.image}')"></div>
                        <div class="lecture-info">
                            <div class="lecture-glass">
                                <h2>${item.title}</h2>
                                <p>${item.description}</p>
                                <p>${formatDate(item.date)}</p>
                            </div>
                            ${registerButton}
                        </div>
                    </div>
                `;
            }
        }).join('');

        pageInfo.textContent = `Страница ${currentPage} из ${totalPages}`;
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
    }

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

    loadData();
}