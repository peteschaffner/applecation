var Metalsmith  = require('metalsmith');
var collections = require('metalsmith-collections')
var express     = require('metalsmith-express');
var Handlebars  = require('handlebars');
var layouts     = require('metalsmith-layouts');
var markdown    = require('metalsmith-markdown');
var permalinks  = require('metalsmith-permalinks');
var watch       = require('metalsmith-watch');

Handlebars.registerHelper('includes', function(a, b, opts) {
    if(a.includes(b))
        return opts.fn(this);
    else
        return opts.inverse(this);
});

var metalsmith = Metalsmith(__dirname);

metalsmith
  .source('./src')
  .destination('./build')
  .use(collections({
    work: {
      pattern: 'work/**/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(markdown({
    smartypants: true
  }))
  .use(permalinks())
  .use(layouts({
    engine: 'handlebars',
    partials: {
      header: 'partials/header',
      footer: 'partials/footer'
    }
  }))
  .use(watch({
    paths: {
      '${source}/**/*': '**/*',
      'layouts/**/*': '**/*.md'
    },
    livereload: true
  }))
  .use(express())
  .build(function(err, files) {
    if (err) { throw err; }
    // workaround for duplicate collection data:
    // https://github.com/segmentio/metalsmith-collections/issues/27
    metalsmith.metadata({});
  });
