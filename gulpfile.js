var gulp = require('gulp'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify'),
    sass = require('gulp-sass'),
    nodemon = require('nodemon'),
    livereload = require('gulp-livereload'),
    ngAnnotate = require('gulp-ng-annotate'),
    cssnano = require('gulp-cssnano'),
    del = require('del'),
    gulpIf = require('gulp-if');


var path = 'dist';
var isDev;
function setIsDev(value) {
    isDev = true;
    path = value ? 'tmp' : 'dist';

}


gulp.task('js', function () {

    gulp.src(['src/scripts/app.js', 'src/scripts/*.js'])
        .pipe(concat('all.js'))
        .pipe(ngAnnotate())
        .pipe(gulpIf(!isDev, minify({
            ext: {
                src: '-debug.js',
                min: '.js'
            }
        })))
        .pipe(gulp.dest(path + '/scripts'));

});


gulp.task('sass', function () {

    gulp.src('src/styles/*.scss')
        .pipe(sass())
        .pipe(gulpIf(!isDev, cssnano()))
        .pipe(gulp.dest(path + '/styles'))
});


gulp.task('clean', function () {

    return del.sync('dist/*');
});

//This sub-task pipes the images to dist folder
gulp.task('images', function () {
    return gulp.src('src/images/**/*')
        .pipe(gulp.dest(path + '/images'));
});

//This sub-task pipes all the views to the dist folder
gulp.task('views', function () {
    return gulp.src('src/views/*')
        .pipe(gulp.dest(path + '/views'));
});

//This sub-task pipes all fonts to the dist folder
gulp.task('fonts', function () {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest(path + '/fonts'))
})

//This sub-task pipes the index.html and the icons to the dist folder
gulp.task('index', function () {
    return gulp.src('src/index.html')
        .pipe(gulp.dest(path + '/'));
});


//refresh task - refreshes the browsee
gulp.task('refresh', function () {

    livereload.reload();
});

//server task - responsilbe for running our express server
gulp.task('server', function () {

    livereload.listen(); //start listening for changes

    nodemon({
        'script': 'server.js',
        //nodemon should only restart the server when `server.js` changes so we ignore the rest:
        'ignore': ['src/index.html', 'package.json', 'gulpfile.js', 'src/scripts/*.js', 'tmp']
    }).on('restart', function () {
        livereload.reload(); //on server restart, refresh the browser
    })
});


gulp.task('watch', function () {

    setIsDev(true);

    gulp.watch('src/styles/*.scss', ['sass', 'refresh']);
    gulp.watch('src/scripts/**/*.js', ['js', 'refresh']);
    gulp.watch('src/**/*.html', ['views', 'refresh']);

});

gulp.task('start', ['server', 'watch', 'sass', 'js', 'views', 'index']);


gulp.task('build', ['clean', 'sass', 'js', 'images', 'views', 'index']);

