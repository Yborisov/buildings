import React from 'react'
import { render, screen, within } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import Footer from '../Footer'
import { BrowserRouter } from 'react-router-dom'

test('footer to have 2 links - to / and /buildings', () => {
    render(<BrowserRouter><Footer /></BrowserRouter>)

    const list = screen.getByRole('list')

    const { getAllByRole } = within(list)
    
    const linkItems = getAllByRole('link')

    expect(linkItems.length).toBe(2)
    expect(linkItems[0]).toHaveAttribute('href', '/')
    expect(linkItems[1]).toHaveAttribute('href', '/buildings')


})