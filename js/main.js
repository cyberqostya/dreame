class Header {
  constructor(root) {
    this.root = root;
    this.navBlock = root.querySelector('.header__nav');
    this.burgerButton = root.querySelector('.header__burger');

    this.isActive = false;

    this._addEventListenerOnBurger();
  }

  _changeIsActive() {
    this.isActive = !this.isActive;

    this.isActive ? 
      this.navBlock.classList.add('_active') :
      this.navBlock.classList.remove('_active');
  }

  _addEventListenerOnBurger() {
    this.burgerButton.addEventListener('click', () => {
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
  }

  setActivity(activity) {
    this.isActive = activity;

    this.isActive ? 
      this.root.classList.remove('_deactive') :
      this.root.classList.add('_deactive');
  }

  _hideSlider() {
    this.root.classList.add('_deactive')
  }

  getHeight() {
    return this.rootHeight;
  }

  setHeight(height) {
    this.rootHeight = height;
    this._hideSlider();
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


    // Узлы DOM
    this.root = this.card[this.card.length - 1];
    this.imagesContainer = this.root.querySelector('.card__images-container'); // Блок с картинками карточки
      this.images = this.imagesContainer.querySelectorAll('.card__image');
      this.imagesControllers = this.imagesContainer.querySelector('.card__images-controllers-container');
        this.imagesControllersTextBlock = this.imagesContainer.querySelector('.card__images-controllers-counter');
    this.dataContainer = this.root.querySelector('.card__data-container'); // Блок с данными карточки
    this.buyButton = this.root.querySelector('.card__data-button_buy'); // Кнопка КУПИТЬ
    this.allCharacteristicsButton = this.root.querySelector('.card__data-button_characteristics'); // Кнопка ВСЕ ХАРАКТЕРИСТИКИ
    this.dataRowAdvantages = this.root.querySelector('.card__data-row-advantages'); // Блок с преимуществами в строках


    // Стейты
    this.isOpen = false; // Стейт раскрыта ли карточка
    this.imagesCounter = 1;


    // Константы
    this.IMAGE_WIDTH_HEIGHT_COEFFICIENT = 1; // Высота к ширине


    // Инициализация
    this.setHeightToImageContainer();
    this.setInitialPositionForImages();
    this.setEventListenerOnImagesControllers();
  } // ---------------------------------------------------




  // Создание строковой карточки и добавление её в DOM *****
  _getTemplate() {
    
    function _getImage(image) {
      return `<img data-src="${image.link}" alt="cleaner" class="card__image card__image_${image.objectFit}">`;
    }

    function _getAdvantages(advantage) {
      return `
        <div class="card__data-row-advantage">
          <p class="card__data-row-advantage-title">${advantage.title}</p>
          <p class="card__data-row-advantage-text">${advantage.text}</p>
        </div>
      `;
    }

    const stringImages = this.props.images.map((item) => { return _getImage(item) });
    const stringAdvantages = this.props.advantages.map((item) => { return _getAdvantages(item) });

    return `
    <div class="card">
      <div class="card__images-container">
        
        ${stringImages.join(' ')}

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
        <div class="card__data-row-advantages">
          
          ${stringAdvantages.join(' ')}

        </div>
      </div>
    </div>
    `;
  }

  _addCardToCardContainer() {
    this.cardContainer.insertAdjacentHTML('beforeend', this.stringTemplate);
  }
  // Конец создания строковой карточки и добавление её в DOM *****
  

  // Задание высоты изображениям карточки
  setHeightToImageContainer() {
    this.imagesContainer.style.height = this.imagesContainer.clientWidth * this.IMAGE_WIDTH_HEIGHT_COEFFICIENT + 'px';
  }


  // Логика переключения изображений
  hideImage(index) { this.images[index].style.opacity = 0 }
  showImage(index) { this.images[index].style.opacity = 1 }
  setControllersText() { this.imagesControllersTextBlock.textContent = `${this.imagesCounter}/${this.images.length}`; }
  increaseImagesCounter() { 
    this.hideImage(this.imagesCounter-1);
    this.imagesCounter === this.images.length ? this.imagesCounter = 1 : this.imagesCounter++;
    this.showImage(this.imagesCounter-1); 
    this.setControllersText();
  }
  decreaseImagesCounter() { 
    this.hideImage(this.imagesCounter-1);
    this.imagesCounter === 1 ? this.imagesCounter = this.images.length : this.imagesCounter--;
    this.showImage(this.imagesCounter-1); 
    this.setControllersText();
  }
  setInitialPositionForImages() { 
    this.images.forEach((item, index) => { index !== 0 ? this.hideImage(index) : this.showImage(index) });
    this.setControllersText();
  }
  setEventListenerOnImagesControllers() {
    this.imagesControllers.addEventListener('click', (event) => {
      if(event.target.closest('.card__images-controller_up')) {
        this.increaseImagesCounter.call(this);
      } else if(event.target.closest('.card__images-controller_down')) {
        this.decreaseImagesCounter.call(this);
      }
    });
  }
  // Конец логики переключения изображений



  // Здесь будут все функции которые нуждаются в window.resize
  functionsDepenOnWindowSize() {
    this.setHeightToImageContainer();
  }


  changeIsOpen() {
    this.isOpen = !this.isOpen;
    this._renderOpeningCard();
  }


  _renderOpeningCard() {

  }
}



const headerBlock = new Header(document.querySelector('.header'));
const choiceBlock = new ChoiceBlock(document.querySelector('.choice'));
const modelsBlock = new ModelsBlock(document.querySelector('.models'));
const wirelessSlider = new Slider(document.querySelector('.models__slider-road_wireless'));
const robotSlider = new Slider(document.querySelector('.models__slider-road_robot'));


// Создание карточек
// добавление их в контейнеры
// и подвязка внутренних методов карточек с window.resize
const wirelessCleanersArray = [];
const robotCleanersArray = [];
cleaners.wireless.forEach((item) => { wirelessCleanersArray.push( new Card(item, wirelessSlider.root) ) }); 
cleaners.robot.forEach((item) => { robotCleanersArray.push( new Card(item, robotSlider.root) ) }); 

window.addEventListener('resize', () => {
  wirelessCleanersArray.forEach((item) => { item.functionsDepenOnWindowSize() });
  robotCleanersArray.forEach((item) => { item.functionsDepenOnWindowSize() });
});


// После добавления карточек задаем высоту слайдеров для анимации раскрытия блока "Все модели"
wirelessSlider.setHeight( wirelessSlider.root.scrollHeight );
robotSlider.setHeight( robotSlider.root.scrollHeight );


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