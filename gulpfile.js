var path = require('path');
var gulp = require('gulp');
var ts = require('gulp-typescript');
var cleanCompiledTypeScript = require('gulp-clean-compiled-typescript');
var nodemon = require('gulp-nodemon'),
livereload = require('gulp-livereload');

gulp.task('buildServer', function () {
    var tsProject = ts.createProject(path.resolve('./tsconfig.json'));
    return gulp.src(path.resolve('./server/**/*.ts'))
        .pipe(tsProject())
        .js
        .pipe(gulp.dest(path.resolve('./build')))
});

gulp.task('watch', function() {
    gulp.watch('./server/**/*.ts', ['buildServer']);
});

gulp.task('launchServer', ['buildServer'], function () {
    livereload.listen();
    nodemon({
        script: './build/index.js',
        ext: 'js',
    }).on('restart', function () {
        setTimeout(function () {
            livereload.changed();
        }, 500);
    });
});

gulp.task('default', ['launchServer']);