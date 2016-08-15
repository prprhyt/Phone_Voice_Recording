var accountSid="{YourAccountSid}";
var auth_token="{YourToken}";

function doGet() {
	var out = ContentService.createTextOutput("");
	out.setMimeType(ContentService.MimeType.XML);
	return out;
}

function doPost(e)
{
	var now_date = new Date();
	var file_name = now_date.toLocaleString();
	var recode_file_url = e.parameter['RecordingUrl'];
	var response = UrlFetchApp.fetch(recode_file_url);
	var fileBlob = response.getBlob();
	fileBlob.setName(file_name);
	var outputDir = DriveApp.getFolderById("{YourFolderID}}");
	var voiceDetail = outputDir.createFile(fileBlob);
	voiceDetail.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.EDIT);
	var sharingUrl = voiceDetail.getUrl();

	send_e_mail(file_name,sharingUrl);
	delete_voice_recorded_data(recode_file_url);
	var out = ContentService.createTextOutput("");
	out.setMimeType(ContentService.MimeType.XML);
	return out;
}

var options = {
	method: "delete",
	headers: {
		Authorization: " Basic " + Utilities.base64Encode(accountSid + ":" + auth_token)
	},
	muteHttpExceptions: true
};

function delete_voice_recorded_data(url_data){
	url_data+=".json";
	var now_date = new Date();
	var file_name = now_date.toLocaleString();
	var response = UrlFetchApp.fetch(url_data,options);
	//send_e_mail("元メッセージ削除通知",response.getResponseCode());
}

function send_e_mail(date_str,share_url){
	var mailTo = "{yourmailaddress}";
	var subject_str = date_str+"の留守電";
	var body_str = date_str+"に留守電がありました。内容は以下のリンクから確認してください。";
	body_str+="\n\n";
	body_str+=share_url;
	MailApp.sendEmail(mailTo, subject_str, body_str);
}