# Update Board State

When the `boardState` is updated, the `updateBoardState()` function is called. This takes 3 arguments, the `boardState`, the `originSquare` (the `square` of the `piece` being moved) and the `targetSquare` (the `square` the `piece` is moving to). Updating the `boardState` requires a few steps, each which modify a copy of the `boardState`, modifying and altering it to build a picture of the state of the current position to be used within the view.

The following steps are taken to achieve this, and requires knowledge of the project terms, outlined in the [glossary](glossary.md):

1. Moving the `originSquare` state to the `targetSquare` state. This step simply replaces the `targetSquare` state with the `originSquare` state, the `originSquare` state is then "reverted" back to it's normal `piece`-less state.

2. The **legal** move(s) are then updated, using the `updateLegalMoves()` function for each `square` that contains a `piece`. This step however, does not take into account the following:
    - **Abandonment** move(s)
    - Only "captures", "blocks" or `"king"` move(s) following a check

3. The **all** moves(s) are then updated, using the `updateAllMoves()` function which works as the above however calculates what `square`(s) are being attacking by what `piece`(s). It follows that this does not take into account the following also:
    - **Abandonment** move(s)
    - Only "captures", "blocks" or `"king"` move(s) following a check

4. Here is where **abandonment** move(s) are filtered via the `filterAbandonmentLegalMoves()` function. The reason for this being a separate step is, **abandonment** moves are checked by taking each `legalMove` of a `piece` and "playing" that move to check if it leaves the king in check. If it does, then it is filtered from the `legalMove`(s) of the `piece`. This happens for every `piece`, for every `legalMove`.

5. Naturally, fitlering **all** abandonment move(s) is next, and uses the `filterAbandonmentAllMoves()` function. The is to `filterAbandonmentLegalMoves()` as `updateAllMoves()` is to `updateLegalMoves()`, and it cycles through each `square`, gets the `piece` that is attacking the `square` and then plays the move to see if it leaves the side-that-played's `"king"` in check. If it does, it filters out that `piece` from that `square`.

6. _(only if `sideInCheck()`)_ Once in check, **legal** moves are filtered right down to "captures", "blocks" or `"king"` move(s). This is done via `updateLegalMovesAfterCheck()`, using the same pattern used in **2.**.

7. _(only if `sideInCheck()`)_ `legalMoves` now only contain "captures", "blocks" or `"king"` move(s). However these `piece`(s) are still technically defending the `square`(s) they can move to under these restrictions, therefore the `piecesAttackingThisSquare` for each `square` is kept if the defending `piece` can move there.