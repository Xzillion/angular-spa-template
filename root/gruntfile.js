module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),//依赖文件
		
		dirs: {
            src: 'app',//源路径
            dest: 'dist/<%= pkg.name %>'//目标路径
        },

        clean: {
            all: ['dist/**', 'dist/*.*']//清理压缩存放路径文件
        },
		
		copy: {
            images: {//复制图片到目标路径
                files: [
                    {expand: true, cwd: '<%= dirs.src %>/images/', src: ['**'], dest: '<%= dirs.dest %>/images/'}
                ]
            },
			views: {//复制视图文件到目标路径
                files: [
                    {expand: true, cwd: '<%= dirs.src %>/views/', src: ['**'], dest: '<%= dirs.dest %>/views/'}
                ]
            },
			root: {//复制根路径文件到目标路径
                files: [
                    {expand: true, cwd: '<%= dirs.src %>/', src: ['*.html', '*.txt'], dest: '<%= dirs.dest %>/'}
                ]
            },
			config: {//复制配置文件到目标路径
                files: [
                    {expand: true, cwd: '<%= dirs.src %>/scripts/', src: ['config.js'], dest: '<%= dirs.dest %>/scripts/'}
                ]
            },
			requirejs: {//复制requireJs到目标路径
                files: [
                    {expand: true, cwd: '<%= dirs.src %>/scripts/libs/requirejs/', src: ['require.js'], dest: '<%= dirs.dest %>/scripts/libs/requirejs/'}
                ]
            }
        },

        requirejs: {//压缩js文件
            main: {
                options: {
					baseUrl:'<%= dirs.src %>/scripts',
                    name: "main",
                    optimize: "uglify",
					uglify: {
                        mangle: false
                    },
                    mainConfigFile: "<%= dirs.src %>/scripts/main.js",
                    out: "<%= dirs.dest %>/scripts/main.min.js",
                }
            }
        },
		
		concat: {//打包css文件
            css: {  
                src: ['<%= dirs.src %>/scripts/libs/bootstrap/dist/css/bootstrap.min.css',
				      '<%= dirs.src %>/scripts/libs/bootstrap/dist/css/bootstrap-datepicker.min.css',
				      '<%= dirs.src %>/styles/src/*.css'],
                dest: '<%= dirs.dest %>/styles/min/main.min.css'
            }  
        },
		
        cssmin: {//压缩css文件
            css: {  
                src: '<%= dirs.dest %>/styles/min/main.min.css',
                dest: '<%= dirs.dest %>/styles/min/main.min.css'  
            }  
        },
		
		filerev: {//md5替换文件名防缓存
			options: {
                algorithm: 'md5',
                length: 8
            },
            css: {
                src: '<%= dirs.dest %>/styles/min/main.min.css',
                dest: '<%= dirs.dest %>/styles/min/'
            },
			js: {
				src: '<%= dirs.dest %>/scripts/main.min.js',
			    dest: '<%= dirs.dest %>/scripts/'
			}
        },
		
		usemin: {//设置md5命名之后的静态资源路径
            html: ['<%= dirs.dest %>/index.html']
        },
		
		imagemin: {//压缩图片
            img: {  
                options: {  
                    optimizationLevel: 3
                },  
                files: [  
                    {  
                        expand: true,  
                        cwd: '<%= dirs.dest %>/images/',  
                        src: ['**/*.{png,jpg,jpeg}'],
                        dest: '<%= dirs.dest %>/images/'  
                    }  
                ]  
            }  
        },

        htmlmin: {//压缩html文件
			html: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: [
				    {expand: true, cwd: '<%= dirs.dest %>/views/', src: ['**/*.html'], dest: '<%= dirs.dest %>/views/'},
				    {expand: true, cwd: '<%= dirs.dest %>/', src: ['*.html'], dest: '<%= dirs.dest %>/'}
				]
			}
		},
        //less编译任务
        less: {
            main: {
                expand: true,
                src: ['app/styles/**/*.less'],
                dest: '',
                ext: '.css'
            },
            dev: {
                options: {
                    compress: true,
                    yuicompress: true
                }
            }
        },
        //文件监听任务
        watch: {
            less2css: {
                files: ['app/styles/**/*.less'],
                tasks: ['less'],
                options: {
                    livereload: true
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-css');
	grunt.loadNpmTasks('grunt-filerev');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['clean', 'copy', 'requirejs', 'concat', 'cssmin', 'filerev', 'usemin', 'imagemin', 'htmlmin']);
}