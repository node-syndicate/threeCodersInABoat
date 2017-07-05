const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

gulp.task('server', () => {
    const app = require('./server');
    const port = 8080;
    app.listen(port, () => {
        console.log('server started');
    });
});

gulp.task('dev', ['server'], () => {
    return nodemon({
        ext: 'js',
        tasks: ['server'],
        script: 'app.js',
    });
});
