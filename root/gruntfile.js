module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),//�����ļ�
		
		dirs: {
            src: 'app',//Դ·��
            dest: 'dist/<%= pkg.name %>'//Ŀ��·��
        },

        clean: {
            all: ['dist/**', 'dist/*.*']//����ѹ�����·���ļ�
        },
		
		copy: {
            images: {//����ͼƬ��Ŀ��·��
                files: [
                    {expand: true, cwd: '<%= dirs.src %>/images/', src: ['**'], dest: '<%= dirs.dest %>/images/'}
                ]
            },
			views: {//������ͼ�ļ���Ŀ��·��
                files: [
                    {expand: true, cwd: '<%= dirs.src %>/views/', src: ['**'], dest: '<%= dirs.dest %>/views/'}
                ]
            },
			root: {//���Ƹ�·���ļ���Ŀ��·��
                files: [
                    {expand: true, cwd: '<%= dirs.src %>/', src: ['*.html', '*.txt'], dest: '<%= dirs.dest %>/'}
                ]
            },
			config: {//���������ļ���Ŀ��·��
                files: [
                    {expand: true, cwd: '<%= dirs.src %>/scripts/', src: ['config.js'], dest: '<%= dirs.dest %>/scripts/'}
                ]
            },
			requirejs: {//����requireJs��Ŀ��·��
                files: [
                    {expand: true, cwd: '<%= dirs.src %>/scripts/libs/requirejs/', src: ['require.js'], dest: '<%= dirs.dest %>/scripts/libs/requirejs/'}
                ]
            }
        },

        requirejs: {//ѹ��js�ļ�
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
		
		concat: {//���css�ļ�
            css: {  
                src: ['<%= dirs.src %>/scripts/libs/bootstrap/dist/css/bootstrap.min.css',
				      '<%= dirs.src %>/scripts/libs/bootstrap/dist/css/bootstrap-datepicker.min.css',
				      '<%= dirs.src %>/styles/src/*.css'],
                dest: '<%= dirs.dest %>/styles/min/main.min.css'
            }  
        },
		
        cssmin: {//ѹ��css�ļ�
            css: {  
                src: '<%= dirs.dest %>/styles/min/main.min.css',
                dest: '<%= dirs.dest %>/styles/min/main.min.css'  
            }  
        },
		
		filerev: {//md5�滻�ļ���������
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
		
		usemin: {//����md5����֮��ľ�̬��Դ·��
            html: ['<%= dirs.dest %>/index.html']
        },
		
		imagemin: {//ѹ��ͼƬ
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

        htmlmin: {//ѹ��html�ļ�
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
        //less��������
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
        //�ļ���������
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