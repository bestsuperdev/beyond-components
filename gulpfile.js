var LessAutoprefix = require('less-plugin-autoprefix')
var less = require('gulp-less');
// var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
var autoprefix = new LessAutoprefix()
var gulp = require('gulp')
gulp.src('./src/**/index.less')
  .pipe(less({
    plugins: [autoprefix]
  }))
  .pipe(gulp.dest('./lib'));

gulp.src('./src/**/mixin.less')
  // .pipe(less({
  //   plugins: [autoprefix]
  // }))
  .pipe(gulp.dest('./lib'));

gulp.src('./src/mixins.less')
  // .pipe(less({
  //   plugins: [autoprefix]
  // }))
  .pipe(gulp.dest('./lib'));