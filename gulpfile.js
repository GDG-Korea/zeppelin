/**
 * Korea HTML5
 * Copyright 2014 Korea HTML5
 */

var gulp = require('gulp');
var exec = require('child_process').exec;
var del = require('del');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var runSequence = require('run-sequence');

gulp.task('jekyll', function(cb){
	return exec('jekyll build --config _config.yml', function(error, stdout, stderr){
		console.log(stdout);
		cb();
	});
});

// Dist task, make distribution version with node application
gulp.task('dist', ['default'], function () {
//	return gulp.src(['_site/**/*'], {base: '.'})
//		.pipe(gulp.dest('dist'))
	return gulp.src(['_site/**/*'], {base: '.'})
});

// Watch files changes
gulp.task('watch', function() {
	gulp.watch(['*.html', 'js/**/*.js','_config.yml'], ['jekyll', reload]);
	//gulp.watch(['**/*.md'], ['jekyll', reload]);
});

// Browser-sync for preview
gulp.task('browser-sync', function() {
	browserSync.init(null, {
		notify: false,
		server: {
			baseDir: '_site'
		},
		port: 8888
	});
});

// Watch files for changes & reload
gulp.task('serve', ['default'], function (cb) {
	runSequence('browser-sync', 'watch', cb);
});

// Clean task
gulp.task('clean', del.bind(null, ['publish', 'dist']));

// Default task to build
gulp.task('default', ['clean'], function(cb) {
	runSequence('jekyll', cb);
});

