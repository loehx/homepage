var gulp   = require('gulp');
var mocha = require('gulp-mocha');
var bower = require('gulp-bower');

gulp.task('unitTest', function () {
  gulp.src('dependencies/**/*.spec.js', {cwd: __dirname})
    .pipe(mocha({ reporter: 'list' }));
});

gulp.task('watch', ['test'], function () {
  gulp.watch('dependencies/**/*.js', ['test']);
});

gulp.task('bower', function() {
  return bower();
});

gulp.task('test', ['unitTest']);
gulp.task('default', ['bower', 'test']);
