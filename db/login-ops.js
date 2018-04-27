import mongodb from 'mongodb';
import dotenv from 'dotenv';
import Q from 'q';
dotenv.config();
const mongo = mongodb.MongoClient;

module.exports = {
login : function(user, url){
    const thisUser = {
        name : user.name,
        email: user.email,
        going: []
    }

    const deferred = Q.defer();
    mongo.connect(url, (err, client) => {
        const query = {
            email: user.email
        }
            if (err) throw err;
            console.log("Connected to Database!");
            const data = client.db('fcc-nightlife-db')
            const collection = data.collection('users');

            collection.findOne(query, function(err, result) {
                if (err) throw err;

                console.log(result);
                if (result == null || result.length == 0){
                    collection.insert(thisUser);
                    client.close();
                    console.log("User created!");
                    deferred.resolve("User created! " + user.name);
                }
                else {
                    client.close();
                    console.log("Found user!");
                    deferred.resolve(result);
                }
            })
            
    })
    return deferred.promise;
}
}