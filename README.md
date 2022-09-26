# DocSeek Web App

Link: https://doc-seek.netlify.app/

Tech Stack:
- React
- NodeJS
- Express
- PostgreSQL

## Requirements
### Profile Creation
#### Doctor

The normal signup can be with email, name, and password, and after this we should ask the doctors to fill additional information as mentioned here:
- Qualification
- Experience
- Hospital
- Location
- Days and Time slots available 
- Speciality (can select multiple)

Landing Page
![Screenshot 2022-09-26 121258](https://user-images.githubusercontent.com/92965519/192212319-f3ad6fe5-7eac-4548-a9f6-874091761b77.png)

Onboarding Page
![Screenshot 2022-09-26 121855](https://user-images.githubusercontent.com/92965519/192212377-0b99c3b5-00bf-471c-a07e-e8a7594e14eb.png)

#### Patient
Patients should be able to sign up with their name, email, contact and password. They should have an option to login as well.
When patient creates an account we want to collect additional information about them like what diseases or discomforts they are suffering from, their blood group, weight, sex, age etc.

We also need to implement the password reset feature, where user can enter their email and they will receive the password reset link on the email

### Doctor Frontend
- Doctor will have dashboard like view, where they can see a calendar with upcoming bookings and today's bookings
- Doctor can also see their total consultations and earnings made in the given time frame
- Once the meeting's start time is near, the doctor can click on meeting and add their notes and prescription and mark meeting as done.

After meeting is marked as done from Doctor's side, the patient can then give rating to the doctor and a review, which will appear on Doctor's profile.

Doctors Home Page
![Screenshot 2022-09-26 121651](https://user-images.githubusercontent.com/92965519/192212485-53f27c92-47d4-4e3d-b9e3-d6c457ea319f.png)

Information required for patients:
- Name
- Past Diseases 
  - Disease name, and for how long they have had it  
- Location
- Looking for

### Patient Frontend
- Can see the list of all doctors with their ratings, qualifications and cost.
- On selecting a doctor, will get pop-up with available time slots based on date chosen and can book the doctor
- Once booking is made, it will appear in their profile page under `Upcoming Consultations` 
- In their profile they can also see `Past consultations`

Patients Home Page
![Screenshot 2022-09-26 121134](https://user-images.githubusercontent.com/92965519/192212524-0bfdd279-5392-4bc1-b80d-ff8aff372012.png)

Booking a consultation
![Screenshot 2022-09-26 121207](https://user-images.githubusercontent.com/92965519/192212566-fe5d30e1-3073-40c7-adf9-394016cc46e2.png)



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
