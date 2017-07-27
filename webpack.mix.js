let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 |
 | @elite-rpg -
 */

mix.js('resources/assets/js/app.js', 'public/js')
   .js('resources/assets/js/map.ts', 'public/js')
   .js('resources/assets/js/world.ts', 'public/js')
   .extract(['jquery', 'bootstrap-sass', 'vue', 'axios', 'lodash',
     'pathfinding', 'pusher-js', 'laravel-echo'])
   .autoload({ jquery: ['$', 'jQuery', 'window.jQuery'] })
   .sass('resources/assets/sass/app.scss', 'public/css')
   .styles(['resources/assets/css/world.css'], 'public/css/all.css')
   //.sourceMaps()
   .webpackConfig({
     module: {
       rules: [
         {
           test: /\.tsx?$/,
           loader: 'ts-loader',
           options: { appendTsSuffixTo: [/\.vue$/] },
           exclude: /node_modules/,
         },
       ],
     },
     resolve: {
       extensions: ['*', '.js', '.jsx', '.vue', '.ts', '.tsx'],
     },
   });
