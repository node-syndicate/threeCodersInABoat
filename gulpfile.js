const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');

gulp.task('server', () => {
    return require('./server');
});

gulp.task('pre-test', () => {
    gulp.src([
        './data/**/*.js',
        './app/**/*.js',
        './config/**/*.js',
        './db/**/*.js',
        './models/**/*.js',
        './server.js',
    ])
        .pipe(istanbul({
            includeUntested: true,
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('tests:unit', ['pre-test'], () => {
    return gulp.src('./tests/unit/**/*.js')
                .pipe(mocha({
                    reporter: 'nyan',
                }))
                .pipe(istanbul.writeReports());
});

