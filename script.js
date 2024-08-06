  // Función para añadir nueva sección de experiencia
  document.getElementById('add-experience-btn').addEventListener('click', function() {
    const newExperience = `
      <div class="row m-b-10 experience-entry">
        <div class="col-md-4">
          <p class="date" contenteditable="true"><b>Nuevo Trabajo</b><br><i>Fecha</i></p>
        </div>
        <div class="col-md-7 col-md-offset-1">
          <p class="title" contenteditable="true">Nuevo Puesto</p>
          <p contenteditable="true">Descripción de las tareas y responsabilidades.</p>
          <button class="btn btn-danger btn-xs remove-btn">Eliminar</button>
        </div>
      </div>`;
    document.getElementById('experience-section').insertAdjacentHTML('beforeend', newExperience);
    addRemoveEvent();
  });

  // Función para añadir nueva sección de educación
  document.getElementById('add-education-btn').addEventListener('click', function() {
    const newEducation = `
      <div class="row m-b-10 education-entry">
        <div class="col-md-4">
          <p class="date" contenteditable="true"><b>Nueva Educación</b><br><i>Fecha</i></p>
        </div>
        <div class="col-md-7 col-md-offset-1">
          <p class="title" contenteditable="true">Institución Educativa</p>
          <p contenteditable="true">Descripción del programa educativo.</p>
          <button class="btn btn-danger btn-xs remove-btn">Eliminar</button>
        </div>
      </div>`;
    document.getElementById('education-section').insertAdjacentHTML('beforeend', newEducation);
    addRemoveEvent();
  });

  // Función para añadir nueva habilidad laboral
  document.getElementById('add-work-skill-btn').addEventListener('click', function() {
    const newWorkSkill = `
      <div class="col-md-6 no-pad-l skills-entry">
        <dl class="skills">
          <dt contenteditable="true">Nueva Habilidad</dt>
          <dd contenteditable="true">0</dd>
          <button class="btn btn-danger btn-xs remove-btn">Eliminar</button>
        </dl>
      </div>`;
    document.getElementById('work-skills-section').insertAdjacentHTML('beforeend', newWorkSkill);
    addRemoveEvent();
  });

  // Función para añadir nueva habilidad personal
  document.getElementById('add-personal-skill-btn').addEventListener('click', function() {
    const newPersonalSkill = `
      <div class="col-md-6 no-pad-l skills-entry">
        <dl class="skills">
          <dt contenteditable="true">Nueva Habilidad</dt>
          <dd contenteditable="true">0</dd>
          <button class="btn btn-danger btn-xs remove-btn">Eliminar</button>
        </dl>
      </div>`;
    document.getElementById('personal-skills-section').insertAdjacentHTML('beforeend', newPersonalSkill);
    addRemoveEvent();
  });

  // Función para eliminar secciones
  function addRemoveEvent() {
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
      button.addEventListener('click', function() {
        this.parentElement.parentElement.remove();
      });
    });
  }

  // Inicializar eventos de eliminación
  addRemoveEvent();




//arreglar no carga la iamgen



// script.js
document.addEventListener('DOMContentLoaded', function () {
  const html2pdf = window.html2pdf;

  // Botón para guardar como PDF
  const savePdfBtn = document.createElement('button');
  savePdfBtn.innerText = 'Guardar como PDF';
  savePdfBtn.classList.add('btn', 'btn-success');
  savePdfBtn.style.margin = '20px';
  document.body.appendChild(savePdfBtn);

  savePdfBtn.addEventListener('click', function () {
    downloadPDF();
  });
});

function downloadPDF() {
  // Obtener la fecha actual
  const fechaActual = new Date();
  
  // Formatear la fecha como "YYYY-MM-DD_HH-mm-ss"
  const formatoFecha = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const fechaFormateada = fechaActual.toLocaleString('es-ES', formatoFecha)
    .replace(/\//g, '-')
    .replace(/:/g, '-');

  // Mostrar la fecha en el elemento HTML
  document.getElementById('fechaDescarga').innerText = `Fecha de descarga: ${fechaFormateada}`;

  // Esconder los elementos no deseados, excepto la imagen del avatar
  document.querySelectorAll('.remove-btn, #add-experience-btn, #add-education-btn, #add-work-skill-btn, #add-personal-skill-btn, #avatar-upload').forEach(el => {
    if (el.id !== 'avatar-upload') {
      el.style.display = 'none';
    }
  });

  // Establecer estilos de impresión
  const style = `
    @media print {
      body {
        margin: 0;
      }
      .container {
        padding: 0;
        margin: 0;
      }
      .col-md-4, .col-md-8 {
        float: left;
        width: 100%;
      }
      .col-md-4 {
        margin-right: 0;
      }
      .col-md-8 {
        margin-left: 0;
      }
      .cv {
        width: 100%;
      }
      #avatar-img {
        display: block;
        margin: auto;
      }
    }
  `;
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = style;
  document.head.appendChild(styleSheet);

  // Configuración de html2pdf
  const options = {
    margin: [10, 10, 10, 10], // Margen en mm [top, right, bottom, left]
    filename: `CV_Hector_Daniel_Ayarachi_Fuentes_${fechaFormateada}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  // Generar el PDF
  html2pdf().from(document.body).set(options).toPdf().get('pdf').then(function(pdf) {
    // Volver a mostrar los elementos después de la generación del PDF
    document.querySelectorAll('.remove-btn, #add-experience-btn, #add-education-btn, #add-work-skill-btn, #add-personal-skill-btn, #avatar-upload').forEach(el => el.style.display = '');

    // Descargar el PDF
    pdf.save(`CV_Hector_Daniel_Ayarachi_Fuentes_${fechaFormateada}.pdf`);

    // Limpiar los estilos de impresión
    document.head.removeChild(styleSheet);
  });
}
