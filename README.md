# RedwoodJS Blog

A full-stack blog built with [RedwoodJS](https://redwoodjs.com) — React + GraphQL + Prisma — featuring public articles with comments, a contact form, and a database-backed admin area protected by [dbAuth](https://redwoodjs.com/docs/authentication#self-hosted-auth-installation-and-setup) role-based authentication.

## 🎬 Demo

> **Loom walkthrough:** _<!-- TODO: paste your Loom URL here -->_

## 🚀 Quick Start (for reviewers)

Get a fully seeded blog running — with example posts, comments, and an account you can log in with — in four commands.

> **Prerequisites:** [Node.js](https://nodejs.org/en/) (=20.x) and [Yarn](https://yarnpkg.com/). On Windows, follow the [Windows development setup](https://redwoodjs.com/docs/how-to/windows-development-setup) guide.

```bash
yarn install                       # 1. install dependencies
yarn redwood prisma migrate dev    # 2. create the database schema
yarn redwood prisma db seed        # 3. load example posts, comments, and the default admin user
yarn redwood dev                   # 4. start the app at http://localhost:8910
```

> Using Docker instead? See [Run with Docker](#run-with-docker) below — the same migrate/seed steps apply inside the container.

### 🔑 Default login

The seed creates an admin account you can use immediately:

| Field    | Value                 |
| -------- | --------------------- |
| Email    | `admin@example.com`   |
| Password | `password123`         |
| Role     | `admin`               |

### What you can do

- **Read the blog** — visit [http://localhost:8910](http://localhost:8910) to see the 5 seeded posts. Click any post to read it and view its comments.
- **Leave a comment** — open any article and submit a comment (no login required).
- **Send a contact message** — use the [Contact](http://localhost:8910/contact) page.
- **Log in and manage posts** — go to [/login](http://localhost:8910/login), sign in with the credentials above, then visit [/admin/posts](http://localhost:8910/admin/posts) to create, edit, and delete posts. (The admin area is protected — you must be logged in to reach it.)
- **Sign up a new user** — the [/signup](http://localhost:8910/signup) page works too if you'd rather create your own account.

> ⚠️ The default credentials are for local development and review only. Change them before deploying anything real.

---

The rest of this README is the standard RedwoodJS getting-started guide.

> **The development server**
>
> ```
> yarn redwood dev
> ```

Your browser should automatically open to [http://localhost:8910](http://localhost:8910) where you'll see the Welcome Page, which links out to many great resources.

> **The Redwood CLI**
>
> Congratulations on running your first Redwood CLI command! From dev to deploy, the CLI is with you the whole way. And there's quite a few commands at your disposal:
>
> ```
> yarn redwood --help
> ```
>
> For all the details, see the [CLI reference](https://redwoodjs.com/docs/cli-commands).

## Prisma and the database

Redwood wouldn't be a full-stack framework without a database. It all starts with the schema. Open the [`schema.prisma`](api/db/schema.prisma) file in `api/db` and replace the `UserExample` model with the following `Post` model:

```prisma
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  body      String
  createdAt DateTime @default(now())
}
```

Redwood uses [Prisma](https://www.prisma.io/), a next-gen Node.js and TypeScript ORM, to talk to the database. Prisma's schema offers a declarative way of defining your app's data models. And Prisma [Migrate](https://www.prisma.io/migrate) uses that schema to make database migrations hassle-free:

```
yarn rw prisma migrate dev

# ...

? Enter a name for the new migration: › create posts
```

> `rw` is short for `redwood`

You'll be prompted for the name of your migration. `create posts` will do.

Now let's generate everything we need to perform all the CRUD (Create, Retrieve, Update, Delete) actions on our `Post` model:

```
yarn redwood generate scaffold post
```

Navigate to [http://localhost:8910/posts/new](http://localhost:8910/posts/new), fill in the title and body, and click "Save".

Did we just create a post in the database? Yup! With `yarn rw generate scaffold <model>`, Redwood created all the pages, components, and services necessary to perform all CRUD actions on our posts table.

## Frontend first with Storybook

Don't know what your data models look like? That's more than ok—Redwood integrates Storybook so that you can work on design without worrying about data. Mockup, build, and verify your React components, even in complete isolation from the backend:

```
yarn rw storybook
```

Seeing "Couldn't find any stories"? That's because you need a `*.stories.{tsx,jsx}` file. The Redwood CLI makes getting one easy enough—try generating a [Cell](https://redwoodjs.com/docs/cells), Redwood's data-fetching abstraction:

```
yarn rw generate cell examplePosts
```

The Storybook server should hot reload and now you'll have four stories to work with. They'll probably look a little bland since there's no styling. See if the Redwood CLI's `setup ui` command has your favorite styling library:

```
yarn rw setup ui --help
```

## Testing with Jest

It'd be hard to scale from side project to startup without a few tests. Redwood fully integrates Jest with both the front- and back-ends, and makes it easy to keep your whole app covered by generating test files with all your components and services:

```
yarn rw test
```

To make the integration even more seamless, Redwood augments Jest with database [scenarios](https://redwoodjs.com/docs/testing#scenarios) and [GraphQL mocking](https://redwoodjs.com/docs/testing#mocking-graphql-calls).

## Ship it

Redwood is designed for both serverless deploy targets like Netlify and Vercel and serverful deploy targets like Render and AWS:

```
yarn rw setup deploy --help
```

Don't go live without auth! Lock down your app with Redwood's built-in, database-backed authentication system ([dbAuth](https://redwoodjs.com/docs/authentication#self-hosted-auth-installation-and-setup)), or integrate with nearly a dozen third-party auth providers:

```
yarn rw setup auth --help
```

## Next Steps

The best way to learn Redwood is by going through the comprehensive [tutorial](https://redwoodjs.com/docs/tutorial/foreword) and joining the community (via the [Discourse forum](https://community.redwoodjs.com) or the [Discord server](https://discord.gg/redwoodjs)).

## Quick Links

- Stay updated: read [Forum announcements](https://community.redwoodjs.com/c/announcements/5), follow us on [Twitter](https://twitter.com/redwoodjs), and subscribe to the [newsletter](https://redwoodjs.com/newsletter)
- [Learn how to contribute](https://redwoodjs.com/docs/contributing)

## Run with Docker

This repo ships a Docker Compose setup that runs the app and a PostgreSQL database together — no local Postgres install needed.

```bash
# 1. Start the app and database
docker compose -f docker-compose.dev.yml up -d

# 2. Create the schema and load seed data (posts, comments, default admin user)
docker compose -f docker-compose.dev.yml exec redwood yarn rw prisma migrate dev
docker compose -f docker-compose.dev.yml exec redwood yarn rw prisma db seed
```

The app is served at [http://localhost:8910](http://localhost:8910). Log in with the [default credentials](#-default-login) above.

## Fixing Storybook (for fellow students)

If you follow the RedwoodJS tutorial and try to run `yarn rw storybook`, you'll probably get an error like this:

```
Cannot find module './dist/preset'
```

Here's what's going on and how we fixed it.

### The problem

RedwoodJS uses a package called `storybook-framework-redwoodjs-vite` to connect Storybook to your app. That package has a bug: it uses JavaScript imports without file extensions, like `from "./dist/preset"` instead of `from "./dist/preset.js"`.

This worked fine on older versions of Node, but Node 20 is strict about this. When Storybook's command-line tool (which uses the older CommonJS module format) tries to load these files, Node says "I can't find that module" and crashes.

So it's not your code that's broken — it's a packaging bug in the Storybook framework adapter.

### What we tried that didn't work

- **Upgrading Storybook to v8** — The framework adapter was built for Storybook v7, so upgrading Storybook just created version mismatches and new errors like `res.status is not a function`.
- **Forcing a specific Storybook version with `resolutions`** — Same API incompatibility problem.
- **Node's `--experimental-require-module` flag** — Didn't help with the extensionless imports.
- **Fixing one import at a time** — Every time we patched one extensionless import, the next file in the chain had the same problem.

### What actually fixed it

We wrote a shell script (`scripts/patch-storybook.sh`) that goes through every file in `storybook-framework-redwoodjs-vite` and adds the missing `.js` extensions to all the relative imports. It turns `from "./dist/preset"` into `from "./dist/preset.js"`, and does the same for about a dozen other imports throughout the package.

### How to use it

After any `yarn install` (which resets node_modules), run the patch script before starting Storybook:

```bash
sh scripts/patch-storybook.sh
yarn rw storybook
```

If you're using Docker like we are:

```bash
docker compose -f docker-compose.dev.yml exec redwood sh scripts/patch-storybook.sh
docker compose -f docker-compose.dev.yml exec redwood yarn rw storybook --no-open --port 7910
```

The patch is safe to run multiple times — if the extensions are already there, it just does nothing.

## Is RedwoodJS still maintained? (March 2026)

Short answer: RedwoodJS is in **maintenance mode**. It's not dead, but active development has stopped.

### What happened

The RedwoodJS team pivoted. The original framework (what this tutorial uses) has been renamed to **[Redwood GraphQL](https://github.com/redwoodjs/graphql/releases)** and will only get security patches and critical fixes going forward. The team's energy is going into two new things:

- **[RedwoodSDK](https://rwsdk.com/blog)** — A completely different framework built on server-first React running on Cloudflare Workers. Same team, new direction.
- **[CedarJS](https://cedarjs.com)** — A community fork of the original RedwoodJS that is actively maintained with new features, bug fixes, and ongoing Node.js support.

You can read the full announcement on the [RedwoodJS Community Forum](https://community.redwoodjs.com/t/the-future-of-redwood-launches-today/7938/15).

### Why RedwoodJS is stuck on Node 20

The `package.json` locks the engine to `node: "=20.x"`. The team set that constraint during active development and never shipped Node 22 support before going into maintenance mode. Since they're only doing security patches now, adding Node 22 compatibility isn't on their radar.

This matters because **[Node 20 LTS support ends April 30, 2026](https://endoflife.date/nodejs)**. After that date, Node 20 stops getting security updates. If you're building something real, you'll want a framework that runs on Node 22 or later.

### What this means for you as a student

The tutorial is still a solid way to learn full-stack concepts. The skills you picked up here transfer directly to other frameworks:

- **React components and Cells** — The same patterns show up in Next.js, Remix, and RedwoodSDK
- **GraphQL with SDL** — Used across the industry (Apollo, Hasura, etc.)
- **Prisma ORM** — Works with any Node.js framework, not just Redwood
- **Authentication and RBAC** — The concepts (roles, `requireAuth`, session management) are universal
- **Storybook** — Framework-agnostic, works with anything React-based
- **Testing with Jest** — Standard across the JavaScript ecosystem

If you want to keep building with the same API and codebase style, check out **[CedarJS](https://cedarjs.com)** — it's a drop-in replacement that's actively maintained. If you want to see where the original Redwood team is headed, look at **[RedwoodSDK](https://rwsdk.com)**.
