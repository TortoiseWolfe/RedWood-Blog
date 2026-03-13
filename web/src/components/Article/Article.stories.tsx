import type { Meta, StoryObj } from '@storybook/react'

import Article from './Article'

const meta: Meta<typeof Article> = {
  component: Article,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Article>

const ARTICLE = {
  id: 1,
  title: 'First Post',
  body: `Neutra tacos hot chicken prism raw denim, dried fruit cleanfood
  temporary four dollar toast cardigan. Palo santo fixie post-ironic
  disrupt hashtag art party kitsch pitchfork ennui jean shorts
  fingerstache tumeric letterpress man bun organic. PBR&B lyft pop-up
  polaroid la croix, pork belly post-ironic next level hammock kitsch
  tote bag williamsburg hot chicken. Air plant art party jianbing
  marfa cold-pressed. Slow-carb vaporware craft beer ethical ugh.`,
  createdAt: '2020-02-15T09:45:00Z',
}

export const Full: Story = {
  args: {
    article: ARTICLE,
  },
}

export const Summary: Story = {
  args: {
    article: ARTICLE,
    summary: true,
  },
}
