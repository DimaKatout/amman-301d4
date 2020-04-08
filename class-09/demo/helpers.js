'use strict';

// const newHelpers = {};


newHelpers.randomNumberBetween = function(min,max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

newHelpers.Height = 55;

module.exports = newHelpers;