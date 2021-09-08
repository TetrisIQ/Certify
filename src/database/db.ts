import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';

const serviceAccount = require('../../firestore.creds.json');

class db {
    constructor() {

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
        });

        const firestore = admin.firestore();
        fireorm.initialize(firestore);

    }

}

export default new db();