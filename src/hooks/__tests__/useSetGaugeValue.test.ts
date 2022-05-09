import { renderHook } from "@testing-library/react-hooks"
import { MutableRefObject } from "react"
import { useSetGaugeValue } from "../gauge-update"
import { MockGaugeAnimatable, mockRef, TMockGaugeAnimatable } from "./__mocks__/mocks"

describe("useSetGaugeValue hook tests", () => {
  let gaugeRef: MutableRefObject<TMockGaugeAnimatable>

  beforeEach(() => {
    gaugeRef = mockRef(new MockGaugeAnimatable())
  })

  afterEach(() => {
    gaugeRef = null
  })

  it("should set gauge value", () => {
    renderHook(
      ({ value, animate }) => useSetGaugeValue(gaugeRef, value, animate, null),
      {
        initialProps: { value: 22, animate: false }
      }
    )
    expect(gaugeRef.current.getValue()).toBe(22)
    expect(gaugeRef.current.getAnimated()).toBeFalsy()
  })

  it("should set gauge value with animation", () => {
    renderHook(
      ({ value, animate }) => useSetGaugeValue(gaugeRef, value, animate, null),
      {
        initialProps: { value: 44, animate: true }
      }
    )
    expect(gaugeRef.current.getValue()).toBe(44)
    expect(gaugeRef.current.getAnimated()).toBeTruthy()
  })

  it("should update gauge only if change 'value' prop", () => {
    const { rerender } = renderHook(
      ({ value, animate }) => useSetGaugeValue(gaugeRef, value, animate, null),
      {
        initialProps: { value: 22, animate: false }
      }
    )
    expect(gaugeRef.current.getValue()).toBe(22)
    expect(gaugeRef.current.getAnimated()).toBeFalsy()

    // Update only animate prop, no changes expected
    rerender({ animate: true, value: 22 })
    expect(gaugeRef.current.getValue()).toBe(22)
    expect(gaugeRef.current.getAnimated()).toBeFalsy()

    // Update value prop, changes expected
    rerender({ animate: true, value: 119})
    expect(gaugeRef.current.getValue()).toBe(119)
    expect(gaugeRef.current.getAnimated()).toBeTruthy()
  })
})
