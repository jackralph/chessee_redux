/**
 * @const MOVE_DIRECTION
 * @type {object}
 * @description reference to get the `squareStep` equivalent of a directional coordinate
 * 
 * **regular moves**
 * - north = -10
 * - northEast = -9
 * - east = 1
 * - southEast = 11
 * - south = 10
 * - southWest = 9
 * - west = -1
 * - northWest = -11

 * **knight moves**
 * - northTwoWestOne = -21
 * - northTwoEastOne = -19
 * - eastTwoNorthOne = -8
 * - eastTwoSouthOne = 12
 * - southTwoEastOne = 21
 * - southTwoWestOne = 19
 * - westTwoSouthOne = 8
 * - westTwoNorthOne = -12
 */
export const MOVE_DIRECTION = {
    // regular moves
    north: -10,
    northEast: -9,
    east: 1,
    southEast: 11,
    south: 10,
    southWest: 9,
    west: -1,
    northWest: -11,

    // irregular moves
    northTwoWestOne: -21,
    northTwoEastOne: -19,
    eastTwoNorthOne: -8,
    eastTwoSouthOne: 12,
    southTwoEastOne: 21,
    southTwoWestOne: 19,
    westTwoSouthOne: 8,
    westTwoNorthOne: -12,
}