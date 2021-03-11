/// <reference types="cypress" />

module.exports = (on) => {
  require("cypress-terminal-report/src/installLogsPrinter")(on);
};
