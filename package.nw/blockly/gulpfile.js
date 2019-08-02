var gulp = require('gulp');
var uglify = require('gulp-uglify-es').default;
var rename = require('gulp-rename');
var debug = require('gulp-debug');
var notify = require('gulp-notify');
var merge = require('merge-stream');
var path = require('path');
var fs = require('fs');

var SOURCE_DIR = 'src';
var DIST_DIR = 'dist';

gulp.task('uglify', function (done) {
  var pathsToConcat = '!' + SOURCE_DIR + '/**/*.min.js';
  var pathsToUglify = [SOURCE_DIR + '/**/*.js', '!' + SOURCE_DIR + '/**/*.min.js'];
  var minStream = gulp
      .src(pathsToUglify)
      .pipe(uglify())
      .pipe(rename(function (path) {
        path.basename += ".min";
        path.extname = ".js";
    }));
  var concatStream = gulp.src(pathsToConcat).pipe(debug({title: 'Skip file:'}))
  var mergedStream = merge(minStream, concatStream).pipe(gulp.dest(DIST_DIR));

  mergedStream.on('end', function () {
    notify({
      title: 'Uglify',
      message: 'Code 都變醜了呢'
    }).write('');
    done();
  });

  mergedStream.on('error', function (err) {
    done(err);
  });
});

gulp.task('watch', function () {
  gulp.watch(SOURCE_DIR + '/*.js', ['uglify']);
});

gulp.task('default', ['uglify']);
gulp.task('build:watch', ['uglify', 'watch']);

