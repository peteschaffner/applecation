# Evergig web client

The *new* and *shiny* Evergig web application!

## Installation

```bash
$ npm install
```

## Development

```bash
$ npm start
```

## Deployment

As we are deploying to Heroku, you first need to have
[an account](https://id.heroku.com/signup). After you have signed up, notify
[peter.schaffner@evergig.com](mailto:peter.schaffner@evergig.com) to be added
as a contributor.

With Heroku, deployment is directly connected to Git ... so we need to use it
the way it was intended (i.e. no more initiating empty repos every time we want
to deploy and having disconnected Git histories between our remotes).

There are now three different environments we will be using for our
application. Their descriptions along with instructions on deploying to their
respective Heroku remotes are listed below.

### Development

`development` is the environment we develop locally in and maps directly to
the `NODE_ENV` environment variable we set on every `npm start`. No need to
worry about deploying here as `npm start` takes care of everything.

### Staging

`staging` is, more-or-less, a direct mirror of our `production` environment,
and is used to test our application before taking changes live to the public.
We can, however use this environment more experimentally and deploy committed
code that is not necessarily meant or ready for `production` (i.e. we needn't
only push from `master` to this Heroku remote).

First you need to add the appropriate Git remote (this only needs to be done
once):

```bash
$ git remote add stage git@heroku.com:evergig-com-stage.git
```

Finally, to deploy, run:

```bash
$ git push [-f] stage [<ref>:]master
```

**Note:** deploying from `[origin/]master` is preferable, but if you need to
make a hot test, you can do this from any `<ref>` ... just remember that you
may need to `-f`orce push in order to keep history clean (as we do with
`origin`).

### Production

`production` is where our live, public-facing application lives and runs.
It maps directly to the `NODE_ENV` variable explicitly set to `production`.

First you need to add the appropriate Git remote (this only needs to be done
once):

```bash
$ git remote add prod git@heroku.com:evergig-com-prod.git
```

We want to make sure we are tagging, bumping our app version and updating our
`History.md` accordingly. These things are not yet automated, but can easily be
done by hand for the time being:

```bash
$ git checkout master

# Bump package.json version field
$ $EDITOR package.json

# Bump component.json version field
$ $EDITOR component.json

# Edit History.md
$ $EDITOR History.md

$ git commit -a -m 'Release <major.minor.patch>'
$ git tag <major.minor.patch> -a -m 'Release <major.minor.patch>'
$ git push && git push --tags
```

Finally, to deploy, run:

```bash
$ git push prod master
```
