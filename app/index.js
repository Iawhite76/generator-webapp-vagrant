'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var T3WebappGenerator = yeoman.generators.Base.extend({

  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies({
          callback: function() {
            // Emit a new event - dependencies installed
            this.emit('dependenciesInstalled');
          }.bind(this)
        });
      }
    });

    // Now bind to the dependencies installed event
    this.on('dependenciesInstalled', function() {
      this.spawnCommand('grunt', ['bowerInstall']);
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    if (!this.options['skip-welcome-message']) {
      var art = '\r\n';
          art += 'ooooooooooooooooooooooooooooooooooooooooooooooo \r\n';
          art += 'ooooooooooooooooooooooooooooooooooooooooooooooooo \r\n';
          art += 'ooooo                    ooooooo        oooooooooo\r\n';
          art += 'ooooo                    oooo              ooooooo\r\n';
          art += 'ooooo                    oo       ooo       oooooo\r\n';
          art += 'oooooooooooo      ooooooooo     oooooo      oooooo\r\n';
          art += 'oooooooooooo      ooooooooooooooooooo      ooooooo\r\n';
          art += 'oooooooooooo      oooooooooooooooo        oooooooo\r\n';
          art += 'oooooooooooo      ooooooooooooooooooo      ooooooo\r\n';
          art += 'oooooooooooo      ooooooooo     oooooo      oooooo\r\n';
          art += 'oooooooooooo      ooooooooo       ooo       oooooo\r\n';
          art += 'oooooooooooo      ooooooooooo              ooooooo\r\n';
          art += 'oooooooooooo      ooooooooooooo          ooooooooo\r\n';
          art += 'oooooooooooo      ooooooooooooooo      ooooooooooo\r\n';
          // art += '\r\nWelcome to the T3 Webapp Generator!\r\n';
      console.log(art);
      console.log(chalk.white.bgRed.bold('        Welcome to the T3 Vagrant Webapp Generator        '));
      console.log('\r');
      console.log('Out of the box, HTML5 Boilerplate, jQuery, and a Gruntfile.js will be included to build your T3 webapp.');
      console.log('\r');
    }

    // Ask scaffolding questions
    var prompts = [
      {
          type    : 'input',
          name    : 'projectName',
          message : 'Your project name',
          default : 'myProject'
      },
        type: "confirm",
        name: "includeModernizr",
        message: "Include Modernizr?",
        default: true
      },
      {
        type: "confirm",
        name: "includeBootstrap",
        message: "Include Bootstrap 3 LESS?",
        when: function(response) {
          return !response.includeAngular;
        },
        default: true
      },
      {
        type: "checkbox",
        name: "bootstrapPlugins",
        message: "Which Bootstrap 3 plugins should be included? (you can add/remove later)",
        when: function(response) {
          return response.includeBootstrap && !response.includeAngular
        },
        choices: [
          {
            name: "affix.js",
            checked: false
          },
          {
            name: "alert.js",
            checked: false
          },
          {
            name: "button.js",
            checked: false
          },
          {
            name: "carousel.js",
            checked: false
          },
          {
            name: "collapse.js",
            checked: false
          },
          {
            name: "dropdown.js",
            checked: false
          },
          {
            name: "modal.js",
            checked: false
          },
          {
            name: "popover.js",
            checked: false
          },
          {
            name: "scrollspy.js",
            checked: false
          },
          {
            name: "tab.js",
            checked: false
          },
          {
            name: "tooltip.js",
            checked: false
          },
          {
            name: "transition.js",
            checked: false
          }
        ]
      },
      {
        type: "confirm",
        name: "disableResponsive",
        message: "Disable Responsive Layout?",
        default: false,
        when: function(response) {
          return response.includeBootstrap;
        }
      },
      {
        type: "confirm",
        name: "oldIE",
        message: "Support less than IE9? (adds respond.js in an IE block)",
        default: false,
        when: function(response) {
          return ( response.includeBootstrap && !response.disableResponsive )
        }
      }
    ];

    // Save user-selected options from prompts
    this.prompt(prompts, function (props) {

      var bs_path  = '../bower_components/bootstrap/js/';

      // Answers to default questions
      this.includeModernizr  = props.includeModernizr;
      this.includeBootstrap  = props.includeBootstrap;
      this.disableResponsive = props.disableResponsive;
      this.oldIE             = props.oldIE;
      this.projectName       = props.projectName;
      this.includeRespond    = (this.oldIE && !this.disableResponsive && this.includeBootstrap) ? true : false;

      // Answers to Bootstrap plugin questions
      if (this.includeBootstrap) {
        this.bootstrapPlugins  = props.bootstrapPlugins;
        for ( var i = 0; i < this.bootstrapPlugins.length; i++ ) {
          this.bootstrapPlugins[i] = bs_path + this.bootstrapPlugins[i];
        }
      }

      done();
    }.bind(this));
  },

  writeIndex: function () {

    this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.php'));
    this.indexFile = this.engine(this.indexFile, this);

    // Wire Bootstrap plugins into a bootstrap.min.js min block
    if (this.includeBootstrap) {
      this.indexFile = this.appendScripts(this.indexFile, 'js/bootstrap.min.js', this.bootstrapPlugins);
    }

    // Wire additional scripts into a main.min.js min block
    var appendedScripts = ['js/main.js'];
    
    this.indexFile = this.appendFiles({
      html: this.indexFile,
      fileType: 'js',
      optimizedPath: 'js/main.min.js',
      sourceFileList: appendedScripts
    });
  },

  app: function () {
    // create structure and copy/write files
    var root = 'app/' + this.projectName;
    this.mkdir();
    this.mkdir(root + '/css');
    this.mkdir(root + '/fonts');
    this.mkdir(root + '/img');
    this.mkdir(root + '/js');
    this.mkdir(root + '/less');

    this.copy('robots.txt', root + '/robots.txt');
    this.copy('htaccess', root + '/.htaccess');
    this.write(root + '/index.html', this.indexFile);
    this.copy('main.less', root + '/less/main.less');
    this.copy('blank.txt', root + '/css/main.css');
    this.copy('main.js', root + '/js/main.js');
    this.copy('blank.gif', root + '/img/blank.gif');
  },

  projectfiles: function () {
    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.copy('Gruntfile.js', 'Gruntfile.js');
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('bowerrc', '.bowerrc');
    this.copy('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
  }

});

module.exports = T3WebappGenerator;
