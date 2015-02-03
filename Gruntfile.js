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
    clean: ['build/']
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', function() {
    grunt.log.writeln("Hi there");
  });
}
