"use strict";

if (process.env.NODE_ENV === "production") {
  module.exports = require("./react-form.cjs.production.js");
} else {
  module.exports = require("./react-form.cjs.development.js");
}
