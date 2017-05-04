var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    less = require('gulp-less'),
    concat = require('gulp-concat');
    imagemin = require('gulp-imagemin');

gulp.task('default', function() {
    return gulp.src('src/styles/all.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 7 versions'],
            cascade: true
        }))
        .pipe(concat('stylesheet.css'))
        .pipe(gulp.dest('dist/stylesheet')),

    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});

gulp.task('watch', function() {
    gulp.watch(['src/styles/*.less', 'src/images/*'], ['default']);
});