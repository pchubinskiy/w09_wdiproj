# Full-stack project for week nine of WDI.
URL: https://w09wdiproj.herokuapp.com/


**Explanations of the technologies used**

Mongoose simple random package (npm)

+ used in question.js for getting a random question from collection
+ use case: https://www.npmjs.com/package/mongoose-simple-random

Moment.js date/time library

+ Used to format dates as desired--in this case numerically--so mongoose can sort by most recent user answers.

Bootstrap

+ used for jumbotron layout

**A couple paragraphs about the general approach you took**

    made directory locally
    set up express in repo
    made repo in github; created a remote for it in git
    deployed to heroku; set up procfile; tested homepage
    set up mongoose
    set up mongodb
    designed models and confirmed that db queries work
    nested db queries for questions: find random and find all
    set up answer model
    wrote ajax api for loading and submitting answers
    used question _id as foreign key for answers to it
    loaded answers in survey log for the particular questions they were made in response to
    updated propmt question after user submission
    set answer show limit
    sorted loaded/updated answers by date created at
    real-time functionality: used setInterval to update 

**Installation instructions for any dependencies**

Mongoose simple random package (npm)

+ install with: $ npm i mongoose-simple-random

Moment.js date/time library

+ install with: $ npm install moment

**Link to your user stories – who are your users, what do they want, and why?**

    Users: GA students
    They want: to be able to use a survey app to answer questions about their needs and workflow
    Why: So they can gauge how others are experiencing or using similar things

    As a user, I should be able to: 
        + see a random question when I visit the page
        + submit an answer
        + see a log of questions 
        + see answers to questions displayed from most to less recent 
        + see a question's answer log be updated with my answer immediately after I submit it
    
        +! view questions by category
        +! select category for prompt's question

**Link to your wireframes – sketches of major views / interfaces in your application**

    ./survey_app.png

**Descriptions of any unsolved problems or major hurdles your team had to overcome**

    ! unresolved: include all major crud functions--the MVP didn't really need update/delete routes
    * express required empty repo for setup; created new folder inside git-initialized folder; deployed to heroku but didn't see index page because heroku was finding the outer .git folder and not the inner (app/express) folder
    * collection was capitalized so query ran but returned empty array; fixed with Sean's help. 
    * forgot to write "module.exports = router;" at the end of my api. does "router" assign everything in its location to the app?
    * remembering to require api router middleware in app.js
    * heroku logs error: cannot find module mongoose-simple-random
    * setting ENV var in heroku
    * seeing double posts on page but one update in DB; is value not cleared after submit?
    * to get update to work onclick and over time, appending _and_ removing answers is necessary
    * is local storage worth using?
    * installed moment.js, but not sure how to format dates (best guess: http://www.sitepoint.com/whats-the-best-date-format/)

 extra:
 
    * use handlebar or style page; maybe bootstrap for layout/responsive
    * integrate a third-party another API
    * templatestrings js
    * sockets.io


