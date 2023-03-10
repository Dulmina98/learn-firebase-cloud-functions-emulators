const functions = require("firebase-functions");
const axios = require("axios");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.helloWorld = functions.https.onRequest((req, res) => {
    res.send("Helllo from firebase functions...")
})

exports.api = functions.https.onRequest(async (req, res) => {
    switch (req.method) {
        case 'GET':
            const response = await axios.get('https://jsonplaceholder.typicode.com/users/1')
            res.send(response.data);
            break;
        case 'POST':
            const body = req.body
            res.send(body)
            break;
        case 'DELETE':
            res.send("It was a DELETE request")
            break;
        default:
            res.send("It was a default request...")

    }
});

exports.userAdded = functions.auth.user().onCreate(user => {
    console.log(`${user.email} is created...`)
    return Promise.resolve()
})

exports.userDeleted = functions.auth.user().onDelete(user => {
    console.log(`${user.email} is deleted...`)
    return Promise.resolve()
})

exports.fruitAdded = functions.firestore.document('/fruits/{documentId}').onCreate((snapshot, context) => {
    console.log(snapshot.data());
    return Promise.resolve();
})

exports.fruitDeleted = functions.firestore.document('/fruits/{documentId}').onDelete((snapshot, context) => {
    console.log(snapshot.data(), 'deleted');
    return Promise.resolve();
})

exports.fruitUpdated = functions.firestore.document('/fruits/{documentId}').onUpdate((snapshot, context) => {
    console.log('Before ', snapshot.before.data())
    console.log('After ', snapshot.after.data());
    return Promise.resolve();
})

exports.scheduledFunction = functions.pubsub.schedule('* * * * *').onRun(context => {
    console.log('I am running/executing every minute...');
    return null;
})