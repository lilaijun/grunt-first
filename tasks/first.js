/*
 * grunt-first
 * 
 *
 * Copyright (c) 2015 lilaijun
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('first', 'my first grunt-project example', function () {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
        who: 'alpaca',
        commentSymbol: '//'
    });

    var testExistRegMap = {
      'buddha' : /o8888888o/,
      'alpaca' : /┗┓┓┏━┳┓┏┛/
    };

          var who = options.who,
          commentSymbol = options.commentSymbol,

          commentFilepathMap = {
          'buddha' : 'assets/buddha.txt',
          'alpaca' : 'assets/alpaca.txt'
        },

          //拿到每个文件的详细目录
          commentFilepath = path.join(__dirname, commentFilepathMap[who]),
          
          //读取文件内的所有元素
          commentContent = grunt.file.read(commentFilepath),

          //读取文件里的每一行元素
         lineCommentArr = commentContent.split(grunt.util.normalizelf('\n'));
    
          //遍历lineCommentArr中的每一个元素
          lineCommentArr.forEach(function(value, index, arr){
            arr[index] = commentSymbol + value;
          });

    //最后重写commentContent
    commentContent = lineCommentArr.join(grunt.util.normalizelf('\n'));


    // Iterate over all specified file groups.
    this.files.forEach(function (file) {
      // Concat specified files.
        file.src.filter(function (filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function (filepath) {
        // Read file source.
        var originalFileContent = grunt.file.read(filepath),
              newFileContent = commentContent + grunt.util.normalizelf('\n') + originalFileContent;
              
              if(testExistRegMap[who].test(originalFileContent)){
                return;
              }

              grunt.file.write(filepath, newFileContent);
      });

      // Print a success message.
      grunt.log.writeln('File "' + file.dest + '" created.');
    });
  });

};
