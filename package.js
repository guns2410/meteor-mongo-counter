Package.describe({
  name: 'mongo-counter',
  version: '0.0.1',
  summary: 'Counters for MongoDB',
  git: 'https://github.com/guns2410/meteor-mongo-counter.git',
  documentation: 'README.md',
});

Package.onUse(function (api) {
  api.versionsFrom('1.3.5.1');
  api.use(['ecmascript', 'mongo', 'mongo-livedata'], 'server');
  api.mainModule('mongo-counter.js', 'server');
});

Package.onTest(function (api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('mongo-counter');
  api.mainModule('mongo-counter-tests.js');
});
