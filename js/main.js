window.location.hash = ''; // Убирает якорь из адресной строки при перезагрузке страницы

// Логика открытия/закрытия шапки мобильной версии
const headerBlock = new Header(document.querySelector('.header'));

// Логика переключения стейта беспроводные/роботы
// Снятие/добавление обработчиков событий на активные/неактивные кнопки
const choiceBlock = new ChoiceBlock(document.querySelector('.choice'));

// Логика свайпа карточек используя DRAGGABLE
const sliderBlock = new Slider(document.querySelector('.models__slider-road'));

// Логика открытия/закрытия всплывающего окна
// Добавление ссылок на пылесосы и их очистка при закрытии
const popup = new Popup(document.querySelector('.popup'));



// Создание карточек
// добавление их в sliderRoad
const cleanersArrayOfObjects = cleaners.map((item) => { return new Card(item, sliderBlock.root) });



// При клике на кнопку выбора модели - меняется стейт
choiceBlock.buttonWireless.addEventListener('click', () => { renderCardsFromChoosingType('wireless') });  // БЕСПРОВОДНЫЕ
choiceBlock.buttonRobot.addEventListener('click', () => { renderCardsFromChoosingType('robot') }); // РОБОТЫ

function renderCardsFromChoosingType(type) {
  choiceBlock.activeState(type); 
  const cardsFromChoosingType = cleanersArrayOfObjects.filter((item) => { return item.props.type === type });
  sliderBlock.deleteCards();
  cardsFromChoosingType.forEach((item) => { sliderBlock.addCardNode(item.root) });
}



// При клике на кнопку в карточке
cleanersArrayOfObjects.forEach((item) => {
  item.buyButton.addEventListener('click', () => { popup.changeIsOpen(item.props.linksOnMarkets) }); // КУПИТЬ
  item.characteristicsButton.addEventListener('click', () => { item.changeIsOpen() }); // ХАРАКТЕРИСТИКИ
});



// Добавление скроллбара через плагин и JQuery
(function($){
  $(".about__vertical-slider").mCustomScrollbar();
})(jQuery);



// При клике на кнопку "Где купить"
headerBlock.whereToBuyButton.addEventListener('click', () => { popup.changeIsOpen(marketLinks) });