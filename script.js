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
