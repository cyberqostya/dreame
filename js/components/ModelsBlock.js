class ModelsBlock {
  constructor(root) {
    this.root = root;
    this.rootPaddingTop = 90; // CSS
    this.rootPaddingBottom = 90; // CSS
    this.title = this.root.querySelector('.models__title');
    this.titleHeight = this.title.clientHeight;
    this.titleMarginBottom = 40; // CSS

    this.rootHeightWithoutSlider = this.rootPaddingTop + this.rootPaddingBottom + this.titleHeight + this.titleMarginBottom;

    this.isActive = false;

    this.root.addEventListener('transitionend', () => { this.root.style.height = 'fit-content'; });
  }

  active(height) {
    this.isActive = true;
    this.root.classList.add('_active');
    this.root.style.height = height + this.rootHeightWithoutSlider + 'px';
  }

  getState() {
    return this.isActive;
  }
}