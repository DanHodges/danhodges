var normal = document.getElementById("nav-menu");
var reverse = document.getElementById("nav-menu-left");

var icon = normal !== null ? normal : reverse;

// Toggle the "menu-open" % "menu-opn-left" classes
function toggle() {
  var navRight = document.getElementById("nav");
  var navLeft = document.getElementById("nav-left");
  var nav = navRight !== null ? navRight : navLeft;

  var button = document.getElementById("menu");
  var site = document.getElementById("wrap");

  if (nav.className == "menu-open" || nav.className == "menu-open-left") {
    nav.className = "";
    button.className = "";
    site.className = "";
  } else if (reverse !== null) {
    nav.className += "menu-open-left";
    button.className += "btn-close";
    site.className += "fixed";
  } else {
    nav.className += "menu-open";
    button.className += "btn-close";
    site.className += "fixed";
  }
}

// Ensures backward compatibility with IE old versions
function menuClick() {
  if (document.addEventListener && icon !== null) {
    icon.addEventListener("click", toggle);
  } else if (document.attachEvent && icon !== null) {
    icon.attachEvent("onclick", toggle);
  } else {
    return;
  }
}

menuClick();

var createElement = preactHyperscript.createElement,
  div = preactHyperscript.div,
  h2 = preactHyperscript.h2,
  p = preactHyperscript.p,
  table = preactHyperscript.table,
  thead = preactHyperscript.thead,
  tbody = preactHyperscript.tbody,
  tr = preactHyperscript.tr,
  td = preactHyperscript.td;

function TodayILearned(props) {
  return div([
    h2(".bold", "today I learned"),
    p(
      {
        style: {
          fontSize: "1em",
          fontWeight: 200,
          color: "#333",
          fontStyle: "italic"
        }
      },
      "A list of things I've been reading/watching/hacking on outside of work."
    ),
    table(
      {
        style: {
          textAlign: "left",
          verticalAlign: "middle",
          width: "80%",
          fontWeight: 300
        }
      },
      [
        thead([tr([td("Date"), td("Topic"), td("Category"), td("Minutes")])]),
        tbody(
          props.data.map(function(item) {
            return tr([
              td(item.date),
              td(item.topic),
              td(item.categories.join(', ')),
              td(item.minutes)
            ]);
          })
        )
      ]
    )
  ]);
}

function loadJSON(file, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", file, true);
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

(function render() {
  loadJSON("db.json", function(response) {
    var json = JSON.parse(response);
    window.preact.render(
      createElement(TodayILearned, { data: json.data }),
      document.getElementById("til")
    );
  });
})();
