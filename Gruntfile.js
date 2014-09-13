module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'css/style.css': 'sass/style.scss'
        }
      }
    },
    autoprefixer: {
      single_file: {
        options: {
          browsers: ['last 2 version', 'ie 8', 'ie 7']
        },
        src: 'css/style.css',
        dest: 'css/style.css'
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'css/',
        src: ['*.css', '!*.min.css'],
        dest: 'css/',
        ext: '.min.css'
      }
    },
    uglify: {
      options: {
        compress:true
      },
      my_target: {
        files: {
          'js/main.min.js': ['js/main.js']
        }
      }
    },
    imagemin: {
      png: {
        options: {
          optimizationLevel: 7
        },
        files: [
          {
            expand: true,
            cwd: 'images/comp/',
            src: ['**/*.png'],
            dest: 'images/',
            ext: '.png'
          }
        ]
      },
      jpg: {
        options: {
          progressive: true
        },
        files: [
          {
            expand: true,
            cwd: 'images/comp',
            src: ['**/*.jpg'],
            dest: 'images/',
            ext: '.jpg'
          }
        ]
      }
    },
    watch: {
      options: {
        livereload:true,
      },
      css: {
        files: ['sass/*.scss'],
        tasks: ['sass', 'autoprefixer', 'cssmin']
      },
      scripts: {
        files: ['js/main.js'],
        tasks: ['uglify']
      },
      images: {
        files: ['images/**.png', 'images/**.jpg'],
        tasks: ['imagemin']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['sass', 'uglify', 'autoprefixer', 'cssmin', 'imagemin'])

};
