var commands = require('require-dir')('./commands'),
    _ = require('lodash'),
    help = _.contains(process.argv, '-h') || _.contains(process.argv, '--help'),
    cmd = process.argv[2];

if (!commands[cmd]) showHelp();
else {
  process.argv.splice(2, 1);
  commands[cmd].fn(help);
}

function showHelp() {
  console.log('Usage: bp command [options...]');
  console.log('\nFor help on a command: bp command --help');
  console.log('\nCommands:');
  _.each(commands, function(d, k) {
    console.log('  %s: %s', k, d.description);
  });
}
