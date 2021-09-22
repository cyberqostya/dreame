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
  constructor(root) {


    // Блоки

    this.root = root;
    this.imagesContainer = this.root.querySelector('.card__images-container'); // Блок с картинками карточки
      this.images = this.imagesContainer.querySelectorAll('.card__image');
      this.imagesControllers = this.imagesContainer.querySelector('.card__images-controllers-container');
        this.imagesControllersTextBlock = this.imagesContainer.querySelector('.card__images-controllers-counter');
    this.dataContainer = root.querySelector('.card__data-container'); // Блок с данными карточки
    this.buyButton = root.querySelector('.card__data-button_buy'); // Кнопка КУПИТЬ
    this.allCharacteristicsButton = root.querySelector('.card__data-button_characteristics'); // Кнопка ВСЕ ХАРАКТЕРИСТИКИ
    this.dataRowAdvantages = root.querySelector('.card__data-row-advantages'); // Блок с преимуществами в строках


    // Стейты

    this.isOpen = false; // Стейт раскрыта ли карточка
    this.imagesCounter = 1;


    // Константы

    this.IMAGE_WIDTH_HEIGHT_COEFFICIENT = 1; // высота к ширине


    // Инициализация

    this.setHeightToImageContainer();
    this.setInitialPositionForImages();
    this.setEventListenerOnImagesControllers();
  } // ---------------------------------------------------
  

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


const cleanerV12 = new Card(document.querySelectorAll('.card')[0]);
const cleanerT10 = new Card(document.querySelectorAll('.card')[1]);
const cleanerV9 = new Card(document.querySelectorAll('.card')[2]);
const cleanerV10 = new Card(document.querySelectorAll('.card')[3]);
const cleanerV11SE = new Card(document.querySelectorAll('.card')[4]);

const cleanerF9 = new Card(document.querySelectorAll('.card')[5]);
const cleanerD9 = new Card(document.querySelectorAll('.card')[6]);
const cleanerD9Pro = new Card(document.querySelectorAll('.card')[7]);


window.addEventListener('resize', () => {
  cleanerV12.functionsDepenOnWindowSize();
  cleanerT10.functionsDepenOnWindowSize();
  cleanerV9.functionsDepenOnWindowSize();
  cleanerV10.functionsDepenOnWindowSize();
  cleanerV11SE.functionsDepenOnWindowSize();

  cleanerF9.functionsDepenOnWindowSize();
  cleanerD9.functionsDepenOnWindowSize();
  cleanerD9Pro.functionsDepenOnWindowSize();
});


window.scroll({})