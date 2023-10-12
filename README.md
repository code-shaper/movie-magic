# Movie Magic

This repository was bootstrapped with [Code Shaper](https://code-shaper.dev).

It shows how Code Shaper can be used to create applications and services more
efficiently. We have provided sample applications using the following
frameworks:

1. [React](https://reactjs.org/)
2. [Next.js](https://nextjs.org/)
3. [Remix](https://remix.run/)
4. [Express](https://expressjs.com/)

All applications are created inside a monorepo (using
[Turborepo](https://turbo.build/repo)), working in harmony and sharing common
packages.

To see step-by-step instructions for creating these apps, visit
[Getting Started](https://www.code-shaper.dev/docs/getting-started/overview) in
Code Shaper docs.

![Home Page](assets/home-page.png)

## Architecture

The repository contains three web applications created using React, Next.js and
Remix. They all depend on a package called `ui-lib` for common React components.
They also depend on an Express app, called `movie-magic-api`, which provides a
RESTful API for fetching movie data.

![Architecture](assets/architecture.png)

## Prerequisites for development

1. [Node Version Manager](https://github.com/nvm-sh/nvm) (nvm) - allows using
   different versions of node via the command line

## Getting Started

```shell
nvm use        # use the required version of node
npm ci         # install dependencies
npm run dev    # run apps

# in a separate shell
npm run storybook
```

Open browser windows at the following URLs to see the respective apps:

1. http://localhost:3000/: Movie Magic | React
2. http://localhost:3001/: Movie Magic | Next.js
3. http://localhost:3002/: Movie Magic | Remix
4. http://localhost:6006/: Storybook

Note that the React app fetches mock data from MSW, whereas the other two apps
fetch real data from the movie-magic-api.

> Note: Do not run `npm install` or `npm ci` in any of the subdirectories. It
> will break the build. There should be only one `package-lock.json` file in the
> entire repo (at the root).

## All Commands

```
npm ci                   # install dependencies
npm run build            # builds all workspaces
npm run ci-validate      # builds, lints, formats, and tests all code (runs in CI pipeline, don't run locally)
npm run clean            # deletes all build artifacts
npm run commit           # displays commit helper prompt to ensure your commits use conventional commits
npm run dev              # run demo app
npm run fix              # lints, formats and attempts to fix any issues (requires `npm run build` has been ran)
npm run format           # formats all workspaces, useful for debugging format issues (generally `npm run fix` is preferred)
npm run lint             # runs the linter on all workspaces, useful for debugging lint issues (generally `npm run fix` is preferred)
npm run storybook        # runs storybook
npm run test             # runs full build, lint, format, and all tests - run before pushing to remote
```

## Common Workflows

### Creating New Components

Use [Code Shaper](https://www.code-shaper.dev/) to create new components. This
will give you a good starting point that is consistent with Cruise's coding
guidelines.

Here's an example of creating a component called `EventList` using Code Shaper:

```sh
$ npx shaper
? Which plugin would you like to run? React (@code-shaper/react - generates React applications)
? Which generator would you like to run? component (generates a component)
? Component name? (e.g. TextField) EventList
? Which workspace should this go to? packages/robot-styles
? Parent directory within workspace? src/components/EventList

Creating EventList...
  EventList.stories.tsx
  EventList.test.tsx
  EventList.tsx
  index.ts

Done.
```

### Production build

To build all packages and apps for production, run the following command:

```shell
npm ci
npm run build
```

### Clean build

Removes all build artifacts and performs a clean build.

```shell
npm run clean
npm ci
npm run dev
```

For an "aggressive" clean build, add one more step as shown below. This will
build the lock file from scratch.

```shell
npm run clean
rm package-lock.json
npm install
npm run dev
```

### Running unit tests

The following command runs a full build, lint, format, and all tests. However,
it uses the Turborepo cache to skip steps that have no changes since the last
run. Hence it is very efficient. **Always run this command before pushing to
remote.**

```shell
npm test
```

### Running end-to-end tests using dev build

```shell
npm run dev # starts a local server hosting the react app

# run e2e tests non-interactively (run in a different shell)
npm run e2e

# run e2e tests in the Playwright user interface (run in a different shell)
npm run e2e:ui
```

### Linting, formatting and fixing coding issues

```shell
npm run fix
```

### Running the custom plugin

```shell
npm run build

npx shaper
? Which plugin would you like to run? React Patterns
? Which generator would you like to run? fetch-hook
? What are you fetching? Orders
? What is the return type? Order[]
? Parent directory? apps/movie-magic/src/pages/HomePage

Creating useOrders...
  useOrders.ts
```
