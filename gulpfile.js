var gulp   = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('unitTest', function () {
  gulp.src('dependencies/**/*.spec.js', {cwd: __dirname})
    .pipe(mocha({ reporter: 'list' }));
});

gulp.task('watch', ['test'], function () {
  gulp.watch('dependencies/**/*.js', ['test']);
});

gulp.task('test', ['unitTest']);
gulp.task('default', ['test']);
