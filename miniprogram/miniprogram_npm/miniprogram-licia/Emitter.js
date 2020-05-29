var Class = require('./Class');
var has = require('./has');
var each = require('./each');
var slice = require('./slice');
var once = require('./once');

exports = Class(
    {
        initialize: function Emitter() {
            this._events = this._events || {};
        },
        on: function(event, listener) {
            this._events[event] = this._events[event] || [];

            this._events[event].push(listener);

            return this;
        },
        off: function(event, listener) {
            if (!has(this._events, event)) return;

            this._events[event].splice(
                this._events[event].indexOf(listener),
                1
            );

            return this;
        },
        once: function(event, listener) {
            this.on(event, once(listener));
            return this;
        },
        emit: function(event) {
            if (!has(this._events, event)) return;
            var args = slice(arguments, 1);
            each(
                this._events[event],
                function(val) {
                    val.apply(this, args);
                },
                this
            );
            return this;
        }
    },
    {
        mixin: function(obj) {
            each(['on', 'off', 'once', 'emit'], function(val) {
                obj[val] = exports.prototype[val];
            });
            obj._events = obj._events || {};
        }
    }
);

module.exports = exports;
