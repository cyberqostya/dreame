class Slider {
  constructor(root) {
    this.root = root;

    this.init();
  }

  init() {

  }

  addSliderWidth() {
    
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
      return `<img src="${image.link}" alt="cleaner" class="card__image card__image_${image.objectFit}">`;
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




const wirelessSlider = new Slider(document.querySelectorAll('.models__slider-road')[0]);
const robotSlider = new Slider(document.querySelectorAll('.models__slider-road')[1]);

const wirelessCleanersArray = [];
const robotCleanersArray = [];
cleaners.wireless.forEach((item) => { wirelessCleanersArray.push( new Card(item, wirelessSlider.root) ) }); 
cleaners.robot.forEach((item) => { robotCleanersArray.push( new Card(item, robotSlider.root) ) }); 


window.addEventListener('resize', () => {
  wirelessCleanersArray.forEach((item) => { item.functionsDepenOnWindowSize() });
  robotCleanersArray.forEach((item) => { item.functionsDepenOnWindowSize() });
});