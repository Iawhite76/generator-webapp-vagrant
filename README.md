### Yeoman Generator
<p>T3's webapp generator will help scaffold out a base website project and will include the following out-of-the-box:</p>
* [HTML5 Boilerplate](http://html5boilerplate.com/)
* [jQuery 1.10.2](http://jquery.com/)
* [jQuery Migrate 1.2.1](https://github.com/jquery/jquery-migrate/)
<p>Before installing the T3 webapp generator, you must have Yeoman installed:</p>
```
$ npm install -g yo
```
<p>Next, install the T3 webapp generator:</p>
```
npm install -g https://stash.t-3.com/projects/TASSETS/repos/global/browse/yeoman-generators/generator-t3-vagrant-v1.tgz\?raw
```
<p>Finally, create a project folder and initiate the T3 webapp generator:</p>
```
$ mkdir myProject
```
``` 
$ cd myProject
```
```
$ yo t3-webapp-vagrant
```
<p><b>NOTE: The current state of the generator requires you to ```cd``` into a directory the generator creates for you before you can run Grunt tasks. Using the defaults as an example, from your project root directory you would do the following before running ```grunt```: ```cd srv/ups-my-project```</b></p>
<p>Before shutting down for the day, ensure you run ```sudo vagrant suspend``` or ```sudo vagrant halt``` to suspend or shutdown your vagrant machine.  Failure to do so may cause your vagrant machine to become corrupt on running ```sudo vagrant up``` or ```grunt```</p>
<p>If your vagrant machine fails to start successfully and you cannot connect to ```http://localhost:8888``` run ```sudo vagrant destroy```, wait for your vm to be removed, then try to restart the vm with ```sudo vagrant up``` or ```grunt```</p>


#### Generator Variables
* <code>projectName</code>
* <code>includeModernizr</code>
* <code>includeBootstrap</code>
* <code>disableResponsive</code>
* <code>oldIE</code>
* <code>multiPage</code>
* <code>serverName</code>
* <code>setEnvVars</code>
  * <code>engageServer</code>
  * <code>engageDbId</code>
  * <code>engageUsername</code>
  * <code>engagePassword</code>
  * <code>campaignId</code>
  * <code>countryCode</code>
  * <code>languageCode</code>
  * <code>regionCode</code>
* <code>miscOptions</code>
  * <code>includeFonts</code>
  * <code>includeFonts</code>
  * <code>webtrends</code>
  * <code>brightcove</code>
  * <code>customInput</code>
  * <code>formValidation</code>
  * <code>backgroundSizeHack</code>
  * <code>linkedInSignin</code>
  
#### Generator Prompts
<p>The generator will help you customize your project based on responses to the following prompts:</p>
* <b>Your project name</b>
    * Default value: ups-my-project
    * Yeoman variable: <code>projectName</code>
    * Actions:
        * This will be used both in your dir structure (e.g. srv/ups-my-project) and in your Vagrant environment variables. 
* <b>Include Modernizr (y/N)</b>
    * Default value: No
    * Yeoman variable: <code>includeModernizr</code>
    * Actions:
        * If true, installs Modernizr 2.6.2
        * Adds Modernizr script to HTML template
* <b>Include Bootstrap (y/N)</b>
    * Default value: Yes
    * Yeoman variable: <code>includeBootstrap</code>
    * Actions:
        * Installs Bootstrap 3.0.3
        * Adds Boostrap CSS to HTML template
        * Adds Bootstrap plugin scripts to HTML template
* <b>Disable Responsive Layout (y/N)</b>
    * Default value: No
    * Yeoman variable: <code>disableResponsive</code>
    * Actions:
        * If disabled, the META viewport tag will be removed from the HEAD of the HTML template
        * If disabled and Bootstrap is included (includeBootstrap), non-responsive overrides will be added to the LESS stylesheet
* <b>Support less than IE9? (adds respond.js in an IE block) (y/n)</b>
    * Default value: true
    * Yeoman variable: <code>oldIE</code>
    * Actions:
        * Adds Respond.js script to HTML template
* <b>Is this site multipage? This will enable pages, partials and basic routing. (y/n)</b>
    * Default value: false
    * Yeoman variable: <code>multiPage</code>
    * Actions:
        * If true, project will be scaffolded to support a multipage site leveraging the Fat Free Framework (PHP) router to access pages and php includes for html partial support.  
        * This option is mainly intended for multipage landing pages to cut down on code duplication while at the same time being lightweight by not requiring a full framework such as WordPress. 
* <b>Project server name (e.g. houston.ups.dev)?</b>
    * Default value: myproject.ups.dev
    * Yeoman variable: <code>serverName</code>
    * Actions:
        * This option is used to set various Vagrant environment variables.
* <b>Set Environment Variables? (y/n)</b>
    * Default value: true
    * Yeoman variable: <code>setEnvVars</code>
    * Actions:
        * Select yes to set the following environment variables for your Vagrant setup. Variable names are explanatory.
        * <code>Silverpop engage server?</code>
        * <code>Silverpop engage DB ID?</code>
        * <code>Silverpop engage Username?</code>
        * <code>Silverpop engage password?</code>
        * <code>Campaign ID?</code>
        * <code>Country Code?</code>
        * <code>Language Code?</code>
        * <code>Region Code?</code>
* <b>Options to add tagging, custom input, brightcove, etc. (Use arrows and spacebar to select)</b>
  * <p>Miscellaneous options meant to aid quick development environment setup for a UPS project without having to grab code from several separate repos. The default value for each of the following is ``` false ```.</p>
    * <b>UPS Fonts</b>
      * If true this option will include all UPS custom fonts in your project as well as set them up in your main LESS file.
    * <b>Webtrends</b>
      * If true this option will include all necessary PHP classes as well as JavaScript files/script tags needed to integrate Webtrends tagging for your project.  
    * <b>Brightcove</b>
      * If true this option will include the necessary Javascript and ``` script ``` tags to use Brightcove functionality.
    * <b>customInput.js</b>
      * Selecting this adds and configures customInput.js which is helpful for creating custom radio/checkbox inputs for html forms.
    * <b>Form Validation</b>
      * Select this to add and configure necessary PHP classes and JavaScript files to validate your forms.
    * <b>IE8 backgroundsize.min.htc</b>
      * Select this adds backgroundsize.min.htc to your project and wires it up to your LESS in order to use ``` background-size: cover/contain ``` and others without fear in IE8.
      * [Visit the creator's Github page for more info](https://github.com/louisremi/background-size-polyfill)
    * Linkedin signin
      * This will include the necessary JavaScript and ``` <script> ```'s to enable you to use the Linkedin API to auto fill form information.
    

    

<br>
### Gruntfile.js
The [Grunt ecosystem](http://gruntjs.com/) is huge and it's growing every day. With literally hundreds of plugins to choose from, you can use Grunt to automate just about anything with a minimum of effort. If someone hasn't already built what you need, authoring and publishing your own Grunt plugin to npm is a breeze.

#### Grunt Plugins
The following Grunt plugins are being utilized by the T3 webapp generator. Visit the [Plugins Database](http://gruntjs.com/plugins) to browse more plugins.

* <b>[grunt-contrib-copy](https://www.npmjs.org/package/grunt-contrib-copy)</b>
  * Copy files and folders.
* <b>[grunt-contrib-concat](https://www.npmjs.org/package/grunt-contrib-concat)</b>
  * Concatenate files.
* <b>[grunt-contrib-uglify](https://www.npmjs.org/package/grunt-contrib-uglify)</b>
  * Minify files with UglifyJS.
* <b>[grunt-contrib-jshint](https://www.npmjs.org/package/grunt-contrib-jshint)</b>
  * Validate files with JSHint.
* <b>[grunt-contrib-cssmin](https://www.npmjs.org/package/grunt-contrib-cssmin)</b> 
  * Compress CSS files.
* <b>[grunt-contrib-connect](https://www.npmjs.org/package/grunt-contrib-connect)</b>
  * Start a connect web server.
* <b>[grunt-contrib-clean](https://www.npmjs.org/package/grunt-contrib-clean)</b>
  * Clean files and folders.
* <b>[grunt-contrib-htmlmin](https://www.npmjs.org/package/grunt-contrib-htmlmin)</b>
  * Minify HTML.
* <b>[grunt-bower-install](https://www.npmjs.org/package/grunt-bower-install)</b>
  * Inject your Bower dependencies right into your HTML from Grunt.
* <b>[grunt-contrib-imagemin](https://www.npmjs.org/package/grunt-contrib-imagemin)</b>
  * Minify PNG, JPEG, and GIF images.
* <b>[grunt-contrib-watch](https://www.npmjs.org/package/grunt-contrib-watch)</b>
  * Run predefined tasks whenever watched file patterns are added, changed, or deleted.
* <b>[grunt-modernizr](https://www.npmjs.org/package/grunt-modernizr)</b>
  * Sifts through project files, gathers up references to Modernizr tests, and outputs a lean, mean Modernizr machine.
* <b>[load-grunt-task](https://www.npmjs.org/package/load-grunt-tasks)</b>
  * Load multiple grunt tasks using globbing patterns.
* <b>[time-grunt](https://www.npmjs.org/package/time-grunt)</b>
  * Displays the execution time of grunt tasks.
* <b>[jshint-stylish](https://www.npmjs.org/package/jshint-stylish)</b>
  * Stylish reporter for JSHint.
* <b>[grunt-contrib-less](https://www.npmjs.org/package/grunt-contrib-less)</b>
  * Compile LESS files to CSS.
* <b>[grunt-shell](https://www.npmjs.org/package/grunt-shell)</b>
  * Run shell commands.

#### Grunt Tasks
<b>NOTE: The current state of the generator requires you to ```cd``` into the root directory the generator creates to run Grunt tasks. Using the defaults, you would do the following before running ```grunt```: ```cd srv/ups-my-project```</b>

<code>Gruntfile.js</code> will be utilized to automate many monotonous procedures throughout the development phase. T3's webapp generator currently includes three tasks out-of-the-box:

* <code>grunt [default]</code>
* <code>grunt build</code>

<br>

<code>default</code>: This will create a local connection, run ``` sudo vagrant up --provision ``` (you may need to enter your system password), and watch for changed files. Less files will be compiled, but all other files will remain intact (no minification, concatenation, or uglification). Once you see ```waiting...``` in your command line, open a browser and visit ```http://localhost:8888```.
<pre><code>$ grunt serve</code></pre>
<br>

<code>build</code>: Builds complete packaging, concatenates files, mins files, compiles less, and uglifies. The resulting files are placed in the <code>dist</code> folder - this folder can then be deployed.
<pre><code>$ grunt build</code></pre>

<br>