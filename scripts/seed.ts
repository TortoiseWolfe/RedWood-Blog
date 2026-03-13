import { db } from 'api/src/lib/db'

export default async () => {
  try {
    // Seed blog posts
    const posts = await db.post.createMany({
      data: [
        {
          title: 'Welcome to the Redwood Blog',
          body: 'This is the first post on our new blog built with RedwoodJS. Redwood is a full-stack framework that combines React, GraphQL, and Prisma into a seamless developer experience. We are excited to share our journey building with this incredible framework and exploring everything it has to offer.',
        },
        {
          title: 'Getting Started with Cells',
          body: 'Cells are one of the most powerful abstractions in RedwoodJS. They handle the lifecycle of data fetching — loading, empty, failure, and success states — all in a single component. No more writing boilerplate useEffect hooks or managing loading state manually. Cells make your components declarative and easy to reason about.',
        },
        {
          title: 'Building Forms the Redwood Way',
          body: 'RedwoodJS forms come with built-in validation, error handling, and a clean API that wraps react-hook-form. You get client-side validation with minimal code, server-side error display through FormError, and toast notifications for user feedback. Combined with GraphQL mutations, saving data becomes almost effortless.',
        },
        {
          title: 'Authentication with dbAuth',
          body: 'dbAuth is a self-hosted authentication solution that stores credentials directly in your database. No third-party services, no monthly fees, full control over your user data. It handles login, signup, forgot password, and reset password flows out of the box. Session management uses secure HTTP-only cookies with configurable expiration.',
        },
        {
          title: 'Deploying to Netlify',
          body: 'Deploying a RedwoodJS app to Netlify is straightforward. The API side compiles to serverless functions, and the web side builds as a static SPA. With a simple netlify.toml configuration and the yarn rw deploy netlify command, your full-stack app goes live in minutes. Continuous deployment from GitHub makes updates seamless.',
        },
      ],
      skipDuplicates: true,
    })

    console.info(`  Seeded ${posts.count} blog posts`)

    // Get all posts so we can attach comments
    const allPosts = await db.post.findMany()

    // Seed comments across posts
    const comments = await db.comment.createMany({
      data: [
        {
          name: 'Rob Cameron',
          body: 'Great introduction! RedwoodJS has been a game changer for our team.',
          postId: allPosts[0].id,
        },
        {
          name: 'David Price',
          body: 'Welcome to the community! You are going to love building with Redwood.',
          postId: allPosts[0].id,
        },
        {
          name: 'Tom Preston-Werner',
          body: 'Cells are my favorite feature. They eliminate so much boilerplate.',
          postId: allPosts[1].id,
        },
        {
          name: 'Peter Pistorius',
          body: 'The declarative approach to data fetching is what sold me on Redwood.',
          postId: allPosts[1].id,
        },
        {
          name: 'Amy Dutton',
          body: 'The forms API is so clean. Validation just works!',
          postId: allPosts[2].id,
        },
        {
          name: 'Kris Coulson',
          body: 'dbAuth is underrated. No vendor lock-in and full control.',
          postId: allPosts[3].id,
        },
        {
          name: 'Daniel Choudhury',
          body: 'Netlify deploys are buttery smooth with Redwood. Love it.',
          postId: allPosts[4].id,
        },
      ],
      skipDuplicates: true,
    })

    console.info(`  Seeded ${comments.count} comments`)
  } catch (error) {
    console.error(error)
  }
}
