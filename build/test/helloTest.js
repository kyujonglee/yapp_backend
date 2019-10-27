"use strict";

var helloController = require('../controllers/helloController');

var httpMocks = require('node-mocks-http');

var should = require('should');

describe('Hello route', function () {
  before(function () {
    // excuted before test suite
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
  });
  after(function () {// excuted after test suite
  });
  beforeEach(function () {// excuted before every test
  });
  afterEach(function () {// excuted after every test
  });
  describe('basic hello test', function () {
    it('hello world', function () {
      // write test logic
      helloController.helloWorld(req, res);
      result = JSON.parse(res._getData());
      res.statusCode.should.be.equal(200);
      result.message.should.be.equal('hello world');
    });
  });
});