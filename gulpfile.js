var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    bourbon = require('node-bourbon').includePaths,
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync');

gulp.task('sass', function() {
    return gulp.src(['src/sass/pluma-sa2.sass'])
        .pipe(sass({
            includePaths: bourbon,
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('minify-css', function() {
    return gulp.src(['dist/css/pluma-sa2.css'])
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    })
});

gulp.task('watch', ['sass', 'minify-css', 'browserSync'], function() {
    gulp.watch('src/scss/**/*.scss', ['scss']);
    gulp.watch('dist/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['watch']);
