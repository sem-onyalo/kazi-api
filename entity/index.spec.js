"use strict";

const expect = require('chai').expect

const Entity = require('../entity');

describe('Entity', () => {
  it('should define properties: Association, Component, Directory, Task', () => {
    expect(Entity).to.have.property('Association');
    expect(Entity).to.have.property('Component');
    expect(Entity).to.have.property('Directory');
    expect(Entity).to.have.property('Task');
  });
});
