import firebase from 'firebase';

let tickets = null;
export function getTickets(cb) {
  if (tickets) {
    cb(tickets);
  }
  else {
    let id = setInterval(() => {
      if (tickets) {
        clearInterval(id);
        cb(tickets);
      }
    }, 100);
  }
}

export function getTicket(key, cb) {
  getTickets(tickets => {
    cb(tickets[key]);
  });
}

export function loadTickets() {
  firebase.database().ref('tickets').on('value', snapshot => {
    tickets = snapshot.val();
  });
}