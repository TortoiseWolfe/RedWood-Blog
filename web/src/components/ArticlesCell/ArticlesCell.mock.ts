export const standard = (/* vars, { ctx, req } */) => ({
  articles: [
    {
      __typename: 'Post' as const,
      id: 1,
      title: 'First Post',
      body: `Neutra tacos hot chicken prism raw denim, dried fruit cleanfood temporary four dollar toast cardigan.`,
      createdAt: '2020-01-01T12:34:56Z',
    },
    {
      __typename: 'Post' as const,
      id: 2,
      title: 'Second Post',
      body: `Palo santo fixie post-ironic disrupt hashtag art party kitsch pitchfork ennui jean shorts.`,
      createdAt: '2020-01-02T12:34:56Z',
    },
    {
      __typename: 'Post' as const,
      id: 3,
      title: 'Third Post',
      body: `Air plant art party jianbing marfa cold-pressed. Slow-carb vaporware craft beer ethical ugh.`,
      createdAt: '2020-01-03T12:34:56Z',
    },
  ],
})
