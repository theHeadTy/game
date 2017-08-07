/***********************************************
 * AnyLink Drop Down Menu- © Dynamic Drive (www.dynamicdrive.com)
 * This notice MUST stay intact for legal use
 * Visit http://www.dynamicdrive.com/ for full source code
 ***********************************************/

var menuwidth = '100px' //default menu width
var menubgcolor = '#666666' //menu bgcolor
var disappeardelay = 250 //menu disappear speed onMouseout (in miliseconds)
var hidemenu_onclick = "yes" //hide menu when user clicks within menu?

/////No further editting needed

var ie4 = document.all
var ns6 = document.getElementById && !document.all

if (ie4 || ns6)
  document.write('<div id="dropmenudiv" style="visibility:hidden;width:' + menuwidth + ';background-color:' + menubgcolor + '" onMouseover="clearhidemenu()" onMouseout="dynamichide(event)"></div>')

function getposOffset(what, offsettype) {
  var totaloffset = (offsettype == "left") ? what.offsetLeft : what.offsetTop;
  var parentEl = what.offsetParent;
  while (parentEl != null) {
    totaloffset = (offsettype == "left") ? totaloffset + parentEl.offsetLeft : totaloffset + parentEl.offsetTop;
    parentEl = parentEl.offsetParent;
  }
  return totaloffset;
}


function showhide(obj, e, visible, hidden, menuwidth) {
  if (ie4 || ns6)
    dropmenuobj.style.left = dropmenuobj.style.top = "-500px"
  if (menuwidth != "") {
    dropmenuobj.widthobj = dropmenuobj.style
    dropmenuobj.widthobj.width = menuwidth
  }
  if (e.type == "click" && obj.visibility == hidden || e.type == "mouseover")
    obj.visibility = visible
  else if (e.type == "click")
    obj.visibility = hidden
}

function iecompattest() {
  return (document.compatMode && document.compatMode != "BackCompat") ? document.documentElement : document.body
}

function clearbrowseredge(obj, whichedge) {
  var edgeoffset = 0
  if (whichedge == "rightedge") {
    var windowedge = ie4 && !window.opera ? iecompattest().scrollLeft + iecompattest().clientWidth - 15 : window.pageXOffset + window.innerWidth - 15
    dropmenuobj.contentmeasure = dropmenuobj.offsetWidth
    if (windowedge - dropmenuobj.x < dropmenuobj.contentmeasure)
      edgeoffset = dropmenuobj.contentmeasure - obj.offsetWidth
  } else {
    var topedge = ie4 && !window.opera ? iecompattest().scrollTop : window.pageYOffset
    var windowedge = ie4 && !window.opera ? iecompattest().scrollTop + iecompattest().clientHeight - 15 : window.pageYOffset + window.innerHeight - 18
    dropmenuobj.contentmeasure = dropmenuobj.offsetHeight
    if (windowedge - dropmenuobj.y < dropmenuobj.contentmeasure) { //move up?
      edgeoffset = dropmenuobj.contentmeasure + obj.offsetHeight
      if ((dropmenuobj.y - topedge) < dropmenuobj.contentmeasure) //up no good either?
        edgeoffset = dropmenuobj.y + obj.offsetHeight - topedge
    }
  }
  return edgeoffset
}

function populatemenu(what) {
  if (ie4 || ns6)
    dropmenuobj.innerHTML = what;
}

function makemenu(obj, e, menuwidth, allowed, whichbp, bpspot, iid, uid, slot) {
  /*
  Menu Options:
  a - Activate
  e - Equip
  d - Delete
  v - View
  z - Vault
  c - Crew Vault
  s - Sell
  f - Item is already for sale
  */
  var menucontents = "";

  if (allowed.indexOf("a") > -1)
    menucontents += "<a href=\"/home.php?itemaction=" + iid + "\">Activate</a>";
  if (allowed.indexOf("e") > -1)

    //menucontents += "<a href=\"#\" onclick=\"equipItem('" + iid + "','" + whichbp + "','" + uid + "');ajax_equip_side('" + iid + "', '" + slot + "');\">Equip</a>";
    menucontents += `<a href="javascript:void();" onclick="equip(${iid}, '${whichbp}', ${uid}, '${slot}');">Equip</a>`;

  if (allowed.indexOf("i") > -1)
    menucontents += "<a href=\"/identifyItem.php?id=" + iid + "&owner=" + uid + "\">Identify</a>";
  if (allowed.indexOf("u") > -1)
    menucontents += "<a href=\"#\" onclick=\"removeItem('" + iid + "', '" + uid + "');document.getElementById('slot" + slot + "').innerHTML='';\">Unequip</a>";
  if (allowed.indexOf("d") > -1)
    menucontents += "<a href=\"#\" onclick=\"dropItem('" + bpspot + "');\">Delete</a>";
  if (allowed.indexOf("v") > -1)
    menucontents += "<a href=\"/itemlink.php?id=" + iid + "&owner=" + uid + "\">View</a>";
  if (allowed.indexOf("z") > -1)
    menucontents += "<a href=\"#\" onclick=\"vaultItem('" + iid + "','" + whichbp + "','" + uid + "');\">Vault</a>";
  if (allowed.indexOf("y") > -1)
    menucontents += "<a href=\"#\" onclick=\"vaultItem('" + iid + "','" + whichbp + "','" + uid + "');document.getElementById('slot" + slot + "').innerHTML='';\">Vault</a>";
  if (allowed.indexOf("c") > -1)
    menucontents += "<a href=\"#\" onclick=\"crewVaultItem('" + bpspot + "')\">Crew Vault</a>";
  if (allowed.indexOf("s") > -1)
    menucontents += "<a href=\"#\" onclick=\"sellItem('" + bpspot + "')\">Sell</a>";
  if (allowed.indexOf("f") > -1)
    menucontents += "<a href=\"/mytreasury.php\">For Sale</a>";
  dropdownmenu(obj, e, menucontents, menuwidth);
}

function dropdownmenu(obj, e, menucontents, menuwidth) {
  if (window.event) event.cancelBubble = true
  else if (e.stopPropagation) e.stopPropagation()
  clearhidemenu()
  dropmenuobj = document.getElementById ? document.getElementById("dropmenudiv") : dropmenudiv
  populatemenu(menucontents)

  if (ie4 || ns6) {
    showhide(dropmenuobj.style, e, "visible", "hidden", menuwidth)
    dropmenuobj.x = getposOffset(obj, "left")
    dropmenuobj.y = getposOffset(obj, "top")
    dropmenuobj.style.left = dropmenuobj.x - clearbrowseredge(obj, "rightedge") + "px"
    dropmenuobj.style.top = dropmenuobj.y - clearbrowseredge(obj, "bottomedge") + obj.offsetHeight + "px"
  }

  return clickreturnvalue()
}

function clickreturnvalue() {
  if (ie4 || ns6) return false
  else return true
}

function contains_ns6(a, b) {
  while (b.parentNode)
    if ((b = b.parentNode) == a)
      return true;
  return false;
}

function dynamichide(e) {
  if (ie4 && !dropmenuobj.contains(e.toElement))
    delayhidemenu()
  else if (ns6 && e.currentTarget != e.relatedTarget && !contains_ns6(e.currentTarget, e.relatedTarget))
    delayhidemenu()
}

function hidemenu(e) {
  if (typeof dropmenuobj != "undefined") {
    if (ie4 || ns6)
      dropmenuobj.style.visibility = "hidden"
  }
}

function delayhidemenu() {
  if (ie4 || ns6)
    delayhide = setTimeout("hidemenu()", disappeardelay)
}

function clearhidemenu() {
  if (typeof delayhide != "undefined")
    clearTimeout(delayhide)
}

if (hidemenu_onclick == "yes")
  document.onclick = hidemenu



/*function equip(id, bp, user, slot) {
  $.ajax({
    type: 'GET',
    url: `/backpack/equip/${id}/user/${user}`,
    success: function(data) {
      document.getElementById('bpWin_content').innerHTML = data;
      //updateSlot(id, slot)
    }
  })
}
*/


function updateSlot(id, slot) {
  if (slot !== 'Orbs') {
    document.getElementById(slot).innerHTML = null;
  } else {
    document.getElementById('Orbs').innerHTML = null;
  }
}
