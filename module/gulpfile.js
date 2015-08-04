var gulp = require('gulp');
var qsh = require('qsh-resource');

gulp.task('qsh', function(){
    return gulp.src('./index.html')
        .pipe(qsh({
            iconfont: 'qshmobile'
        }))
        .pipe(gulp.dest('./'))
});

gulp.task('default', ['qsh']);