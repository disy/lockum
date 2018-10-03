"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ahmet = require("./LocationApi");
ahmet.encrypt().then(function (acccept) {
    var b = ahmet.decrypt();
    b.then(function (a) {
        console.log("mesagimiz:" + a);
    });
});
//# sourceMappingURL=index.js.map