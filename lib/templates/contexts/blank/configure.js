require.config({
  baseUrl: '/public',
  config: {
    loader: {
      pages: {
        home:         'contexts/<%= name %>/pages/home/main'
      },
      components: {
      },
      modules: {
        tools:        'modules/tools',
        polyfills:    'modules/polyfills'
      },
      events: {
        uhray:        'bower/ractive-uhray-events/dist/events.min',
      },
      extensions: {
        validator: 'bower/ractive-extensions-validator/dist/validator.min',
        crud:      'bower/ractive-extensions-crud/dist/crud.min',
      }
    }
  },
  paths: {
    crud:        'bower/crud/dist/crud',
    debug:       'bower/debug/dist/debug',
    director:    'bower/director/build/director.min',
    jquery:      'bower/jquery/dist/jquery.min',
    lodash:      'bower/lodash/lodash.min',
    loader:      'bower/requirejs-loader-plugin/loader',
    router:      'contexts/<%= name %>/router',
    ractive:     'bower/ractive/ractive',
    rv:          'bower/rv/rv'
  },
  shim: {
    debug:     { exports: 'debug' },
    director:  { exports: 'Router' },
    router:    ['loader!']
  }
});

requirejs(['debug', 'router', 'ractive'],
function(debug, router, ractive) {
  window.Debug = debug;  // global "Debug" because chrome overwrites "debug"
  window.Ractive = ractive;
});
