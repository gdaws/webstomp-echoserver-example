var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');

function createBrowserifyBundler(mainSourceFile, options) {
  var bundler = browserify(mainSourceFile, options);
  bundler.transform(reactify);
  bundler.on('log', gutil.log);
  return bundler;
}

function buildJSBundlePipeline(bundler, builtSourceFilename, destPath) {  
  return bundler.bundle()
    .pipe(source(builtSourceFilename))
    .pipe(gulp.dest(destPath));
}

function createAppBrowserifyBundle(opts) {
  return createBrowserifyBundler('./src/client/app.js', opts);
}

function createAppBundlePipelineConstructor(bundler) {
  return buildJSBundlePipeline.bind(
    null, bundler, 'app-bundle.js', './public/js'
  );
}

gulp.task('build_js_bundle', function() {
  var build = createAppBundlePipelineConstructor(createAppBrowserifyBundle());
  return build();
});

gulp.task('watch', function() {
  
  var bundle = watchify(createAppBrowserifyBundle(watchify.args));
  
  var build = createAppBundlePipelineConstructor(bundle);
  
  bundle.on('update', build);
  
  return build();
});

gulp.task('default', ['build_js_bundle']);
