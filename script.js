/* T-Tech Solutions — Shared JavaScript */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Nav scroll shadow ───────────────────────────────── */
  const nav = document.querySelector('nav');
  const scrollTop = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 20);
    if (scrollTop) scrollTop.classList.toggle('visible', y > 400);
  }, { passive: true });

  if (scrollTop) {
    scrollTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Mobile Menu ─────────────────────────────────────── */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Scroll Reveal ───────────────────────────────────── */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* ── Contact Form → WhatsApp / Email ────────────────── */
  function getFormFields() {
    return {
      name:    document.getElementById('fname')?.value.trim(),
      email:   document.getElementById('femail')?.value.trim(),
      phone:   document.getElementById('fphone')?.value.trim(),
      service: document.getElementById('fservice')?.value,
      budget:  document.getElementById('fbudget')?.value,
      message: document.getElementById('fmessage')?.value.trim(),
    };
  }

  const sendBtn = document.getElementById('sendBtn');
  if (sendBtn) {
    sendBtn.addEventListener('click', e => {
      e.preventDefault();
      const { name, email, service, budget, message } = getFormFields();
      if (!name || !email || !message) {
        alert('Please fill in your name, email, and project description.');
        return;
      }
      const text = `Hello T-Tech Solutions!\n\n*Name:* ${name}\n*Email:* ${email}\n*Service:* ${service || 'Not specified'}\n*Budget:* ${budget || 'Not specified'}\n\n*Project Details:*\n${message}`;
      window.open(`https://wa.me/263774128219?text=${encodeURIComponent(text)}`, '_blank');
      sendBtn.innerHTML = '✓ Opening WhatsApp…';
      sendBtn.style.background = '#16a34a';
      setTimeout(() => { sendBtn.innerHTML = '💬 Send via WhatsApp'; sendBtn.style.background = ''; }, 3000);
    });
  }

  const emailBtn = document.getElementById('emailBtn');
  if (emailBtn) {
    emailBtn.addEventListener('click', e => {
      e.preventDefault();
      const { name, email, phone, service, budget, message } = getFormFields();
      if (!name || !email || !message) {
        alert('Please fill in your name, email, and project description.');
        return;
      }

      emailBtn.disabled = true;
      emailBtn.innerHTML = 'Sending…';

      emailjs.send('service_ar9rhxq', 'template_yqxqljf', {
        from_name:    name,
        from_email:   email,
        phone:        phone || 'Not provided',
        service:      service || 'Not specified',
        budget:       budget || 'Not specified',
        message:      message,
      })
      .then(() => {
        emailBtn.innerHTML = '✓ Email Sent!';
        emailBtn.style.background = '#16a34a';
        emailBtn.style.color = '#fff';
        emailBtn.style.borderColor = '#16a34a';
        setTimeout(() => {
          emailBtn.innerHTML = '✉️ Send via Email';
          emailBtn.style.background = '';
          emailBtn.style.color = '';
          emailBtn.style.borderColor = '';
          emailBtn.disabled = false;
        }, 4000);
      })
      .catch(() => {
        alert('Email failed to send. Please try WhatsApp or email us directly.');
        emailBtn.innerHTML = '✉️ Send via Email';
        emailBtn.disabled = false;
      });
    });
  }

  /* ── Pricing Toggle (monthly / once-off) ─────────────── */
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

});
