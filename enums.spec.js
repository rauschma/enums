var enums = require("./enums.js");

describe("Enum", function() {
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
    });
    it("can check for symbol membership", function() {
        var color = new enums.Enum("red", "green", "blue");
        var fruit = new enums.Enum("apple", "banana");
        expect(color.contains(color.red)).toBeTruthy();
        expect(color.contains(fruit.apple)).toBeFalsy();
    });
});

