module.exports = function(grunt) {


    /**
     * Load required Grunt tasks. These are installed based on the versions listed
     * in `package.json` when you do `npm install` in this directory.
     */
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-htmlclean');
    grunt.loadNpmTasks('grunt-dom-munger');

    var _vendorPath = "../vendor/";


    /**
     * Load in our build configuration file.
     */
    var userConfig = require('./build.config.js')();
    /**
     * This is the configuration object Grunt uses to give each plugin its
     * instructions.
     */
    var taskConfig = {

        /**
         * We read in our `package.json` file so we can access the package name and version. It's already there, so
         * we don't repeat ourselves here.
         */
        pkg: grunt.file.readJSON("package.json"),

        /**
         * The banner is the comment that is placed at the top of our compiled source files. It is first processed
         * as a Grunt template, where the `<%=` pairs are evaluated based on this very configuration object.
         */
        meta: {
            banner: '/**\n' +
                ' * @appName    <%= pkg.name %>\n' +
                ' * @version    <%= pkg.version %>\n' +
                ' * @date       <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * @homepage   <%= pkg.homepage %>\n' +
                ' * @author  <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                //' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
                ' */\n'
        },

        /**
         * The directories to delete when `grunt clean` is executed.
         */
        clean: {
            src: [
                '<%= buildDir %>/'
            ],
            hooks: [
            ],
            options: {
                force: true
            }
        },

        /**
         * The `copy` task just copies files from A to B. We use it here to copy our project assets
         * (images, fonts, etc.) and javascripts into `buildDir`, and then to copy the assets to `compileDir`.
         */
        copy: {
            index: {
                files: [
                    {
                        src: '<%= devDir %>/index.html',
                        dest: '<%= buildDir %>/index.html'
                    }
                ]
            },
            build_assets: {
                files: [
                    {
                        src: [ '**', '!sass/**','!config.rb'],
                        cwd: '<%= devDir %>/assets',
                        dest: '<%= buildDir %>/assets/',
                        expand: true
                    }

                ]
            },
            move_favicon: {
                files: [
                    {
                        src: ['favicon.ico'],
                        cwd: '<%= devDir %>/',
                        dest: '<%= buildDir %>/',
                        expand: true
                    }

                ]
            },
            prod_app: {
                files: [
                    {
                        src: '<%= devDir %>/assets/js/app.js',
                        dest: '<%= buildDir %>/assets/js/app.js',
                        expand: false

                    }
                ]
            },
            build_vendorjs: {
                files: [
                    {
                        src: [ 'requirejs/require.js', 'modernizr/modernizr.js','fileserver/FileSaver.js'],
                        cwd: '<%=vendorDir%>',
                        dest: '../bin/<%=appName%>/vendor',
                        expand: true
                    }
                ]
            },
            build_api: {
                files: [
                    {
                        src: [ '**'],
                        cwd: '../<%=appName%>/api',
                        dest: '../bin/<%=appName%>/api/',
                        expand: true
                    }

                ]
            }
        },


        /**
         * `grunt concat` concatenates multiple source files into a single file.
         */
        concat: {

            /**
             * The `source` target is the concatenation of our application source code and all specified vendor
             * source code into a single file.
             */
            source: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                src: ['<%= buildDir %>/src/app.js'],
                dest: '<%= buildDir %>/src/app.js'
            }
        },
        cssmin: {
            minify: {
                expand: false,
                files: {
                    '<%=devDir%>/assets/stylesheets/screen.css': ['<%=buildDir%>/assets/stylesheets/screen.css']
                }

            }
        },

        /**
         * Minifies RJS files and makes it production ready
         * Build files are minified and encapsulated using RJS Optimizer plugin
         */
        requirejs: {
            compile: {
                options: {

                    waitSeconds : 120,
                    appDir  : '',
                    findNestedDependencies: true,
                    baseUrl : '<%= devDir %>/src',

                    /*
                     *
                     * Update the config paths and shim here
                     *
                     * */
                    paths   :
                    {
                        // Configure alias to full paths
                        "angular" : _vendorPath+'angular/angular',
                        "uiRouter" : _vendorPath+'angular-ui-router/release/angular-ui-router',
                        "ngSanitize" : _vendorPath+'angular-sanitize/angular-sanitize',
                        "ngAnimate" : _vendorPath+'angular-animate/angular-animate',
                        "jquery" : _vendorPath+'jquery/jquery.min',
                        "tween":_vendorPath+'gsap/src/minified/TweenMax.min',
                        /* "jquery.mCustomScrollbar":_vendorPath+"malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min",*/
                        "iscroll":_vendorPath+'iscroll/build/iscroll',
                        "framework":"./framework",
                        "controller":"./framework/controller",
                        "delegate":"./framework/delegate",
                        "model":"./framework/model"


                    },

                    urlArgs: 'v=1.0',

                    shim    :
                    {
                        'angular': {
                            'exports': 'angular'
                        },
                        'ngSanitize': {
                            exports: 'ngSanitize',
                            deps: ['angular']
                        },
                        'ngAnimate': {
                            'deps': ['angular']
                        },
                        'uiRouter': {
                            'deps': ['angular']
                        },
                        'iscroll': {
                            exports: 'Iscroll'
                        },
                        'tween':{
                            'exports':'TweenMax'
                        },
                        'jquery':{
                            'exports':'jquery'
                        }
                        /*,'jquery.mCustomScrollbar':{
                         'deps': ['jquery']
                         }*/
                    },

                    /*
                     *
                     *
                     * */
                    name: 'app',
                    out: '<%= buildDir %>/src/app.js'
                },
                preserveLicenseComments : true,
                optimize: "uglify"
            }
        },
        htmlclean: {
            options: {
                protect: /<\!--%fooTemplate\b.*?%-->/g,
                edit: function(html) { return html.replace(/\begg(s?)\b/ig, 'omelet$1'); }
            },
            deploy: {
                expand: true,
                cwd: '<%= buildDir %>/',
                src: '**/*.html',
                dest: '<%= buildDir %>/'
            }
        },
        dom_munger: {
            dist: {
                options: {
                    update:[{selector:'html',attribute:'data-debug', value:"false"}]
                },
                src: '<%= buildDir %>/index.html', //could be an array of files
                dest: '<%= buildDir %>/index.html' //optional, if not specified the src file will be overwritten
            }
        }

    };

    grunt.registerTask( "prod", [

        'clean:src',
        'copy:build_assets',
        'copy:move_favicon',
        'copy:build_vendorjs',
        'copy:build_api',
        'copy:prod_app',
        'copy:index',
        "requirejs",
        "cssmin:minify",
        "concat:source",
        "htmlclean:deploy",
        'dom_munger:dist'

    ]);


    grunt.registerTask( "build", function() { // 1

        grunt.task.run('prod');

    });

    grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));
};
