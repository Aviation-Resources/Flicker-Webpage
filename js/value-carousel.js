(function () {
  const track = document.getElementById('value-carousel-track');
  const dotsContainer = document.getElementById('value-carousel-dots');
  if (!track || !dotsContainer) return;
  const cards = Array.from(track.children);

  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'value-carousel__dot';
    dot.setAttribute('aria-label', `Go to value proposition ${i + 1}`);
    dot.addEventListener('click', () => {
      track.scrollTo({ left: cards[i].offsetLeft, behavior: 'smooth' });
    });
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);

  const updateActive = () => {
    let closest = 0;
    let minDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - track.scrollLeft);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    dots.forEach((d, i) => d.classList.toggle('value-carousel__dot--active', i === closest));
  };

  updateActive();
  track.addEventListener('scroll', () => requestAnimationFrame(updateActive), { passive: true });
})();
