# BlogList
Connected to MongoDB database, allows to create accounts, validate them, log in and then make manage and display each user’s posts. 

# Technologies used
- MongoDB
- Mongoose
- argon2
- JWT
- express
<br />

- React
- Redux
- React Router

## Backend
Based on document-oriented database MongoDB allows users to create accounts with unique username and "secure" password which is then hashed with argon2. Each user is give JWT token which is used for later verification. 

When loggin in the data gets validated and if it matches the user in database user's token gets cached in browsers memory so they don't need to perform log in action after each refresh.

Logged in users can post new blogs and view all users' posts. Each user can only delete his own posts.

Of course users can safely log out and then the token gets removed from browsers memory.

## Frontend
At first view user is presented with all posts. On the navbar they can see a log in button which routes them to the login section.

When logged in users can manage their own posts on a special tab on navbar called user. Also instead of log in, the log out button is displayed.
