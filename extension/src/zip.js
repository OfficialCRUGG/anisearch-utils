import gulp from "gulp";
import zip from "gulp-zip";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const browser = process.env.BROWSER;
const manifest = require(`../build/${browser}/manifest.json`);

gulp
  .src(`build/${browser}/**`)
  .pipe(zip(`asutils-${manifest.version}-${browser}.zip`))
  .pipe(gulp.dest("package"));
