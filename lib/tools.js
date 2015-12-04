var _ = require('lodash'),
    fs = require('fs'),
    path = require('path'),
    ejs = require('ejs'),
    readDir = require('fs-readdir-recursive'),
    mkdirp = require('mkdirp'),
    async = require('async'),
    tools = module.exports = exports = {};

tools.bpDir = function() {
  var cwd = process.cwd();

  if (fs.existsSync(path.join(cwd, '.git')) &&
      fs.existsSync(path.join(cwd, 'app')) &&
      fs.existsSync(path.join(cwd, 'config'))) {
    return cwd;
  }

  tools.errorOut('This does not appear to be a boilerplate directory');
}

tools.errorOut = function() {
  console.log.apply(console, arguments);
  process.exit();
}

tools.crawlTemplate = function(templateDir, outDir, data, cb) {
  var files = readDir(templateDir);

  mkdirp(outDir, function(e) {
    if (e) tools.errorOut(e);

    async.each(files, function(f, cb) {
      var fp = path.join(templateDir, f),
          str = fs.readFileSync(fp, { encoding: 'utf8' }),
          out = path.join(outDir, f),
          dir = path.dirname(out);

      str = ejs.render(str, data);

      mkdirp(dir, function(e) {
        if (e) tools.errorOut(e);
        fs.writeFileSync(path.join(outDir, f), str);
        cb();
      });
    }, cb || Function());
  });
}
