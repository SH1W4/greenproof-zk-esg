import { render, screen, act } from '@testing-library/react'
import { Typewriter } from './Typewriter'
import { describe, it, expect, vi } from 'vitest'

describe('Typewriter Component', () => {
  it('types the text over time', async () => {
    // Using a tiny delay (1ms) allows the component to type quickly
    // findByText handles the polling/retry logic automatically
    render(<Typewriter text="Hello" delay={1} />)
    
    // findByText will wait until the text appears
    const element = await screen.findByText(/Hello/i, {}, { timeout: 2000 })
    expect(element).toBeInTheDocument()
  })

  it('renders with custom className', () => {
    const { container } = render(<Typewriter text="Test" className="custom-class" />)
    expect(container.querySelector('.custom-class')).toBeInTheDocument()
  })
})
