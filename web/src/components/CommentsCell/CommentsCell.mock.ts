export const standard = (/* vars, { ctx, req } */) => ({
  comments: [
    {
      __typename: 'Comment' as const,
      id: 1,
      name: 'Rob Cameron',
      body: 'This is the first comment!',
      postId: 1,
      createdAt: '2020-01-02T12:34:56Z',
    },
    {
      __typename: 'Comment' as const,
      id: 2,
      name: 'David Price',
      body: 'I agree, great post!',
      postId: 1,
      createdAt: '2020-02-03T23:00:00Z',
    },
  ],
})
