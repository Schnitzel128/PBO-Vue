# PBO-Vue
## Installation
#### 1. Install required environment
First of all, you need the following: 
+ PostgreSQL (10.x)
+ [node.js](https://nodejs.org) (min 10.x)
+ Vue-Cli (`npm install -g @vue/cli`) 
+ Knex.js, global installation (`npm install knex -g`)


#### 2. Module installation
After cloning the repository you need to run the node module installer (be sure to be in the directory).
```
npm install
```


#### 3. Create Database
Create a new Database (using PostgreSQL commandline)
```
create database [databasename];
```


#### 4. Edit Database file
1. Make a copy from `knexfile.js.edit` and name it `knexfile.js`
2. Open the file and update your database/username/password from postgreSQL


#### 5. Run migration script
Now we create the table
```
knex migrate:latest
```
Tip: you can undo/delete the migration with `knex migrate:rollback`

#### 6. Ready to go!
You are good to go now


## Start scripts
```
// Compiles and hot-reloads for development
> npm run serve

// Start Server
> npm run start

// Compiles and minifies for production
> npm run build

// Lints and fixes files
> npm run lint
```
