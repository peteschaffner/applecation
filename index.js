var Metalsmith  = require('metalsmith');
var collections = require('metalsmith-collections')
var express     = require('metalsmith-express');
var Handlebars  = require('handlebars');
var layouts     = require('metalsmith-layouts');
var markdown    = require('metalsmith-markdown');
var permalinks  = require('metalsmith-permalinks');
var rootpath    = require('metalsmith-rootpath');
var watch       = require('metalsmith-watch');

Handlebars.registerHelper('includes', function(a, b, opts) {
    if(a.includes(b))
        return opts.fn(this);
    else
        return opts.inverse(this);
});

var metalsmith = Metalsmith(__dirname)
  .source('./src')
  .destination('./build')
  .clean(false)
  .use(collections({
    work: {
      pattern: 'work/**/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(markdown({ smartypants: true }))
  .use(permalinks({ relative: false }))
  .use(rootpath())
  .use(layouts({
    engine: 'handlebars',
    partials: {
      header: 'partials/header',
      footer: 'partials/footer'
    }
  }));

if (process.env.NODE_ENV === 'development') {
  metalsmith.use(watch({
    paths: {
      '${source}/**/*': true,
      '${source}/work/**/*': '**/*.md',
      'layouts/**/*': '**/*.md'
    },
    livereload: true
  }))
  .use(express())
}

metalsmith.build(function(err, files) {
    if (err) { throw err; }
    // workaround for duplicate collection data:
    // https://github.com/segmentio/metalsmith-collections/issues/27
    metalsmith.metadata({});
  });
