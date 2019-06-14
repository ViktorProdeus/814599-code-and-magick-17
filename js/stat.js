'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var BAR_X = 140;
var BAR_Y = 100;
var GAP = 10;
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

var getRandomColor = function () {
  var randomNumber = Math.random().toFixed(2);

  return 'rgba(0, 0, 255, ' + randomNumber + ')';
};


window.renderStatistics = function (ctx, names, times) {
  var CLOUD_SHADOW_X = CLOUD_X + GAP;
  var CLOUD_SHADOW_Y = CLOUD_Y + GAP;

  renderCloud(ctx, CLOUD_SHADOW_X, CLOUD_SHADOW_Y, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  getTextValue(ctx, 'Ура вы победили!', 120, 42, '#000000');
  getTextValue(ctx, 'Список результатов:', 120, 62, '#000000');

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var playerName = names[i];
    var PLAYER_NAME_X = BAR_X + (BAR_WIDTH + BAR_GAP) * i;
    var PLAYER_NAME_Y = CLOUD_HEIGHT;

    getTextValue(ctx, playerName, PLAYER_NAME_X, PLAYER_NAME_Y, '#000000');

    var playerScore = Math.round(times[i]);
    var PLAYER_SCORE_X = BAR_X + (BAR_WIDTH + BAR_GAP) * i;
    var PLAYER_SCORE_Y = CLOUD_HEIGHT - (BAR_HEIGHT * times[i] / maxTime) - GAP * 3;

    getTextValue(ctx, playerScore, PLAYER_SCORE_X, PLAYER_SCORE_Y, '#000000');

    if (playerName === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = getRandomColor();
    }

    var BAR_HEIGHT_WINNER = (BAR_HEIGHT * times[i] / maxTime) * -1;
    var BAR_X_WINNER = BAR_X + (BAR_WIDTH + BAR_GAP) * i;
    var BAR_Y_WINNER = BAR_Y + BAR_HEIGHT;

    ctx.fillRect(BAR_X_WINNER, BAR_Y_WINNER, BAR_WIDTH, BAR_HEIGHT_WINNER);
  }
};
