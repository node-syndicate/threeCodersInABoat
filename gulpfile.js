const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const startServer = require('./app');

gulp.task('server', () => {
    startServer();
});

gulp.task('dev', ['server'], () => {
    return nodemon({
        ext: 'js',
        tasks: ['server'],
        script: 'app.js',
    });
});
