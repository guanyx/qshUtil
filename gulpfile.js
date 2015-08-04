var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var sequence = require('run-sequence');
var del = require('del');

gulp.task('script', function(){
    var sources = [
        'qsh-lite.js',
        'head/js/head.js',
        'loading/js/spinner.js',
        'module/js/module.js'
    ];

    return gulp.src(sources)
        .pipe($.concat('qsh-lite.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe($.uglify())
        .pipe($.concat('qsh-lite-min.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe($.size({title: 'scripts'}));
});

gulp.task('css:less', function(){
    var sources = [
        'head/css/head.less',
        'module/css/module.less'
    ];

    return gulp.src(sources)
        .pipe($.less())
        .pipe(gulp.dest('./tmp/css'))
});

gulp.task('css:sass', function(){
    var sources = [
        'loading/matiral/spinner.scss'
    ];

    return gulp.src(sources)
        .pipe($.sass())
        .pipe(gulp.dest('./tmp/css'));
});

gulp.task('style', function(){
    return gulp.src('./tmp/css/*.css')
        .pipe($.concat('qsh-lite.css'))
        .pipe($.autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe($.csso())
        .pipe($.concat('qsh-lite-min.css'))
        .pipe($.autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe($.size({title: 'styles'}));
});

gulp.task('styles', function(done){
    return sequence(
        ['css:less', 'css:sass'],
        'style',
        done
    )
});

gulp.task('clean', function(){
    return del(['./tmp']);
});

gulp.task('default', function(done){
    sequence(
        ['script', 'styles'],
        'clean',
        done
    )
});