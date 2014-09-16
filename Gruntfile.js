/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        package: grunt.file.readJSON('package.json'),
        banner: '/*! <%= package.name %> - v<%= package.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '* <%= package.hoempage %>/\n' +
                '* Copyright (c) 2014-<%= grunt.template.today("yyyy") %> <%= package.author %>; Licensed <%= package.license %> */\n',
        config: {
            publicRoot: 'public'
        },
        nodemon: {
            dev: {
                script: 'bin/www.js',
                options: {
                    args: ['dev'],
                    nodeArgs: ['--debug'],
                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });
                    },
                    env: {
                        PORT: '3000',
                        DEBUG: '*'
                    },
                    cwd: __dirname,
                    ignore: ['node_modules/**', 'src/**'],
                    ext: 'js,html',
                    watch: ['.'],
                    delay: 1000,
                    legacyWatch: false
                }
            }
        },
        concat: {
            app: {
                options: {
                    banner: '<%= banner %>',
                    stripBanners: true
                },
                src: ['src/js/**/*.js'],
                dest: 'src/app.js'
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true,
                remove: true
            },
            all: {
                files: [
                    {
                        expand: true,
                        src: ['<%= concat.app.dest %>'],
                        ext: '.js', // Dest filepaths will have this extension.
                        extDot: 'last', // Extensions in filenames begin after the last dot
                    },
                ]
            }
        },
        uglify: {
            app: {
                options: {
                    sourceMap: true,
                    banner: '<%= banner %>'
                },
                files: {
                    '<%= config.publicRoot %>/js/app.min.js': ['<%= concat.app.dest %>']
                }
            }
        },
        cssmin: {
            all: {
                options: {
                    banner: '<%= banner %>'
                },
                files: {
                    '<%= config.publicRoot %>/css/app.min.css': ['src/css/**/*.css']
                }
            }
        },
        htmlmin: {// Task
            dist: {// Target
                options: {// Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                        expand: true, // Enable dynamic expansion.
                        cwd: 'src/', // Src matches are relative to this path.
                        src: ['**/*.html'], // Actual pattern(s) to match.
                        dest: '<%= config.publicRoot %>/', // Destination path prefix.
                    }]
            }
        },
        copy: {
            lib: {
                files: [
                    {expand: true, cwd: 'lib/', src: ['**'], dest: '<%= config.publicRoot %>/'}
                ]
            }
        },
        watch: {
            js: {
                files: 'src/js/**/*',
                tasks: ['minifyJs'],
            },
            css: {
                files: 'src/css/**/*',
                tasks: ['cssmin'],
            },
            html: {
                files: 'src/**/*.html',
                tasks: ['htmlmin'],
            },
            lib: {
                files: 'lib/**/*',
                tasks: ['copy'],
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');

    // Default task.
    grunt.registerTask('dev', ['build', 'watch']);
    grunt.registerTask('build', ['minify', 'copy']);
    grunt.registerTask('minify', ['minifyJs', 'cssmin', 'htmlmin']);
    grunt.registerTask('minifyJs', ['concat', 'ngAnnotate', 'uglify']);

};
