"use strict";

exports.helloWorld = function (req, res) {
  console.log('hello world');
  res.status(200).json({
    message: 'hello world'
  });
};