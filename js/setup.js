'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
var setupWizard = setup.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var fireball = setup.querySelector('.setup-fireball-wrap');

// Из условия задания описал обьект со свойствами волшебников
var propertiesWizards = {
  // количество волшебников, которых нужно получить случайно
  AMOUNT_WIZARDS: 4,

  NAME: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAME: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLOR: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLOR: ['black', 'red', 'blue', 'yellow', 'green'],
  FIREBALL_COLOR: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
};

// Объявили обработчик ESC
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

// Функция открытия popup
var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

// Функция закрытия popup
var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// обработчик на открытие popup по клику
setupOpen.addEventListener('click', function () {
  openPopup();
});

// обработчик на открытие popup по клавиатуре
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

// обработчик на закрытие popup по клику
setupClose.addEventListener('click', function () {
  closePopup();
});

// обработчик на закрытие popup по клавиатуре
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// обработчик на валидацию поля имени в форме popup
userNameInput.addEventListener('keydown', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

// обработчик на валидацию поля имени в форме popup
userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  }
});

// обработчик, который вносит дополнения в валидацию поля имени в форме popup
userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length > 1 && target.value.length < 3) {
    target.setCustomValidity('Имя все еще короткое');
  } else {
    target.setCustomValidity('');
  }
});

// обработчик, который меняет цвет плаща
wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = getRandomElement(propertiesWizards.COAT_COLOR);
});

// обработчик, который меняет цвет глаз
wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = getRandomElement(propertiesWizards.EYES_COLOR);
});

// обработчик, который меняет цвет огненного шара
fireball.addEventListener('click', function () {
  fireball.style.background = getRandomElement(propertiesWizards.FIREBALL_COLOR);
});

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

// Генерируем шаблон волшебника
function renderWizard(wizard) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

// Добавляем шаблон в разметку
function addtoSetupSimilar(wizards) {
  var dialogWizardz = document.querySelector('.setup-similar');
  dialogWizardz.classList.remove('hidden');
  var similarListElement = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);

  return fragment;
}

addtoSetupSimilar(generateWizards());


