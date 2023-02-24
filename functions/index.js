const functions = require("firebase-functions");

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

exports.api = functions.https.onRequest((req, res) => {
    switch (req.method) {
        case 'GET':
            res.send("It was a GET request")
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
})