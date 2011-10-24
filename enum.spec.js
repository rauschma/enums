var enum = require("./enum.js");

describe("Enum", function() {
    it("can have symbols with custom properties", function() {
        var color = new enum.Enum({
            red: { de: "rot" },
            green: { de: "grün" },
            blue: { de: "blau" },
        });
        function translate(c) {
            return c.de;
        }
        expect(translate(color.green)).toEqual("grün");
    });
});

