(function () {
  const pressableSelector = [
    'button',
    'a[href]',
    '.btn-contact',
    '.social-item',
    '.social-btn',
    'label.choice',
    '[data-open-tab]',
    '[role="button"]'
  ].join(', ');

  const runningAnimations = new WeakMap();

  function canAnimate() {
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function animatePress(element) {
    if (!element || !canAnimate()) {
      return;
    }

    const currentAnimation = runningAnimations.get(element);
    currentAnimation?.cancel();

    const animation = element.animate(
      [
        { scale: '1', translate: '0 0', filter: 'brightness(1)' },
        { scale: '0.985', translate: '0 1px', filter: 'brightness(1.06) saturate(1.03)' },
        { scale: '1', translate: '0 0', filter: 'brightness(1)' }
      ],
      {
        duration: 220,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
      }
    );

    runningAnimations.set(element, animation);

    animation.addEventListener('finish', () => {
      if (runningAnimations.get(element) === animation) {
        runningAnimations.delete(element);
      }
    }, { once: true });
  }

  document.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) {
      return;
    }

    const target = event.target.closest(pressableSelector);
    if (!target) {
      return;
    }

    animatePress(target);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    const activeElement = document.activeElement;
    if (!activeElement?.matches?.(pressableSelector)) {
      return;
    }

    animatePress(activeElement);
  });
})();
