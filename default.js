// Creating require.js configuration.
requirejs.config({
    baseUrl: 'src'
});

// Calling Tocm scripts.
require(['global', 'object', 'builder', 'extension', 'tocm', 'module']);