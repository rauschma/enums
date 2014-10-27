var enums = require("./enums.js");

describe("Enum", function() {
    it("can create enums", function() {
        var color = new enums.Enum("red", "green", "blue");
        expect(color.red).toBeDefined();
        expect(color.red.name).toEqual("red");
    });

    it("can have symbols with custom properties", function() {
        var color = new enums.Enum({
            red: { de: "rot" },
            green: { de: "grün" },
            blue: { de: "blau" },
        });
        function translate(c) {
            return c.de;
        }
        expect(translate(color.green)).toEqual("grün");
        expect(translate(color.green)).toEqual("grün");
    });

    it("can check for symbol membership", function() {
        var color = new enums.Enum("red", "green", "blue");
        var fruit = new enums.Enum("apple", "banana");
        expect(color.contains(color.red)).toBeTruthy();
        expect(color.contains(fruit.apple)).toBeFalsy();
    });

    describe("fromName", function() {
        it("can create values from enum names", function() {
            var color = new enums.Enum("red", "green", "blue");
            var red = color.fromName("red");
            expect(red).toBeDefined();
            expect(red.name).toEqual("red");
        });
        it("is undefined for unknown names", function() {
            var color = new enums.Enum("red", "green", "blue");
            var foo = color.fromName("foo");
            expect(foo).toBeUndefined();
        });
    });

});

