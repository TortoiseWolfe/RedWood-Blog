import type { Meta, StoryObj } from '@storybook/react'

import Comment from './Comment'

const meta: Meta<typeof Comment> = {
  component: Comment,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Comment>

export const Default: Story = {
  args: {
    comment: {
      id: 1,
      name: 'Rob Cameron',
      body: 'This is the first comment!',
      postId: 1,
      createdAt: '2020-01-01T12:34:56Z',
    },
  },
}
