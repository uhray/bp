define(
[
'ractive', 'jquery', 'lodash',
'rv!./template'
],
function(Ractive, $, _, template) {

  return function() {
    var ractive;

    ractive = new Ractive({
      el: '#body',
      template: template,
      data: {
      },
      computed: {
      }
    });

  }

});
