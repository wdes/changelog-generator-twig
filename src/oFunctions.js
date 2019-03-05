"use strict";

/**
 * @see www.mikedoesweb.com/2014/javascript-object-next-and-previous-keys/
 */
var oFunctions = {};
oFunctions.keys = {};

//NEXT KEY
oFunctions.keys.next = function(o, id) {
    var keys = Object.keys(o),
        idIndex = keys.indexOf(id),
        nextIndex = (idIndex += 1);
    if (nextIndex >= keys.length) {
        //we're at the end, there is no next
        return;
    }
    var nextKey = keys[nextIndex];
    return nextKey;
};

//PREVIOUS KEY
/*
oFunctions.keys.previous = function(o, id) {
    var keys = Object.keys(o),
        idIndex = keys.indexOf(id),
        nextIndex = (idIndex -= 1);
    if (idIndex === 0) {
        //we're at the beginning, there is no previous
        return;
    }
    var nextKey = keys[nextIndex];
    return nextKey;
};*/
module.exports = oFunctions;
