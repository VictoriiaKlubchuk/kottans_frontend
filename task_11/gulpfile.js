var gulp         = require('gulp'),
	sass         = require('gulp-sass'),
	browserSync  = require('browser-sync'),
	imagemin     = require('gulp-imagemin'),
	pngquant     = require('imagemin-pngquant'),
	cache        = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer'),
	concat       = require('gulp-concat'),
	copy         = require('gulp-copy');
	// uglify       = require('gulp-uglifyjs'),
	// rename = require('gulp-rename'),
	// cssnano = require('gulp-cssnano');

gulp.task('sass', function() {
	return gulp.src('src/scss/**/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('css', function() {
	return gulp.src('src/css/*.css')
	.pipe(autoprefixer({
	browsers: ['last 15 versions','>1%', 'ie 8', 'ie 7'],
	cascade: false
	}))
	.pipe(gulp.dest('dist/css'))
});

gulp.task('browserSync', () => {
	browserSync({
		server: {
			baseDir: 'dist'
		},
		notify: false
	});
});

gulp.task('pages', function() {
	return gulp.src('src/*.html')
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('img', () => {
	gulp.src('src/img/*')
	.pipe(imagemin({
	    interlaced: true,
	    progressive: true,
	    optimizationLevel: 5,
	    svgoPlugins: [{removeViewBox: true}]
	}))
	.pipe(gulp.dest('dist/img'))
});

gulp.task('copy', ()=>{
	return gulp.src('src/fonts/*.*')
	.pipe(gulp.dest('dist/fonts'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('default', function() {
	gulp.start('pages', 'sass', 'img', 'browserSync', 'css', 'copy');
	gulp.watch('src/*.html', ['pages']);
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch('src/css/*.css', ['css']);
});

// gulp.task('scripts', () => {
// 	return gulp.src(['src/libs/masonry/dist/masonry.pkgd.js', 'src/js/*.js'])
// 	.pipe(concat('script.js'))
// 	.pipe(uglify())
// 	.pipe(gulp.dest('dist/js'))
// 	.pipe(browserSync.reload({stream: true}))
// });



// gulp.task('default', function() {
// 	gulp.start('pages', 'sass', 'browserSync', 'css', 'img', 'scripts', 'copy');
// 	gulp.watch('src/*.html', ['pages']);
// 	gulp.watch('src/sass/**/*.scss', ['sass']);
// 	gulp.watch('src/css/*.css', ['css']);
// 	gulp.watch('src/js/**/*.js', ['scripts']);
// });
