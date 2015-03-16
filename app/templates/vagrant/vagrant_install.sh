#!/usr/bin/env bash

sudo apt-get update
sudo apt-get -y install php5-curl apache2 php5 php5-mcrypt

rm -rf /var/www
sudo ln -s /vagrant /var/www

a2enmod rewrite

sed -i "s/error_reporting = .*/error_reporting = E_ALL/" /etc/php5/apache2/php.ini
sed -i "s/display_errors = .*/display_errors = On/" /etc/php5/apache2/php.ini
sed -i '/AllowOverride None/c AllowOverride All' /etc/apache2/sites-available/default
sed -i '/EnableSendFile off/EnableSendFile off/' /etc/httpd/conf/httpd.conf

rm -rf /etc/apache2/sites-available
sudo ln -s /vagrant/provisioning/vagrant_files/etc/apache2/sites-available /etc/apache2/sites-available

rm -rf /etc/hosts
sudo ln -s /vagrant/provisioning/vagrant_files/etc/hosts /etc/hosts

sudo a2ensite default

service apache2 restart
