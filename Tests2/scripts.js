// Animation pour la navigation (apparition progressive)
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach((link) => {
  link.style.opacity = 0;
});

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  navLinks.forEach((link, index) => {
    const element = link;
    const elementHeight = element.offsetHeight;
    const elementPosition = element.offsetTop;

    if (scrollY + 50 > elementPosition) {
      link.style.opacity = 1 - (scrollY - elementPosition) / elementHeight;
    }
  });
});
