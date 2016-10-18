var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');

gulp.task('default', function() {
  
  gulp.src([
  	'src/schematic.js', 
  	'src/schematic.helpers.js',
    'src/schematic.xhr.js',
    'src/schematic.decorator.js',
    'src/schematic.router.js'
    ]).pipe(concat('schematic.js')).pipe(minify()).pipe(gulp.dest('build'));

});