var gulp = require('gulp');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('angular', function()
{
    gulp.src(['public/viajapp/**/*.js'])
        .pipe(concat('compiled.js'))
        .pipe(ngAnnotate())
        .pipe(gulp.dest('public'));
});

gulp.task('watch-js', function()
{
    gulp.watch('public/viajapp/**/*.js', ['angular']);
});

gulp.task('build', ['angular']);