module.exports = function(grunt) {

  grunt.initConfig({
    copy: {
      main: { 
        src: 'src/*',
        dest: 'build/'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', function() {
    grunt.log.writeln("Hi there");
  });
}
