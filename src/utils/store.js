import firebase from 'firebase';

let tickets = null;
export function getTickets(cb) {
  if (tickets) cb(tickets);
  else {
    firebase.database().ref('tickets').once('value', snapshot => {
      tickets = snapshot.val();
      cb(tickets);
    });
  }
}

export function getTicket(key, cb) {
  if (tickets && tickets[key]) cb(tickets[key]);
  else {
    firebase.database().ref('tickets/' + key).once('value', snapshot => {
      cb(snapshot.val());
    });
  }
}