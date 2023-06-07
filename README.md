  # Social Network API
  
  ## Description 
  This is an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. 
  
  ## Table of Contents
  * [Technology Stack](#technology-stack)
  * [User Story](#user-story)
  * [Acceptance Criteria](#acceptance-criteria)
  * [Installation](#installation)
  * [Screenshot](#screenshot)
  * [Usage](#usage)
  * [License](#license)
  * [Outside Resources](#outside-resources)
  * [Questions](#questions)

  ## Technology Stack

  ![javaScript](https://img.shields.io/badge/-JavaScript-61DAFB?color=red&style=flat)
  ![expressJS](https://img.shields.io/badge/-Express.js-61DAFB?color=orange&style=flat)
  ![nodeJS](https://img.shields.io/badge/-Node.js-61DAFB?color=yellow&style=flat)
  ![mongoDB](https://img.shields.io/badge/-Mongoose-61DAFB?color=green&style=flat)
  ![mongoose](https://img.shields.io/badge/-Moment.js-61DAFB?color=blue&style=flat)
  ![momentJS](https://img.shields.io/badge/-FomanticUI-61DAFB?color=purple&style=flat)

  ## User Story
  ```md
    AS A social media startup
    I WANT an API for my social network that uses a NoSQL database
    SO THAT my website can handle large amounts of unstructured data
  ```

  ## Acceptance Criteria
  ```md
    GIVEN a social network API
    WHEN I enter the command to invoke the application
    THEN my server is started and the Mongoose models are synced  
    to the MongoDB database
    WHEN I open API GET routes in Insomnia for users and thoughts
    THEN the data for each of these routes is displayed in a formatted  
    JSON
    WHEN I test API POST, PUT, and DELETE routes in Insomnia
    THEN I am able to successfully create, update, and delete users and  
    thoughts in my database
    WHEN I test API POST and DELETE routes in Insomnia
    THEN I am able to successfully create and delete reactions to  
    thoughts and add and remove friends to a user’s friend list
  ```
  
  ## Installation 
  
  * Ensure you are running Node.js v16.
  * Clone the repository.
  ```
    git clone git@github.com:erin-m-keller/keller-social-media.git
  ```

  * Install the dependencies.
  ``` node
    cd keller-social-network
    npm i
  ```

  * Seed the database
  ``` node
    npm run seed
  ```

  * Start the server in the terminal
  ``` node
    npm start
  ```
  > Application available at localhost:3001. Use Insomnia or Postman to use the API

  ## Screenshot

  // TODO: Add screenshot
  
  ## Usage

  // TODO: Add video
  
  ## License 
  [![MIT license](https://img.shields.io/badge/License-MIT-purple.svg)](https://lbesson.mit-license.org/)

  ## Outside Resources
  
  // TODO: Add outside resources if applicable
  
  ## Questions
  If you have any questions about this project, please contact me directly at [aestheticartist@gmail.com](aestheticartist@gmail.com).  
  You can view more of my projects [here](https://github.com/erin-m-keller).