/**
 * @const BOARD_ALGEBRAIC_ARRAY
 * @type {string[]}
 * @description Array with 64 strings, each denoting the algebraic notation of a square
 */
export const BOARD_ALGEBRAIC_ARRAY = [
    "a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8",
    "a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7",
    "a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6",
    "a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5",
    "a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4",
    "a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3",
    "a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2",
    "a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"
];

/**
 * @const BOARD_OCTAL_ARRAY
 * @type {array}
 * @description Array with 64 numbers, each denoting the octal notation of a square
*/
export const BOARD_OCTAL_ARRAY = [
    0o0, 0o1, 0o2, 0o3, 0o4, 0o5, 0o6, 0o7,
    10, 11, 12, 13, 14, 15, 16, 17,
    20, 21, 22, 23, 24, 25, 26, 27,
    30, 31, 32, 33, 34, 35, 36, 37,
    40, 41, 42, 43, 44, 45, 46, 47,
    50, 51, 52, 53, 54, 55, 56, 57,
    60, 61, 62, 63, 64, 65, 66, 67,
    70, 71, 72, 73, 74, 75, 76, 77
];

/**
 * @const STARTING_POSITION_PIECE_ARRAY
 * @type {array}
 * @description Array containing:
 * - 64 elements
 * - 16 strings for string equivalent of dark `piece`s names
 * - 16 strings for string equivalent of light `piece`s names
 * - 32 null values for empty `square`s
 */
export const STARTING_POSITION_PIECE_ARRAY = [
    'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',
    'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
    'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'
];

/**
 * @const STARTING_POSITION_PIECE_ARRAY
 * @type {array}
 * @description **TEST ONLY** Array containing test setup of pieces
 */
export const STARTING_POSITION_PIECE_ARRAY_TEST = [
    'r' ,null, null, null, 'k', null, null, 'r',
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    'R', null, null, null, 'K', null, null, 'R'
]

/**
 * @const PIECE_REF
 * @type {object}
 * @description `piece` reference to get the `name` equivalent of a `piece` identified
 * - `'b'` or `'B'` = `'bishop'`
 * - `'k'` or `'K'` = `'king'`
 * - `'n'` or `'N'` = `'knight'`
 * - `'p'` or `'P'` = `'pawn'`
 * - `'q'` or `'Q'` = `'queen'`
 * - `'r'` or `'R'` = `'rook'`
 */
export const PIECE_REF = {
    // dark piece
    'b': 'bishop',
    'k': 'king',
    'n': 'knight',
    'p': 'pawn',
    'q': 'queen',
    'r': 'rook',

    // light pieces
    'B': 'bishop',
    'K': 'king',
    'N': 'knight',
    'P': 'pawn',
    'Q': 'queen',
    'R': 'rook',
};
