"use strict";

var _chai = require("chai");

var _resourcesFactory = _interopRequireDefault(require("./resources-factory"));

var _baseDatabase = _interopRequireDefault(require("../adapters/base-database"));

var _baseResource = _interopRequireDefault(require("../adapters/base-resource"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ResourcesFactory', function () {
  describe('._convertDatabases', function () {
    context('no adapter defined', function () {
      it('throws an error when there are no adapters and database is given', function () {
        (0, _chai.expect)(() => {
          new _resourcesFactory.default()._convertDatabases(['one']);
        }).to.throw().property('name', 'NoDatabaseAdapterError');
      });
      it('returns empty array when none databases were given', function () {
        (0, _chai.expect)(new _resourcesFactory.default()._convertDatabases([])).to.have.lengthOf(0);
      });
    });
    context('one adapter defined', function () {
      beforeEach(function () {
        this.resourcesInDatabase = 5;

        class Database extends _baseDatabase.default {
          static isAdapterFor(database) {
            return database === 'supported';
          }

          resources() {
            return new Array(5);
          } // eslint-disable-line class-methods-use-this


        }

        class Resource extends _baseResource.default {}

        this.resourcesFactory = new _resourcesFactory.default({}, [{
          Database,
          Resource
        }]);
      });
      it('takes resources from databases', function () {
        (0, _chai.expect)(this.resourcesFactory._convertDatabases(['supported'])).to.have.lengthOf(this.resourcesInDatabase);
      });
      it('throws an error when there are no adapters supporting given database', function () {
        (0, _chai.expect)(() => {
          this.resourcesFactory._convertDatabases(['not supported']);
        }).to.throw().property('name', 'NoDatabaseAdapterError');
      });
    });
  });
  describe('._convertResources', function () {
    context('there are no adapters', function () {
      it('throws an error when resource is not subclass from BaseResource', function () {
        (0, _chai.expect)(() => {
          new _resourcesFactory.default({})._convertResources(['one']);
        }).to.throw().property('name', 'NoResourceAdapterError');
      });
      it('returns given resource when it is subclass from BaseResource', function () {
        class MyResource extends _baseResource.default {}

        (0, _chai.expect)(new _resourcesFactory.default({})._convertResources([new MyResource()])).to.have.lengthOf(1);
      });
    });
    context('there is one adapter', function () {
      beforeEach(function () {
        class Database extends _baseDatabase.default {}

        class Resource extends _baseResource.default {
          static isAdapterFor(resource) {
            return resource === 'supported';
          }

        }

        this.resourcesFactory = new _resourcesFactory.default({}, [{
          Database,
          Resource
        }]);
        this.Resource = Resource;
      });
      it('throws an error when resource is not handled by the adapter', function () {
        (0, _chai.expect)(() => {
          this.resourcesFactory._convertResources(['not supported']);
        }).to.throw().property('name', 'NoResourceAdapterError');
      });
      it('throws an error when resource is not handled by the adapter and its provided with a decorator', function () {
        (0, _chai.expect)(() => {
          this.resourcesFactory._convertResources([{
            resource: 'not supported',
            decorator: 'sth'
          }]);
        }).to.throw().property('name', 'NoResourceAdapterError');
      });
      it('converts given resource to Resource class provided in the adapter', function () {
        const resources = this.resourcesFactory._convertResources(['supported']);

        (0, _chai.expect)(resources).to.have.lengthOf(1);
        (0, _chai.expect)(resources[0].resource).to.be.an.instanceOf(this.Resource);
      });
      it('converts to Resource class when resource is provided with options', function () {
        const options = {};

        const resources = this.resourcesFactory._convertResources([{
          resource: 'supported',
          options
        }]);

        (0, _chai.expect)(resources).to.have.lengthOf(1);
        (0, _chai.expect)(resources[0].resource).to.be.an.instanceOf(this.Resource);
        (0, _chai.expect)(resources[0].options).to.deep.equal(options);
      });
    });
  });
  describe('_decorateResources', function () {
    beforeEach(function () {
      this.resourcesFactory = new _resourcesFactory.default({
        options: {}
      }, []);
      this.assignDecoratorStub = this.sinon.stub(_baseResource.default.prototype, 'assignDecorator');
    });
    it('assigns ResourceDecorator when no options were given', function () {
      this.resourcesFactory._decorateResources([{
        resource: new _baseResource.default()
      }]);

      (0, _chai.expect)(this.assignDecoratorStub).to.have.been.calledWith(this.sinon.match.any, this.sinon.match({}));
    });
    it('assigns ResourceDecorator with options when there were given', function () {
      const options = {
        id: 'someId'
      };
      const resource = new _baseResource.default();

      this.resourcesFactory._decorateResources([{
        resource,
        options
      }]);

      (0, _chai.expect)(this.assignDecoratorStub).to.have.been.calledWith(this.sinon.match.any, this.sinon.match(options));
    });
  });
});