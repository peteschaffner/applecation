var Metalsmith  = require('metalsmith');
var express     = require('metalsmith-express');
var Handlebars  = require('handlebars');
var layouts     = require('metalsmith-layouts');
var templates   = require('metalsmith-in-place');
var markdown    = require('metalsmith-markdown');
var metadata    = require('metalsmith-metadata');
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
  .use(metadata({
    references: 'references.json',
    work: 'work.json'
  }))
  .use(markdown({ smartypants: true }))
  .use(permalinks({ relative: false }))
  .use(rootpath())
  .use(layouts({
    engine: 'handlebars',
    pattern: ['**/*.md', '**/*.html', '!resume/reference/**/*'],
    default: 'default.html'
  }))
  .use(templates({
    engine: 'handlebars',
    pattern: ['**/*.css', '**/*.html', '!resume/reference/**/*'],
    partials: 'layouts/partials'
  }));

if (process.env.NODE_ENV === 'development') {
  metalsmith.use(watch({
    paths: {
      '${source}/**/*': true,
      '${source}/*.json': '**/*.{md,html}',
      '${source}/**/*.md': '**/*.{md,html}',
      'layouts/**/*': '**/*.{md,html}'
    },
    livereload: true
  }))
  .use(express())
}

metalsmith.build(function(err, files) {
  if (err) { throw err; }
});
