'use strict';

(function () {
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
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closePopup();
    }
  };

  // Функция открытия popup
  var openPopup = function () {
    document.querySelector('.setup').classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  // Функция закрытия popup
  var closePopup = function () {
    document.querySelector('.setup').classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    document.querySelector('.setup').style.top = '';
    document.querySelector('.setup').style.left = '';
  };

  document.addEventListener('click', function (evt) {
    var target = evt.target;

    while (target !== document) {
      if (target.classList.contains('setup-open')) {
        openPopup(target);
        return;
      }
      if (target.classList.contains('setup-close')) {
        closePopup(target);
        return;
      }
      if (target.classList.contains('setup-fireball-wrap')) {
        target.style.background = getRandomElement(propertiesWizards.FIREBALL_COLOR);
        return;
      }
      if (target.classList.contains('wizard-coat')) {
        target.style.fill = getRandomElement(propertiesWizards.COAT_COLOR);
        return;
      }
      if (target.classList.contains('wizard-eyes')) {
        target.style.fill = getRandomElement(propertiesWizards.EYES_COLOR);
      }

      target = target.parentNode;
    }
  });

  document.addEventListener('keydown', function (evt) {
    var target = evt.target;

    while (target !== document) {
      if (target.classList.contains('setup-open') && evt.keyCode === window.util.ENTER_KEYCODE) {
        openPopup();
        return;
      }
      if (target.classList.contains('setup-close') && evt.keyCode === window.util.ENTER_KEYCODE) {
        closePopup();
        return;
      }

      target = target.parentNode;
    }
  });

  document.addEventListener('focus', function (evt) {
    var target = evt.target;

    while (target !== document) {
      if (target.classList.contains('setup-user-name')) {
        document.removeEventListener('keydown', onPopupEscPress);
      }
      target = target.parentNode;
    }
  }, true);

  document.addEventListener('blur', function (evt) {
    var target = evt.target;

    while (target !== document) {
      if (target.classList.contains('setup-user-name')) {
        document.addEventListener('keydown', onPopupEscPress);
      }
      target = target.parentNode;
    }
  }, true);


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

})();
