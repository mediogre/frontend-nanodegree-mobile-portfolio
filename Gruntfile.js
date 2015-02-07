module.exports = function(grunt) {

  grunt.initConfig({
    copy: {
      main: { 
	expand: true,
	cwd: 'src/',
        src: ['**'],
        dest: 'build/'
      }
    },

    imagemin: {
      dist: {
        options: {
          optimizationLevel: 5
        },
        files: [{
          expand: true,
          cwd: 'src/img',
          src: ['**/*.{png,jpg}'],
          dest: 'build/img/'
        }]
      },

      thumbs: {
        options: {
          optimizationLevel: 5
        },
        files: [{
          expand: true,
          cwd: 'build/img_t',
          src: ['**/*.{png,jpg}'],
          dest: 'build/img/'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          collapseBooleanAttributes: true,
          minifyCSS: true,
          minifyJS: true
        },
        files: {
          'build/index.html': 'src/index.html'
        }
      }
    },

    image_resize: {
      pizzeria_thumb: {
        options: {
          width: 100,
          height: 75
        },
        files: {
          'build/img_t/pizzeria_thumb.jpg': 'src/views/images/pizzeria.jpg'
        }
      }
    },

    uglify: {
      "perfmatters.js": {
        files: {
          'build/js/perfmatters.js': 'src/js/perfmatters.js'
        }
      }
    },

    clean: ['build/img_t']
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-image-resize');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('index.html', ['copy',
                                    'imagemin:dist',
                                    'image_resize:pizzeria_thumb',
                                    'imagemin:thumbs',
                                    'htmlmin',
                                    'uglify:perfmatters.js',
                                    'clean'
                                   ]);

  grunt.registerTask('default', function() {
    grunt.log.writeln("Hi there");
  });
}
