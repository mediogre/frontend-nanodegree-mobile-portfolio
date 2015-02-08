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
      index: {
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
      },

      pizza: {
        options: {
          optimizationLevel: 5
        },
        files: [{
          expand: true,
          cwd: 'build/img_t',
          src: ['**/*.{png,jpg}'],
          dest: 'build/views/images/'
        }]
      }
    },

    htmlmin: {
      index: {
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
      },

      pizza: {
        options: {
          width: 164,
          height: 213
        },
        files: {
          'build/img_t/pizza.png': 'src/views/images/pizza.png'
        }
      },

      pizza_mover: {
        options: {
          width: 73,
          height: 100
        },
        files: {
          'build/img_t/pizza_mover.png': 'src/views/images/pizza.png'
        }
      },

      pizzeria: {
        options: {
          width: 360,
          height: 270
        },
        files: {
          'build/img_t/pizzeria.jpg': 'src/views/images/pizzeria.jpg'
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
                                    'imagemin:index',
                                    'image_resize:pizzeria_thumb',
                                    'imagemin:thumbs',
                                    'htmlmin:index',
                                    'uglify:perfmatters.js',
                                    'clean'
                                   ]);

  grunt.registerTask('pizza', ['copy',
                               'image_resize:pizza',
                               'image_resize:pizza_mover',
                               'image_resize:pizzeria',
                               'imagemin:pizza',
                               'clean'
                              ]);

  grunt.registerTask('default', function() {
    grunt.log.writeln("Hi there");
  });
};
