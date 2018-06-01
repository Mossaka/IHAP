import firebase from 'firebase';

let tickets = null;
export function getTickets(cb) {
  if (tickets) cb(tickets);
  else {
    firebase.database().ref('tickets').on('value', snapshot => {
      tickets = snapshot.val();
      cb(tickets);
    });
  }
}