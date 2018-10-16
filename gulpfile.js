var gulp = require('gulp');
//require:相当于<script src="gulp.js"></script>
var concat =require("gulp-concat");
var sass=require("gulp-sass");
var rename=require("gulp-rename");

let basepath = "D:\\phpStudy\\WWW\\caomao";	
//定义一个复制文件的任务
//task函数的第一个参数：copyHtml是任务名
//task函数的第二个参数function是任务copyHtml对应的功能
gulp.task("copy-html",function(){
	gulp.src("*.html")
	.pipe(gulp.dest(basepath)),
	gulp.src("html/**/*")
	.pipe(gulp.dest(basepath+"\\html"));
});
gulp.task("copy-users",function(){
	gulp.src("users/**/*")
	.pipe(gulp.dest(basepath+"\\users"));
})
gulp.task("copy-img",function(){
	gulp.src("img/**/*")
	.pipe(gulp.dest(basepath+"\\img"))
});
gulp.task("copy-js",function(){
	gulp.src("js/**/*")
	.pipe(gulp.dest(basepath+"\\js"))
});
gulp.task("sass",function(){
	gulp.src("sass/*.scss")
	.pipe(sass())
	.pipe(gulp.dest(basepath+"\\css"));
});
//gulp.task("sass",function(){
//	gulp.src("sass/sidebar.scss")
//	.pipe(sass())
//	.pipe(gulp.dest(basepath+"\\css"));
//});
gulp.task("build",["copy-html","copy-img","sass","copy-js","copy-users"],function(){
	console.log("ok le");
});
//监听
gulp.task("watchall",function(){
	//一旦index.html的内容发生改变，那么就立即执行任务copyHtml；
	gulp.watch("*.html",["copy-html"]);
	gulp.watch("img/**/*",["copy-img"]);
	gulp.watch("js/**/*",["copy-js"]);
	gulp.watch("sass/*.scss",["sass"]);
	gulp.watch("users/**/*",["copy-users"])
});
