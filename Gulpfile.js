var gulp = require('gulp')
var gutil = require('gulp-util')
var filter = require('gulp-filter')
var concat = require('gulp-concat')
var livereload = require('gulp-livereload')
var cached = require('gulp-cached')
var markdown = require('gulp-markdown')
var ecstatic = require('ecstatic')
var http = require('http')
var through = require('through2')

var globs = {
  src: 'src/**/*',
  out: 'build/**/*',
  md: '**/*.md',
  js: '**/*.js',
  html: '**/*.html'
}

var dirs = {
  src: 'src',
  out: 'build'
}

var lrscript = new Buffer('<script>document.write(\'<script src="http://\' + (location.host || \'localhost\').split(\':\')[0] + \':35729/livereload.js?snipver=1"></\' + \'script>\')</script>')
var live = true

gulp.task('build', function() {
  var md = filter(globs.md)
  var html = filter(globs.html)

  return gulp.src([globs.src])
    .pipe(cached(dirs.out))
    .pipe(md)
      .pipe(markdown())
      .pipe(md.restore())
    .pipe(html)
      .pipe(live
        ? through.obj(function transform(file, enc, cb) {
          file.contents = Buffer.concat([file.contents, lrscript])
          this.push(file)
          cb()
        })
        : gutil.noop())
      .pipe(html.restore())
    .pipe(gulp.dest(dirs.out))
})


gulp.task('server', ['build'], function(next) {
  return http.createServer(ecstatic({ root: __dirname + '/' + dirs.out })).listen(8080, function(err) {
    if (err) throw err
    gutil.log('Static fileserver Listening on: 8080')
    next()
  })
})


gulp.task('watch', ['server'], function(next) {
  livereload.listen()
  gulp.watch([globs.out], livereload.changed)

  gulp.watch([globs.src], ['build'])
})