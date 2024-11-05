document.addEventListener('DOMContentLoaded', function() {
    // =========================================
    // Gestión del tema (modo oscuro/claro)
    // =========================================
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Función para cambiar el tema
    function toggleTheme() {
        body.classList.toggle('theme-dark');
        const icon = themeToggle.querySelector('i');
        
        if (body.classList.contains('theme-dark')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    }

    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('theme-dark');
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', toggleTheme);

    // =========================================
    // Gestión de la foto de perfil
    // =========================================
    const avatarImg = document.getElementById('avatar-img');
    const avatarUpload = document.getElementById('avatar-upload');
    const avatarContainer = document.querySelector('.avatar-container');

    avatarContainer.addEventListener('click', () => avatarUpload.click());

    avatarUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                avatarImg.src = e.target.result;
                localStorage.setItem('avatar', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // Cargar avatar guardado
    const savedAvatar = localStorage.getItem('avatar');
    if (savedAvatar) {
        avatarImg.src = savedAvatar;
    }

    // =========================================
    // Plantillas para nuevos elementos
    // =========================================
    const templates = {
        experience: () => `
            <div class="experience-item">
                <div class="timeline-dot"></div>
                <div class="experience-content">
                    <div class="experience-header">
                        <h4 contenteditable="true">Nuevo Cargo</h4>
                        <span class="company" contenteditable="true">Nombre de la Empresa</span>
                    </div>
                    <span class="date" contenteditable="true">Fecha inicio - Fecha fin</span>
                    <p contenteditable="true">Descripción de las responsabilidades y logros.</p>
                </div>
            </div>
        `,
        education: () => `
            <div class="education-item">
                <div class="timeline-dot"></div>
                <div class="education-content">
                    <div class="education-header">
                        <h4 contenteditable="true">Título Obtenido</h4>
                        <span class="institution" contenteditable="true">Nombre de la Institución</span>
                    </div>
                    <span class="date" contenteditable="true">Año inicio - Año fin</span>
                    <p contenteditable="true">Descripción de los estudios realizados.</p>
                </div>
            </div>
        `,
        skill: () => `
            <div class="skill-item">
                <div class="skill-header">
                    <span contenteditable="true">Nueva Habilidad</span>
                    <span class="skill-level" contenteditable="true">80%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" style="width: 80%"></div>
                </div>
            </div>
        `,
        language: () => `
            <div class="language-item">
                <div class="language-header">
                    <span contenteditable="true">Nuevo Idioma</span>
                    <span class="language-level" contenteditable="true">Intermedio</span>
                </div>
                <div class="language-bar">
                    <div class="language-progress" style="width: 60%"></div>
                </div>
            </div>
        `
    };

    // =========================================
    // Funciones para añadir elementos
    // =========================================
    function addElement(containerId, template) {
        const container = document.getElementById(containerId);
        container.insertAdjacentHTML('beforeend', template());
        
        // Animar el nuevo elemento
        const newElement = container.lastElementChild;
        newElement.style.opacity = '0';
        requestAnimationFrame(() => {
            newElement.style.transition = 'opacity 0.3s ease';
            newElement.style.opacity = '1';
        });
    }

    // Event listeners para botones de añadir
    document.getElementById('add-experience')?.addEventListener('click', () => 
        addElement('experience-container', templates.experience));
    
    document.getElementById('add-education')?.addEventListener('click', () => 
        addElement('education-container', templates.education));
    
    document.getElementById('add-skill')?.addEventListener('click', () => 
        addElement('skills-container', templates.skill));
    
    document.getElementById('add-language')?.addEventListener('click', () => 
        addElement('languages-container', templates.language));

    // =========================================
    // Actualización de barras de progreso
    // =========================================
    function updateProgressBars() {
        document.querySelectorAll('.skill-level, .language-level').forEach(level => {
            level.addEventListener('input', function() {
                const progressBar = this.closest('.skill-item, .language-item')
                    .querySelector('.skill-progress, .language-progress');
                const value = parseInt(this.textContent) || 0;
                progressBar.style.width = `${Math.min(100, Math.max(0, value))}%`;
            });
        });
    }

    // Inicializar actualización de barras de progreso
    updateProgressBars();

    // =========================================
    // Exportar a PDF
    // =========================================
    document.getElementById('download-pdf').addEventListener('click', function() {
        const element = document.querySelector('.cv-container');
        const controls = document.querySelector('.floating-controls');
        const addButtons = document.querySelectorAll('.add-btn');
        
        // Ocultar elementos de control
        controls.style.display = 'none';
        addButtons.forEach(btn => btn.style.display = 'none');

        // Configuración del PDF
        const opt = {
            margin: [10, 10],
            filename: 'cv-profesional.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                logging: false
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait'
            }
        };

        // Generar PDF
        html2pdf().set(opt).from(element).save().then(() => {
            // Restaurar elementos de control
            controls.style.display = 'flex';
            addButtons.forEach(btn => btn.style.display = 'block');
        });
    });

    // =========================================
    // Guardar contenido automáticamente
    // =========================================
    let saveTimeout;
    document.addEventListener('input', function(e) {
        if (e.target.hasAttribute('contenteditable')) {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                const content = document.querySelector('.cv-container').innerHTML;
                localStorage.setItem('cv-content', content);
            }, 1000);
        }
    });

    // Cargar contenido guardado
    const savedContent = localStorage.getItem('cv-content');
    if (savedContent) {
        document.querySelector('.cv-container').innerHTML = savedContent;
        updateProgressBars(); // Reinicializar listeners
    }
}); 