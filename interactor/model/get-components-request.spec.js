"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const GetComponentsRequest = require('./get-components-request');

describe('GetComponentsRequest', () => {
  it('should define the properties: DirectoryId and set them on init', () => {
    let request = new GetComponentsRequest(5);
    expect(request).to.have.property('DirectoryId');
    assert.strictEqual(request.DirectoryId, 5, 'DirectoryId was not set to expected value');
  });
});
