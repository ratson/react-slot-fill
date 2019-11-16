import React from 'react'
import { Fill, Slot } from '../src'
import renderer from 'react-test-renderer'

it('can fill before slot', () => {
  const fillComponent = renderer.create(
    <div>
      <Fill name="slot">
        <span>filled</span>
      </Fill>
      <Slot name="slot" />
    </div>
  )

  expect(fillComponent).toMatchSnapshot()
})

it('can fill after slot', () => {
  const fillComponent = renderer.create(
    <div>
      <Slot name="slot2" />
      <Fill name="slot2">
        <span>filled 2</span>
      </Fill>
    </div>
  )

  expect(fillComponent).toMatchSnapshot()
})
