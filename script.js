let currentSlide = 1;
const totalSlides = document.querySelectorAll('.slide').length;
const pageIndicator = document.getElementById('page-indicator');

function showSlide(index) {
    if (index < 1 || index > totalSlides) return;
    
    document.querySelectorAll('.slide').forEach(slide => {
        slide.classList.remove('active');
    });
    
    const activeSlide = document.getElementById(`slide-${index}`);
    activeSlide.classList.add('active');
    currentSlide = index;

    if (pageIndicator) {
        pageIndicator.style.display = 'block';
        pageIndicator.innerText = `${currentSlide} / ${totalSlides}`;
    }
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'Space' || e.key === 'Enter') {
        showSlide(currentSlide + 1);
    } 
    else if (e.key === 'ArrowLeft') {
        showSlide(currentSlide - 1);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const slide14 = document.getElementById('slide-14');
    if(slide14) {
        const cards = slide14.querySelectorAll('.model-card');
        const infoModel = document.getElementById('info-model');
        const infoFeature = document.getElementById('info-feature');
        const infoDetail = document.getElementById('info-detail');
        const infoLabel = document.getElementById('info-label'); 

        if(cards.length > 0) {
            cards[0].classList.add('highlight');
            document.getElementById('info-box').style.display = 'flex';
            infoModel.innerText = cards[0].querySelector('h3').innerText + " 상세 특징";
            infoFeature.innerText = cards[0].getAttribute('data-feature');
            infoDetail.innerText = cards[0].getAttribute('data-detail');
            infoLabel.innerText = "한계점";
        }

        cards.forEach(card => {
            card.addEventListener('click', () => {
                cards.forEach(c => c.classList.remove('highlight', 'final-highlight'));
                
                if(card.id === 'card-v2-1') {
                    card.classList.add('final-highlight');
                    infoLabel.innerText = "선정 결과";
                } else {
                    card.classList.add('highlight');
                    infoLabel.innerText = "한계점";
                }

                infoModel.innerText = card.querySelector('h3').innerText + " 상세 특징";
                infoFeature.innerText = card.getAttribute('data-feature');
                infoDetail.innerText = card.getAttribute('data-detail');
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('datasetChart');
    if (!ctx) return;

    const labels = ['Crack', 'Normal', 'Leak', 'Efflorescence', 'Detachment', 'Reticular Crack', 'Spalling', 'Material Sep.', 'Rebar', 'Damage', 'Exhilaration'];
    const trainData = [321597, 20000, 15084, 14920, 13010, 10806, 10329, 9219, 2139, 1934, 957];
    const validData = [40199, 2500, 1887, 1864, 1625, 1346, 1296, 1159, 267, 243, 114];

    const datasetChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Train Set',
                    data: trainData,
                    backgroundColor: 'rgba(56, 189, 248, 0.8)',
                    borderColor: 'rgba(56, 189, 248, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Validation Set',
                    data: validData,
                    backgroundColor: 'rgba(168, 85, 247, 0.8)',
                    borderColor: 'rgba(168, 85, 247, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#f8fafc', font: { family: 'Noto Sans KR', size: 12 } }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    titleFont: { size: 14 },
                    bodyFont: { size: 13 },
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) { label += ': '; }
                            if (context.parsed.x !== null) {
                                label += new Intl.NumberFormat('ko-KR').format(context.parsed.x);
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#94a3b8' }
                },
                y: {
                    stacked: true,
                    grid: { display: false },
                    ticks: { color: '#e2e8f0', font: { size: 12 } }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });

    const tableRows = document.querySelectorAll('.dataset-table-mini tbody tr');

    tableRows.forEach((row, index) => {
        row.addEventListener('mouseenter', () => {
            const activeElements = [
                { datasetIndex: 0, index: index },
                { datasetIndex: 1, index: index }
            ];
            datasetChart.setActiveElements(activeElements);
            datasetChart.tooltip.setActiveElements(activeElements);
            datasetChart.update();
        });

        row.addEventListener('mouseleave', () => {
            datasetChart.setActiveElements([]);
            datasetChart.tooltip.setActiveElements([]);
            datasetChart.update();
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const zoomableElements = document.querySelectorAll('.ds-example-img, .limit-img-card img, [data-img]');
    const modal = document.getElementById('image-modal');
    
    if(!modal) return;
    
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.modal-close');

    zoomableElements.forEach(el => {
        el.addEventListener('click', () => {
            const imagePath = el.tagName.toLowerCase() === 'img' ? el.src : el.getAttribute('data-img');
            
            if(imagePath) {
                modalImg.src = imagePath;
                modal.classList.add('show');
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
        }
    });
});

const synData = {
    hard: { Normal: 0.46, Crack: 0.37, Spalling: 0.10, Detachment: 0.07 },
    hint: { Normal: 0.36, Crack: 0.47, Spalling: 0.15, Detachment: 0.02 }
};

const synHintData = { Normal: 0.0, Crack: 0.8, Spalling: 0.2, Detachment: 0.0 };

function updateSynergy(type) {
    document.getElementById('btn-hard').classList.toggle('active', type === 'hard');
    document.getElementById('btn-hint').classList.toggle('active', type === 'hint');
    document.getElementById('hint-container').style.display = type === 'hint' ? 'block' : 'none';
    
    const title = document.getElementById('prob-title');
    title.innerText = type === 'hard' ? 'Class Probabilities (Hard)' : 'Class Probabilities (Hint-Applied)';
    title.style.color = type === 'hard' ? '#f8fafc' : '#f59e0b';

    const container = document.getElementById('syn-main-bars');
    container.innerHTML = '';
    for (let key in synData[type]) {
        let val = synData[type][key];
        container.innerHTML += createSynBar(key, val, '#f59e0b', '20px');
    }

    if (type === 'hint') {
        const hintContainer = document.getElementById('hint-bars');
        hintContainer.innerHTML = '';
        for (let key in synHintData) {
            hintContainer.innerHTML += createSynBar(key, synHintData[key], '#fbbf24', '12px');
        }
    }
}

function createSynBar(label, val, color, height) {
    return `
        <div class="syn-bar">
            <span class="syn-name">${label}</span>
            <div class="syn-bar-bg" style="height: ${height};">
                <div class="syn-bar-fill" style="width: ${val * 100}%; background: ${color};"></div>
            </div>
            <span class="syn-val">${val.toFixed(2)}</span>
        </div>`;
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('btn-hard')) {
        updateSynergy('hard');
    }
});

function toggleAppView(view) {
    const btnOriginal = document.getElementById('tab-original');
    const btnAnalyzed = document.getElementById('tab-analyzed');
    const overlay = document.getElementById('app-overlay');

    if (view === 'original') {
        btnOriginal.classList.add('active');
        btnAnalyzed.classList.remove('active');
        overlay.style.display = 'none';
    } else {
        btnAnalyzed.classList.add('active');
        btnOriginal.classList.remove('active');
        overlay.style.display = 'block'; 
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const btnOriginal = document.getElementById('tab-original');
    const btnAnalyzed = document.getElementById('tab-analyzed');
    const overlay = document.getElementById('app-overlay');
    const chips = document.querySelectorAll('.type-chip');
    
    let isAnalyzedView = true;

    function updateOverlay() {
        if (!overlay) return;

        if (!isAnalyzedView) {
            overlay.style.opacity = '0';
            return;
        }
        
        overlay.style.opacity = '1';
        
        const activeTypes = Array.from(chips)
            .filter(chip => chip.classList.contains('selected'))
            .map(chip => chip.getAttribute('data-type'));

        document.querySelectorAll('.app-poly').forEach(poly => {
            poly.style.display = 'none';
        });

        activeTypes.forEach(type => {
            document.querySelectorAll('.poly-' + type).forEach(poly => {
                poly.style.display = 'block';
            });
        });
    }

    if (btnOriginal && btnAnalyzed && overlay) {
        btnOriginal.addEventListener('click', () => {
            btnOriginal.classList.add('active');
            btnAnalyzed.classList.remove('active');
            isAnalyzedView = false;
            updateOverlay();
        });

        btnAnalyzed.addEventListener('click', () => {
            btnAnalyzed.classList.add('active');
            btnOriginal.classList.remove('active');
            isAnalyzedView = true;
            updateOverlay();
        });
    }

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chip.classList.toggle('selected'); 
            updateOverlay();
        });
    });

    updateOverlay();
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.index-item').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const slideNumber = parseInt(
                targetId.replace('#slide-', '')
            );
            showSlide(slideNumber);
        });
    });
});



showSlide(1);