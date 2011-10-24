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
    exports.Symbol.prototype = Object.create(null);
    exports.Symbol.prototype.constructor = exports.Symbol;
    exports.Symbol.prototype.toString = function () {
        return "|"+this.name+"|";
    };
    Object.freeze(exports.Symbol.prototype);

    exports.Enum = function (obj) {
        var that = this;
        if (arguments.length === 1 && obj !== null && typeof obj === "object") {
            console.log("@@@ " + Object.keys(obj));
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
    exports.Enum.prototype.keys = function() {
        return Object.keys(this);
    }
    exports.Enum.prototype.values = function() {
        var that = this;
        return Object.keys(this).map(
            function(key) {
                return that[key];
            }
        );
    }
}(typeof exports === "undefined" ? this.enum = {} : exports));

/*
var color = new enum.Enum("red", "green", "blue");
switch(color.green) {
    case color.green:
        console.log("It is green!");
        break;
    default:
        console.log("Other color.");
}
*/