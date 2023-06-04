/**
 * @const MOVE_DIRECTION
 * @type {object}
 * @description Reference to get the `squareStep` equivalent of a directional coordinate
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

/**
 * @const CASTLING_SQUARES
 * @type {object}
 * @description Reference for castling `square`(s)
 */
export const CASTLING_SQUARES = {
    light: {
        king: {
            east: 76,
            west: 72
        },
        rook: {
            east: 77,
            west: 70
        }
    },
    dark: {
        king: {
            east: 6,
            west: 2
        },
        rook: {
            east: 7,
            west: 0
        }
    }
}

/**
 * @const CASTLING_BLOCKING_SQUARES
 * @type {object}
 * @description Reference for blocking castling `square`(s)
 */
export const CASTLING_BLOCKING_SQUARES = {
    light: {
        east: [75, 76],
        west: [72, 73]
    },
    dark: {
        east: [5, 6],
        west: [2, 3]
    }
}