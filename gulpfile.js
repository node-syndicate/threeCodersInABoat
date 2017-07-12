const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const startServer = require('./server');

gulp.task('server', () => {
    startServer();
});

gulp.task('dev', ['server'], () => {
    return nodemon({
        ext: 'js',
        tasks: ['server'],
        script: 'server.js',
    });
});
