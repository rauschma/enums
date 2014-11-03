(function (exports) {
    function copyOwnFrom(target, source) {
        Object.getOwnPropertyNames(source).forEach(function(propName) {
            Object.defineProperty(target, propName,
                Object.getOwnPropertyDescriptor(source, propName));
        });
        return target;
    }
    
    function Symbol(name, props) {
        this.name = name;
        if (props) {
            copyOwnFrom(this, props);
        }
        Object.seal(this);
    }
    /** We don’t want the mutable Object.prototype in the prototype chain */
    // BG adding Object.prototype back to allow iteration, otherwise objects with
    // symbols attached cannot be deep copied
    Symbol.prototype = Object.create(Object.prototype);
    Symbol.prototype.constructor = Symbol;
    /**
     * Without Object.prototype in the prototype chain, we need toString()
     * in order to display symbols.
     */
    Symbol.prototype.toString = function () {
        return "|"+this.name+"|";
    };
    Object.seal(Symbol.prototype);

    var Enum = function (obj) {
        if (arguments.length === 1 && obj !== null && typeof obj === "object") {
            Object.keys(obj).forEach(function (name) {
                this[name] = new Symbol(name, obj[name]);
            }, this);
        } else {
            Array.prototype.forEach.call(arguments, function (name) {
                this[name] = new Symbol(name);
            }, this);
        }
        Object.seal(this);
    };
    Enum.prototype.symbols = function() {
        return Object.keys(this).map(
            function(key) {
                return this[key];
            }, this
        );
    };
    Enum.prototype.contains = function(sym) {
        if (!sym instanceof Symbol) return false;
        return this[sym.name] === sym;
    };
    Enum.prototype.fromName = function (name) {
        if (!name instanceof String) return undefined;
        return this[name];
    };

    /**
     * Get the enum based on a matching value
     * @param valueMatcher an object literal with any subset of the properties passed into the original constructor
     * @returns an array of matching enums or, if only one matches the enum or, if none match, undefined
     */
    Enum.prototype.fromValue = function (valueMatcher) {
        if (!valueMatcher) return undefined;
        var matches = this.symbols().filter(function(symbol) {
            for (var key in valueMatcher) { return valueMatcher[key] === symbol[key]; };
        })
        switch (matches.length) {
            case 0:
                return undefined;
            case 1:
                return matches[0];
            default:
                return matches;
        }
    };

    exports.Enum = Enum;
    exports.Symbol = Symbol;
}(typeof exports === "undefined" ? this.enums = {} : exports));
// Explanation of this pattern: http://www.2ality.com/2011/08/universal-modules.html