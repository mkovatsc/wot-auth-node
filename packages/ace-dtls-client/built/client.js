"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resourceChannel = require("./resourceChannel");
var prompt = require('prompt-sync')();
var resource = prompt("Enter Resource name. To exit enter 'Exit': "); //dummy prompt
while (resource != 'Exit') {
    resourceChannel.actionRequest();
}
