/*
 * grunt-init-jquery
 * https://gruntjs.com/
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = '创建基于angularJs的单页面项目模板,附带文件打包、压缩、md5防缓存';

// Template-specific notes to be displayed before question prompts.
exports.notes = '请填写关于项目的相关问题：'+
                '\n'+ '如果不想填写可按enter键逐一跳过';

// Template-specific notes to be displayed after question prompts.
exports.after = '项目已经搭建完成！' +
                '\n\n'+
                'npm install 安装模块依赖\n'+
                'grunt default 启动项目打包、压缩任务\n\n';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {
  init.process({type: 'angular-spa'}, [
    // Prompt for these values.
      init.prompt('name', 'angular-spa'),
      init.prompt('description', 'angular-spa-template'),
      init.prompt('version', '1.0.0'),
      init.prompt('licenses', 'MIT'),
      init.prompt('author_name'),
      init.prompt('author_email'),
  ], function(err, props) {
    // A few additional properties.

    props.keywords = [];

    // Files to copy (and process).
    var files = init.filesToCopy(props);
    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props, {noProcess: 'libs/**'});

    // Generate package.json file, used by npm and grunt.
    init.writePackageJSON('package.json', {
      name: props.name,
      version: props.version,
        description: props.description,
        licenses: props.licenses,
        author_name: props.author_name,
        author_email: props.author_email,
      // TODO: pull from grunt's package.json
      node_version: '>= 4.6.0',
      devDependencies: {
          "grunt": "^1.0.1",
          "grunt-contrib-clean": "^1.0.0",
          "grunt-contrib-concat": "^1.0.1",
          "grunt-contrib-copy": "^1.0.0",
          "grunt-contrib-htmlmin": "^2.0.0",
          "grunt-contrib-imagemin": "^1.0.1",
          "grunt-contrib-less": "^1.4.0",
          "grunt-contrib-requirejs": "^1.0.0",
          "grunt-contrib-uglify": "^1.0.1",
          "grunt-contrib-watch": "^1.0.0",
          "grunt-css": "^0.5.4",
          "grunt-filerev": "^2.3.1",
          "grunt-usemin": "^3.1.0"
      },
    });

    // All done!
    done();
  });

};
