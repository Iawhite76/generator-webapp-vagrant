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
        default: true,
        when: function(response) {
          return ( response.includeBootstrap && !response.disableResponsive )
        }
      },
      {
        type: "confirm",
        name: "multiPage",
        message: "Is this site multipage? This will enable pages, partials and basic routing.",
        default: false
      },
      {
        type    : 'input',
        name    : 'serverName',
        message : 'Project server name (e.g. houston.ups.dev)?',
        default : 'myproject.ups.dev'
      },
      {
        type: "confirm",
        name: "setEnvVars",
        message: "Set Environment Variables?",
        default: true
      },
      {
        type    : 'input',
        name    : 'engageServer',
        message : 'Silverpop engage server?',
        default : '4',
        when: function(response) {
          return (response.setEnvVars)
        }
      },
      {
        type    : 'input',
        name    : 'engageDbId',
        message : 'Silverpop engage DB ID?',
        default : '10643334',
        when: function(response) {
          return (response.setEnvVars)
        }
      },
      {
        type    : 'input',
        name    : 'engageUsername',
        message : 'Silverpop engage Username?',
        default : 'testuser@t-3.com',
        when: function(response) {
          return (response.setEnvVars)
        }
      },
      {
        type    : 'input',
        name    : 'engagePassword',
        message : 'Silverpop engage password?',
        default : 'testpassword',
        when: function(response) {
          return (response.setEnvVars)
        }
      },
      {
        type    : 'input',
        name    : 'campaignId',
        message : 'Campaign ID?',
        default : 'UPSTEST_12345',
        when: function(response) {
          return (response.setEnvVars)
        }
      },
      {
        type    : 'input',
        name    : 'countryCode',
        message : 'Country Code?',
        default : 'US',
        when: function(response) {
          return (response.setEnvVars)
        }
      },
      {
        type    : 'input',
        name    : 'languageCode',
        message : 'Language Code?',
        default : 'EN',
        when: function(response) {
          return (response.setEnvVars)
        }
      },
      {
        type    : 'input',
        name    : 'regionCode',
        message : 'Region Code?',
        default : 'US',
        when: function(response) {
          return (response.setEnvVars)
        }
      },
      {
        type: "checkbox",
        name: "miscOptions",
        message: "Options to add tagging, custom input, brightcove, etc.",
        choices: [
          {
            name: "Webtrends",
            value: 'webtrends',
            checked: false
          },
          {
            name: "Brightcove",
            value: 'brightcove',
            checked: false
          },
          {
            name: "customInput.js",
            value: 'customInput',
            checked: false
          },
          {
            name: "Form Validation",
            value: 'formValidation',
            checked: false
          },
          {
            name: "IE8 backgroundsize.min.htc",
            value: 'backgroundSizeHack',
            checked: false
          },
          {
            name: "Linkedin signin",
            value: 'linkedInSignin',
            checked: false
          }
        ]
      },
    ];

    // Save user-selected options from prompts
    this.prompt(prompts, function (props) {
      // Answers to default questions
      var features = props.miscOptions;
      var bs_path  = './bower_components/bootstrap/js/';
      function hasFeature(feat) { return features.indexOf(feat) !== -1; }
      this.webtrends          = hasFeature('webtrends');
      this.brightcove         = hasFeature('brightcove');
      this.customInput        = hasFeature('customInput');
      this.formValidation     = hasFeature('formValidation');
      this.backgroundSizeHack = hasFeature('backgroundSizeHack');
      this.linkedInSignin     = hasFeature('linkedInSignin');

      this.includeModernizr   = props.includeModernizr;
      this.includeBootstrap   = props.includeBootstrap;
      this.disableResponsive  = props.disableResponsive;
      this.oldIE              = props.oldIE;
      this.multiPage          = props.multiPage;
      this.projectName        = props.projectName;
      this.serverName         = props.serverName;
      this.engageServer       = props.engageServer;
      this.engageDbId         = props.engageDbId;
      this.engageUsername     = props.engageUsername;
      this.engagePassword     = props.engagePassword;
      this.countryCode        = props.countryCode;
      this.languageCode       = props.languageCode;
      this.regionCode         = props.regionCode;
      this.campaignId         = props.campaignId;
      this.includeRespond     = (this.oldIE && !this.disableResponsive && this.includeBootstrap) ? true : false;

      done();
    }.bind(this));
  },

  writeIndex: function () {

    this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.php'));
    this.indexFile = this.engine(this.indexFile, this);

  },

  app: function () {

    var context = {
      project_name: this.projectName,
      server_name: this.serverName,
      engageServer: this.engageServer,
      engageDbId: this.engageDbId,
      engageUsername: this.engageUsername,
      engagePassword: this.engagePassword,
      campaignId: this.campaignId,
      countryCode: this.countryCode,
      languageCode: this.languageCode,
      regionCode: this.regionCode
    }

    // create structure and copy/write files
    this.mkdir('srv');
    this.mkdir('srv/' + this.projectName + '/css');
    this.mkdir('srv/' + this.projectName + '/fonts');
    this.mkdir('srv/' + this.projectName + '/img');
    this.mkdir('srv/' + this.projectName + '/js');
    this.mkdir('srv/' + this.projectName + '/js/vendor');
    this.mkdir('srv/' + this.projectName + '/less');

    this.copy('robots.txt', 'srv/' + this.projectName + '/robots.txt');
    this.copy('htaccess', 'srv/' + this.projectName + '/.htaccess');
    this.write('srv/' + this.projectName + '/index.php', this.indexFile);
    this.copy('main.less', 'srv/' + this.projectName + '/less/main.less');
    this.copy('blank.txt', 'srv/' + this.projectName + '/css/main.css');
    this.copy('js/main.js', 'srv/' + this.projectName + '/js/main.js');
    this.copy('blank.gif', 'srv/' + this.projectName + '/img/blank.gif');
    
    this.mkdir('provisioning');
    this.copy('vagrant/vagrant_install.sh', 'provisioning/vagrant_install.sh');

    if (this.webtrends) {
      this.copy('js/TBv3.08.6.2webtrends.js', 'srv/' + this.projectName + '/js/vendor/TBv3.08.6.2webtrends.js');
    }

    if (this.brightcove) {
      this.copy('js/BrightcoveExperiences.js', 'srv/' + this.projectName + '/js/vendor/BrightcoveExperiences.js');
    }

    if (this.customInput) {
      this.copy('js/customInput.js', 'srv/' + this.projectName + '/js/vendor/customInput.js');
    }

    if (this.backgroundSizeHack) {
      this.copy('backgroundsize.min.htc', 'srv/' + this.projectName + '/backgroundsize.min.htc');
    }

    if (this.linkedInSignin) {
      this.copy('js/linkedin-signin.js', 'srv/' + this.projectName + '/js/vendor/linkedin-signin.js');
    }

    if (this.multiPage) {
      this.copy('resources/classes/base.php', 'srv/' + this.projectName + '/resources/classes/base.php');
      
      this.mkdir('srv/' + this.projectName + '/pages');
      this.mkdir('srv/' + this.projectName + '/partials');

      this.copy('pages/about.php', 'srv/' + this.projectName + '/pages/about.php');
      this.copy('pages/home.php', 'srv/' + this.projectName + '/pages/home.php');
      this.copy('pages/sample-page.php', 'srv/' + this.projectName + '/pages/sample-page.php');

      this.copy('partials/sample-partial.php', 'srv/' + this.projectName + '/partials/sample-partial.php');
    }
  
    if (this.formValidation) {
      this.mkdir('srv/' + this.projectName + '/resources');
      this.mkdir('srv/' + this.projectName + '/resources/classes');


      this.copy('resources/functions.php', 'srv/' + this.projectName + '/resources/functions.php');
      this.copy('resources/process.php', 'srv/' + this.projectName + '/resources/process.php');
      this.copy('resources/.htaccess', 'srv/' + this.projectName + '/resources/.htaccess');

      this.copy('resources/classes/ArrayToXml.php', 'srv/' + this.projectName + '/resources/classes/ArrayToXml.php');
      this.copy('resources/classes/EngagePod.php', 'srv/' + this.projectName + '/resources/classes/EngagePod.php');
      this.copy('resources/classes/FormValidator.php', 'srv/' + this.projectName + '/resources/classes/FormValidator.php');
    }

    this.mkdir('provisioning/vagrant_files/etc');
    this.template('vagrant/hosts', 'provisioning/vagrant_files/etc/hosts', context);


    this.mkdir('provisioning/vagrant_files/etc/apache2/sites-available');
    this.template('default', 'provisioning/vagrant_files/etc/apache2/sites-available/default', context);
  },

  projectfiles: function () {
    this.copy('vagrant/Vagrantfile', 'Vagrantfile');
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
