var gulp = require('gulp')
var livereload = require('gulp-livereload')
var ecstatic = require('ecstatic')
var http = require('http')

var fileglob = ['*','2010/**/*', 'assets/**/*']

gulp.task('watch', ['serve'], function() {
  livereload.listen()
  gulp.watch(fileglob).on('change', livereload.changed)
})

gulp.task('serve', function(next) {
  http.createServer(ecstatic({ root: __dirname })).listen(8080, function(err) {
    if (err) throw err
    console.log('Listening on :8080')
    next()
  })
})