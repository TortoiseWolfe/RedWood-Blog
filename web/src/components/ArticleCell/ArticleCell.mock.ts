export const standard = (/* vars, { ctx, req } */) => ({
  article: {
    __typename: 'Post' as const,
    id: 42,
    title: 'Mocked Article Title',
    body: `Neutra tacos hot chicken prism raw denim, dried fruit cleanfood temporary four dollar toast cardigan. Palo santo fixie post-ironic disrupt hashtag art party kitsch pitchfork.`,
    createdAt: '2020-01-01T12:34:56Z',
  },
})
