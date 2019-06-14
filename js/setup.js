'use strict';

// Нашли попап и показали его
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

// Нашли cписок похожих персонажей
var similarListElement = userDialog.querySelector('.setup-similar-list');

// Нашли шаблон и контент внутри него
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

// Из условия задания описал обьект со свойствами волшебников
var propertiesWizards = {
  // количество волшебников, которых нужно получить случайно
  AMOUNT_WIZARDS: 4,

  NAME: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAME: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLOR: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLOR: ['black', 'red', 'blue', 'yellow', 'green']
};

// Функция, возвращающая случайный элемемент массива
function getRandomElement(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  var randomElement = array[randomIndex];

  return randomElement;
}

// Функция, возвращающаая массив объектов магов
function generateWizards() {
  var wizards = [];
  for (var i = 0; i < propertiesWizards.AMOUNT_WIZARDS; i++) {
    wizards.push({
      name: getRandomElement(propertiesWizards.NAME) + '\n ' + getRandomElement(propertiesWizards.SURNAME),
      coatColor: getRandomElement(propertiesWizards.COAT_COLOR),
      eyesColor: getRandomElement(propertiesWizards.EYES_COLOR)
    });
  }
  return wizards;
}

var wizards = generateWizards();

// Генерируем шаблон волшебника
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
