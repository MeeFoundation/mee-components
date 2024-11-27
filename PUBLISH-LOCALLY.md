### Local publishing capabilities

- [Using verdaccio](#using-verdaccio)
- [Using pnpm link](#using-pnpm-link)

# Using Verdaccio

## Run verdaccio

```sh
  docker pull verdaccio/verdaccio
```

```sh
  docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio
```

## Create user

```sh
  npm adduser --registry http://0.0.0.0:4873/
```

## Publish package

```sh
  npm publish --registry http://0.0.0.0:4873/
```

## Install package into another apps

```sh
  NPM_CONFIG_REGISTRY=http://0.0.0.0:4873 pnpm add mee-components@[version]
```

## additional hints

- The local package version must be higher than in the global npm

- To display changes you need to increase the package version, [publish the package](#publish-package) and [update](#install-package-into-another-apps) the version in the app in which it is used

# Using pnpm link

## remove package usage from npm

```sh
  pnpm remove mee-components
```

## add package use pnpm link

```sh
  pnpm link ../mee-components
```

where `../mee-components` is the path to the mee-components project relative to the app in which you want to add mee-components locally
