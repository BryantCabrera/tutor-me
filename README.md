# Bryant Cabrera's tutor-me

### A. Description
Bryant Cabrera's TutorMe app is a web-based application which aims to facilitate connections and scheduling between tutors and potential students.  As a private tutor by trade, I wanted to create an app that was a one-stop-shop for all of my scheduling and roster needs.

User Stories: 
- Tutor - A tutor will use the app to get more exposure for his/her/zher services.  The tutor can use the app to contact nearby potential clients and keep their schedule & roster organized.

- Student - A student will use the app to find nearby tutors.  The student can make a more informed choice because of other students' reviews.  In addition, the student can preview a tutor's availability and subject specialties.

### B. Images
1. Wireframe
![Image of Overall Wireframe](public/imgs/README_imgs/TutorMe_wireframe.png)
![Image of Tutor Section Wireframe](public/imgs/README_imgs/TutorMe_wireframe-tutor.png)
![Image of Student Section Wireframe](public/imgs/README_imgs/TutorMe_wireframe-student.png)
![Image of Locate Student/Tutor Section Wireframe](public/imgs/README_imgs/TutorMe_wireframe-locate.png)
2. NavBar
    1.  No user logged in
    ![Image of NavBar with no User Logged In](public/imgs/README_imgs/TutorMe_wireframe-navbar-nouser.png)
    2.  User logged in
    ![Image of NavBar with User Logged In](public/imgs/README_imgs/TutorMe_wireframe-navbar-user.png)

### C. Technologies Used
1. HTML
    1. Block__Element--Method (BEM) class naming methodology
2. CSS
3. Sass
3. JavaScript
4. jQuery
5. Express
6. Node
7. MongoDB
8. Mongoose
9. IonIcons
10. Google API
    1. Geocoder
    2. Places
    3. Routes
    4. Maps
11. Adobe Illustrator, Photoshop, XD
12. Final Cut Pro X
13. Compressor

### D. Getting Started
1. Link to deployed app on Heroku:
[GitHub Pages Deployed App](https://bryantcabrera.github.io/tutor-me/#)
2. Instructions
    1. Connect to a databse sandbox of your choice.  I used mlab.com and created a sandbox user account so I could populate my app with data.
    2. In the db.js file in the db folder, make sure the connectionString variable is set to your database connection.
    3. Once you are connected to your database, open the app by clicking the link above.
    4. To Create a user: 
        1. Select the proper account type.  
        2. Fill out all required fields (marked with an *) and click "register"
    5. To Edit your profile:
    6. To Delete your profile:
    7. If you're a student, to add a tutor to your profile:
    8. For any account, to add a comment to anyone's profile:
    9. To log out: Click the hamburger menu and click "Log Out".

### E. Next Steps
1. Unsolved problems
    - [ ] Once logged in, a user can still access other user's edit pages by typing "/edit" after the other profile page's show route url.  I will need to create an if statement using sessions to block access to that particular route from anyone except the account's owner. 
    - [ ] Update route incorrectly handles addition of information to subjects property
2. Planned features
    - [ ] Connect scheduling API with intuitive user interface that updates data models' availability property
    - [ ] Comments
        - [ ] Display link to poster
        - [ ] On poster's profile, display written comments with link to postee
        - [ ] Make comments Editable
        - [ ] Make comments Deletable
        - [ ] Style comments
    - [ ] Hide registration/login form when a user is logged in but goes to the home page.