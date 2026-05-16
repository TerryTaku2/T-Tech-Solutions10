/* T-Tech Solutions — Shared JavaScript */

document.addEventListener('DOMContentLoaded', () => {

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

  /* ── Contact Form → WhatsApp ─────────────────────────── */
  const sendBtn = document.getElementById('sendBtn');
  if (sendBtn) {
    sendBtn.addEventListener('click', e => {
      e.preventDefault();
      const name    = document.getElementById('fname')?.value.trim();
      const email   = document.getElementById('femail')?.value.trim();
      const service = document.getElementById('fservice')?.value;
      const budget  = document.getElementById('fbudget')?.value;
      const message = document.getElementById('fmessage')?.value.trim();

      if (!name || !email || !message) {
        alert('Please fill in your name, email, and project description.');
        return;
      }

      const text = `Hello T-Tech Solutions!\n\n*Name:* ${name}\n*Email:* ${email}\n*Service:* ${service || 'Not specified'}\n*Budget:* ${budget || 'Not specified'}\n\n*Project Details:*\n${message}`;
      window.open(`https://wa.me/263774128219?text=${encodeURIComponent(text)}`, '_blank');

      sendBtn.textContent = '✓ Opening WhatsApp…';
      sendBtn.style.background = '#16a34a';
      setTimeout(() => { sendBtn.textContent = 'Send via WhatsApp →'; sendBtn.style.background = ''; }, 3000);
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
