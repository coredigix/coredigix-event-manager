'use strict';

var gulp	= require('gulp');
var minify	= require('gulp-minify');
var include	= require("gulp-include");
var rename	= require("gulp-rename");

gulp.task('node', () => {
	gulp.src('assets/node.js')
		.pipe(include({
			hardFail: true
		}))
		.pipe(rename('coredigix-event-manager.js'))
		// .pipe(minify())
		.pipe(gulp.dest("dist/"));
});