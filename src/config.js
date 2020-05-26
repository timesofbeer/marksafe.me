const config ={
    firebaseConfig:{
        apiKey: 'AIzaSyAvblFJKw1xJrzzxIOpv1LCy39lCmROdx8',
        authDomain: 'localhost:3000',
        databaseURL: 'localhost:3000',
        projectId: 'marksafe-35376',
        storageBucket: 'marksafe-35376.appspot.com',
        appId: "1:163900157342:web:48a2526200f4dd9e1d7a8f",
        measurementId: "G-0K6WWNLDPQ"

      },
      endPoint:{
          getUser:"https://us-central1-marksafe-35376.cloudfunctions.net/getUsers",
        //   getUser:"http://0.0.0.0:5000/marksafe-35376/us-central1/getUsers",
        //   addUser:"http://0.0.0.0:5000/marksafe-35376/us-central1/addUser"
        addUser:"https://us-central1-marksafe-35376.cloudfunctions.net/addUser"
      }
}
export default config;