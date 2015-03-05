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
        default : 'ups-my-project'
      },
      {
        type: "confirm",
        name: "includeModernizr",
        message: "Include Modernizr?",
        default: true
      },
      {
        type: "confirm",
        name: "includeBootstrap",
        message: "Include Bootstrap 3 LESS?",
        default: true
      },
      {
        type: "checkbox",
        name: "bootstrapPlugins",
        message: "Which Bootstrap 3 plugins should be included? (you can add/remove later)",
        when: function(response) {
          return response.includeBootstrap
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
      },
      {
        type    : 'input',
        name    : 'serverName',
        message : 'Project server name (e.g. houston.ups.dev)?',
        default : 'myproject.ups.dev'
      },
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
      this.serverName        = props.serverName;
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
    this.mkdir('srv');
    this.mkdir('srv/' + this.projectName + '/css');
    this.mkdir('srv/' + this.projectName + '/fonts');
    this.mkdir('srv/' + this.projectName + '/img');
    this.mkdir('srv/' + this.projectName + '/js');
    this.mkdir('srv/' + this.projectName + '/less');

    this.copy('robots.txt', 'srv/' + this.projectName + '/robots.txt');
    this.copy('htaccess', 'srv/' + this.projectName + '/.htaccess');
    this.write('srv/' + this.projectName + '/index.php', this.indexFile);
    this.copy('main.less', 'srv/' + this.projectName + '/less/main.less');
    this.copy('blank.txt', 'srv/' + this.projectName + '/css/main.css');
    this.copy('main.js', 'srv/' + this.projectName + '/js/main.js');
    this.copy('blank.gif', 'srv/' + this.projectName + '/img/blank.gif');
    
    this.mkdir('provisioning');
    this.copy('vagrant_install.sh', 'provisioning/vagrant_install.sh');

    var context = {
      project_name: this.projectName,
      server_name: this.serverName
    }

    this.mkdir('provisioning/vagrant_files/etc');
    this.template('hosts', 'provisioning/vagrant_files/etc/hosts', context);


    this.mkdir('provisioning/vagrant_files/etc/apache2/sites-available');
    this.template('default', 'provisioning/vagrant_files/etc/apache2/sites-available/default', context);
  },

  projectfiles: function () {
    this.copy('Vagrantfile', 'Vagrantfile');
    this.copy('README.md', 'README.md');
    this.copy('_package.json', 'srv/' + this.projectName + '/package.json');
    this.copy('_bower.json', 'srv/' + this.projectName + '/bower.json');
    this.copy('Gruntfile.js', 'srv/' + this.projectName + '/Gruntfile.js');
    this.copy('editorconfig', 'srv/' + this.projectName + '/.editorconfig');
    this.copy('jshintrc', 'srv/' + this.projectName + '/.jshintrc');
    this.copy('bowerrc', 'srv/' + this.projectName + '/.bowerrc');
    this.copy('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
  }

});

module.exports = T3WebappGenerator;
