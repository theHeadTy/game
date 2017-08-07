
function equip(id, bp, user, slot) {
  $.ajax({
    type: 'GET',
    url: '`/backpack/item/${id}/user/${user}`',
    success: function(data) {
      $('#bpWin');
      updateSlot(id, slot)
    }
  })
}


updateSlot(id, slot) {
  if (slot !== 'Orbs') {
    document.getElementById(slot).innerHTML = null;
  } else {
    document.getElementById('Orbs').innerHTML = null;
  }
}
