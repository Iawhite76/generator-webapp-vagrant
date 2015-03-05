![T-3 icon](https://t3-assets.uat-l.thethinktank.com/images/T3logo.png)
<hr/>
# Technical Documentation
<hr/>

| Client   | Project Name   | Job # |
|----------|----------------|-------|
| UPS      | Houston        | 25289 |

**Prepared by:** 	Michael Bucklin

**Last Updated:** 	02/17/2015

**Version**:		v1.0.1

<br/>
<hr/>
# Table of Contents
<hr/>
1. Overview
2. Team  
3. Technical Architecture
4. Environments
5. Assets
6. API 
7. Branching/Deployment Strategy
8. Changelog  

<br/>
<hr/>
# 1. Overview
<hr/>

TBD

<br/>
<hr/>
# 2. Team
<hr/>

| Role             | Name            | Key |
|------------------|-----------------|-----|
| Account          | Lyndsey Wilson  | LW  |
| Producer         | Carolyn Elder   | CE  |
| Art Director     | Troy Anderson   | TA  |
| Copy Writer      | Jessica Lee     | JE  |
| Development Lead | Michael Bucklin | MB  |
| Developer        | Ian White       | IW  |
| QA Lead          | David Dennis    | DD  |

<br/>
<hr/>
# 3. Technical Architecture
<hr/>
### 3.1 Technlogies Utilized

| Purpose                     | Technology |
|-----------------------------|------------|
| Development Server          | Vagrant    |
| Server Side Language        | PHP        |
| CSS Pre-processor           | LESS       |
| Dependency Management       | Bower      |
| JavaScript Task Runner      | Grunt      |
| JavaScript Framework        | jQuery     |

### 3.2 Development Machine Setup

#### 3.2.1 Prerequisites

The following software must be installed and properly configured on your development machine.

* NodeJS
* Grunt
* Bower
* Vagrant

#### 3.2.2 Source Code

The GIT repository is located at: 

	SSH: git@gitlab.t-3.com:ups/houston.git

	HTTPS: https://gitlab.t-3.com/ups/houston.git

#### 3.2.3 Dependencies

Next, we need to make sure that you have all the necessary dependencies in order to run the project locally, as well as test and publish builds once that point has been reached.

Go to your project directory, and run:

	bower install
	
followed by
	
	npm install
	
This will download the bower and grunt depencencies. Note that these depedences are stored in a folder called 'node_modules' and 'bower_components'. These folders are not commited to the source repository.

#### 3.2.3 Vagrant
	
Once the project has been cloned to your development machine, you will need to initialize your Vagrant virtual machine. Open up terminal, navigate to your project directory and run the following command:

	sudo vagrant up

Depending on your internet connection, it may take 5-10 minutes for the virtual machine to download and configure itself.

** NOTE: By default, this Virtual Machine is configured to use ports 80 and 443 to server the sites. If you have an existing Apache or IIS instance running, you will need to disable it, other wise you will get a port collision error when running the 'vagrant up' command.  **

#### 3.2.4 Hosts Entries

In order to pull up the sites on your local machine by domain name, you will need to add some entries to your hosts file. Your hosts file is location in the following location:

	Mac: /private/etc/hosts

	Windows: C:\Windows\System32\Drivers\etc\hosts

Open the file in your development editor, add the following entries:

	127.0.0.1 houston.ups.dev
	127.0.0.1 www.houston.ups.dev

Save the file, and close your editor. 

** NOTE: Some programs may not able to edit the hosts file, as it is write protected. Using a program such as notepad++ (Windows) or TextMate (Mac) should allow your to edit the file without issue. **

### 3.3 Grunt Tasks

`Grunt.js` will be utilized to automate many monotonous procedures throughout the development phase. The Grunt file for this project will:

1. Validate your JavaScript with JSHint
2. Compile and minify Bootstrap’s bootstrap.less along with your site-specific app.less to main.min.css
3. Concatenate and minify all your JavaScript plugins and site-specific JS to scripts.min.js
4. Update lib/scripts.php’s wp_enqueue_style and wp_enqueue_script calls to update the version based off the md5 of the files (to bust cache)

`default`: Runs the default build, which accomplishes all 4 of the above tasks.

	grunt default


`dev`: Watches for updates to your LESS and JS files, automatically re-building as you write your code.

	grunt dev
	
### 3.5 Browser/Device Support

The browser support strategy below is based on the principles of graceful degradation and progressive enhancement.

#### Support Grades

**A-Grade**

A-grade support is the highest support level.

* All content and functionality is present
* Transparent progressive enhancement is acceptable

**B-Grade**

B-grade browsers contain all the content and the majority of the functionality as in A-grade, but may have some minor visual and functional variations.  Many browsers are considered B-grade because there are newer versions available.&sup1;

* All content is accessible
* Minor visual and functional variations are acceptable
* Functionality requiring newer browsers is disabled

*&sup1; Not all B-Grade browsers will have visual and functional variations. In many cases, they will perform identically to A-grade browsers.*

**Unsupported**

Browsers not listed are either out of date or have a very low usage percentage.  These browsers will not be tested or officially supported.&sup2; In general, bugs in unsupported browsers will not be addressed; however there may be some business use-cases that necessitate a fix.

*While unsupported browsers will neither be tested nor supported, some may still function as intended. This will vary from browser to browser, and will depend on the age of the browser and how standards compliant the browser is.*


#### Support Tables

The following tables describe which browsers and devices will be supported by the UPS Capital website.<br />

**Desktop:**

| Grade | IE     | Safari  | Firefox | Chrome  |
|-------|--------|---------|---------|---------|
| A     | 9 - 11 | 5.1 - 7 | Latest  | Latest  |
| B     | 8      | 5.0     | 16 - 25 | 23 - 30 |

**Mobile:**

| Grade | iOS   | Android   |
|-------|-------|-----------|
| A     | 7 - 8 | 4.0 - 4.4 |
| B     | 6.1.5 | 2.3 - 3.2 |


# 4. Environments
<hr/>

| Environment | Server  | IP        | URL                         |
|-------------|---------|-----------|-----------------------------|
| Local       | Vagrant | 127.0.1.1 | http://houston.ups.dev:8888 |
| UAT         | TBD     | TBD       | TBD                         |
| Production  | TBD     | TBD       | TBD                         |

# 5. Assets
<hr/>

### 5.1 Schedule

Schedule revisions are listed here as follows:

* TBD

### 5.2 Comps

Comp revisions are listed here as follows:

* TBD

* Telescope:
	- TBD
	
### 5.3 Copy

Comp revisions are listed here as follows:

* Telescope:
	- TBD

### 5.4 Videos

The source video(s) for this site can be found in the following location(s):

* TBD

### 5.5 Test Plan

Test plan revisions are listed here as follows:

* Telescope: TBD

<br/>

<hr>
# 6. API
</hr>

| API Key        | Secret Key       | OAuth User Token                     | OAuth User Secret                    |
|----------------|------------------|--------------------------------------|--------------------------------------|
| 75wftk7poygqb4 | yFnfnX1LWrFS3LiU | d8eedb56-99c0-4c9c-a313-ec09ecc0078e | 0b161a15-0a5c-461c-b55d-effecc093803 |
|                |                  |                                      |                                      |
|                |                  |                                      |                                      |


<hr/>
# 7. Branching/Deployment Strategy      
<hr/>

### 7.1 Branch Structure

master

- This mirrors production. The technical architect will merge to this branch from stage. 

stage

- This is our review branch. It is from this branch that UAT is built. When you want to merge into this branch, you must create a pull request to the Development Lead (MB).  The lead will review the code, and either send feedback or approve the request. Once approved, the lead will trigger a review build.

development

- This branch will the latest development build of the site. This branch will contain all the feature branches as they are ready for a particular build.

feature/feature_name

- There will be a feature branch created for each component of the project. These feature branches are where the development will actually occur. You will always create these from the development branch, and will need to merge development back into the branch before submitting your pull requeset.


### 7.2 Deploying to UAT

- TBD


<br/>
<hr/>

# 8. Changelog
<hr/>
* v1.0.0 - Initial Draft
* v1.0.1 - Added Vagrant
<br/>