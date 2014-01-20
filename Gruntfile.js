module.exports = function(grunt) {

grunt.initConfig({

  clean: {
    jekyll: ['_site']
  },
  less: {
    compile: {
      options: {
        paths: ['assets/stylesheets/less'],
        yuicompress: true
      },
      files: {
        'assets/stylesheets/css/main.css': 'assets/stylesheets/less/main.less'
      }
    }
  },
  copy: {
    jquery: {
      files: [
        {expand: true, cwd: 'bower_components/jquery/', src: ['jquery.min.js'], dest: 'assets/javascript/'}
      ]
    },
	bootstrap: {
      files: [
        {expand: true, cwd: 'bower_components/bootstrap/dist/js/', src: ['bootstrap.min.js'], dest: 'assets/javascript/'},
        {expand: true, cwd: 'bower_components/bootstrap/dist/fonts/', src: ['*'], dest: 'assets/stylesheets/fonts/'}
      ]
    }
  },
  watch: {
    styles: {
	  files: ['assets/stylesheets/less/*'],
	  tasks: ['create-site']
	},
	html: {
      files: ['partials/*.html', '_layouts/*.html', '_includes/**/*.html', '*.html'],
      tasks: ['create-site'],
      options: {
        interrupt: true
      }
    },
	md: {
      files: ['partials/*.md', '_includes/**/*.md', 'docs/**/*.md', 'news/*.md', '_posts/*.md'],
      tasks: ['create-site'],
      options: {
        interrupt: true
      }
    },
	javascript: {
      files: ['assets/javascript/main.js'],
      tasks: ['create-site'],
      options: {
        interrupt: true
      }
    }
  },
  jekyll: {
    options: {
      bundleExec: true,
      src : '<%= app %>'
    },
	dist: {
	  options: {
	    dest: '_site',
	    config: '_config.yml'
	  }
	}
  },
  connect: {
    server: {
      options: {
        port: 4000,
        base: '_site'
      }
    }
  }

});

grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-jekyll');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-contrib-copy');

grunt.registerTask('create-site', ['less:compile', 'copy', 'jekyll']);
grunt.registerTask('build-and-watch', ['connect', 'create-site', 'watch']);
grunt.registerTask('build', ['clean:jekyll', 'create-site']);
grunt.registerTask('default', ['build-and-watch']);

};