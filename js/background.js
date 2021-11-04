const jarvisExtensionId = "jpmkfafbacpgapdghgdpembnojdlgkdl";
const url = "https://aws-resource-finder-api.corp.ipsy.com/v0/account"
fetch(url).then(function(response) {
  return response.json();
}).then(function(data) {
  console.log(data);
}).catch(function() {
  console.log("Booo");
});

const rawIniStr = `
[profile marketingadmin]
role_arn = arn:aws:iam::123456789012:role/marketingadmin
color = ffaaee

[anotheraccount]
aws_account_id = 987654321987
role_name = anotherrole
region=ap-northeast-1

[athirdaccount]
aws_account_id = 987654321988
role_name = athirdrole
image = "https://via.placeholder.com/150"
`;

chrome.runtime.sendMessage(jarvisExtensionId, {
  action: 'updateConfig',
  dataType: 'ini',
  data: rawIniStr
}, function(response) {
  console.log(response)
});


async function fetchAsync (url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}