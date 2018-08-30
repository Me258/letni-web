var gulp = require('gulp');
var browserSync = require('browser-sync').create();


gulp.task(
  'copy',
  gulp.series(
    function copyHTML() {
      return gulp
        .src(['src/templates/**/*'])
        .pipe(gulp.dest('./dist'))
        .on('end', function() {
          browserSync.reload(); 
        });
    },
    function copyAssets() {
      return gulp
        .src(['src/images/**/*', 'src/css/**/*'], {
          base: 'src/'
        })
        .pipe(gulp.dest('./dist'))
        .on('end', function() {
          browserSync.reload();
        });
    }
  )
);


gulp.task(
  'develop',
  gulp.series(
    gulp.parallel('copy'),
    function startBrowsersync() {
      browserSync.init({
        server: {
          baseDir: './dist',
          serveStaticOptions: {
            extensions: ['html']
          }
        }
      });
      gulp.watch('./src/**/*', gulp.series('copy')); 
    }
  )
);

gulp.task('default', gulp.series('develop'));

