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


  // Генерируем шаблон волшебника
  function renderWizard(wizard) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  }

  var successHandler = function (wizards) {
    var dialogWizardz = document.querySelector('.setup-similar');
    dialogWizardz.classList.remove('hidden');
    var similarListElement = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    similarListElement.appendChild(fragment);

    return fragment;
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(successHandler, errorHandler);

  // addtoSetupSimilar(generateWizards());

  var userDialog = document.querySelector('.setup-similar');
  var form = userDialog.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), function () {
      userDialog.classList.add('hidden');
    });
    evt.preventDefault();
  });
})();
