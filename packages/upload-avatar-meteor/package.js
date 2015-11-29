Package.describe({
    name: "particle4dev:upload-avatar",
    summary: "upload avatar package for meteor",
    version: "1.1.0"
});

// meteor test-packages ./
var both = ['client', 'server'];
var client = ['client'];
var server = ['server'];

Package.on_use(function (api) {
    api.use(['underscore', 'accounts-base'], both);
    api.use(['jquery', 'templating'], client);

    api.addAssets([
        'src/vendor/imgareaselect/border-anim-h.gif',
        'src/vendor/imgareaselect/border-anim-v.gif'
    ], client);

    //add file
    api.add_files([
        'src/helpers.js'
    ], both);

    api.add_files([
        'src/vendor/imgareaselect/imgareaselect-animated.css',
        'src/vendor/imgareaselect/jquery.imgareaselect.pack.js',
        'src/client.js',
        'src/template/editYourAvatarModal.html',
        'src/template/editYourAvatarModal.js',
        'src/template/editYourAvatarModal.css'
    ], client);

    api.add_files([
        'src/server.js',
    ], server);

    if (typeof api.export !== 'undefined') {
        //api.export('DEBUGX', both);
    }
});

Package.on_test(function (api) {
  api.use(['upload-avatar','accounts-password','tinytest'], both);
  api.add_files('tests/client.js', 'client');
  api.add_files('tests/server.js', 'server');
});