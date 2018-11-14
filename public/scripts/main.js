console.log('script loaded');
console.log(window.location.host);

$(document).ready(function() {

  // fill navbar with links
  $.getJSON(location + 'links', function(data) {
    let links = data.links;
    let clicky = $(".clicky");

    for (let i = 0; i < links.length; i++) {
      let div = $("<div>")
        .addClass('link');

      // what 'target' to use +
      // transform links that lead to this page into '#'
      let pars = analyzeLink(links[i][1]);

      $("<a>").attr(pars)
        .html(links[i][0])
        .appendTo(div);

      clicky.append(div);
    }
  });
});


function analyzeLink(link) {
  let result = {};
  // the link is already open
  if (link === window.location.pathname) {
    result.href = '';
    result.target = '';

  // the link is inside domain
  } else if (link.charAt(0) === '/') {
    result.href = link;
    result.target = '_self';

  // the link leads to different site
  } else {
    result.href = link;
    result.target = '_blank';
  }
  return result;
}
