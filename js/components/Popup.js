class Popup {
  constructor(root) {
    this.root = root;
    this.linksContainer = this.root.querySelector('.popup__links-container');
    this.closeButton = root.querySelector('.popup__close');
    
    this.isOpen = false;

    this._setEventListeners();
  }

  changeIsOpen = (links) => {
    this.isOpen = !this.isOpen;
    this._render(links);
  }

  _setEventListeners() {
    this.closeButton.addEventListener('click', this.changeIsOpen);
    this.root.addEventListener('mouseup', this._closePopup);
  }

  _createLink(link, shop) {
    const newLink = `<a href="${link}" target="__blank" class="popup__link popup__link_${shop}"></a>`;
    this.linksContainer.insertAdjacentHTML('beforeend', newLink);
  }

  _render(links) {
    if(this.isOpen) {
      Object.entries(links).forEach((item) => { this._createLink(item[1], item[0]); });
      this.root.classList.add('_active');
      document.body.style.overflow = 'hidden';
    } else { // При закрытии
      this.linksContainer.innerHTML = ''; // Очищаем контейнер с сылками
      this.root.classList.remove('_active');
      document.body.style.overflow = 'auto';
    }
  }

  _closePopup = (event) => {
    if (event.target === this.root) { this.changeIsOpen() }
  }
}