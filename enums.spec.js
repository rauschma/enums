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
            blue: { de: "blau" }
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
        var color = new enums.Enum("red", "green", "blue");
        it("can find enums via their names", function() {
            var red = color.fromName("red");
            expect(red).toBeDefined();
            expect(red.name).toEqual("red");
        });
        it("is undefined for unknown names", function() {
            var foo = color.fromName("foo");
            expect(foo).toBeUndefined();
        });
        it("is undefined for a bogus parameter", function() {
            var foo = color.fromName({});
            expect(foo).toBeUndefined();
        });
    });

    describe("fromValue", function() {
        var color = new enums.Enum({
            red: { r: 255, g: 2, b: 0 },
            green: { r: 0, g: 255, b: 0 },
            blue: { r: 0, g: 0, b: 255 }
        });
        it("can find enums via a single matching values", function() {
            var red = color.fromValue({ r: 255 });
            expect(red).toBeDefined();
            expect(red.name).toEqual("red");
        });
        it("can find enums via a pair of matching values", function() {
            var red = color.fromValue({ r: 255, g: 2 });
            expect(red).toBeDefined();
            expect(red.name).toEqual("red");
        });
        it("can find a list of enums", function() {
            var noReds = color.fromValue({ r: 0 });
            expect(noReds).toBeDefined();
            expect(noReds.length).toEqual(2);
        });
        it("is undefined with no input", function() {
            var value = color.fromValue();
            expect(value).toBeUndefined();
        });
        it("is undefined with input that does not match our enum values", function() {
            var value = color.fromValue({ foo: "bar" });
            expect(value).toBeUndefined();
        });
    });

});

