# Board State

## Create Board State

When the `boardState` is initialized, the `createBoardState()` function is called. Currently, the only "starting position" is the standard starting position in chess. This has the potential to be customizable, for instance users who may want to start with a particular board position or a Chess960 starting position - however for now, the standard start is the only option.

### `createBoardState()`

This function does two things:

1. initializes the `boardState` via `initializeBoardState()`
2. calculates the moves each `piece` in the `boardState` can make, subcategories of these moves can be defined as:
    - **legal** moves (which translate to a `piece`(s) `legalMoves`) - calculated via `calculateLegalMoves()`
    - **all** moves (which translate to a `square`(s) `piecesAttackingThisSquare`) - calculated via `calculateAllMoves()`

_Note: there is currently no requirement to calculate "checking" or "abandonment" `move`(s) at this point as there are none in the initial `boardState` in a standard position._

Here's an example of a `square` if it has a `piece`:

```js
"1": {
    "algebraicNotation": "b8",
    "octalNotation": 1,
    "piece": {
        "hasMoved": false,
        "legalMoves": [
            22,
            20
        ],
        "pieceColor": "dark",
        "pieceName": "knight"
    },
    "piecesAttackingThisSquare": [
        0
    ]
},
```

Here's an example of a `square` if it has no `piece`:

```js
"20": {
    "algebraicNotation": "a6",
    "octalNotation": 20,
    "piecesAttackingThisSquare": [
        1,
        2,
        11
    ]
},
```

Here's what the initial `boardState` will look like:

```js
{
    "0": {
        "algebraicNotation": "a8",
        "octalNotation": 0,
        "piece": {
            "hasMoved": false,
            "legalMoves": [],
            "pieceColor": "dark",
            "pieceName": "rook"
        },
        "piecesAttackingThisSquare": []
    },
    "1": {
        "algebraicNotation": "b8",
        "octalNotation": 1,
        "piece": {
            "hasMoved": false,
            "legalMoves": [
                22,
                20
            ],
            "pieceColor": "dark",
            "pieceName": "knight"
        },
        "piecesAttackingThisSquare": [
            0
        ]
    },
    "2": {
        "algebraicNotation": "c8",
        "octalNotation": 2,
        "piece": {
            "hasMoved": false,
            "legalMoves": [],
            "pieceColor": "dark",
            "pieceName": "bishop"
        },
        "piecesAttackingThisSquare": [
            3
        ]
    },
    "3": {
        "algebraicNotation": "d8",
        "octalNotation": 3,
        "piece": {
            "hasMoved": false,
            "legalMoves": [],
            "pieceColor": "dark",
            "pieceName": "queen"
        },
        "piecesAttackingThisSquare": [
            4
        ]
    },
    "4": {
        "algebraicNotation": "e8",
        "octalNotation": 4,
        "piece": {
            "hasMoved": false,
            "legalMoves": [],
            "pieceColor": "dark",
            "pieceName": "king"
        },
        "piecesAttackingThisSquare": [
            3
        ]
    },
    "5": {
        "algebraicNotation": "f8",
        "octalNotation": 5,
        "piece": {
            "hasMoved": false,
            "legalMoves": [],
            "pieceColor": "dark",
            "pieceName": "bishop"
        },
        "piecesAttackingThisSquare": [
            4
        ]
    },
    "6": {
        "algebraicNotation": "g8",
        "octalNotation": 6,
        "piece": {
            "hasMoved": false,
            "legalMoves": [
                27,
                25
            ],
            "pieceColor": "dark",
            "pieceName": "knight"
        },
        "piecesAttackingThisSquare": [
            7
        ]
    },
    "7": {
        "algebraicNotation": "h8",
        "octalNotation": 7,
        "piece": {
            "hasMoved": false,
            "legalMoves": [],
            "pieceColor": "dark",
            "pieceName": "rook"
        },
        "piecesAttackingThisSquare": []
    },
    "10": {
        "algebraicNotation": "a7",
        "octalNotation": 10,
        "piece": {
            "hasMoved": false,
            "legalMoves": [
                20,
                30
            ],
            "pieceColor": "dark",
            "pieceName": "pawn"
        },
        "piecesAttackingThisSquare": [
            0
        ]
    },
    "11": {
        "algebraicNotation": "b7",
        "octalNotation": 11,
        "piece": {
            "hasMoved": false,
            "legalMoves": [
                21,
                31
            ],
            "pieceColor": "dark",
            "pieceName": "pawn"
        },
        "piecesAttackingThisSquare": [
            2
        ]
    },
    "12": {
        "algebraicNotation": "c7",
        "octalNotation": 12,
        "piece": {
            "hasMoved": false,
            "legalMoves": [
                22,
                32
            ],
            "pieceColor": "dark",
            "pieceName": "pawn"
        },
        "piecesAttackingThisSquare": [
            3
        ]
    },
    "13": {
        "algebraicNotation": "d7",
        "octalNotation": 13,
        "piece": {
            "hasMoved": false,
            "legalMoves": [
                23,
                33
            ],
            "pieceColor": "dark",
            "pieceName": "pawn"
        },
        "piecesAttackingThisSquare": [
            1,
            2,
            3,
            4
        ]
    },
    "14": {
        "algebraicNotation": "e7",
        "octalNotation": 14,
        "piece": {
            "hasMoved": false,
            "legalMoves": [
                24,
                34
            ],
            "pieceColor": "dark",
            "pieceName": "pawn"
        },
        "piecesAttackingThisSquare": [
            3,
            4,
            5,
            6
        ]
    },
    "15": {
        "algebraicNotation": "f7",
        "octalNotation": 15,
        "piece": {
            "hasMoved": false,
            "legalMoves": [
                25,
                35
            ],
            "pieceColor": "dark",
            "pieceName": "pawn"
        },
        "piecesAttackingThisSquare": [
            4
        ]
    },
    "16": {
        "algebraicNotation": "g7",
        "octalNotation": 16,
        "piece": {
            "hasMoved": false,
            "legalMoves": [
                26,
                36
            ],
            "pieceColor": "dark",
            "pieceName": "pawn"
        },
        "piecesAttackingThisSquare": [
            5
        ]
    },
    "17": {
        "algebraicNotation": "h7",
        "octalNotation": 17,
        "piece": {
            "hasMoved": false,
            "legalMoves": [
                27,
                37
            ],
            "pieceColor": "dark",
            "pieceName": "pawn"
        },
        "piecesAttackingThisSquare": [
            7
        ]
    },
    "20": {
        "algebraicNotation": "a6",
        "octalNotation": 20,
        "piecesAttackingThisSquare": [
            1,
            2,
            11
        ]
    },
    "21": {
        "algebraicNotation": "b6",
        "octalNotation": 21,
        "piecesAttackingThisSquare": [
            3,
            10,
            12
        ]
    },
    "22": {
        "algebraicNotation": "c6",
        "octalNotation": 22,
        "piecesAttackingThisSquare": [
            1,
            11,
            13
        ]
    },
    "23": {
        "algebraicNotation": "d6",
        "octalNotation": 23,
        "piecesAttackingThisSquare": [
            5,
            12,
            14
        ]
    },
    "24": {
        "algebraicNotation": "e6",
        "octalNotation": 24,
        "piecesAttackingThisSquare": [
            2,
            13,
            15
        ]
    },
    "25": {
        "algebraicNotation": "f6",
        "octalNotation": 25,
        "piecesAttackingThisSquare": [
            3,
            6,
            14,
            16
        ]
    },
    "26": {
        "algebraicNotation": "g6",
        "octalNotation": 26,
        "piecesAttackingThisSquare": [
            15,
            17
        ]
    },
    "27": {
        "algebraicNotation": "h6",
        "octalNotation": 27,
        "piecesAttackingThisSquare": [
            5,
            6,
            16
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
        "piecesAttackingThisSquare": []
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
        "piecesAttackingThisSquare": []
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
            61,
            71,
            72
        ]
    },
    "51": {
        "algebraicNotation": "b3",
        "octalNotation": 51,
        "piecesAttackingThisSquare": [
            60,
            62,
            73
        ]
    },
    "52": {
        "algebraicNotation": "c3",
        "octalNotation": 52,
        "piecesAttackingThisSquare": [
            61,
            63,
            71
        ]
    },
    "53": {
        "algebraicNotation": "d3",
        "octalNotation": 53,
        "piecesAttackingThisSquare": [
            62,
            64,
            75
        ]
    },
    "54": {
        "algebraicNotation": "e3",
        "octalNotation": 54,
        "piecesAttackingThisSquare": [
            63,
            65,
            72
        ]
    },
    "55": {
        "algebraicNotation": "f3",
        "octalNotation": 55,
        "piecesAttackingThisSquare": [
            64,
            66,
            73,
            76
        ]
    },
    "56": {
        "algebraicNotation": "g3",
        "octalNotation": 56,
        "piecesAttackingThisSquare": [
            65,
            67
        ]
    },
    "57": {
        "algebraicNotation": "h3",
        "octalNotation": 57,
        "piecesAttackingThisSquare": [
            66,
            75,
            76
        ]
    },
    "60": {
        "algebraicNotation": "a2",
        "octalNotation": 60,
        "piece": {
            "hasMoved": false,
            "legalMoves": [
                50,
                40
            ],
            "pieceColor": "light",
            "pieceName": "pawn"
        },
        "piecesAttackingThisSquare": [
            70
        ]
    },
    "61": {
        "algebraicNotation": "b2",
        "octalNotation": 61,
        "piece": {
            "hasMoved": false,
            "legalMoves": [
                51,
                41
            ],
            "pieceColor": "light",
            "pieceName": "pawn"
        },
        "piecesAttackingThisSquare": [
            72
        ]
    },
    "62": {
        "algebraicNotation": "c2",
        "octalNotation": 62,
        "piece": {
            "hasMoved": false,
            "legalMoves": [
                52,
                42
            ],
            "pieceColor": "light",
            "pieceName": "pawn"
        },
        "piecesAttackingThisSquare": [
            73
        ]
    },
    "63": {
        "algebraicNotation": "d2",
        "octalNotation": 63,
        "piece": {
            "hasMoved": false,
            "legalMoves": [
                53,
                43
            ],
            "pieceColor": "light",
            "pieceName": "pawn"
        },
        "piecesAttackingThisSquare": [
            71,
            72,
            73,
            74
        ]
    },
    "64": {
        "algebraicNotation": "e2",
        "octalNotation": 64,
        "piece": {
            "hasMoved": false,
            "legalMoves": [
                54,
                44
            ],
            "pieceColor": "light",
            "pieceName": "pawn"
        },
        "piecesAttackingThisSquare": [
            73,
            74,
            75,
            76
        ]
    },
    "65": {
        "algebraicNotation": "f2",
        "octalNotation": 65,
        "piece": {
            "hasMoved": false,
            "legalMoves": [
                55,
                45
            ],
            "pieceColor": "light",
            "pieceName": "pawn"
        },
        "piecesAttackingThisSquare": [
            74
        ]
    },
    "66": {
        "algebraicNotation": "g2",
        "octalNotation": 66,
        "piece": {
            "hasMoved": false,
            "legalMoves": [
                56,
                46
            ],
            "pieceColor": "light",
            "pieceName": "pawn"
        },
        "piecesAttackingThisSquare": [
            75
        ]
    },
    "67": {
        "algebraicNotation": "h2",
        "octalNotation": 67,
        "piece": {
            "hasMoved": false,
            "legalMoves": [
                57,
                47
            ],
            "pieceColor": "light",
            "pieceName": "pawn"
        },
        "piecesAttackingThisSquare": [
            77
        ]
    },
    "70": {
        "algebraicNotation": "a1",
        "octalNotation": 70,
        "piece": {
            "hasMoved": false,
            "legalMoves": [],
            "pieceColor": "light",
            "pieceName": "rook"
        },
        "piecesAttackingThisSquare": []
    },
    "71": {
        "algebraicNotation": "b1",
        "octalNotation": 71,
        "piece": {
            "hasMoved": false,
            "legalMoves": [
                50,
                52
            ],
            "pieceColor": "light",
            "pieceName": "knight"
        },
        "piecesAttackingThisSquare": [
            70
        ]
    },
    "72": {
        "algebraicNotation": "c1",
        "octalNotation": 72,
        "piece": {
            "hasMoved": false,
            "legalMoves": [],
            "pieceColor": "light",
            "pieceName": "bishop"
        },
        "piecesAttackingThisSquare": [
            73
        ]
    },
    "73": {
        "algebraicNotation": "d1",
        "octalNotation": 73,
        "piece": {
            "hasMoved": false,
            "legalMoves": [],
            "pieceColor": "light",
            "pieceName": "queen"
        },
        "piecesAttackingThisSquare": [
            74
        ]
    },
    "74": {
        "algebraicNotation": "e1",
        "octalNotation": 74,
        "piece": {
            "hasMoved": false,
            "legalMoves": [],
            "pieceColor": "light",
            "pieceName": "king"
        },
        "piecesAttackingThisSquare": [
            73
        ]
    },
    "75": {
        "algebraicNotation": "f1",
        "octalNotation": 75,
        "piece": {
            "hasMoved": false,
            "legalMoves": [],
            "pieceColor": "light",
            "pieceName": "bishop"
        },
        "piecesAttackingThisSquare": [
            74
        ]
    },
    "76": {
        "algebraicNotation": "g1",
        "octalNotation": 76,
        "piece": {
            "hasMoved": false,
            "legalMoves": [
                55,
                57
            ],
            "pieceColor": "light",
            "pieceName": "knight"
        },
        "piecesAttackingThisSquare": [
            77
        ]
    },
    "77": {
        "algebraicNotation": "h1",
        "octalNotation": 77,
        "piece": {
            "hasMoved": false,
            "legalMoves": [],
            "pieceColor": "light",
            "pieceName": "rook"
        },
        "piecesAttackingThisSquare": []
    }
}
```
