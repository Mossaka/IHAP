/*
 * This file contains our search algorithm.
 */
import { getTickets } from './store';

export function weightedSearch(keyword, count, weights, cb) {
  var keywords = [];

  if (keyword.replace(/\s/g, '')) {
    keywords = keyword.toLowerCase().split(' ');
  }

  var ids = [];

  getTickets(tickets => {
    for (let id in tickets) {
      let data = tickets[id];
      var weight = 0;

      if ("title" in weights) {
        weight += weights["title"] * subsetRatio(keywords, data.title.toLowerCase().split(' '));
      }

      if ("content" in weights) {
        weight += weights["content"] * subsetRatio(keywords, stripHtml(data.content).toLowerCase().split(' '));
      }

      if ("dateEdited" in weights) {
        var now = new Date().getTime();
        weight += weights["dateEdited"] * (Math.exp(-0.00000001 * (now - data.dateEdited)));
      }

      if ("rating" in weights && (data.upvote + data.downvote) !== 0) {
        weight += weights["rating"] * (data.upvote / (data.upvote + data.downvote));
      }

      if ("upvotes" in weights) {
        weight += weights["upvotes"] * (1 / (1 + Math.exp(-0.1 * (data.upvote - 20))));
        //console.log((1 / (1 + Math.exp(-0.1 * (data.upvote - 20)))));
      }

      ids.push([weight, id]);
    }

    var sortedIds = ids.sort(function (a, b) {
      return b[0] - a[0];
    })

    var ret = [];

    for (var i = 0; i < count && i < ids.length; i++) {
      if (sortedIds[i][0]) {
        ret.push(sortedIds[i][1]);
      }
    }

    cb(ret);
  });
}

function subsetRatio(keywords, content) {
  var intersection = content.filter(function (s) {
    return keywords.indexOf(s) !== -1;
  })

  intersection = intersection.filter(function (s, pos) {
    return intersection.indexOf(s) === pos;
  });

  return intersection.length / keywords.length;
}

export function stripHtml(html) {
  var tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
}