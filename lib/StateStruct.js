'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A secret key that is used to prevent direct construction of these objects,
 * this is effectively used to ensure that the constructor is private.
 */
var SECRET = 'SECRET_' + Math.random();

var NONE_STATUS = 'NONE';

var CONSTRUCTOR_PAYLOAD = {
  secret: SECRET,
  status: NONE_STATUS,
  value: null,
  error: null,
  hasValue: false,
  creationTimestamp: 0
};

var StateStruct = function () {
  _createClass(StateStruct, null, [{
    key: 'createEmpty',
    value: function createEmpty() {
      return new this(Object.assign({}, CONSTRUCTOR_PAYLOAD, {
        creationTimestamp: +new Date()
      }));
    }
  }, {
    key: 'createWithValue',
    value: function createWithValue(value) {
      return new this(Object.assign({}, CONSTRUCTOR_PAYLOAD, {
        value: value,
        hasValue: true,
        creationTimestamp: +new Date()
      }));
    }
  }, {
    key: 'createWithError',
    value: function createWithError(error) {
      return new this(Object.assign({}, CONSTRUCTOR_PAYLOAD, {
        error: error,
        creationTimestamp: +new Date()
      }));
    }
  }, {
    key: 'createWithStatus',
    value: function createWithStatus(status) {
      return new this(Object.assign({}, CONSTRUCTOR_PAYLOAD, {
        status: status,
        creationTimestamp: +new Date()
      }));
    }
  }]);

  function StateStruct(_ref) {
    var secret = _ref.secret,
        status = _ref.status,
        value = _ref.value,
        error = _ref.error,
        hasValue = _ref.hasValue,
        creationTimestamp = _ref.creationTimestamp;

    _classCallCheck(this, StateStruct);

    if (secret !== SECRET) {
      throw new Error('StateStruct constructor error: constructor is not public, ' + 'use static methods: ' + 'createEmpty, ' + 'createWithValue, ' + 'createWithStatus, ' + 'createWithError');
    }

    this._status = status;
    this._value = value;
    this._error = error;
    this._hasValue = hasValue;
    this._creationTimestamp = creationTimestamp;
    this._modificationTimestamp = +new Date();
  }

  _createClass(StateStruct, [{
    key: '_getConstructorPayload',
    value: function _getConstructorPayload(payload) {
      return Object.assign({
        secret: SECRET,
        status: this._status,
        value: this._value,
        error: this._error,
        creationTimestamp: this._creationTimestamp,
        hasValue: this._hasValue
      }, payload);
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      return new this.constructor(this._getConstructorPayload({
        value: value,
        hasValue: true
      }));
    }
  }, {
    key: 'updateValue',
    value: function updateValue(updater) {
      if (!this._hasValue) {
        return this;
      }

      return new this.constructor(this._getConstructorPayload({
        value: updater(this._value),
        hasValue: true
      }));
    }
  }, {
    key: 'removeValue',
    value: function removeValue(value) {
      return new this.constructor(this._getConstructorPayload({
        secret: SECRET,
        value: null,
        hasValue: false
      }));
    }
  }, {
    key: 'setError',
    value: function setError(error) {
      return new this.constructor(this._getConstructorPayload({
        error: error
      }));
    }
  }, {
    key: 'removeError',
    value: function removeError() {
      return new this.constructor(this._getConstructorPayload({
        secret: SECRET,
        error: null
      }));
    }
  }, {
    key: 'setStatus',
    value: function setStatus(status) {
      return new this.constructor(this._getConstructorPayload({
        status: status
      }));
    }
  }, {
    key: 'setNoneStatus',
    value: function setNoneStatus() {
      return this.setStatus(NONE_STATUS);
    }
  }, {
    key: 'hasValue',
    value: function hasValue() {
      return this._hasValue;
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      return !this._hasValue && this._error === null && this._status === NONE_STATUS;
    }
  }, {
    key: 'hasModification',
    value: function hasModification() {
      return this._creationTimestamp !== this._modificationTimestamp;
    }
  }, {
    key: 'hasStatus',
    value: function hasStatus() {
      return this._status !== NONE_STATUS;
    }
  }, {
    key: 'hasError',
    value: function hasError() {
      return this._error !== null;
    }
  }, {
    key: 'getStatus',
    value: function getStatus() {
      return this._status;
    }
  }, {
    key: 'getError',
    value: function getError() {
      return this._error;
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this._value;
    }
  }, {
    key: 'getCreationTimestamp',
    value: function getCreationTimestamp() {
      return this._creationTimestamp;
    }
  }, {
    key: 'getModificationTimestamp',
    value: function getModificationTimestamp() {
      return this._modificationTimestamp;
    }
  }]);

  return StateStruct;
}();

StateStruct.NONE_STATUS = NONE_STATUS;
exports.default = StateStruct;