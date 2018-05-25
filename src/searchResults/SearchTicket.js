import firebase from 'firebase';

export function weightedSearch(keyword, count, title, content, dateEdited, rating, upvotes) {
    var keywords = [];
    
    if (!keyword.replace(/\s/g, '')) {
      console.log("no keyword");
      title = 0;
      content = 0;
    } else {
      console.log("yes keyword: <" + keyword + ">");
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

          ids.push([weight, id]);
          
      });

      var sortedIds = ids.sort(function(a,b) {
        return b[0] - a[0];
      })

      var ret = [];

      for (var i = 0; i < count || i < ids.length; i++) {
        if (sortedIds[i][0]) {
          ret.push(sortedIds[i][1]);
        }
      }

      return ret;
    });
}

function subsetRatio(keywords, content) {
  var intersection = content.filter(function(s) {
    return keywords.indexOf(s) !== -1;
  });

  return intersection.length / keywords.length;
}

function stripHtml(html) {
    var tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
}