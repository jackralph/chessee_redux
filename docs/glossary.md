# Glossary of terms

## Abandonment Move

A move which leaves the king in check

## All Moves

`square`(s) that a `piece` attacks/defends, but does **not** necessarily mean a `piece` can move there, for instance a `"pawn"` can defend a `square` diagonal from itself, this would be marked regardless of whether the `"pawn"` can **legally** move to that square or not as it "defends" that `square` (used for calculating `squareDominance`)

## Continual Piece

A continual `piece` is one which can continue attacking through one of it's own pieces (as a form of backup), examples of continual pieces are:

- diagonal
  - `"bishop"`
  - `"queen"`
- straight
  - `"queen"`
  - `"rook"`

## Legal Moves

move(s) that a `piece` can make unless it lands on their own `piece` or off the `board`
