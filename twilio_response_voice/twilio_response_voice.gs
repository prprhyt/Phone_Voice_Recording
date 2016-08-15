function doGet(e) {
	var response_str = "<Response>\n <Say voice=\"woman\" language=\"ja-jp\">只今電話にでることができません。ピーとなったら1分以内の伝言を残してください。</Say>\n <Record action=\"https://script.google.com/macros/s/{GASID}/exec\" method=\"post\" maxLength=\"360\" />\n</Response>";
	var out = ContentService.createTextOutput(response_str);
	out.setMimeType(ContentService.MimeType.XML);
	return out;
}
function doPost(e) {
	var response_str = "<Response>\n <Say voice=\"woman\" language=\"ja-jp\">只今電話にでることができません。ピーとなったら1分以内の伝言を残してください。</Say>\n <Record action=\"https://script.google.com/macros/s/{GASID}/exec\" method=\"post\" maxLength=\"360\" />\n</Response>";
	var out = ContentService.createTextOutput(response_str);
	out.setMimeType(ContentService.MimeType.XML);
	return out;
}