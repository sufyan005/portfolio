export const scrollToSection = (id: string) => {
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState(null, '', ' ');
    return;
  }

  let targetId = id;
  let el = document.getElementById(targetId);
  if (!el) {
    if (targetId === 'work') targetId = 'projects';
    else if (targetId === 'projects') targetId = 'work';
    el = document.getElementById(targetId);
  }

  if (!el) return;

  const header = document.querySelector('header');
  const headerHeight = header ? header.getBoundingClientRect().height : (window.innerWidth < 640 ? 72 : 80);

  const elementTop = el.getBoundingClientRect().top + window.scrollY;

  const targetOffset = Math.max(0, Math.round(elementTop - headerHeight));

  window.scrollTo({
    top: targetOffset,
    behavior: 'smooth',
  });

  window.history.pushState(null, '', `#${targetId}`);
};
