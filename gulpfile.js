const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');

gulp.task('server', () => {
    return require('./server');
});

gulp.task('pre-test', () => {
    return gulp.src([
        './data/**/*.js',
        './app/routers/**/*.js',
        './models/**/*.js',
    ])
        .pipe(istanbul({
            includeUntested: true,
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('tests:unit', ['pre-test'], () => {
    return gulp.src([
        './tests/unit/**/*.js',
        './tests/integration/**/*.js',
    ])
        .pipe(mocha({
            reporter: 'spec',
        }))
        .pipe(istanbul.writeReports());
});

const config = {
    connectionString: 'mongodb://127.0.0.1:27017/test-database',
    port: 3002,
};

gulp.task('test-server:start', () => {
    return Promise.resolve()
        .then(() => {
            require('./db').init(config.connectionString)
                .then((db) => {
                    return require('./data').init(db);
                })
                .then((data) => {
                    return require('./app').init(data);
                })
                .then((app) => {
                    app.listen(config.port, () => {
                        console.log('test server started');
                    });
                });
        });
});

const { MongoClient } = require('mongodb');

gulp.task('test-server:stop', () => {
    return MongoClient.connect(config.connectionString)
        .then((db) => {
            return db.collection('users').remove({});
        });
});

gulp.task('tests:browser', ['test-server:start'], () => {
    return gulp.src('./tests/browser/tests/**/*.js')
        .pipe(mocha({
            reporter: 'spec',
            timeout: 10000,
        }))
        .once('end', () => {
            return gulp.start('test-server:stop');
        });
});


