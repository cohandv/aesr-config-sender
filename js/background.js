const jarvisExtensionId = "jpmkfafbacpgapdghgdpembnojdlgkdl";
const url = "https://aws-resource-finder-api.corp.ipsy.com/v0/account"

fetch(url).then(function(response) {
  return response.json();
}).then(function(data) {
  console.log("data");
  console.log(data);
  updateConfig(data)
}).catch(function() {
  console.log("Booo");
});

function updateConfig(accounts) {
    let config = ""
    console.log(accounts)
    accounts.forEach(function(account) {
        data = account.data
        config += `\n\n[${data.profile_name}]\n`
        config += `role_arn=arn:aws:iam::${data.id}:role/PowerUserAccess\n`
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
