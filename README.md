# Repository for an exam in nodeJS express
This project was for getting evaluated in nodeJS and express. The objective was to make an auth page redirecting to a contact page and send the data to a database.
I took the exercise a little further and i've made a register/login system with cookies and token. Then i added a the contact form that send the data to my DB.
A profile page is ready to be filled with user info like bio, image, profile, etc ...
The nav bar is also different if you are logged or not on the site.

# Plan for the future

* Add regex for the register
* Mailing system for registered user
* Profile personalisation
* Deleting account
* Manage ticket(suppression, on hold,..)

# Installation

## Prerecquisites
* Install [nodeJS](https://nodejs.org/en/download/)

install one of them
* Install [wamp](https://www.wampserver.com/) pour mac
* Install [mamp](https://www.mamp.info/en/downloads/) pour mac/windows
* Install [lamp](https://doc.ubuntu-fr.org/lamp) pour linux

or any other stack of apache, mysql, php/perl/python.

## Install & Initialize :
```
npm install
```

# Project
URL : `localhost:5000`

Run the project with `npm start` will open the server.

## Option
you can import my database structure if you want, the import file is in optional folder.

## Troubleshooting
Since i set my db with my own name if you are using different one don't forget to change them in the code.
Nearly all environment variable are empty, so it won't run if you did not put your own.

## Notice
You should take a look at `./config/.env` to change variable config.

## Version
- nodeJS 15.11.0
- apache 2.4.41
- mysql 8.0.23, default port : 3306
