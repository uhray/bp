var _ = require('lodash'),
    fs = require('fs'),
    path = require('path'),
    tools = require('../tools');

module.exports = exports = {
  fn: fn,
  description: 'Create a new context'
};

function fn(help) {
  var templates = fs.readdirSync(__dirname + '/../templates/contexts'),
      argv = require('optimist')
              .usage('Usage: bp --name [name]')
              .options('n', {
                alias: 'name',
                demand: true
              })
              .options('t', {
                alias: 'template',
                default: 'blank',
                describe: '(options: ' + templates.join(',') + ')'
              })
              .check(function(a) {
                if (!_.contains(templates, a.t)) {
                  throw new Error('Invalid template');
                }
              }),
      bpDir = tools.bpDir(),
      outdir, tdir;

  if (help) return argv.showHelp();
  else argv = argv.argv;

  outdir = path.join(bpDir, 'app/frontend/contexts/', argv.n),
  tdir = path.join(__dirname, '/../templates/contexts/', argv.t);

  if (fs.existsSync(outdir)) {
    tools.errorOut('Context `%s` already exists', argv.n);
  }

  tools.crawlTemplate(tdir, outdir, { name: argv.n }, function() {
    console.log('Context placed in %s', outdir);
  });
}
