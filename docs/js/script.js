$(document).ready(function(){

	var sites = ["baylinerapparel", "capriottisgear", "capriottisgear", "copperfoodgear", "corppromoitems", "hatterasyachtsgear", "malibuboatsgear", "marquislarsoncollection", "mercuryproteamgear", "meridianyachtsgear", "nautiquegear", "salsaritasgear", "scapparel", "searaycollection", "shopsugarlands", "whalerapparel", "notarealsitelmao"];

	function stallForTime() {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve('resolved');
			}, 500);
		});
	}

	function checkStatus (company) {
		var favid = "img." + company;
		var aid = "a." + company;

		$(aid).addClass('status_red');

		$(favid).on('load', function() {
			$(aid).removeClass('status_red').addClass('status_green');
		});
	}

	async function countEm(){
		const waiting = await stallForTime();
		$('#status_text').empty().append($('.status_green').length + ' / ' + sites.length + ' sites are live');
		if (($('.status_green').length / sites.length) === 1) {
			$('#status_text').append('<br/>All Systems Functional');
		} else {
			$('#status_text').append('<br/>Partial Problems');
		}
	}

	for (site in sites) {
		var website = "https://www." + sites[site] + ".com";
		var img = '<img class="' + sites[site] + '" style="display: none;" src="' + website + '/favicon.ico">';
		var li = '<li> <a class="' + sites[site] + '" href="' + website + '">' + img + sites[site] + '</a></li>';

		$("#status_ul").append(li);
		checkStatus(sites[site])
	}

	$('#status_text').append('Checking Status...');
	countEm();

	// $('#status_text').append($('.status_green').length + ' / ' + sites.length + ' sites are live');
	// if (($('.status_green').length / sites.length) === 1) {
	// 	$('#status_text').append('<br/>All Systems Functional');
	// } else {
	// 	$('#status_text').append('<br/>Partial Problems');
	// }

	//Circle Graph

});
