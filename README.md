# landmark-remark-app

 Landmark remark app allows you to select a point on the map and attach a remark to the selected coordinates. The remarks are saved in the Firebase Firestore dB and then retrieved and displayed as a list. Users are able to view remarks created by other users.
 
 # Steps to run app
 
 1. Clone Repo
 2. In terminal run ``` npm install ``` to install project dependencies 
 3. Run ``` npm start ``` to start the app
 
 logon to test account: 
 
 Email: test@test.com
 PWD: 123456

 # Technologies used:

 - React
 - React-router-dom
 - React-map-gl / mapbox-gl -> implementation time **45mins**
 - Firebase Firestore -> implementation time **1.5hr**
 - Firebase Authentication -> implementation time **1.5hr** 
 - Styled Components -> **1hr** -> I contemplated using Tailwind. I like Tailwind's approach to using a mobile first approach. I opted for Styled components because usage and implementation is easier 
 - Research/reading docs/youtube videos/referencing school material -> **4hr** 
 - Refactoring Code - **2hr**
 - Debugging - **2hr**

 # Bugs/Missing functionality/things I want to improve:

 1. When the user clicks on the map the remarks disappear
 2. Maybe not a bug, but I did not include the 'notes' in the useEffect dependency to render the list as remarks are added and deleted. I noticed in the console the app was constantly re-rendering. When remark is edited, deleted, or added you have to refresh the page to see the updated list. 👎
 3. Users that do not own the remark are able to delete and edit remarks - need to implement deeper authentication protocols. Checking whether the user that created the remark is the one updating or deleting it
 4. Did not display list of users that are logged in 
 5. I do not like the way my search is filtering the list of remarks - I think the logic was correct.. but felt clunky
 6. When user creates new account there is no message saying the account is successfully created
 7. Errors are displayed only in the console -> want to improve by displaying error in UI where needed
 8. I could have put in more time in to the styling of the app
 9. I can do better at breaking down the UI into smaller components 
 10. I did not create environment variables -> Super important to do so but I will shut down the dB and auth portal in a couple weeks time anyways.
 11. Could have implemented global state management with Redux or my preferred Zustand

 # Things I learnt and hope to learn:

 useContext is something I've been always hesitant to use. I haven't had a real lesson on it at school, but was really cool implementing it in this project and learning about it, even if it was very surface level. Firebase was completely new. I think my approach to the project was okay.. I feel like there probably is a much better way to do it. I did not implement Typescript. I understand it's usage and how it can enhance a react app, allowing us to create Types for a language that is loosely typed. I wasn't too comfortable impelementing it and the little bit that I tried looked really messy. I would like to spend more time improving the app both functionally and visually. I did want to do as much as I could in the 5-12 hour window, I know I was allowed to use as much time as I wanted, but wanted to see where I'm at within the recommended time. 
