var gulp = require('gulp'),
    uglify = require('gulp-uglifyjs'),
    streamify = require('gulp-streamify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    jshint = require('gulp-jshint'),
    webserver = require('gulp-webserver'),
    package = require('./package.json');

var paths = {
    main: ['./site.js'],
    scripts: ['./src/**/*.js'],
    build: './'
};

function browserified () {
    return browserify({
        entries: paths.main
    })
    .bundle()
}

gulp.task('build', function () {
    browserified()
        .pipe(source(package.name + '.js'))
        .pipe(gulp.dest(paths.build));
});

gulp.task('min', function () {
    browserified()
        .pipe(source(package.name + '.min.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('./'));
});

gulp.task('lint', function () {
    return gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('watch', ['build'], function () {
    gulp.watch(paths.scripts, ['build'])
});

gulp.task('webserver', function() {
    gulp.src('.')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            port: 1337,
            open: false
        }));
});

gulp.task('default', ['webserver', 'watch']);
