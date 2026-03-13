import { render, screen } from '@redwoodjs/testing/web'

import CommentForm from './CommentForm'

describe('CommentForm', () => {
  it('renders successfully', () => {
    render(<CommentForm postId={1} />)

    expect(screen.getByText('Leave a Comment')).toBeInTheDocument()
    expect(screen.getByText('Submit')).toBeInTheDocument()
  })
})
