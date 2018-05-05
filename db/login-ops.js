import mongodb from 'mongodb';
import dotenv from 'dotenv';
import Q from 'q';
dotenv.config();
const mongo = mongodb.MongoClient;

module.exports = {
login : function(user, url){
    let email;
    if (!user.email){
        email = "Not provided"
    }
    else {
        email = user.email;
    }
    const thisUser = {
        name : user.name,
        email: email,
        going: []
    }

    const deferred = Q.defer();
    mongo.connect(url, (err, client) => {
        const query = {
            email: thisUser.email
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
},
find: function(email, url){
    const deferred = Q.defer();
    mongo.connect(url, (err, client) => {
        if (err) throw err;
        const query = {
            email: email
        }
        const db = client.db('fcc-nightlife-db');
        const collection = db.collection('users');

        collection.findOne(query, (err, result) =>{
            if (err) throw err;
            if (result === null){
                console.log("No user logged in");
                deferred.resolve(false);
                client.close()
            }
            else {
            deferred.resolve(result);
            client.close();
            }
        });
    });
    return deferred.promise;
},
addGoing: function(user, restaurant, url){
    const deferred = Q.defer();
    mongo.connect(url, (err, client) => {
        if (err) throw err;
        const db = client.db('fcc-nightlife-db');
        const collection = db.collection('users');
        const query = {
            email: user.emails[0].value
        }
        const update = {$addToSet: {
            going : restaurant
        }}

        collection.updateOne(query, update, function(err, response) {
            if (err) throw err;
            if (!response){
                client.close();
                console.log("Add operation unsuccessful")
                deferred.resolve(false);
            }
            else{
                console.log("Add operation successful!");
                client.close();
                deferred.resolve(response);
            }
        })
    });
    return deferred.promise;
},
removeGoing : function(user, id, url){
    const deferred = Q.defer();
    mongo.connect(url, (err, client) => {
        const db = client.db('fcc-nightlife-db');
        const collection = db.collection('users');

        const query = {
            email: user.email
        }
        const operation = {
            $pull : {
                going: id
            }
        }
        collection.update(query, operation)
        .then(result => {
            if (result == null){
                client.close();
                console.log('Could not find ID');
                return deferred.resolve(false);
            }
            else {
                client.close();
                console.log("removed " + id)
                return deferred.resolve(result);
            }
        }).catch(e => {
            console.log(e);
        })
    })
    return deferred.promise;
}
}