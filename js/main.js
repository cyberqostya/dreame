window.location.hash = ''; // Убирает якорь из адресной строки при перезагрузке страницы

const headerBlock = new Header(document.querySelector('.header'));
const choiceBlock = new ChoiceBlock(document.querySelector('.choice'));
const modelsBlock = new ModelsBlock(document.querySelector('.models'));
const wirelessSlider = new Slider(document.querySelector('.models__slider-road_wireless'));
const robotSlider = new Slider(document.querySelector('.models__slider-road_robot'));
const popup = new Popup(document.querySelector('.popup'));


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


// При клике на кнопку выбора модели - меняется стейт
function buttonWirelessHandler() {
  choiceBlock.changeWirelessState(); // Узнали какой стейт активный для передачи его
  modelsBlock.active( wirelessSlider.getHeight() ); // Отобразили блок "Все модели"
  wirelessSlider.setActivity( (choiceBlock.getState()).isWirelessActive ); // Отобразили выбранный слайдер
  robotSlider.setActivity( (choiceBlock.getState()).isRobotActive );
  addListenersOnChoiceButtonsDependingOnState();
}
function buttonRobotHandler() {
  choiceBlock.changeRobotState(); // Узнали какой стейт активный для передачи его
  modelsBlock.active( robotSlider.getHeight() ); // Отобразили блок "Все модели"
  wirelessSlider.setActivity( (choiceBlock.getState()).isWirelessActive ); // Отобразили выбранный слайдер
  robotSlider.setActivity( (choiceBlock.getState()).isRobotActive );
  addListenersOnChoiceButtonsDependingOnState();
}
function addListenersOnChoiceButtonsDependingOnState() { // Исходя из стейта ставятся обработчики
  const state = choiceBlock.getState();
  state.isWirelessActive ? 
    choiceBlock.buttonWireless.removeEventListener('click', buttonWirelessHandler) :
    choiceBlock.buttonWireless.addEventListener('click', buttonWirelessHandler); // Беспроводные
  state.isRobotActive ? 
    choiceBlock.buttonRobot.removeEventListener('click', buttonRobotHandler) : 
    choiceBlock.buttonRobot.addEventListener('click', buttonRobotHandler); // Роботы
}
addListenersOnChoiceButtonsDependingOnState();






// При клике на кнопку в карточке
wirelessCleanersArray.forEach((item) => {
  item.buttonsContainer.addEventListener('click', (event) => {
    
    const target = event.target.closest('.card__data-button');
    if(target === item.buyButton) { // Нажали на КУПИТЬ

      popup.changeIsOpen(item.props.linksOnMarkets);

    } else if(target === item.characteristicsButton) { // Нажали на Характеристики
      item.changeIsOpen();
      if( item.getHeight() > wirelessSlider.getHeight() ) { //  Меняем высоту слайдера при раскрытии карточки которая больше
        wirelessSlider.setHeight( item.getHeight(), false );
      }
    }

  });
});
robotCleanersArray.forEach((item) => {
  item.buttonsContainer.addEventListener('click', (event) => {
    
    const target = event.target.closest('.card__data-button');
    if(target === item.buyButton) { // Нажали на КУПИТЬ

      popup.changeIsOpen(item.props.linksOnMarkets);

    } else if(target === item.characteristicsButton) { // Нажали на Характеристики
      item.changeIsOpen();
      if( item.getHeight() > robotSlider.getHeight() ) { //  Меняем высоту слайдера при раскрытии карточки которая больше
        robotSlider.setHeight( item.getHeight(), false );
      }
    }
  });
});
