const gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    babel = require('rollup-plugin-babel'),
    rollup = require('gulp-rollup'),
    includePaths = require('rollup-plugin-includepaths'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    batch = require('gulp-batch'),
    jshint = require('gulp-jshint'),
    gulpif = require('gulp-if'),
    argv = require('yargs').argv,
    istanbul = require('gulp-babel-istanbul');

var __production = false;
if (argv.production || argv.prod) {
     __production = true;
}

const includePathOptions = {
    paths: ['./src/js', './node_modules'],
    external: [],
    extensions: ['.js']
};

// build javascript from source
gulp.task('script', function () {
    return gulp.src(['src/js/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(rollup({
            entry: './src/js/index.js',
            allowRealFiles: true,
            plugins: [                
                babel({
                    presets: [ ['es2015', {"modules": false}] ],
                    plugins: ['external-helpers', 'transform-decorators-legacy']
                }),
                includePaths(includePathOptions)
            ]
        }))
        //.pipe()
        .pipe(concat('schematic.js'))
        .pipe(gulpif(__production, uglify()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
});

// build css from source
gulp.task('style', function () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(concat('schematic.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
});

// watch for any file changes in src folder
gulp.task('watch', function () {
    watch('src/**/*', batch(function (events, done) {
        gulp.start('default', done);
    }));

});

// server for testing
gulp.task('server', function () {

    connect.server({
        port: 8000,
        root: 'examples',
        livereload: true
    });

});

// default task defined
gulp.task('default', ['script', 'style']);

// compile from source and start server for testing
// continue watching for any file changes in src folder
gulp.task('serve', ['default', 'server', 'watch']);