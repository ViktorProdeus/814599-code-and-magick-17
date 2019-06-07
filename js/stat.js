'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_HEIGH = 150;
var BAR_WIDTH = 40;
var BAR_X = 140;
var BAR_Y = 100;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getTextValue = function (ctx, text, x, y, color) {
  ctx.fillStyle = color;
  ctx.font = '16px PT Mono';
  ctx.fillText(text, x, y);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};


window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  getTextValue(ctx, 'Ура вы победили!', 120, 42, '#000000');
  getTextValue(ctx, 'Список результатов:', 120, 62, '#000000');

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    getTextValue(ctx, names[i], BAR_X + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT, '#000000');
    getTextValue(ctx, Math.round(times[i]), BAR_X + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - (BAR_HEIGH * times[i] / maxTime) - GAP * 3, '#000000');


    var randomColor = Math.random().toFixed(2);
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + randomColor + ')';
    }

    ctx.fillRect(BAR_X + (BAR_WIDTH + BAR_GAP) * i, BAR_Y + BAR_HEIGH, BAR_WIDTH, (BAR_HEIGH * times[i] / maxTime) * -1);
  }
};
