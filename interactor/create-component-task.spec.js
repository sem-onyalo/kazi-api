"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');
require('chai').use(require('chai-as-promised'));

const CreateComponentTask = require('./create-component-task');
const CreateComponentTaskRequest = require('./model/create-component-task-request');
const Datasource = require('../datasource');
const Entity = require('../entity');

describe('CreateComponentTask', () => {
  let componentRepository;
  let createComponentTask;

  beforeEach(function() {
    componentRepository = new Datasource.ComponentRepository();
    createComponentTask = new CreateComponentTask(componentRepository);
  });

  describe('execute(createComponentTaskRequest)', () => {
    it('should export function', () => {
      expect(createComponentTask.execute).to.be.a('function');
    });

    it('should add the component to the task', async () => {
      let componentId = 1, taskId = 2;
      let expectedComponent = new Entity.Component(componentId, 'event', 'Event');
      expectedComponent.TaskId = taskId;

      let addComponentToTaskStub = sinon
        .stub(componentRepository, 'addToTask')
        .returns(Promise.resolve(1));

      let getComponentStub = sinon
        .stub(componentRepository, 'getByComponentIdAndTaskId')
        .returns(Promise.resolve(expectedComponent));

      let request = new CreateComponentTaskRequest(componentId, taskId);
      let component = await createComponentTask.execute(request);

      sinon.assert.calledWith(addComponentToTaskStub, componentId, taskId);
      assert.deepEqual(component, expectedComponent, 'The returned component was not the expected value');
    });

    it('should throw an expection if there was an error adding the component to the task or the component or task does not exist', async () => {
      let componentId = 1, taskId = 2;

      let addComponentToTaskStub = sinon
        .stub(componentRepository, 'addToTask')
        .returns(0);

      let request = new CreateComponentTaskRequest(componentId, taskId);
      return assert.isRejected(createComponentTask.execute(request), 'There was an error adding the component to the task or the component or task does not exist');
    });
  });
});
