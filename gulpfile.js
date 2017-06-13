var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');


// Compile Sass into css & auto inject into browsers.
gulp.task('sass', function() {
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*scss'])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});


// Move javascript files into /src/js folder
gulp.task('js', function() {
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/tether/dist/js/tether.min.js'])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());
});


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: "./src"
  });

  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*scss'], ['sass']);

  gulp.watch("src/*html").on('change', browserSync.reload);
});


// Default task 
gulp.task('default', ['js', 'serve']);
