import { renderHook } from "@testing-library/react-hooks"
import { useUpdateGaugeProp } from "../gauge-update"
import { MockGauge, mockRef } from "./mocks"

describe("useUpdateGaugeProp hook tests", () => {
  it("should update a gauge prop whenever it changes", () => {
    const gaugeRef = mockRef(new MockGauge("canvasID", { attr: 22 }))

    const { rerender } = renderHook(
      ({ attr }) => useUpdateGaugeProp(gaugeRef, "setAttr", attr),
      {
        initialProps: { attr: 54 }
      }
    )
    // useUpdateGaugeProp based on useDidUpdate (firstProp is ignored)
    expect(gaugeRef.current.getAttr()).toBe(22)

    // Changed
    rerender({ attr: 119 })
    expect(gaugeRef.current.getAttr()).toBe(119)
  })
})
