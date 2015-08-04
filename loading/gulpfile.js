var gulp = require('gulp');
var qsh = require('qsh-resource');

gulp.task('qsh', function(){
    gulp.src(
        "./test.html"
    )
        .pipe(qsh())
        .pipe(gulp.dest("./dist"));
});

gulp.task('default', ['qsh']);