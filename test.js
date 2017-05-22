import request from 'request'
import cheerio from 'cheerio'

// function to scrap data from given url
export function getData(url, callback) {
	var result = {};
	request(url, function (err, responce, html) {
		var $ = cheerio.load(html);
		$("#previous_episode").filter(function() {
			// get current episode data
			try {
				// parse_list = [ trashdata , rest of the jumbled usefull data]
				var parse_list = $(this).text().replace(/ /g,"+").replace(/\s/g, "").split('Name:')
				// parse_list = [ ep_name , rest of the jumbled usefull data]
				parse_list = parse_list[1].split('Date:')
				result.ep_name = parse_list[0].replace(/[+]/g," ")
				parse_list = parse_list[1].split('Season:')
				// result.ep_date = parse_list[0].replace(/[+]/g," ")  // we don't need the date
				parse_list = parse_list[1].split('Episode:')
				result.season_no = parse_list[0].replace(/[+]/g," ")
				parse_list = parse_list[1].split('Summary:')
				result.ep_no = parse_list[0].replace(/[+]/g," ")
				
			} catch(err) {
				console.log(err);
				callback(null);
				return;
			}
			$("#next_episode").filter(function(){
				// get next episode data
				try {
					var parse_list = $(this).text().replace(/ /g,"+").replace(/\s/g, "").split("Name:");

					parse_list = parse_list[1].split('Countdown:')
					result.next_ep_name = parse_list[0].replace(/[+]/g," ")
					parse_list = parse_list[1].split('Date:')
					result.countdown = parse_list[0].replace(/[+]/g," ")
					callback(result)

				} catch(err) {
					result.next_ep_name = null;
					result.countdown = null;
					callback(result);
				}				
			});
		});
	});
}

get_data("http://next-episode.net/gotham", function(data){
	console.log(data);
});

get_data("http://next-episode.net/arrow", function(data){
	console.log(data);
});