import { renderHook } from "@testing-library/react-hooks"
import { MockGauge, mockRef } from "./mocks"
import { useSetGaugeProp } from "../gauge-update"
import { MutableRefObject } from "react"

describe("useSetGaugeProp hook tests", () => {
  let gaugeRef: MutableRefObject<MockGauge>

  beforeEach(() => {
    gaugeRef = mockRef(new MockGauge("", { attr: 0 }))
  })

  afterEach(() => {
    gaugeRef = null
  })

  it("should set a gauge prop on first render", () => {
    renderHook(
      ({ attr }) => useSetGaugeProp(gaugeRef, "setAttr", attr),
      {
        initialProps: { attr: 22 }
      }
    )
    expect(gaugeRef.current.getAttr()).toBe(22)
  })

  it("should update a gauge prop whenever it changes", () => {
    const { rerender } = renderHook(
      ({ attr }) => useSetGaugeProp(gaugeRef, "setAttr", attr),
      {
        initialProps: { attr: 879 }
      }
    )

    // Not changed
    rerender()
    expect(gaugeRef.current.getAttr()).toBe(879)

    // Changed
    rerender({ attr: 56 })
    expect(gaugeRef.current.getAttr()).toBe(56)

    // Changed
    rerender({ attr: 95 })
    expect(gaugeRef.current.getAttr()).toBe(95)
  })
})
