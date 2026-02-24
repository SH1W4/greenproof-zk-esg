import { render, screen, act } from '@testing-library/react'
import { Typewriter } from './Typewriter'
import { describe, it, expect, vi } from 'vitest'

describe('Typewriter Component', () => {
  it('types the text over time', async () => {
    vi.useFakeTimers()
    const { container } = render(<Typewriter text="Hello" delay={100} />)
    
    // Initial state after mount should be empty (ready to type)
    expect(container.textContent).not.toContain('H')
    
    // Advance timers step by step and allow React to process
    for (let i = 1; i <= 5; i++) {
      await act(async () => {
        vi.advanceTimersByTime(100)
      })
    }
    
    expect(container.textContent).toContain('Hello')
    
    vi.useRealTimers()
  })

  it('renders with custom className', () => {
    const { container } = render(<Typewriter text="Hello" className="custom-class" />)
    expect(container.querySelector('.custom-class')).toBeInTheDocument()
  })
})
