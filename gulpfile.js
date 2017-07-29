var gulp = require( 'gulp' );

gulp.task( 'default', function()
{
    console.log( 'coucou' );
} );

// Dependencies
var gulp          = require( 'gulp'         ),
    gulp_css_nano = require( 'gulp-cssnano' ),
    gulp_rename   = require( 'gulp-rename'  ),
    gulp_concat   = require( 'gulp-concat'  ),
    gulp_uglify   = require( 'gulp-uglify'  ),
    gulp_plumber  = require( 'gulp-plumber' ),
    gulp_stylus   = require( 'gulp-stylus'  );

// CSS task
//gulp.task( 'css', function()
//{
//    return gulp.src( './src/css/style.css' )    // Get main CSS file
//        .pipe( gulp_css_nano() )                // Minify it
//        .pipe( gulp_rename( 'style.min.css' ) ) // Rename it
//        .pipe( gulp.dest( './src/css/' ) );     // Put it in folder
//} );

// CSS task+Stylus
gulp.task( 'css', function()
{
    gulp.src( './src/stylus/main.styl' )   // main.styl as input
        .pipe( gulp_plumber() )            // Gère les erreurs
        .pipe( gulp_stylus( { compress: true } ) ) // Convert to CSS
        .pipe( gulp.dest( './src/css' ) );         // Put it in CSS folder
} );

// JS task
gulp.task( 'js', function()
{
    return gulp.src( [                          // Get JS files (in order)
            './src/js/fastclick.js',
            './src/js/main.js'
        ] )
        .pipe( gulp_concat( 'main.min.js' ) ) // Concat in one file
        .pipe( gulp_uglify() )                  // Minify them
        .pipe( gulp.dest( './src/js/' ) );      // Put it in folder
} );

// Watch task
gulp.task( 'watch', function()
{
    // Watch for CSS modifications
    gulp.watch( './src/css/main.css', [ 'css' ] );

    // Watch for JS modifications (but not for script.min.js)
    gulp.watch( [ './src/js/**', '!./src/js/main.min.js' ], [ 'js' ] );
    
    // Watch for stylus modifications
    gulp.watch( './src/stylus/**', [ 'css' ] );
} );

gulp.task( 'default', [ 'css', 'js', 'watch' ] );