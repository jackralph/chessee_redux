import { isAbandonmentMove } from "./move.shared";

describe("move.shared.test.js", function() {
    describe("isAbandonmentMove()", function() {
        test("can detect none-abandoning moves", function() {
            const boardState = {
                "0": {
                    "algebraicNotation": "a8",
                    "octalNotation": 0,
                    "piecesAttackingThisSquare": []
                },
                "1": {
                    "algebraicNotation": "b8",
                    "octalNotation": 1,
                    "piecesAttackingThisSquare": []
                },
                "2": {
                    "algebraicNotation": "c8",
                    "octalNotation": 2,
                    "piecesAttackingThisSquare": []
                },
                "3": {
                    "algebraicNotation": "d8",
                    "octalNotation": 3,
                    "piecesAttackingThisSquare": [
                        4
                    ]
                },
                "4": {
                    "algebraicNotation": "e8",
                    "octalNotation": 4,
                    "piece": {
                        "hasMoved": false,
                        "legalMoves": [
                            5,
                            15,
                            14,
                            13,
                            3
                        ],
                        "pieceColor": "dark",
                        "pieceName": "king"
                    },
                    "piecesAttackingThisSquare": [
                        24
                    ]
                },
                "5": {
                    "algebraicNotation": "f8",
                    "octalNotation": 5,
                    "piecesAttackingThisSquare": [
                        4
                    ]
                },
                "6": {
                    "algebraicNotation": "g8",
                    "octalNotation": 6,
                    "piecesAttackingThisSquare": []
                },
                "7": {
                    "algebraicNotation": "h8",
                    "octalNotation": 7,
                    "piecesAttackingThisSquare": []
                },
                "10": {
                    "algebraicNotation": "a7",
                    "octalNotation": 10,
                    "piecesAttackingThisSquare": []
                },
                "11": {
                    "algebraicNotation": "b7",
                    "octalNotation": 11,
                    "piecesAttackingThisSquare": []
                },
                "12": {
                    "algebraicNotation": "c7",
                    "octalNotation": 12,
                    "piecesAttackingThisSquare": []
                },
                "13": {
                    "algebraicNotation": "d7",
                    "octalNotation": 13,
                    "piecesAttackingThisSquare": [
                        4
                    ]
                },
                "14": {
                    "algebraicNotation": "e7",
                    "octalNotation": 14,
                    "piecesAttackingThisSquare": [
                        4,
                        24
                    ]
                },
                "15": {
                    "algebraicNotation": "f7",
                    "octalNotation": 15,
                    "piecesAttackingThisSquare": [
                        4
                    ]
                },
                "16": {
                    "algebraicNotation": "g7",
                    "octalNotation": 16,
                    "piecesAttackingThisSquare": []
                },
                "17": {
                    "algebraicNotation": "h7",
                    "octalNotation": 17,
                    "piecesAttackingThisSquare": []
                },
                "20": {
                    "algebraicNotation": "a6",
                    "octalNotation": 20,
                    "piecesAttackingThisSquare": [
                        24
                    ]
                },
                "21": {
                    "algebraicNotation": "b6",
                    "octalNotation": 21,
                    "piecesAttackingThisSquare": [
                        24
                    ]
                },
                "22": {
                    "algebraicNotation": "c6",
                    "octalNotation": 22,
                    "piecesAttackingThisSquare": [
                        24
                    ]
                },
                "23": {
                    "algebraicNotation": "d6",
                    "octalNotation": 23,
                    "piecesAttackingThisSquare": [
                        24
                    ]
                },
                "24": {
                    "algebraicNotation": "e6",
                    "octalNotation": 24,
                    "piece": {
                        "hasMoved": false,
                        "legalMoves": [
                            14,
                            34,
                            44,
                            54,
                            23
                        ],
                        "pieceColor": "dark",
                        "pieceName": "rook"
                    },
                    "piecesAttackingThisSquare": [
                        54
                    ]
                },
                "25": {
                    "algebraicNotation": "f6",
                    "octalNotation": 25,
                    "piecesAttackingThisSquare": [
                        24
                    ]
                },
                "26": {
                    "algebraicNotation": "g6",
                    "octalNotation": 26,
                    "piecesAttackingThisSquare": [
                        24
                    ]
                },
                "27": {
                    "algebraicNotation": "h6",
                    "octalNotation": 27,
                    "piecesAttackingThisSquare": [
                        24
                    ]
                },
                "30": {
                    "algebraicNotation": "a5",
                    "octalNotation": 30,
                    "piecesAttackingThisSquare": []
                },
                "31": {
                    "algebraicNotation": "b5",
                    "octalNotation": 31,
                    "piecesAttackingThisSquare": []
                },
                "32": {
                    "algebraicNotation": "c5",
                    "octalNotation": 32,
                    "piecesAttackingThisSquare": []
                },
                "33": {
                    "algebraicNotation": "d5",
                    "octalNotation": 33,
                    "piecesAttackingThisSquare": []
                },
                "34": {
                    "algebraicNotation": "e5",
                    "octalNotation": 34,
                    "piecesAttackingThisSquare": [
                        24,
                        54
                    ]
                },
                "35": {
                    "algebraicNotation": "f5",
                    "octalNotation": 35,
                    "piecesAttackingThisSquare": []
                },
                "36": {
                    "algebraicNotation": "g5",
                    "octalNotation": 36,
                    "piecesAttackingThisSquare": []
                },
                "37": {
                    "algebraicNotation": "h5",
                    "octalNotation": 37,
                    "piecesAttackingThisSquare": []
                },
                "40": {
                    "algebraicNotation": "a4",
                    "octalNotation": 40,
                    "piecesAttackingThisSquare": []
                },
                "41": {
                    "algebraicNotation": "b4",
                    "octalNotation": 41,
                    "piecesAttackingThisSquare": []
                },
                "42": {
                    "algebraicNotation": "c4",
                    "octalNotation": 42,
                    "piecesAttackingThisSquare": []
                },
                "43": {
                    "algebraicNotation": "d4",
                    "octalNotation": 43,
                    "piecesAttackingThisSquare": []
                },
                "44": {
                    "algebraicNotation": "e4",
                    "octalNotation": 44,
                    "piecesAttackingThisSquare": [
                        24,
                        54
                    ]
                },
                "45": {
                    "algebraicNotation": "f4",
                    "octalNotation": 45,
                    "piecesAttackingThisSquare": []
                },
                "46": {
                    "algebraicNotation": "g4",
                    "octalNotation": 46,
                    "piecesAttackingThisSquare": []
                },
                "47": {
                    "algebraicNotation": "h4",
                    "octalNotation": 47,
                    "piecesAttackingThisSquare": []
                },
                "50": {
                    "algebraicNotation": "a3",
                    "octalNotation": 50,
                    "piecesAttackingThisSquare": [
                        54
                    ]
                },
                "51": {
                    "algebraicNotation": "b3",
                    "octalNotation": 51,
                    "piecesAttackingThisSquare": [
                        54
                    ]
                },
                "52": {
                    "algebraicNotation": "c3",
                    "octalNotation": 52,
                    "piecesAttackingThisSquare": [
                        54,
                        63
                    ]
                },
                "53": {
                    "algebraicNotation": "d3",
                    "octalNotation": 53,
                    "piecesAttackingThisSquare": [
                        54,
                        63
                    ]
                },
                "54": {
                    "algebraicNotation": "e3",
                    "octalNotation": 54,
                    "piece": {
                        "hasMoved": false,
                        "legalMoves": [
                            44,
                            34,
                            24,
                            55,
                            56,
                            57,
                            64,
                            74,
                            53,
                            52,
                            51,
                            50
                        ],
                        "pieceColor": "light",
                        "pieceName": "rook"
                    },
                    "piecesAttackingThisSquare": [
                        24,
                        63
                    ]
                },
                "55": {
                    "algebraicNotation": "f3",
                    "octalNotation": 55,
                    "piecesAttackingThisSquare": [
                        54
                    ]
                },
                "56": {
                    "algebraicNotation": "g3",
                    "octalNotation": 56,
                    "piecesAttackingThisSquare": [
                        54
                    ]
                },
                "57": {
                    "algebraicNotation": "h3",
                    "octalNotation": 57,
                    "piecesAttackingThisSquare": [
                        54
                    ]
                },
                "60": {
                    "algebraicNotation": "a2",
                    "octalNotation": 60,
                    "piecesAttackingThisSquare": []
                },
                "61": {
                    "algebraicNotation": "b2",
                    "octalNotation": 61,
                    "piecesAttackingThisSquare": []
                },
                "62": {
                    "algebraicNotation": "c2",
                    "octalNotation": 62,
                    "piecesAttackingThisSquare": [
                        63
                    ]
                },
                "63": {
                    "algebraicNotation": "d2",
                    "octalNotation": 63,
                    "piecesAttackingThisSquare": [],
                    "piece": {
                        "hasMoved": true,
                        "legalMoves": [
                            53,
                            64,
                            74,
                            73,
                            72,
                            62,
                            52
                        ],
                        "pieceColor": "light",
                        "pieceName": "king"
                    }
                },
                "64": {
                    "algebraicNotation": "e2",
                    "octalNotation": 64,
                    "piecesAttackingThisSquare": [
                        54,
                        63
                    ]
                },
                "65": {
                    "algebraicNotation": "f2",
                    "octalNotation": 65,
                    "piecesAttackingThisSquare": []
                },
                "66": {
                    "algebraicNotation": "g2",
                    "octalNotation": 66,
                    "piecesAttackingThisSquare": []
                },
                "67": {
                    "algebraicNotation": "h2",
                    "octalNotation": 67,
                    "piecesAttackingThisSquare": []
                },
                "70": {
                    "algebraicNotation": "a1",
                    "octalNotation": 70,
                    "piecesAttackingThisSquare": []
                },
                "71": {
                    "algebraicNotation": "b1",
                    "octalNotation": 71,
                    "piecesAttackingThisSquare": []
                },
                "72": {
                    "algebraicNotation": "c1",
                    "octalNotation": 72,
                    "piecesAttackingThisSquare": [
                        63
                    ]
                },
                "73": {
                    "algebraicNotation": "d1",
                    "octalNotation": 73,
                    "piecesAttackingThisSquare": [
                        63
                    ]
                },
                "74": {
                    "algebraicNotation": "e1",
                    "octalNotation": 74,
                    "piecesAttackingThisSquare": [
                        54,
                        63
                    ]
                },
                "75": {
                    "algebraicNotation": "f1",
                    "octalNotation": 75,
                    "piecesAttackingThisSquare": []
                },
                "76": {
                    "algebraicNotation": "g1",
                    "octalNotation": 76,
                    "piecesAttackingThisSquare": []
                },
                "77": {
                    "algebraicNotation": "h1",
                    "octalNotation": 77,
                    "piecesAttackingThisSquare": []
                }
            }

            expect(isAbandonmentMove(boardState, "dark")).toEqual(false);
        });

        test("can detect abandoning moves", function() {
            const boardState = {
                "0": {
                    "algebraicNotation": "a8",
                    "octalNotation": 0,
                    "piecesAttackingThisSquare": []
                },
                "1": {
                    "algebraicNotation": "b8",
                    "octalNotation": 1,
                    "piecesAttackingThisSquare": []
                },
                "2": {
                    "algebraicNotation": "c8",
                    "octalNotation": 2,
                    "piecesAttackingThisSquare": []
                },
                "3": {
                    "algebraicNotation": "d8",
                    "octalNotation": 3,
                    "piecesAttackingThisSquare": []
                },
                "4": {
                    "algebraicNotation": "e8",
                    "octalNotation": 4,
                    "piecesAttackingThisSquare": [
                        5
                    ]
                },
                "5": {
                    "algebraicNotation": "f8",
                    "octalNotation": 5,
                    "piecesAttackingThisSquare": [
                        55
                    ],
                    "piece": {
                        "hasMoved": true,
                        "legalMoves": [
                            6,
                            16,
                            14,
                            4
                        ],
                        "pieceColor": "dark",
                        "pieceName": "king"
                    }
                },
                "6": {
                    "algebraicNotation": "g8",
                    "octalNotation": 6,
                    "piecesAttackingThisSquare": [
                        5
                    ]
                },
                "7": {
                    "algebraicNotation": "h8",
                    "octalNotation": 7,
                    "piecesAttackingThisSquare": []
                },
                "10": {
                    "algebraicNotation": "a7",
                    "octalNotation": 10,
                    "piecesAttackingThisSquare": []
                },
                "11": {
                    "algebraicNotation": "b7",
                    "octalNotation": 11,
                    "piecesAttackingThisSquare": []
                },
                "12": {
                    "algebraicNotation": "c7",
                    "octalNotation": 12,
                    "piecesAttackingThisSquare": []
                },
                "13": {
                    "algebraicNotation": "d7",
                    "octalNotation": 13,
                    "piecesAttackingThisSquare": []
                },
                "14": {
                    "algebraicNotation": "e7",
                    "octalNotation": 14,
                    "piecesAttackingThisSquare": [
                        5
                    ]
                },
                "15": {
                    "algebraicNotation": "f7",
                    "octalNotation": 15,
                    "piecesAttackingThisSquare": [
                        55
                    ]
                },
                "16": {
                    "algebraicNotation": "g7",
                    "octalNotation": 16,
                    "piecesAttackingThisSquare": [
                        5
                    ]
                },
                "17": {
                    "algebraicNotation": "h7",
                    "octalNotation": 17,
                    "piecesAttackingThisSquare": []
                },
                "20": {
                    "algebraicNotation": "a6",
                    "octalNotation": 20,
                    "piecesAttackingThisSquare": []
                },
                "21": {
                    "algebraicNotation": "b6",
                    "octalNotation": 21,
                    "piecesAttackingThisSquare": []
                },
                "22": {
                    "algebraicNotation": "c6",
                    "octalNotation": 22,
                    "piecesAttackingThisSquare": []
                },
                "23": {
                    "algebraicNotation": "d6",
                    "octalNotation": 23,
                    "piecesAttackingThisSquare": []
                },
                "24": {
                    "algebraicNotation": "e6",
                    "octalNotation": 24,
                    "piece": {
                        "hasMoved": false,
                        "legalMoves": [
                            25
                        ],
                        "pieceColor": "dark",
                        "pieceName": "rook"
                    },
                    "piecesAttackingThisSquare": []
                },
                "25": {
                    "algebraicNotation": "f6",
                    "octalNotation": 25,
                    "piecesAttackingThisSquare": [
                        24,
                        55
                    ]
                },
                "26": {
                    "algebraicNotation": "g6",
                    "octalNotation": 26,
                    "piecesAttackingThisSquare": []
                },
                "27": {
                    "algebraicNotation": "h6",
                    "octalNotation": 27,
                    "piecesAttackingThisSquare": []
                },
                "30": {
                    "algebraicNotation": "a5",
                    "octalNotation": 30,
                    "piecesAttackingThisSquare": []
                },
                "31": {
                    "algebraicNotation": "b5",
                    "octalNotation": 31,
                    "piecesAttackingThisSquare": []
                },
                "32": {
                    "algebraicNotation": "c5",
                    "octalNotation": 32,
                    "piecesAttackingThisSquare": []
                },
                "33": {
                    "algebraicNotation": "d5",
                    "octalNotation": 33,
                    "piecesAttackingThisSquare": []
                },
                "34": {
                    "algebraicNotation": "e5",
                    "octalNotation": 34,
                    "piecesAttackingThisSquare": []
                },
                "35": {
                    "algebraicNotation": "f5",
                    "octalNotation": 35,
                    "piecesAttackingThisSquare": [
                        55
                    ]
                },
                "36": {
                    "algebraicNotation": "g5",
                    "octalNotation": 36,
                    "piecesAttackingThisSquare": []
                },
                "37": {
                    "algebraicNotation": "h5",
                    "octalNotation": 37,
                    "piecesAttackingThisSquare": []
                },
                "40": {
                    "algebraicNotation": "a4",
                    "octalNotation": 40,
                    "piecesAttackingThisSquare": []
                },
                "41": {
                    "algebraicNotation": "b4",
                    "octalNotation": 41,
                    "piecesAttackingThisSquare": []
                },
                "42": {
                    "algebraicNotation": "c4",
                    "octalNotation": 42,
                    "piecesAttackingThisSquare": []
                },
                "43": {
                    "algebraicNotation": "d4",
                    "octalNotation": 43,
                    "piecesAttackingThisSquare": []
                },
                "44": {
                    "algebraicNotation": "e4",
                    "octalNotation": 44,
                    "piecesAttackingThisSquare": []
                },
                "45": {
                    "algebraicNotation": "f4",
                    "octalNotation": 45,
                    "piecesAttackingThisSquare": [
                        55
                    ]
                },
                "46": {
                    "algebraicNotation": "g4",
                    "octalNotation": 46,
                    "piecesAttackingThisSquare": []
                },
                "47": {
                    "algebraicNotation": "h4",
                    "octalNotation": 47,
                    "piecesAttackingThisSquare": []
                },
                "50": {
                    "algebraicNotation": "a3",
                    "octalNotation": 50,
                    "piecesAttackingThisSquare": [
                        55
                    ]
                },
                "51": {
                    "algebraicNotation": "b3",
                    "octalNotation": 51,
                    "piecesAttackingThisSquare": [
                        55
                    ]
                },
                "52": {
                    "algebraicNotation": "c3",
                    "octalNotation": 52,
                    "piecesAttackingThisSquare": [
                        55
                    ]
                },
                "53": {
                    "algebraicNotation": "d3",
                    "octalNotation": 53,
                    "piecesAttackingThisSquare": [
                        55
                    ]
                },
                "54": {
                    "algebraicNotation": "e3",
                    "octalNotation": 54,
                    "piecesAttackingThisSquare": [
                        55,
                        65
                    ]
                },
                "55": {
                    "algebraicNotation": "f3",
                    "octalNotation": 55,
                    "piecesAttackingThisSquare": [
                        65
                    ],
                    "piece": {
                        "hasMoved": true,
                        "legalMoves": [
                            45,
                            35,
                            25,
                            15,
                            5,
                            56,
                            57,
                            54,
                            53,
                            52,
                            51,
                            50
                        ],
                        "pieceColor": "light",
                        "pieceName": "rook"
                    }
                },
                "56": {
                    "algebraicNotation": "g3",
                    "octalNotation": 56,
                    "piecesAttackingThisSquare": [
                        55,
                        65
                    ]
                },
                "57": {
                    "algebraicNotation": "h3",
                    "octalNotation": 57,
                    "piecesAttackingThisSquare": [
                        55
                    ]
                },
                "60": {
                    "algebraicNotation": "a2",
                    "octalNotation": 60,
                    "piecesAttackingThisSquare": []
                },
                "61": {
                    "algebraicNotation": "b2",
                    "octalNotation": 61,
                    "piecesAttackingThisSquare": []
                },
                "62": {
                    "algebraicNotation": "c2",
                    "octalNotation": 62,
                    "piecesAttackingThisSquare": []
                },
                "63": {
                    "algebraicNotation": "d2",
                    "octalNotation": 63,
                    "piecesAttackingThisSquare": []
                },
                "64": {
                    "algebraicNotation": "e2",
                    "octalNotation": 64,
                    "piecesAttackingThisSquare": [
                        65
                    ]
                },
                "65": {
                    "algebraicNotation": "f2",
                    "octalNotation": 65,
                    "piecesAttackingThisSquare": [
                        55
                    ],
                    "piece": {
                        "hasMoved": true,
                        "legalMoves": [
                            56,
                            66,
                            76,
                            75
                        ],
                        "pieceColor": "light",
                        "pieceName": "king"
                    }
                },
                "66": {
                    "algebraicNotation": "g2",
                    "octalNotation": 66,
                    "piecesAttackingThisSquare": [
                        65
                    ]
                },
                "67": {
                    "algebraicNotation": "h2",
                    "octalNotation": 67,
                    "piecesAttackingThisSquare": []
                },
                "70": {
                    "algebraicNotation": "a1",
                    "octalNotation": 70,
                    "piecesAttackingThisSquare": []
                },
                "71": {
                    "algebraicNotation": "b1",
                    "octalNotation": 71,
                    "piecesAttackingThisSquare": []
                },
                "72": {
                    "algebraicNotation": "c1",
                    "octalNotation": 72,
                    "piecesAttackingThisSquare": []
                },
                "73": {
                    "algebraicNotation": "d1",
                    "octalNotation": 73,
                    "piecesAttackingThisSquare": []
                },
                "74": {
                    "algebraicNotation": "e1",
                    "octalNotation": 74,
                    "piecesAttackingThisSquare": [
                        65
                    ]
                },
                "75": {
                    "algebraicNotation": "f1",
                    "octalNotation": 75,
                    "piecesAttackingThisSquare": [
                        65
                    ]
                },
                "76": {
                    "algebraicNotation": "g1",
                    "octalNotation": 76,
                    "piecesAttackingThisSquare": [
                        65
                    ]
                },
                "77": {
                    "algebraicNotation": "h1",
                    "octalNotation": 77,
                    "piecesAttackingThisSquare": []
                }
            }

            expect(isAbandonmentMove(boardState, "dark")).toEqual(true);
        });

        test("can detect abandoning moves even if move checks opposition king", function() {
            const boardState = {
                "0": {
                    "algebraicNotation": "a8",
                    "octalNotation": 0,
                    "piecesAttackingThisSquare": []
                },
                "1": {
                    "algebraicNotation": "b8",
                    "octalNotation": 1,
                    "piecesAttackingThisSquare": []
                },
                "2": {
                    "algebraicNotation": "c8",
                    "octalNotation": 2,
                    "piecesAttackingThisSquare": []
                },
                "3": {
                    "algebraicNotation": "d8",
                    "octalNotation": 3,
                    "piecesAttackingThisSquare": [
                        4,
                        23
                    ]
                },
                "4": {
                    "algebraicNotation": "e8",
                    "octalNotation": 4,
                    "piece": {
                        "hasMoved": false,
                        "legalMoves": [
                            5,
                            15,
                            14,
                            13,
                            3
                        ],
                        "pieceColor": "dark",
                        "pieceName": "king"
                    },
                    "piecesAttackingThisSquare": [
                        54
                    ]
                },
                "5": {
                    "algebraicNotation": "f8",
                    "octalNotation": 5,
                    "piecesAttackingThisSquare": [
                        4
                    ]
                },
                "6": {
                    "algebraicNotation": "g8",
                    "octalNotation": 6,
                    "piecesAttackingThisSquare": []
                },
                "7": {
                    "algebraicNotation": "h8",
                    "octalNotation": 7,
                    "piecesAttackingThisSquare": []
                },
                "10": {
                    "algebraicNotation": "a7",
                    "octalNotation": 10,
                    "piecesAttackingThisSquare": []
                },
                "11": {
                    "algebraicNotation": "b7",
                    "octalNotation": 11,
                    "piecesAttackingThisSquare": []
                },
                "12": {
                    "algebraicNotation": "c7",
                    "octalNotation": 12,
                    "piecesAttackingThisSquare": []
                },
                "13": {
                    "algebraicNotation": "d7",
                    "octalNotation": 13,
                    "piecesAttackingThisSquare": [
                        4,
                        23
                    ]
                },
                "14": {
                    "algebraicNotation": "e7",
                    "octalNotation": 14,
                    "piecesAttackingThisSquare": [
                        4,
                        54
                    ]
                },
                "15": {
                    "algebraicNotation": "f7",
                    "octalNotation": 15,
                    "piecesAttackingThisSquare": [
                        4
                    ]
                },
                "16": {
                    "algebraicNotation": "g7",
                    "octalNotation": 16,
                    "piecesAttackingThisSquare": []
                },
                "17": {
                    "algebraicNotation": "h7",
                    "octalNotation": 17,
                    "piecesAttackingThisSquare": []
                },
                "20": {
                    "algebraicNotation": "a6",
                    "octalNotation": 20,
                    "piecesAttackingThisSquare": [
                        23
                    ]
                },
                "21": {
                    "algebraicNotation": "b6",
                    "octalNotation": 21,
                    "piecesAttackingThisSquare": [
                        23
                    ]
                },
                "22": {
                    "algebraicNotation": "c6",
                    "octalNotation": 22,
                    "piecesAttackingThisSquare": [
                        23
                    ]
                },
                "23": {
                    "algebraicNotation": "d6",
                    "octalNotation": 23,
                    "piecesAttackingThisSquare": [],
                    "piece": {
                        "hasMoved": true,
                        "legalMoves": [
                            13,
                            3,
                            24,
                            33,
                            43,
                            53
                        ],
                        "pieceColor": "dark",
                        "pieceName": "rook"
                    }
                },
                "24": {
                    "algebraicNotation": "e6",
                    "octalNotation": 24,
                    "piecesAttackingThisSquare": [
                        23,
                        54
                    ]
                },
                "25": {
                    "algebraicNotation": "f6",
                    "octalNotation": 25,
                    "piecesAttackingThisSquare": [
                        23
                    ]
                },
                "26": {
                    "algebraicNotation": "g6",
                    "octalNotation": 26,
                    "piecesAttackingThisSquare": [
                        23
                    ]
                },
                "27": {
                    "algebraicNotation": "h6",
                    "octalNotation": 27,
                    "piecesAttackingThisSquare": [
                        23
                    ]
                },
                "30": {
                    "algebraicNotation": "a5",
                    "octalNotation": 30,
                    "piecesAttackingThisSquare": []
                },
                "31": {
                    "algebraicNotation": "b5",
                    "octalNotation": 31,
                    "piecesAttackingThisSquare": []
                },
                "32": {
                    "algebraicNotation": "c5",
                    "octalNotation": 32,
                    "piecesAttackingThisSquare": []
                },
                "33": {
                    "algebraicNotation": "d5",
                    "octalNotation": 33,
                    "piecesAttackingThisSquare": [
                        23
                    ]
                },
                "34": {
                    "algebraicNotation": "e5",
                    "octalNotation": 34,
                    "piecesAttackingThisSquare": [
                        54
                    ]
                },
                "35": {
                    "algebraicNotation": "f5",
                    "octalNotation": 35,
                    "piecesAttackingThisSquare": []
                },
                "36": {
                    "algebraicNotation": "g5",
                    "octalNotation": 36,
                    "piecesAttackingThisSquare": []
                },
                "37": {
                    "algebraicNotation": "h5",
                    "octalNotation": 37,
                    "piecesAttackingThisSquare": []
                },
                "40": {
                    "algebraicNotation": "a4",
                    "octalNotation": 40,
                    "piecesAttackingThisSquare": []
                },
                "41": {
                    "algebraicNotation": "b4",
                    "octalNotation": 41,
                    "piecesAttackingThisSquare": []
                },
                "42": {
                    "algebraicNotation": "c4",
                    "octalNotation": 42,
                    "piecesAttackingThisSquare": []
                },
                "43": {
                    "algebraicNotation": "d4",
                    "octalNotation": 43,
                    "piecesAttackingThisSquare": [
                        23
                    ]
                },
                "44": {
                    "algebraicNotation": "e4",
                    "octalNotation": 44,
                    "piecesAttackingThisSquare": [
                        54
                    ]
                },
                "45": {
                    "algebraicNotation": "f4",
                    "octalNotation": 45,
                    "piecesAttackingThisSquare": []
                },
                "46": {
                    "algebraicNotation": "g4",
                    "octalNotation": 46,
                    "piecesAttackingThisSquare": []
                },
                "47": {
                    "algebraicNotation": "h4",
                    "octalNotation": 47,
                    "piecesAttackingThisSquare": []
                },
                "50": {
                    "algebraicNotation": "a3",
                    "octalNotation": 50,
                    "piecesAttackingThisSquare": [
                        54
                    ]
                },
                "51": {
                    "algebraicNotation": "b3",
                    "octalNotation": 51,
                    "piecesAttackingThisSquare": [
                        54
                    ]
                },
                "52": {
                    "algebraicNotation": "c3",
                    "octalNotation": 52,
                    "piecesAttackingThisSquare": [
                        54,
                        63
                    ]
                },
                "53": {
                    "algebraicNotation": "d3",
                    "octalNotation": 53,
                    "piecesAttackingThisSquare": [
                        23,
                        54,
                        63
                    ]
                },
                "54": {
                    "algebraicNotation": "e3",
                    "octalNotation": 54,
                    "piece": {
                        "hasMoved": false,
                        "legalMoves": [
                            53
                        ],
                        "pieceColor": "light",
                        "pieceName": "rook"
                    },
                    "piecesAttackingThisSquare": [
                        63
                    ]
                },
                "55": {
                    "algebraicNotation": "f3",
                    "octalNotation": 55,
                    "piecesAttackingThisSquare": [
                        54
                    ]
                },
                "56": {
                    "algebraicNotation": "g3",
                    "octalNotation": 56,
                    "piecesAttackingThisSquare": [
                        54
                    ]
                },
                "57": {
                    "algebraicNotation": "h3",
                    "octalNotation": 57,
                    "piecesAttackingThisSquare": [
                        54
                    ]
                },
                "60": {
                    "algebraicNotation": "a2",
                    "octalNotation": 60,
                    "piecesAttackingThisSquare": []
                },
                "61": {
                    "algebraicNotation": "b2",
                    "octalNotation": 61,
                    "piecesAttackingThisSquare": []
                },
                "62": {
                    "algebraicNotation": "c2",
                    "octalNotation": 62,
                    "piecesAttackingThisSquare": [
                        63
                    ]
                },
                "63": {
                    "algebraicNotation": "d2",
                    "octalNotation": 63,
                    "piecesAttackingThisSquare": [
                        23
                    ],
                    "piece": {
                        "hasMoved": true,
                        "legalMoves": [
                            64,
                            74,
                            72,
                            62,
                            52
                        ],
                        "pieceColor": "light",
                        "pieceName": "king"
                    }
                },
                "64": {
                    "algebraicNotation": "e2",
                    "octalNotation": 64,
                    "piecesAttackingThisSquare": [
                        54,
                        63
                    ]
                },
                "65": {
                    "algebraicNotation": "f2",
                    "octalNotation": 65,
                    "piecesAttackingThisSquare": []
                },
                "66": {
                    "algebraicNotation": "g2",
                    "octalNotation": 66,
                    "piecesAttackingThisSquare": []
                },
                "67": {
                    "algebraicNotation": "h2",
                    "octalNotation": 67,
                    "piecesAttackingThisSquare": []
                },
                "70": {
                    "algebraicNotation": "a1",
                    "octalNotation": 70,
                    "piecesAttackingThisSquare": []
                },
                "71": {
                    "algebraicNotation": "b1",
                    "octalNotation": 71,
                    "piecesAttackingThisSquare": []
                },
                "72": {
                    "algebraicNotation": "c1",
                    "octalNotation": 72,
                    "piecesAttackingThisSquare": [
                        63
                    ]
                },
                "73": {
                    "algebraicNotation": "d1",
                    "octalNotation": 73,
                    "piecesAttackingThisSquare": [
                        63
                    ]
                },
                "74": {
                    "algebraicNotation": "e1",
                    "octalNotation": 74,
                    "piecesAttackingThisSquare": [
                        54,
                        63
                    ]
                },
                "75": {
                    "algebraicNotation": "f1",
                    "octalNotation": 75,
                    "piecesAttackingThisSquare": []
                },
                "76": {
                    "algebraicNotation": "g1",
                    "octalNotation": 76,
                    "piecesAttackingThisSquare": []
                },
                "77": {
                    "algebraicNotation": "h1",
                    "octalNotation": 77,
                    "piecesAttackingThisSquare": []
                }
            }

            expect(isAbandonmentMove(boardState, "dark")).toEqual(true);
        });
    })
})