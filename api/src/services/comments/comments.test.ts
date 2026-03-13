import type { Comment } from '@prisma/client'

import { comments, createComment, deleteComment } from './comments'
import type { StandardScenario } from './comments.scenarios'

describe('comments', () => {
  scenario(
    'returns all comments for a post',
    async (scenario: StandardScenario) => {
      const result = await comments({
        postId: scenario.comment.one.postId,
      })

      expect(result.length).toBeGreaterThanOrEqual(1)
    }
  )

  scenario('creates a comment', async (scenario: StandardScenario) => {
    const result = await createComment({
      input: {
        name: 'Jane Doe',
        body: 'A new comment',
        postId: scenario.comment.two.postId,
      },
    })

    expect(result.name).toEqual('Jane Doe')
    expect(result.body).toEqual('A new comment')
    expect(result.postId).toEqual(scenario.comment.two.postId)
  })

  scenario('deletes a comment', async (scenario: StandardScenario) => {
    const original = (await deleteComment({
      id: scenario.comment.one.id,
    })) as Comment

    expect(original.id).toEqual(scenario.comment.one.id)
  })
})
