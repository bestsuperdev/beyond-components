var LessAutoprefix = require('less-plugin-autoprefix')
var less = require('gulp-less');
// var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
var autoprefix = new LessAutoprefix()
var gulp = require('gulp')
gulp.src('./src/**/*.less')
  .pipe(less({
    plugins: [autoprefix]
  }))
  .pipe(gulp.dest('./lib'));