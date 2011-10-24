(function (exports) {
    function copyOwnTo(source, target) {
        Object.getOwnPropertyNames(source).forEach(function(propName) {
            Object.defineProperty(target, propName,
                Object.getOwnPropertyDescriptor(source, propName));
        });
        return target;
    }
    
    exports.Symbol = function (name, props) {
        this.name = name;
        if (props) {
            copyOwnTo(props, this);
        }
        Object.freeze(this);
    }
    /** We don’t want the mutable Object.prototype in the prototype chain */
    exports.Symbol.prototype = Object.create(null);
    exports.Symbol.prototype.constructor = exports.Symbol;
    /**
     * Without Object.prototype in the prototype chain, we need toString()
     * in order to display symbols.
     */
    exports.Symbol.prototype.toString = function () {
        return "|"+this.name+"|";
    };
    Object.freeze(exports.Symbol.prototype);

    exports.Enum = function (obj) {
        var that = this;
        if (arguments.length === 1 && obj !== null && typeof obj === "object") {
            Object.keys(obj).forEach(function (name) {
                that[name] = new exports.Symbol(name, obj[name]);
            });
        } else {
            Array.prototype.forEach.call(arguments, function (name) {
                that[name] = new exports.Symbol(name);
            });
        }
        Object.freeze(this);
    }
    exports.Enum.prototype.symbols = function() {
        var that = this;
        return Object.keys(this).map(
            function(key) {
                return that[key];
            }
        );
    }
    exports.Enum.prototype.contains = function(sym) {
        if (! sym instanceof exports.Symbol) return false;
        return this[sym.name] === sym;
    }
}(typeof exports === "undefined" ? this.enum = {} : exports));
// Explanation of this pattern: http://www.2ality.com/2011/08/universal-modules.html