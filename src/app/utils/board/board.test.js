import { calculateMovesForInitialBoardState, createBoardState, initializeBoardState } from './board.js';
import { initializeTestBoardState, initializeTestBoardStateWithMovesCalculated } from '../../../test/data/board_state.js'

describe("board.js", function() {
    describe("calculateMovesForInitialBoardState()", function() {
        test("calculates moves for initial board state", function() {
            let initialBoardStatePreset = initializeTestBoardState();
            let expectedBoardState = initializeTestBoardStateWithMovesCalculated();

            let actualBoardState = calculateMovesForInitialBoardState(initialBoardStatePreset);

            expect(actualBoardState).toEqual(expectedBoardState);
        })
    })
    
    describe("createBoardState()", function() {
        test("initializes board state and calculates moves for initial board state", function() {
            let expectedBoardState = initializeTestBoardStateWithMovesCalculated();

            let actualBoardState = createBoardState();

            expect(actualBoardState).toEqual(expectedBoardState);
        })
    })
    
    describe("initializeBoardState()", function() {
        test("initializes board state", function() {
            let expectedBoardState = initializeTestBoardState();

            let actualBoardState = initializeBoardState();

            expect(actualBoardState).toEqual(expectedBoardState);
        })
    })
})