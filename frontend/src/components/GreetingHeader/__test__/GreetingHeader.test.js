import React from 'react'
import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import GreetingHeader from '../GreetingHeader'


test('header to have text "Welcome"', () => {
    render(<GreetingHeader />)

    expect(screen.getByRole('heading')).toHaveTextContent('Welcome')
})