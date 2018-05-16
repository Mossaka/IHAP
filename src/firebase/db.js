import { db } from "./firebase"

export const doCreateUser = (id, username, email) => {
    db.ref(`users/${id}`).set({
        username,
        email,
    })
}

export const readLineNum = () => {
  let count = 0;
  var wl = db.ref(`restaurants/CanyonVista/payments`).orderByKey();
  wl.once('value').then(function(snapshot) {
    snapshot.forEach(function(childSnapshot){
      var check = childSnapshot.val().seated;
      if(!check) {
        count = count+1;
        console.log("The count is " + count);
      }
    });
  });
  return new Promise((resolve, reject) => {
    console.log("in Promise" + count)
    setTimeout(() =>  {
      resolve(count)
    }, 250)
  })
}

export const writePayment = (payment, id) => {

   var paymentID = db.ref(`restaurants/CanyonVista/`).child('payments').push().key;
   // Write the new post's data simultaneously in the posts list and the user's post list.
   var updates = {};
   updates['/payments/' + paymentID] = payment;
   return db.ref(`restaurants/CanyonVista/`).update(updates);
 }
export const setCount = (a) =>
   db.ref('count').set(a);

export const getCount = () =>
  db.ref('count').once('value');

export const onceGetUsers = () =>
    db.ref('users').once('value');

export const onceGetUser = (id) =>
    db.ref(`users/${id}`).once('value');

export const onceGetRest = (id) =>
    db.ref(`restaurants/${id}`).once('value');