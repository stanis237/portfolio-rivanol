document.addEventListener('DOMContentLoaded', () => {
  // Update Copyright Year
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Header Scroll Effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.add('scrolled');
    }
  });
  // Initial check
  if (window.scrollY > 50) header.classList.add('scrolled');

  // Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // observer.unobserve(entry.target); // Uncomment to animate only once
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

  revealElements.forEach(el => revealObserver.observe(el));

  // Video Management: Unmute on click
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.addEventListener('click', (e) => {
      // Toggle sound
      video.muted = !video.muted;
      
      // If unmuted, ensure all other videos are muted
      if (!video.muted) {
        videos.forEach(otherVideo => {
          if (otherVideo !== video) {
            otherVideo.muted = true;
          }
        });
      }
    });
  });

  // Custom Play Buttons (if still used, convert to unmute indicator)
  const playBtns = document.querySelectorAll('.play-btn');
  playBtns.forEach(btn => {
    btn.innerHTML = '🔇'; // Change icon to indicate muted state
    btn.style.fontSize = '2rem';
    
    btn.addEventListener('click', (e) => {
      const container = btn.closest('.hero-card') || btn.closest('.project-card');
      if (container) {
        const video = container.querySelector('video');
        if (video) {
          video.muted = !video.muted;
          btn.innerHTML = video.muted ? '🔇' : '🔊';
          
          if (!video.muted) {
            // Mute others
            videos.forEach(otherVideo => {
              if (otherVideo !== video) {
                otherVideo.muted = true;
                const otherBtn = otherVideo.closest('.hero-card')?.querySelector('.play-btn');
                if(otherBtn) otherBtn.innerHTML = '🔇';
              }
            });
          }
        }
      }
    });
  });

  // Update button icon when video volume changes natively
  videos.forEach(video => {
    video.addEventListener('volumechange', () => {
      const container = video.closest('.hero-card') || video.closest('.project-card');
      if (container) {
        const btn = container.querySelector('.play-btn');
        if (btn) {
          btn.innerHTML = video.muted ? '🔇' : '🔊';
        }
      }
    });
  });
  // Portfolio Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.classList.remove('hidden');
          // small animation reset
          card.style.animation = 'none';
          card.offsetHeight; /* trigger reflow */
          card.style.animation = null;
        } else {
          card.classList.add('hidden');
        }
      });
      
      // Stop all videos when filtering
      videos.forEach(v => v.pause());
    });
  });
});

// Contact Form Handler
function sendMail(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subj = document.getElementById('subject').value || 'Demande via portfolio';
  const msg = document.getElementById('message').value;
  
  if(!name || !email || !msg) {
    alert("Veuillez remplir les champs obligatoires.");
    return;
  }

  const body = `Nom: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${encodeURIComponent(msg)}`;
  window.location.href = `mailto:Rivanol607@gmail.com?subject=${encodeURIComponent(subj)}&body=${body}`;
}
