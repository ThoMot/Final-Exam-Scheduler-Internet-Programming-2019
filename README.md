<h1>This is the Final Exam in <span style="color: red;">CST336</span>, by <span style="color: green;">Thora Mothes</span></h1>

**This is assignment let us create a scheduler web app. The project is set up with a MySQL database and can be viewed at https://cst336scheduler.herokuapp.com/. Please allow time for the server to respond first time loading the page. The project received a score of 100 and the grading rubric can be seen on the front page.**

**A ERD diagram and a screenshot of the database can be seen at the bottom of this document**

- Unfortunately the database has been taken down, so signup and sign-in no longer works for this application.
- I have removed the redirect when trying to access the dashboard without logging in, so it can be accessed by adding /dashboard


<h2>Assignment description:</h2>

Scheduler is a tool that allows a user to set up a schedule of available time slots in which they would be able to meet, then share an invitation link with people to book time with the user. (Check out https://calendly.com/ for an example of this in the real world.)

- The data should be stored in MySQL and all activity with the server should be using AJAX calls to API endpoints that interact with MySQL

<h3>Dashboard</h3>
The app needs to give the user the ability to see the appointment time slots they have made available in the future. This should be done in a list on the Dashboard:

<img src="https://simple.showdeo.com/csumb/scd/classes/336/exams/final/scheduler/assets/dashboard.png">
<img src="/images/Dashboard.png">

- If a date is in the past, do not show it in the Dashboard. You should have data that you manually enter into your data set that is in the past to demonstrate that you are omitting past dates.

<h3>Add Time Slot</h3>
If the user wants to add more available time slots, they should be able to do so by opening a modal that accepts the information about the appointment they want available. (Yes, this would be tedious in a real-life app...see the Black Diamonds for a slightly better way to allow a user to enter available time slots.)

<img src="https://simple.showdeo.com/csumb/scd/classes/336/exams/final/scheduler/assets/add-time-slot-modal.png"><img src="/images/AddApt.png">

- Once the Add button is clicked, the time slot should be added to the data set, then the data set should be saved to the server using an AJAX POST. When the POST is successful, the Dashboard should be refreshed.

<h3>Remove Time Slot</h3>
When the user clicks on Delete on an available time in the Dashboard, the user should be prompted with a confirmation modal:

<img src="https://simple.showdeo.com/csumb/scd/classes/336/exams/final/scheduler/assets/remove-slot-modal.png">
(This is no longer available as the database is down)

When Yes, Remove It! is clicked, the appointment time slot should be removed from the data set, then the data set should be saved to the server using an AJAX POST. When the POST is successful, the Dashboard should be refreshed.

When Cancel is clicked, the modal should close and the time slot should not be removed.

<h2>Black Diamonds</h2>

<h3>Login (♦️♦️♦️)</h3>
Create a login facility for the user using BCrypt storing the login credentials in a User table.

<img src="https://simple.showdeo.com/csumb/scd/classes/336/exams/final/scheduler/assets/login.png">
<img src="/images/logIn.png">

- A signup page is optional but may be easier to use to create the user account.

<img src="/images/signUp">

<h2>How the project will be graded:</h2>

<table>
<thead>
<tr>
<th style="text-align:left">#</th>
<th style="text-align:left">Task Description</th>
<th style="text-align:left">Points</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">1</td>
<td style="text-align:left">You provide a ERD diagram representing the data and its relationships. This may be included in Cloud9 as a picture or from a designer tool</td>
<td style="text-align:left">10</td>
</tr>
<tr>
<td style="text-align:left">2</td>
<td style="text-align:left">Tables in MySQL match the ERD and support the requirements of the application</td>
<td style="text-align:left">20</td>
</tr>
<tr>
<td style="text-align:left">3</td>
<td style="text-align:left">The list of available appointments is pulled from MySQL using the API endpoint and displayed using the specified page design</td>
<td style="text-align:left">20</td>
</tr>
<tr>
<td style="text-align:left">4</td>
<td style="text-align:left">Available times with dates in the past do not show up in the Dashboard list</td>
<td style="text-align:left">5</td>
</tr>
<tr>
<td style="text-align:left">5</td>
<td style="text-align:left">A user can add an available time slot to the MySQL using the API endpoint and displayed using the specified modal design</td>
<td style="text-align:left">20</td>
</tr>
<tr>
<td style="text-align:left">6</td>
<td style="text-align:left">A user can remove an available time slot from MySQL using the API endpoint</td>
<td style="text-align:left">15</td>
</tr>
<tr>
<td style="text-align:left">7</td>
<td style="text-align:left">The user confirms the removal using the specified modal design</td>
<td style="text-align:left">10</td>
</tr>
<tr>
<td style="text-align:left"></td>
<td style="text-align:left">TOTAL</td>
<td style="text-align:left">100</td>
</tr>
<tr>
<td style="text-align:left"></td>
<td style="text-align:left">This rubric is properly included AND UPDATED (BONUS)</td>
<td style="text-align:left">2</td>
</tr>
<tr>
<td style="text-align:left">BD</td>
<td style="text-align:left">Login works with a User table and BCrypt</td>
<td style="text-align:left">20</td>
</tr>
<tr>
<td style="text-align:left">BD</td>
<td style="text-align:left">Add Google Signin for app login</td>
<td style="text-align:left">10</td>
</tr>
<tr>
<td style="text-align:left">BD</td>
<td style="text-align:left">The app is deployed to Heroku</td>
<td style="text-align:left">5</td>
</tr>
<tr>
<td style="text-align:left">BD</td>
<td style="text-align:left">A banner file can be uploaded and displayed</td>
<td style="text-align:left">20</td>
</tr>
<tr>
<td style="text-align:left">BD</td>
<td style="text-align:left">The user can add multiple available time slots as specified</td>
<td style="text-align:left">10</td>
</tr>
<tr>
<td style="text-align:left">BD</td>
<td style="text-align:left">In a separate page, you show the correct list of available time slots to the user who navigates to the correct invitation URL</td>
<td style="text-align:left">10</td>
</tr>
<tr>
<td style="text-align:left">BD</td>
<td style="text-align:left">You correctly implement booking of the appointement, including all side effects</td>
<td style="text-align:left">30</td>
</tr>
</tbody>
</table>





<h2>ERD information:</h2>
<img src="https://github.com/ThoMot/cst336Final-Exam-Scheduler-2019/blob/master/ERD/ERDThoraMothes.png">

<h2>Database Information:</h2>
<h3>This displays all the appointments in the database:</h3>
<img src="https://github.com/ThoMot/cst336Final-Exam-Scheduler-2019/blob/master/DatabaseInfo/Appointments.png">
