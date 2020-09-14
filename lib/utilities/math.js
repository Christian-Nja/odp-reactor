'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports._getControlPoint = _getControlPoint;
exports['default'] = getControlPoint;
//#DEFINE constants
var X = 0;
var Y = 1;

function _getControlPoint(coordinates_1, coordinates_2, diff) {
    console.log('[!] Warning function doesn\'t use formal criteria to compute the control point');
    var midPoint = getMidpoint(coordinates_1, coordinates_2);
    return [midPoint[X] + diff, midPoint[Y]];
}
/**
 * Return a control point for quadratic beyez distance
 * on the segment axis
 *
 * @param {number[]} coordinates_1 point A
 * @param {number[]} coordinates_2 point B
 * @param {number} heightWeight this number is multiplied by the unit to increase the round of the arc
 */


function getControlPoint(coordinates_1, coordinates_2) {
    var heightWeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var UNIT = 1; // you can change this with a function

    var m = getSlope(coordinates_1, coordinates_2);
    var midPoint = getMidpoint(coordinates_1, coordinates_2);
    console.log(coordinates_1, coordinates_2);

    if (!m) {
        return [midPoint[X] + heightWeight * UNIT, midPoint[Y]];
    } else {
        var controlPointX = midPoint[X] + heightWeight * UNIT;
        return [controlPointX, segmentAxis(controlPointX, midPoint, m)];
    }
}
/**
 * Given x returns y coordinates
 *
 * @param {number} x function input
 * @param {number[]} midPoint the midpoint coordinates of a segment
 * @param {*} m slope of axis
 */


function segmentAxis(x, midPoint, m) {
    return -1 / m * (x - midPoint[X]) + midPoint[Y];
}

function getMidpoint(coordinates_1, coordinates_2) {
    return [(coordinates_1[X] + coordinates_2[X]) / 2, (coordinates_1[Y] + coordinates_2[Y]) / 2];
}
/**
 * Computes the slope of a line given 2 points
 *
 * @param {number[]} coordinates_1 Point 1
 * @param {number[]} coordinates_2 Point 2
 */


function getSlope(coordinates_1, coordinates_2) {
    if (coordinates_1[X] === coordinates_2[X]) {
        return undefined;
    } else {
        return (coordinates_2[Y] - coordinates_1[Y]) / (coordinates_2[X] - coordinates_1[X]);
    }
}