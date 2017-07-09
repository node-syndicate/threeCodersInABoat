const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const start = require('./app');

gulp.task('server', () => {
    start();
});

gulp.task('dev', ['server'], () => {
    return nodemon({
        ext: 'js',
        tasks: ['server'],
        script: 'app.js',
    });
});
