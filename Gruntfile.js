module.exports = function(grunt) {
    grunt.initConfig({
        browserify: {
            files: {
                src: "scripts/main.js",
                dest: "dist/bundle.js",
            },
            options: {
                transform: ["hbsfy"],
            }
        },
        jshint: {
            files: ["scripts/**/*.js"],
            options: {
                predef: ["document", "console", "alert"],
                esnext: true,
                globalstrict: true,
                globals: {},
                browserify: true,
            },
        },
        sass: {
            dist: {
                files: {
                    "css/styles.css" : "sass/main.scss",
                },
            },
        },
        watch: {
            javascripts: {
                files: ["scripts/**/*.js"],
                tasks: ["jshint", "browserify"],
            },
            sass: {
                files: ["sass/main.scss"],
                tasks: ["sass"],
            },
            hbs: {
                files: ["templates/**/*.hbs"],
                tasks: ["browserify"]
            }
        },
    });

    require("matchdep")
        .filter("grunt-*")
        .forEach(grunt.loadNpmTasks);
    
    grunt.registerTask("default", ["jshint", "sass", "browserify", "watch"]);
};