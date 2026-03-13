import { render, screen } from '@redwoodjs/testing/web'

import Comment from './Comment'

const COMMENT = {
  id: 1,
  name: 'John Doe',
  body: 'This is my comment',
  postId: 1,
  createdAt: '2020-01-02T12:34:56Z',
}

describe('Comment', () => {
  it('renders successfully', () => {
    render(<Comment comment={COMMENT} />)

    expect(screen.getByText(COMMENT.name)).toBeInTheDocument()
    expect(screen.getByText(COMMENT.body)).toBeInTheDocument()
  })

  it('does not show delete button for non-moderators', () => {
    render(<Comment comment={COMMENT} />)

    expect(screen.queryByText('Delete')).not.toBeInTheDocument()
  })
})
