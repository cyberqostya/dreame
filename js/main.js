window.location.hash = ''; // Убирает якорь из адресной строки при перезагрузке страницы

class Popup {
  constructor(root) {
    this.root = root;
    this.popupContainer = this.root.querySelector('.popup__window');
  }

  createLink(link, shop) {
    const newLink = `<a href="${link}" target="__blank" class="popup__link popup__link_${shop}"></a>`;
    this.popupContainer.insertAdjacentHTML('beforeend', link);
  }


}


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


class ChoiceBlock {
  constructor(root) {
    this.root = root;
    this.buttonWireless = root.querySelector('.choice__cleaner-button_wireless');
    this.buttonRobot = root.querySelector('.choice__cleaner-button_robot');

    this.state = {
      isWirelessActive: false,
      isRobotActive: false
    };
  }

  changeWirelessState() {
    this.state = {
      isWirelessActive: true,
      isRobotActive: false
    };
  }

  changeRobotState() {
    this.state = {
      isWirelessActive: false,
      isRobotActive: true
    };
  }

  getState() {
    return this.state;
  }
}



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



class Card {
  constructor(props, cardContainer) {

    // Создание карточки путем шаблонной строки
    this.props = props;
    this.cardContainer = cardContainer;

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
    this.dataContainer = this.root.querySelector('.card__data-container'); // Блок с данными карточки
    this.buttonsContainer = this.root.querySelector('.card__data-buttons-container'); // Контейнер с кнопками
      this.buyButton = this.root.querySelector('.card__data-button_buy'); // Кнопка КУПИТЬ
      this.characteristicsButton = this.root.querySelector('.card__data-button_characteristics'); // Кнопка ХАРАКТЕРИСТИКИ
    this.dataCircleAdvantages = this.root.querySelector('.card__data-circle-advantages'); // Блок с преимуществами в кружочках
    this.dataRowAdvantages = this.root.querySelector('.card__data-row-advantages'); // Блок с преимуществами в строках


    // Стейты
    this.isOpen = true; // Стейт раскрыта ли карточка
    this.imagesCounter = 1;

    // Высоты для анимации раскрытия карточки
    this.rootHeightOpened = this.root.clientHeight;
    this.dataCircleAdvantagesHeight = this.dataCircleAdvantages.clientHeight;
      this.DATA_CIRCLE_ADVANTAGES_PADDING_BOTTOM = 25; // CSS
      this.dataCircleAdvantagesInvisibleHeight = this.dataCircleAdvantages.children.length > 3 ? this._getHeightOfSecondCirclesRow() : -this.DATA_CIRCLE_ADVANTAGES_PADDING_BOTTOM;
    this.dataRowAdvantagesHeight = this.dataRowAdvantages.clientHeight;
    this.rootHeightClosed = this.rootHeightOpened - this.dataRowAdvantagesHeight - this.dataCircleAdvantagesInvisibleHeight; // поправка


    // Инициализация
    this._setEventListenerOnImagesControllers();
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


  changeIsOpen() {
    this.isOpen = !this.isOpen;
    
    this.isOpen ?
      this.root.style.height = this.rootHeightOpened + 'px' :
      this.root.style.height = this.rootHeightClosed + 'px';
  }
}



const headerBlock = new Header(document.querySelector('.header'));
const choiceBlock = new ChoiceBlock(document.querySelector('.choice'));
const modelsBlock = new ModelsBlock(document.querySelector('.models'));
const wirelessSlider = new Slider(document.querySelector('.models__slider-road_wireless'));
const robotSlider = new Slider(document.querySelector('.models__slider-road_robot'));


// Создание карточек
// добавление их в контейнеры
const wirelessCleanersArray = [];
const robotCleanersArray = [];
cleaners.wireless.forEach((item) => { wirelessCleanersArray.push( new Card(item, wirelessSlider.root) ) }); // Взято из файла cleanersData.js
cleaners.robot.forEach((item) => { robotCleanersArray.push( new Card(item, robotSlider.root) ) }); 


// После добавления карточек задаем высоту слайдеров для анимации раскрытия блока "Все модели"
wirelessSlider.setHeight( wirelessSlider.root.scrollHeight );
  wirelessSlider.hideSlider();
robotSlider.setHeight( robotSlider.root.scrollHeight );
  robotSlider.hideSlider();


// При клике на кнопку выбора модели меняется стейт
choiceBlock.root.addEventListener('click', (event) => {
  const button = event.target.closest(`.${ choiceBlock.buttonWireless.classList[0] }`);
  if(button) { // Нажали на кнопку?

    if( button.classList.contains(choiceBlock.buttonWireless.classList[1]) ) { // Нажали на беспроводные?

      choiceBlock.changeWirelessState(); // Узнали какой стейт активный для передачи его
      modelsBlock.active( wirelessSlider.getHeight() ); // Отобразили блок "Все модели"
      wirelessSlider.setActivity( (choiceBlock.getState()).isWirelessActive ); // Отобразили выбранный слайдер
      robotSlider.setActivity( (choiceBlock.getState()).isRobotActive );

    } else if( button.classList.contains(choiceBlock.buttonRobot.classList[1]) ) { // Нажали на роботы?

      choiceBlock.changeRobotState(); // Узнали какой стейт активный для передачи его
      modelsBlock.active( robotSlider.getHeight() ); // Отобразили блок "Все модели"
      wirelessSlider.setActivity( (choiceBlock.getState()).isWirelessActive ); // Отобразили выбранный слайдер
      robotSlider.setActivity( (choiceBlock.getState()).isRobotActive );

    }

  }
});


// При клике на кнопку в карточке
wirelessCleanersArray.forEach((item) => {
  item.buttonsContainer.addEventListener('click', (event) => {
    
    const target = event.target.closest('.card__data-button');
    if(target === item.buyButton) { // Нажали на КУПИТЬ

    } else if(target === item.characteristicsButton) { // Нажали на Характеристики
      item.changeIsOpen();
      if( item.getHeight() > wirelessSlider.getHeight() ) { //  Меняем высоту слайдера при раскрытии карточки которая больше
        wirelessSlider.setHeight( item.getHeight(), false )
        modelsBlock.active( wirelessSlider.getHeight() );
      }
      if( wirelessCleanersArray.every((item) => { return item.isOpen === false }) ) { // Если все карточки закрыты \/\/ В дебагге работает, а просто не работает(((
        wirelessSlider.setHeight( wirelessSlider.root.scrollHeight );
        modelsBlock.active( wirelessSlider.getHeight() );
      }
    }

  });
});
robotCleanersArray.forEach((item) => {
  item.buttonsContainer.addEventListener('click', (event) => {
    
    const target = event.target.closest('.card__data-button');
    if(target === item.buyButton) { // Нажали на КУПИТЬ

    } else if(target === item.characteristicsButton) { // Нажали на Характеристики
      item.changeIsOpen();
      if( item.getHeight() > robotSlider.getHeight() ) { //  Меняем высоту слайдера при раскрытии карточки которая больше
        robotSlider.setHeight( item.getHeight(), false )
        modelsBlock.active( robotSlider.getHeight() );
      }
    }

  });
});