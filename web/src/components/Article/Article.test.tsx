import { render, screen } from '@redwoodjs/testing/web'

import Article from './Article'

const ARTICLE = {
  id: 1,
  title: 'First Post',
  body: 'Neutra tacos hot chicken prism raw denim, dried fruit cleanfood temporary four dollar toast cardigan. Palo santo fixie post-ironic disrupt.',
  createdAt: '2020-02-15T09:45:00Z',
}

describe('Article', () => {
  it('renders a blog post', () => {
    render(<Article article={ARTICLE} />)

    expect(screen.getByText(ARTICLE.title)).toBeInTheDocument()
    expect(screen.getByText(ARTICLE.body)).toBeInTheDocument()
  })

  it('renders a summary of a blog post', () => {
    render(<Article article={ARTICLE} summary={true} />)

    expect(screen.getByText(ARTICLE.title)).toBeInTheDocument()
    expect(screen.queryByText(ARTICLE.body)).not.toBeInTheDocument()
    expect(screen.getByText(/Neutra tacos.*\.\.\./)).toBeInTheDocument()
  })
})
