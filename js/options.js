const elById = (id) => document.getElementById(id);

window.onload = function() {
  if (localStorage["jarvisUrl"]) {
    elById("jarvisAPI").value = localStorage["jarvisUrl"]
  } else {
    elById("jarvisAPI").value = "https://aws-resource-finder-api.corp.ipsy.com/v0/account"
  }

  if (localStorage["awsRoleName"]) {
    elById("awsRoleName").value = localStorage["awsRoleName"]
  } else {
    elById("awsRoleName").value = "PowerUserAccess"
  }
  const saveButton = elById('saveButton');

  saveButton.onclick = function() {
    localStorage["jarvisUrl"] = elById("jarvisAPI").value
    localStorage["awsRoleName"] = elById("awsRoleName").value
  }
}
