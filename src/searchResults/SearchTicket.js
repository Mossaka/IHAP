import firebase from 'firebase';

export function weightedSearch(keyword, count, title, content, dateEdited, rating, upvotes) {
    var keywords = [];
    
    if (!keyword.replace(/\s/g, '')) {
      title = 0;
      content = 0;
    } else {
      keywords = keyword.toLowerCase().split(' ');
    }
    
    var ids = [];
    var ref = firebase.database().ref('tickets');
    return ref.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var id = childSnapshot.key;
          var data = childSnapshot.val();

          var weight = 0;

          if (title > 0) {
            weight += title * subsetRatio(keywords, data.title.toLowerCase().split(' '));
          }

          if (content > 0) {
            weight += content * subsetRatio(keywords, stripHtml(data.content).toLowerCase().split(' '));
          }

          if (dateEdited > 0) {
            var now = new Date().getTime();
            weight += dateEdited * (Math.exp(-0.00000001 * (now - data.dateEdited)));
          }

          if (rating > 0 && (data.upvote + data.downvote) !== 0) {
            weight += rating * (data.upvote / (data.upvote + data.downvote));
          }

          if (upvotes > 0) {
            weight += upvotes * (1 / (1 + Math.exp(-0.1 * (data.upvote - 20))));
            console.log((1 / (1 + Math.exp(-0.1 * (data.upvote - 20)))));
          }

          ids.push([weight, id]);
          
      });

      var sortedIds = ids.sort(function(a,b) {
        return b[0] - a[0];
      })

      var ret = [];

      for (var i = 0; i < count && i < ids.length; i++) {
        if (sortedIds[i][0]) {
          ret.push(sortedIds[i][1]);
        }
      }

      console.log(ids);
      console.log(ret);

      return ret;
    });
}

function subsetRatio(keywords, content) {
  var intersection = content.filter(function(s) {
    return keywords.indexOf(s) !== -1;
  })
  
  intersection = intersection.filter(function(s, pos) {
    return intersection.indexOf(s) === pos;
  });

  return intersection.length / keywords.length;
}

function stripHtml(html) {
    var tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
}