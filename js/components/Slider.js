class Slider {
  constructor(root) {
    this.root = root;
    this.initialPosition;
    this._addSwiping();
  }

  deleteCards() { this.root.innerHTML = '' }
  addCardNode(card) { this.root.append(card) }

  // Свайпинг карточек в слайдере без помощи полосы прокрутки
  // .bind() создает новую функцию, поэтому нельзя применять для удаления обработчика событий: используем => стрелочные функции
  _addSwiping() {
    const mouseDownHandler = (event) => {
      this.root.style.cursor = 'grabbing';
      this.root.style.userSelect = 'none';
      this.initialPosition = { left: this.root.scrollLeft, x: event.clientX };
  
      this.root.addEventListener('mousemove', mouseMoveHandler);
      this.root.addEventListener('mouseup', mouseUpHandler);
    }
    const mouseMoveHandler = (event) => { this.root.scrollLeft = this.initialPosition.left - event.clientX + this.initialPosition.x }
    const mouseUpHandler = () => {
      this.root.removeAttribute('style');
      this.root.removeEventListener('mousemove', mouseMoveHandler);
      this.root.removeEventListener('mouseup', mouseUpHandler);
    }

    this.root.addEventListener('mousedown', mouseDownHandler);
  }
}