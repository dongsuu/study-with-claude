import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('테스트 환경 확인', () => {
  it('App을 렌더링한다', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'React 실습장' })).toBeInTheDocument()
  })
})
