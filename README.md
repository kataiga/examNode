# Repository for an exam in nodeJS express
This project was for geting evaluated in nodeJS and express. The objectif was to make an auth page redirecting to a contact page and send the data to a database.
I took the exercise a little further and i've made a register/login system with cookies and token. then i added a the contact form that send the data to my DB.
I can see all the ticket directly on the site if the user is administrator. A profile page is ready to be filled with user info liek bio, image, profile, etc ...
The nav bar is also different if you are loged or not on the site.

# Plan for the future

* Add regex for the register
* Mailing system for registered user
* Profile personalisation
* Deleting acount
* Manage ticket(suppresion, on hold)

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
Nearly all environment variable are empty so it wont run if you dant put your own.

## Notice
You should take a look at `./config/.env` to change variable config.

## Version
- nodeJS 15.11.0
- apache 2.4.41
- mysql 8.0.23, default port : 3306