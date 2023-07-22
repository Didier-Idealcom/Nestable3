const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cleanCss = require('gulp-clean-css');
const eslint = require('gulp-eslint');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('node-sass'));

const file = 'jquery.nestable';

// compress js
function js() {
  return gulp
    .src(file + '.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/'));
}

// compile SASS to CSS
function compileSass() {
  return gulp
    .src(file + '.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('.'));
}

// compress css
function css() {
  return gulp
    .src(file + '.css')
    .pipe(cleanCss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/'));
}

function test() {
  return gulp
    .src([file + '.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

// build assets
gulp.task('js', js);
gulp.task('sass', compileSass);
gulp.task('css', gulp.series(compileSass, css));
gulp.task('test', test);

gulp.task('default', gulp.series('js', 'css'));
