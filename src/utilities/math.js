//#DEFINE constants
const X = 0;
const Y = 1;

/**
 * =*=*=*=*=*=*=*=*=*=*=*=*=
 *
 *   Cartesian Mathematics
 *
 * =*=*=*=*=*=*=*=*=*=*=*=*=
 */

/**
 * Returns a control point for quadratic bezier distance
 * on the segment axis
 *
 * @param {number[]} coordinates_1 point A
 * @param {number[]} coordinates_2 point B
 * @param {number} heightWeight this number is multiplied by the unit to increase the round of the arc
 */
export default function getControlPoint(
    coordinates_1,
    coordinates_2,
    heightWeight = 1
) {
    const UNIT = 1; // you can change this with a function
    const m = getSlope(coordinates_1, coordinates_2);
    const midPoint = getMidpoint(coordinates_1, coordinates_2);

    console.log(coordinates_1, coordinates_2);
    if (!m) {
        return [midPoint[X] + heightWeight * UNIT, midPoint[Y]];
    } else {
        let controlPointX = midPoint[X] + heightWeight * UNIT;
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
    return (-1 / m) * (x - midPoint[X]) + midPoint[Y];
}

function getMidpoint(coordinates_1, coordinates_2) {
    return [
        (coordinates_1[X] + coordinates_2[X]) / 2,
        (coordinates_1[Y] + coordinates_2[Y]) / 2,
    ];
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
        return (
            (coordinates_2[Y] - coordinates_1[Y]) /
            (coordinates_2[X] - coordinates_1[X])
        );
    }
}

/**
 * Gets two points and returns the angle they draw in a cartesian plan
 *
 * @param {number[]} p1 an array of x1, y1 coordinates
 * @param {number[]} p2 an array of x2, y2 coordinates
 */
export function getAngle(p1, p2) {
    const diffY = p1[Y] - p2[Y];
    const diffX = p1[X] - p2[X];
    return Math.atan2(diffY, diffX) * (180 / Math.PI) - 90;
}

/**
 * @description A function to scale
 * @author Christian Colonna
 * @date 16-11-2020
 * @export
 * @param {number} x num to scale
 * @param {number} min old range min
 * @param {number} max old range max
 * @param {number} scaleMin new range min
 * @param {number} scaleMax new range max
 * @returns {number} scaled value
 */
export function scale(x, min, max, scaleMin, scaleMax) {
    const oldPercernt = (x - min) / (max - min);
    return (scaleMax - scaleMin) * oldPercernt + scaleMin;
}
