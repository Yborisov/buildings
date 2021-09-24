import React from 'react'
import Home from '../Home'
import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter } from 'react-router-dom'

test('header is a link that navigates to /buildings', () => {
    render(<BrowserRouter><Home /></BrowserRouter>)
    
    expect(screen.getByTestId('header')).toHaveTextContent('Buildings')
    expect(screen.getByRole('link')).toHaveAttribute('href', '/buildings')
})

test('image is loaded and and alt is "building"', () => {
    render(<BrowserRouter><Home /></BrowserRouter>)

    expect(screen.getByRole('img')).toHaveAttribute('alt', 'building')
    expect(screen.getByRole('img')).toHaveAttribute('src', 'building.png')

})