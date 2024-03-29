import pencilCursor from "../assets/pencil-cursor.cur"

export default function Cell({ id, sign, handleClick, isGameOver }) {
  function getCellStyle(gameOver) {
    const X_COLOR = "var(--color-pencil-blue)"
    const O_COLOR = "var(--color-pencil-red)"
    const PENCIL_CURSOR = `url(${pencilCursor}) 0 0, auto`

    // App > handleClick() prevents clicks if needed, here is mostly for visuals.
    const style = gameOver
      ? {
          color: sign === "X" ? X_COLOR : O_COLOR,
          pointerEvents: "none",
        }
      : {
          color: sign === "X" ? X_COLOR : O_COLOR,
          cursor: sign ? "not-allowed" : PENCIL_CURSOR,
        }
    return style
  }

  const style = getCellStyle(isGameOver)

  return (
    <div onClick={() => handleClick(id)} className="cell" style={style}>
      <span className="cell-sign">{sign}</span>
    </div>
  )
}
