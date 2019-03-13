"use strict";

if (process.env.NODE_ENV === "production") {
  module.exports = require("./dist/react-form.cjs.production.js");
} else {
  module.exports = require("./dist/react-form.cjs.development.js");
}
