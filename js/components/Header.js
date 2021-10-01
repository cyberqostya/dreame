class Header {
  constructor(root) {
    this.root = root;
    this.navBlock = root.querySelector('.header__nav');
    this.burgerButton = root.querySelector('.header__burger');
    this.burgerCloseButton = root.querySelector('.header__burger-close');

    this.isActive = false;

    this._addEventListeners();
  }

  _changeIsActive() {
    this.isActive = !this.isActive;

    this.isActive ? 
      this.navBlock.classList.add('_active') :
      this.navBlock.classList.remove('_active');
  }

  _addEventListeners() {
    this.burgerButton.addEventListener('click', () => {
      this._changeIsActive();
    });
    this.burgerCloseButton.addEventListener('click', () => {
      this._changeIsActive();
    });
  }
}