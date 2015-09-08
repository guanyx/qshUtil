var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var sequence = require('run-sequence');
var del = require('del');
var _ = require('lodash');
var fs = require('fs');

gulp.task('script', function(){
    var sources = [
        'qsh-lite.js',
        'global/global.js',
        'util/js/util.js',
        'header/js/head.js',
        'header/js/preHead.js',
        'loading/js/spinner.js',
        'module/js/module.js',
        'fixed/js/fixed.js',
        'top/top.js',
        'toast/js/toast.js',
        'footer/js/footer.js',
        'alert/js/alert.js',
        'modal/modal.js'
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
        'header/css/head.less',
        'header/css/pre.less',
        'module/css/module.less',
        'top/top.less',
        'toast/css/toast.less',
        'footer/css/footer.less',
        'alert/css/alert.less',
        'modal/modal.less'
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
            browsers: ['last 20 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe($.size({title: 'styles'}));
});

gulp.task('rev:lite', function(){
    return gulp.src(['dist/css/*.css', 'dist/js/*.js'], {base: 'dist/'})
        .pipe($.rev())
        .pipe(gulp.dest('dist/'))
        .pipe($.rev.manifest())
        .pipe(gulp.dest('dist/'))
});

gulp.task('rev:top', function(){
    return gulp.src(['topScript/site/*.js'], {base: 'topScript/'})
        .pipe($.rev())
        .pipe(gulp.dest('topScript/'))
        .pipe($.rev.manifest())
        .pipe(gulp.dest('topScript/'))
});

gulp.task('styles', function(done){
    return sequence(
        ['css:less', 'css:sass'],
        'style',
        'rev:lite',
        done
    )
});

gulp.task('topScript', function(){
    return gulp.src('topScript/src/*.js')
        .pipe($.concat('top.js'))
        .pipe($.uglify())
        .pipe(gulp.dest('topScript/site'));
});

gulp.task('clean', function(){
    return del(['./tmp']);
});

gulp.task('clean:dist', function(){
    return del(['./dist', './topScript/site'])
});

gulp.task('concat:manifest', function(done){
    var lite = JSON.parse(fs.readFileSync('./dist/rev-manifest.json', {encoding: 'utf-8'}));
    var top = JSON.parse(fs.readFileSync('./topScript/rev-manifest.json', {encoding: 'utf-8'}));

    var obj = _.assign(lite, top);
    fs.writeFileSync('./rev-manifest.json', JSON.stringify(obj));
    done()
});

gulp.task('default', function(done){
    sequence(
        'clean:dist',
        ['script', 'styles', 'topScript'],
        'rev:top',
        'concat:manifest',
        'clean',
        done
    )
});