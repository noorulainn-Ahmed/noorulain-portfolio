
'use strict';

(function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); 
}());



(function initMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  const toggle = () => {
    const isOpen = mobileMenu.classList.toggle('nav__mobile--open');
    hamburger.classList.toggle('nav__hamburger--open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  };

  hamburger.addEventListener('click', toggle);


  mobileMenu.querySelectorAll('.nav__mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('nav__mobile--open');
      hamburger.classList.remove('nav__hamburger--open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}());



(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = 64; 
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}());


(function initObservers() {

  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          revealObserver.unobserve(entry.target); 
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(el => revealObserver.observe(el));

  
  const skillBars = document.querySelectorAll('.skills__bar-fill');

  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute('data-width');
          entry.target.style.width = width + '%';
          barObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach(bar => barObserver.observe(bar));

}());



(function initContactForm() {
  const form   = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  
  const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  const setStatus = (msg, type) => {
    status.textContent = msg;
    status.className   = 'form__status form__status--' + type;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = form.elements['name'].value.trim();
    const email   = form.elements['email'].value.trim();
    const message = form.elements['message'].value.trim();


    if (!name) {
      setStatus('Please enter your name.', 'error');
      form.elements['name'].focus();
      return;
    }
    if (!isValidEmail(email)) {
      setStatus('Please enter a valid email address.', 'error');
      form.elements['email'].focus();
      return;
    }
    if (message.length < 10) {
      setStatus('Your message is a bit short. Mind adding more detail?', 'error');
      form.elements['message'].focus();
      return;
    }

(function(){
    
    if(typeof emailjs !== 'undefined') {
        emailjs.init("YOUR_PUBLIC_KEY"); 
    }
})();

function submitForm(event) {
    event.preventDefault();

    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submit-btn');

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
        .then(function() {
            alert('SUCCESS! Message sent.');
            form.reset();
        }, function(error) {
            alert('FAILED... ' + JSON.stringify(error));
        })
        .finally(function() {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send';
        });
}

    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.disabled    = true;
    submitBtn.textContent = 'Sending…';

    setTimeout(() => {
      setStatus('Message sent! I\'ll get back to you soon.', 'success');
      form.reset();
      submitBtn.disabled    = false;
      submitBtn.textContent = 'Send Message';
    }, 1200);
  });

}());


(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle(
            'nav__link--active',
            link.getAttribute('href') === '#' + id
          );
        });
      });
    },
    { rootMargin: '-30% 0px -60% 0px' }
  );

  sections.forEach(section => sectionObserver.observe(section));
}());
