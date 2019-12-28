// define gulp plugins
const gulp         = require('gulp'),
	  browserSync  = require('browser-sync').create(),
	  reload       = browserSync.reload,
	  sass         = require('gulp-sass'),
	  plumber      = require('gulp-plumber'),
	  autoprefixer = require('gulp-autoprefixer'),
	  sourcemaps   = require('gulp-sourcemaps'),
	  concat       = require('gulp-concat'),
	  cssunit 	   = require('gulp-css-unit'),
	  uglify       = require('gulp-uglify'),
	  csso         = require('gulp-csso'),
	  babel        = require("gulp-babel"),
	  inject       = require('gulp-inject'),
	  hash         = require('gulp-hash-filename'),
	  clean        = require('gulp-clean'),
	  fileinclude  = require('gulp-file-include'),
	  notify       = require('gulp-notify'),
	  path         = require('path'),
	  svgo         = require('gulp-svgo'),
	  svgSprite    = require('gulp-svg-sprites'),
	  browserify   = require("browserify"),
	  source       = require('vinyl-source-stream'),
	  buffer       = require("vinyl-buffer"),
	  babelify     = require('babelify'),
	  pump         = require("pump")/*,
	  minimist     = require('minimist'),
	  args         = minimist(process.argv.slice(2))*/;

// define autoprefixer settings
const autoprefixerSettings = {
	overrideBrowserslist: [
		'last 3 versions',
    'last 3 firefox version',
    '>0.2%',
		'iOS 7',
	],
	cascade: false,
};

// define global path for source, destination and watching
const src = {
	web: {
		cssBuild         : 'web/assets/css/*.css',
		jsBuild          : 'web/assets/js/*.js',
		css              : 'web/assets/css/',
		js               : 'web/assets/js/',
		flagsSvg         : 'web/assets/images/flags/svg/',
		trustedMediaSvg  : 'web/assets/images/trusted-media/svg/',
		onlinePaymentSvg : 'web/assets/images/online-payment/svg/',
		svg              : 'web/assets/images/icons/svg/'
	},
	dev: {
		headerInput             : 'dev/html/base/header.html',
		footerInput             : 'dev/html/base/footer.html',
		baseOutput              : 'dev/html/base',
		scss                    : 'dev/assets/scss/*.scss',
		js                      : 'dev/assets/js/index.js',
		jsComponents            : 'dev/assets/js/components/*.js',
		svg                     : 'dev/assets/images/icons/svg/*.svg',
		trustedMediaSvg         : 'dev/assets/images/trusted-media/svg/*.svg',
		onlinePaymentSvg        : 'dev/assets/images/online-payment/svg/*.svg',
		flagsSvg                : 'dev/assets/images/flags/svg/*.svg',
		svgPreview              : 'dev/assets/images/icons/svg-preview/',
		trustedMediaSvgPreview  : 'dev/assets/images/trusted-media/svg-preview/',
		onlinePaymentSvgPreview : 'dev/assets/images/online-payment/svg-preview/',
		flagsSvgPreview         : 'dev/assets/images/flags/svg-preview/'
	},
	watch: {
		scss             : 'dev/assets/scss/**/*.scss',
		js               : 'dev/assets/js/**/*.js',
		svg              : 'dev/assets/images/icons/svg/*.svg',
		trustedMediaSvg  : 'dev/assets/images/trusted-media/svg/*.svg',
		onlinePaymentSvg : 'dev/assets/images/online-payment/svg/*.svg',
		flagsSvg         : 'dev/assets/images/flags/svg/*.svg',
		html             : 'dev/html/**/*.html'
	}
};

// static server + browserSync watching for all files
gulp.task('serve', () => {
	browserSync.init({
		server: {
			baseDir: './web/'
		},
		port: 9012
	});

	// watch any changes in .html, .css, .js files and reload browser
	browserSync.watch('web/**/*.*').on('change', reload);
});

// static server - for build watch on different devices
// TODO: remove after move project to git
gulp.task('build-serve', () => {
	browserSync.init({
		server: {
			baseDir: './web/'
		},
		port: 9000
	});
});

// compile sass into CSS dev
gulp.task('scss', cb => {
	pump([
		gulp.src(src.dev.scss),
		plumber(),
		sourcemaps.init(),
		sass(),
		cssunit({
			type: 'px-to-rem',
			rootSize: 16
		}),
		autoprefixer(autoprefixerSettings),
		sourcemaps.write(),
		gulp.dest(src.web.css)
	], cb);
});

// compile sass into CSS prod
gulp.task('build-scss', cb => {
	pump([
		gulp.src(src.dev.scss),
		sass(),
		cssunit({
			type: 'px-to-rem',
			rootSize: 16
		}),
		csso({restructure: false}),
		autoprefixer(autoprefixerSettings),
		hash(),
		gulp.dest(src.web.css)
	], cb);
});

// compile js dev
gulp.task('js', () => {
	return browserify(src.dev.js)
		.transform(babelify.configure({
			presets: ["@babel/preset-env"]
		}))
		.bundle()
		.pipe(source('build.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(src.web.js));
});

// compile js prod
gulp.task('build-js', () => {

    return browserify(src.dev.js)
        .transform(babelify.configure({
            presets: ["@babel/preset-env"]
        }))
        .bundle()
        .pipe(source('script.min.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(src.web.js));
});

// inject updated file name to header
gulp.task('inject-header', cb => {
	pump([
		gulp.src(src.dev.headerInput),
		inject(
			gulp.src([src.web.cssBuild], {read: false}), {
				transform: function (filepath) {
					if (filepath.slice(-4) === '.css') {
						return `<link rel="stylesheet" href="${filepath.slice(5)}" />`;
					}
					// Use the default transform as fallback:
					return inject.transform.apply(inject.transform, arguments);
				}
			}
		),
		gulp.dest(src.dev.baseOutput)
	], cb);
});

// inject updated file name to footer
gulp.task('inject-footer', cb => {
	pump([
		gulp.src(src.dev.footerInput),
		inject(
			gulp.src([src.web.jsBuild], {read: false}), {
				transform: function (filepath) {
					if (filepath.slice(-3) === '.js') {
						return `<script async src="${filepath.slice(5)}"></script>`;
					}
					// Use the default transform as fallback:
					return inject.transform.apply(inject.transform, arguments);
				}
			}
		),
		gulp.dest(src.dev.baseOutput)
	], cb);
});

// clean css && js dest directory
gulp.task('clean', cb => {
	pump([
		gulp.src([src.web.css, src.web.js], {read: false, allowEmpty: true}),
		clean()
	], cb);
});

// assemble html parts
gulp.task('html', cb => {
	pump([
		gulp.src('dev/html/*.html'),
		plumber({errorHandler: notify.onError('Error: <%= error.message %>')}),
		fileinclude({
			prefix: '@@',
			basepath: 'dev/html/base'
		}),
		gulp.dest('web/')
	], cb);
});

// create svg sprite from svg files - for dev only
gulp.task('svg-sprite', cb => {
	pump([
		gulp.src(src.dev.svg),
		svgSprite({
			mode: "symbols",
			preview: false,
			svgId: "icon-%f",
			svg: {
				symbols: "symbols.svg"
			}
		}),
		svgo({
			plugins: [
				{removeViewBox: false},
				{cleanupIDs: false},
				{removeTitle: true}
			]
		}),
		gulp.dest(src.web.svg)
	], cb);
});

// create svg sprite for trusted media from svg files - for dev only
gulp.task('svg-sprite-trusted-media', cb => {
	pump([
		gulp.src(src.dev.trustedMediaSvg),
		svgSprite({
			mode: "symbols",
			preview: false,
			svgId: "%f-logo",
			svg: {
				symbols: "symbols-trusted-media.svg"
			}
		}),
		svgo({
			plugins: [
				{removeViewBox: false},
				{cleanupIDs: false},
				{removeTitle: true}
			]
		}),
		gulp.dest(src.web.trustedMediaSvg)
	], cb);
});

// create svg sprite for online-payment from svg files - for dev only
gulp.task('svg-sprite-online-payment', cb => {
	pump([
		gulp.src(src.dev.onlinePaymentSvg),
		svgSprite({
			mode: "symbols",
			preview: false,
			svgId: "%f-logo",
			svg: {
				symbols: "symbols-online-payment.svg"
			}
		}),
		svgo({
			plugins: [
				{removeViewBox: false},
				{cleanupIDs: false},
				{removeTitle: true}
			]
		}),
		gulp.dest(src.web.onlinePaymentSvg)
	], cb);
});

// create svg sprite for country flags from svg files - for dev only
gulp.task('svg-sprite-flags', cb => {
	pump([
		gulp.src(src.dev.flagsSvg),
		svgSprite({
			mode: "symbols",
			preview: false,
			svgId: "%f-logo",
			svg: {
				symbols: "symbols-flags.svg"
			}
		}),
		svgo({
			plugins: [
				{removeViewBox: false},
				{cleanupIDs: false},
				{removeTitle: true}
			]
		}),
		gulp.dest(src.web.flagsSvg)
	], cb);
});

// generate preview for svg sprite from svg files - for dev only
gulp.task('svg-sprite-preview', cb => {
	pump([
		gulp.src(src.dev.svg),
		svgSprite({
			mode: "symbols",
			svgId: "icon-%f",
			svg: {
				symbols: "symbols.svg"
			},
			preview: {
				sprite: "sprite-preview.html"
			}
		}),
		gulp.dest(src.dev.svgPreview)
	], cb);
});

// generate trusted media preview for svg sprite from svg files - for dev only
gulp.task('trusted-media-svg-sprite-preview', cb => {
	pump([
		gulp.src(src.dev.trustedMediaSvg),
		svgSprite({
			mode: "symbols",
			svgId: "%f-logo",
			svg: {
				symbols: "symbols-trusted-media.svg"
			},
			preview: {
				sprite: "sprite-preview.html"
			}
		}),
		gulp.dest(src.dev.trustedMediaSvgPreview)
	], cb);
});

// generate online-payment preview for svg sprite from svg files - for dev only
gulp.task('online-payment-svg-sprite-preview', cb => {
	pump([
		gulp.src(src.dev.onlinePaymentSvg),
		svgSprite({
			mode: "symbols",
			svgId: "%f-logo",
			svg: {
				symbols: "symbols-online-payment.svg"
			},
			preview: {
				sprite: "sprite-preview.html"
			}
		}),
		gulp.dest(src.dev.onlinePaymentSvgPreview)
	], cb);
});

// generate country flags preview for svg sprite from svg files - for dev only
gulp.task('flags-svg-sprite-preview', cb => {
	pump([
		gulp.src(src.dev.flagsSvg),
		svgSprite({
			mode: "symbols",
			svgId: "%f-logo",
			svg: {
				symbols: "symbols-flags.svg"
			},
			preview: {
				sprite: "sprite-preview.html"
			}
		}),
		gulp.dest(src.dev.flagsSvgPreview)
	], cb);
});

// watch any changes in html, css, js files
gulp.task('watch', () => {
	gulp.watch(src.watch.scss, gulp.series('scss'));
	gulp.watch(src.watch.js, gulp.series('js'));
	gulp.watch(src.watch.html, gulp.series('html'));
	gulp.watch(src.watch.svg, gulp.series('svg-sprite', 'svg-sprite-preview'));
	gulp.watch(src.watch.trustedMediaSvg, gulp.series('svg-sprite-trusted-media', 'trusted-media-svg-sprite-preview'));
	gulp.watch(src.watch.onlinePaymentSvg, gulp.series('svg-sprite-online-payment', 'online-payment-svg-sprite-preview'));
	gulp.watch(src.watch.flagsSvg, gulp.series('svg-sprite-flags', 'flags-svg-sprite-preview'));
});

// build task
gulp.task('build', gulp.series(
	'clean',
	gulp.parallel('build-scss', 'build-js'),
	'inject-header',
	'inject-footer',
	'html'
	// 'build-serve' // TODO: remove after move project to git
));

// default task
gulp.task('default', gulp.series(
	'clean',
	gulp.parallel('scss', 'js'),
	'inject-header',
	'inject-footer',
	'html',
	'svg-sprite',
	'svg-sprite-trusted-media',
	'svg-sprite-online-payment',
	'svg-sprite-flags',
	'svg-sprite-preview',
	'trusted-media-svg-sprite-preview',
	'online-payment-svg-sprite-preview',
	'flags-svg-sprite-preview',
	gulp.parallel('watch', 'serve')
));
