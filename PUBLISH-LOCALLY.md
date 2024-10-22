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
  NPM_CONFIG_REGISTRY=http://0.0.0.0:4873 pnpm add mee-components
```
