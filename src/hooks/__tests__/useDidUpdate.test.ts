import { renderHook } from "@testing-library/react-hooks"
import { useDidUpdate } from "../common"

describe("useDidUpdate hook test", () => {
  it("should not execute effect on first render", () => {
    let counter = 0
    const { rerender } = renderHook(
      () => useDidUpdate(() => { counter += 1 })
    )

    expect(counter).toBe(0)

    rerender()

    expect(counter).toBe(1)
  })
})
