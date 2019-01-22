function JSONcompose(json1,json2){
	var json1 = JSON.stringify(json1)
	var json2 = JSON.stringify(json2)
	var newsJSON
		newsJSON = json1.substring(0,json1.length-1)+","
		newsJSON = newsJSON + json2.replace("{","")	
		
	return JSON.parse(newsJSON)
}
