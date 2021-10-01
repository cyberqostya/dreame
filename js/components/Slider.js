class Slider { // Анимация через CSS
  constructor(root) {
    this.root = root;
    this.rootHeight;

    this.isActive = false;
    this.PADDING_BOTTOM = 40;

    this.initialPosition;
    this._addSwiping();
  }

  setActivity(activity) {
    this.isActive = activity;

    this.isActive ? 
      this.root.classList.remove('_deactive') :
      this.root.classList.add('_deactive');
  }

  hideSlider() {
    this.root.classList.add('_deactive')
  }

  getHeight() {
    return this.rootHeight;
  }

  setHeight(height, сonsideringPadding = true) {
    сonsideringPadding ? 
      this.rootHeight = height :
      this.rootHeight = height + this.PADDING_BOTTOM;
  }

  // Свайпинг карточек в слайдере без помощт полосы прокрутки
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
    const mouseUpHandler = (event) => {
      this.root.removeAttribute('style');
      this.root.removeEventListener('mousemove', mouseMoveHandler);
      this.root.removeEventListener('mouseup', mouseUpHandler);
    }

    this.root.addEventListener('mousedown', mouseDownHandler);
  }
}