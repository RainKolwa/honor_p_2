var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

var paths = {
	scripts: [
		'node_modules/jquery/dist/jquery.min.js'
	],
	styles: [
	]
}

// 检查js
gulp.task('lint', function(){
	gulp.src('./js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
})

// 编译scss + watch
gulp.task('sass', function() {
    gulp.src('./scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());

    gulp.src(paths.styles)
    	.pipe(concat('lib.css'))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
});

// 合并js
gulp.task('scripts', function(){
	gulp.src('./js/*.js')
		.pipe(concat('main.js'))
		.pipe(gulp.dest('./dist'))
		.pipe(browserSync.stream());

	gulp.src(paths.scripts)
		.pipe(concat('lib.js'))
		.pipe(gulp.dest('./dist'))
		.pipe(browserSync.stream());
})

// browser-sync
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// defalut
gulp.task('default', function() {

	gulp.run('lint', 'sass', 'scripts', 'browser-sync');

	gulp.watch(['./scss/*.scss', "./scss/*/*.scss"], function(){gulp.run('sass');});

	gulp.watch('./js/*.js', function(){ gulp.run('lint', 'scripts');});	

	gulp.watch(["./*.html", "./dist/*"]).on('change', browserSync.reload);

});