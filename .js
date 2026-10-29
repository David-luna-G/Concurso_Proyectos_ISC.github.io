const initCountdown = (targetDateString) => {
  const target = new Date(targetDateString).getTime();
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  const updateTimer = () => {
    const now = new Date().getTime();
    const distance = target - now;

    if (distance < 0) {
      document.getElementById('countdown-container').innerHTML = 
        "<p class='event-active'>¡El concurso está en desarrollo!</p>";
      clearInterval(timerInterval);
      return;
    }

    daysEl.textContent = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
    hoursEl.textContent = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
    minutesEl.textContent = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    secondsEl.textContent = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
  };

  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
};
const registerForm = document.getElementById('registration-form');
const emailInput = document.getElementById('student-email');
const emailRegex = /^[a-zA-Z0-9._%+-]+@zapopan\.tecmm\.edu\.mx$/; // Ajustar al dominio requerido

const validateEmail = () => {
  const errorSpan = document.getElementById('email-error');
  if (!emailRegex.test(emailInput.value.trim())) {
    emailInput.setAttribute('aria-invalid', 'true');
    errorSpan.textContent = 'Ingrese un correo institucional válido (@zapopan.tecmm.edu.mx).';
    return false;
  }
  emailInput.removeAttribute('aria-invalid');
  errorSpan.textContent = '';
  return true;
};

emailInput.addEventListener('input', validateEmail);

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (validateEmail()) {
    const feedback = document.getElementById('form-feedback');
    feedback.textContent = 'Registro enviado exitosamente.';
    feedback.className = 'alert-success';
    registerForm.reset();
  }
});
const filterButtons = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    cards.forEach(card => {
      const matches = (filter === 'all' || card.dataset.category === filter);
      card.style.display = matches ? 'block' : 'none';
    });
  });
});