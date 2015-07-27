var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();

var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('vet', function () {
    log('Analyzing srouce with JSHint and JSCS');
    return gulp.src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: args.verbose}))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('styles', function(){
    log('Compiling stylus to Css');
    return gulp.src(config.stylus)
        .pipe($.stylus())
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest(config.temp))
});


/////////////////////////
// Utility Functions
/////////////////////////

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
