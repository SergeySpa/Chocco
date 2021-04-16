const { src, dest, task, series, watch, parallel } = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');
const env = process.env.NODE_ENV;

const { DIST_PATH, SRC_PATH, STYLES__LIBS, JS_LIBS } = require('./gulp.config');

sass.compiler = require('node-sass');


task('clean', () => {
  return src(`${DIST_PATH}/**/*`, { read: false }).pipe(rm());
});


task('copy:html', () => {
  return src(`${SRC_PATH}/*.html`)
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});


task('copy:img', () => {
  return src(`${SRC_PATH}/img/**`)
    .pipe(dest(`${DIST_PATH}/img`))
    .pipe(reload({ stream: true }));
});


task('copy:vid', () => {
  return src(`${SRC_PATH}/vid/**`)
    .pipe(dest(`${DIST_PATH}/vid`))
    .pipe(reload({ stream: true }));
});


task('styles', () => {
  return src([
    ...STYLES__LIBS,
    `${SRC_PATH}/css/main.scss`
  ])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    
    .pipe(gulpif(env === 'dev',
      autoprefixer({
        cascade: false
      }))
    )
    
    .pipe(gulpif(env === 'prod', cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(`${DIST_PATH}/css`))
    .pipe(reload({ stream: true }));
});


task('scripts', () => {
  return src([
    ...JS_LIBS,
    `${SRC_PATH}/js/*.js`
  ])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.js', { newLine: ';' }))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(`${DIST_PATH}/js`))
    .pipe(reload({ stream: true }));
});



task('server', () => {
  browserSync.init({
    server: {
      baseDir: `./${DIST_PATH}`
    },
    open: false
  });
});


task('watch', () => {
  watch(`./${SRC_PATH}/css/**/*.scss`, series("styles"));
  watch(`./${SRC_PATH}/*.html`, series("copy:html"));
  watch(`./${SRC_PATH}/js/*.js`, series("scripts"));
  
})


task(
  'default',
  series(
    'clean',
    parallel(
      'copy:html',
      'copy:img',
      'copy:vid',
      'styles',
      'scripts'
    ),
    parallel('watch', 'server')
  ));


task(
  'build',
  series(
    'clean', 
    parallel(
      'copy:html',
      'copy:img',
      'copy:vid',
      'styles',
      'scripts'
    ))
);