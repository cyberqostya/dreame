class Card {
  constructor(props, cardContainer) {

    this.props = props;
    this.cardContainer = cardContainer;
    
    // Создание карточки путем шаблонной строки
    // И добавление её в родительский элемент для связывания ШАБЛОННОЙ СТРОКИ с DOM-УЗЛАМИ
    this.stringTemplate = this._getTemplate();
    this._addCardToCardContainer();

    this.card = document.querySelectorAll('.card');

    this.MARGIN = 7;


    // Узлы DOM
    this.root = this.card[this.card.length - 1];
    this.imagesContainer = this.root.querySelector('.card__images-container'); // Блок с картинками карточки
      this.image = this.imagesContainer.querySelector('.card__image');
      this.imagesControllers = this.imagesContainer.querySelector('.card__images-controllers-container');
        this.imagesControllersTextBlock = this.imagesContainer.querySelector('.card__images-controllers-counter');
      this.buyButton = this.root.querySelector('.card__data-button_buy'); // Кнопка КУПИТЬ
      this.characteristicsButton = this.root.querySelector('.card__data-button_characteristics'); // Кнопка ХАРАКТЕРИСТИКИ
    this.dataCircleAdvantages = this.root.querySelector('.card__data-circle-advantages'); // Блок с преимуществами в кружочках
    this.dataTextContainer = this.root.querySelector('.card__data-text-container');
      this.dataText = this.root.querySelector('.card__data-text');
      this.dataButtonMore = this.root.querySelector('.card__data-button-more');
    this.dataRowAdvantages = this.root.querySelector('.card__data-row-advantages'); // Блок с преимуществами в строках


    // Стейты
    this.isOpen = true; // Стейт раскрыта ли карточка
    this.imagesCounter = 1;

    // Высота открытой и закрытой карточки для анимации
    this.rootHeightOpened = this.root.clientHeight;
    this.dataCircleAdvantagesHeight = this.dataCircleAdvantages.clientHeight;
      this.DATA_CIRCLE_ADVANTAGES_PADDING_BOTTOM = 25; // CSS
      this.dataCircleAdvantagesInvisibleHeight = this.dataCircleAdvantages.children.length > 3 ? 
        this._getHeightOfSecondCirclesRow() : 
        -this.DATA_CIRCLE_ADVANTAGES_PADDING_BOTTOM;
    this.dataTextContainerHeight = this.dataTextContainer.clientHeight;
    this.dataRowAdvantagesHeight = this.dataRowAdvantages.clientHeight;
    this.rootHeightClosed = this.rootHeightOpened - this.dataCircleAdvantagesInvisibleHeight - this.dataTextContainerHeight - this.dataRowAdvantagesHeight; // поправка


    // Инициализация
    this._setEventListenerOnImagesControllers();
    this._setEventListenerOnButtonMore();
    this.changeIsOpen(); // закрыть все карточки
  } // ---------------------------------------------------

  // Из-за того, что преимущества с кружочками имеют разную высоту
  // возвращает высоту второй строчки (если преимуществ будет > 6, то переписать функцию)
  _getHeightOfSecondCirclesRow() {
    let theHighestHeight = 0;
    Array.from(this.dataCircleAdvantages.children).forEach((item, index) => { 
      if(index>2) { 
        item.clientHeight > theHighestHeight ? theHighestHeight = item.clientHeight : ''; 
      }
    });
    return theHighestHeight;
  }

  getHeight() {
    return this.root.scrollHeight + this.MARGIN * 2;
  }




  // Создание строковой карточки и добавление её в DOM *****
  _getTemplate() {

    function _getCircleAdvantages(advantage) {
      return `
        <div class="card__data-circle-advantage">
          <img class="card__data-circle-advantage-image" src="${advantage.link}" alt="advantage">
          <p class="card__data-circle-advantage-title">${advantage.title}</p>
        </div>
      `;
    }

    function _getRowAdvantages(advantage) {
      return `
        <div class="card__data-row-advantage">
          <p class="card__data-row-advantage-title">${advantage.title}</p>
          <p class="card__data-row-advantage-text">${advantage.text}</p>
        </div>
      `;
    }

    const stringCircleAdvantages = this.props.circleAdvantages.map((item) => { return _getCircleAdvantages(item) });
    const stringRowAdvantages = this.props.advantages.map((item) => { return _getRowAdvantages(item) });

    return `
    <div class="card">
      <div class="card__images-container">
        
        <img src="${this.props.images[0].link}" alt="cleaner" class="card__image card__image_${this.props.images[0].objectFit}">

        <div class="card__images-controllers-container">
          <button class="card__images-controller card__images-controller_up"></button>
          <p class="card__images-controllers-counter">1/${this.props.images.length}</p>
          <button class="card__images-controller card__images-controller_down"></button>
        </div>
      </div>
      <div class="card__data-container">
        <h3 class="card__data-title">Пылесос Dreame ${this.props.name}</h3>
        <div class="card__data-buttons-container">
          <button class="card__data-button card__data-button_buy">Купить</button>
          <button class="card__data-button card__data-button_characteristics">Характеристики</button>
        </div>
        <div class="card__data-circle-advantages">
        
          ${stringCircleAdvantages.join(' ')}
        
        </div>

        <div class="card__data-text-container">
          <p class="card__data-text">${this.props.textAbout}</p>
          <button class="card__data-button-more">еще</button>
        </div>

        <div class="card__data-row-advantages">
          
          ${stringRowAdvantages.join(' ')}

        </div>
      </div>
    </div>
    `;
  }

  _addCardToCardContainer() {
    this.cardContainer.insertAdjacentHTML('beforeend', this.stringTemplate);
  }
  // Конец создания строковой карточки и добавление её в DOM *****


  // Логика переключения изображений
  _changeImage() { 
    this.image.setAttribute('src', this.props.images[this.imagesCounter-1].link);
    this.image.className = `card__image card__image_${this.props.images[this.imagesCounter-1].objectFit}`;
  }
  _setControllersText() { this.imagesControllersTextBlock.textContent = `${this.imagesCounter}/${this.props.images.length}`; }
  _increaseImagesCounter() { 
    this.imagesCounter === this.props.images.length ? this.imagesCounter = 1 : this.imagesCounter++;
    this._changeImage();
    this._setControllersText();
  }
  _decreaseImagesCounter() { 
    this.imagesCounter === 1 ? this.imagesCounter = this.props.images.length : this.imagesCounter--;
    this._changeImage(); 
    this._setControllersText();
  }
  _setEventListenerOnImagesControllers() {
    this.imagesControllers.addEventListener('click', (event) => {
      if(event.target.closest('.card__images-controller_up')) {
        this._increaseImagesCounter.call(this);
      } else if(event.target.closest('.card__images-controller_down')) {
        this._decreaseImagesCounter.call(this);
      }
    });
  }
  // Конец логики переключения изображений


  _setEventListenerOnButtonMore() {
    this.dataButtonMore.addEventListener('click', () => {
      this.dataTextContainer.classList.add('_active');
      this._updateRootOpenedAndClosedHeights();
    });
  }

  _updateRootOpenedAndClosedHeights() {
    const oldDataTextContainerHeight = this.dataTextContainerHeight;
    this.dataTextContainerHeight = this.dataTextContainer.clientHeight;
    this.rootHeightOpened += (this.dataTextContainerHeight - oldDataTextContainerHeight);
    // this.rootHeightClosed = this.rootHeightOpened - this.dataCircleAdvantagesInvisibleHeight - this.dataTextContainerHeight - this.dataRowAdvantagesHeight;
    this._renderCardOpenedHeight()
  }

  _renderCardOpenedHeight() { this.root.style.height = this.rootHeightOpened + 'px' }
  _renderCardClosedHeight() { this.root.style.height = this.rootHeightClosed + 'px' }


  changeIsOpen() {
    this.isOpen = !this.isOpen;
    
    this.isOpen ?
      this._renderCardOpenedHeight() :
      this._renderCardClosedHeight();
  }
}