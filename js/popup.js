const elById = (id) => document.getElementById(id);

window.onload = function() {
  if (localStorage["jarvisUrl"]) {
    elById("jarvisAPI").value = localStorage["jarvisUrl"]
  } else {
    console.log("Using default jarvis API")
    elById("jarvisAPI").value = "https://aws-resource-finder-api.corp.ipsy.com/v0/account"
  }

  if (localStorage["awsRoleName"]) {
    elById("awsRoleName").value = localStorage["awsRoleName"]
  } else {
    console.log("Using default AWS Role")
    elById("awsRoleName").value = "PowerUserAccess"
  }

  if (localStorage["extensionId"]) {
    elById("extensionId").value = localStorage["extensionId"]
  } else {
    console.log("Using default AWS Switch Role Id")
    elById("extensionId").value = "jpmkfafbacpgapdghgdpembnojdlgkdl"
  }

  console.log(localStorage)

  const updateButton = elById('updateButton');
  updateButton.onclick = function() {
    const url = localStorage["jarvisUrl"]
    localStorage["jarvisUrl"] = elById("jarvisAPI").value
    localStorage["awsRoleName"] = elById("awsRoleName").value
    localStorage["extensionId"] = elById("extensionId").value

    fetch(url).then(function(response) {
      return response.json();
    }).then(function(data) {
      updateConfig(data)
    }).catch(function() {
      console.log("Booo");
    });
  }
}

function updateConfig(accounts) {
  let jarvisExtensionId = localStorage["extensionId"];
  let config = ""
  const awsRoleName = localStorage["awsRoleName"]
  console.log(accounts)
  let sortedAccounts = accounts.sort(function(a, b){
    if(a.data.profile_color < b.data.profile_color) { return -1; }
    if(a.data.profile_color > b.data.profile_color) { return 1; }
    return 0;
  })
  console.log(sortedAccounts)
  sortedAccounts.forEach(function(account) {
    data = account.data
    config += `\n\n[${data.name}]\n`
    config += `role_arn=arn:aws:iam::${data.id}:role/${awsRoleName}\n`
    config += `color=${data.profile_color}\n`
    config += `region=us-east-1\n`
  })

  chrome.runtime.sendMessage(jarvisExtensionId, {
    action: 'updateConfig',
    dataType: 'ini',
    data: config
  }, function(response) {
    console.log(response)
  });
}
