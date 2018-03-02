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
		var $circle = $('#svg #bar');
		var $green = $('.status_green');
		var $red = $('.status_red');
		var status_val = ($green.length / sites.length) * 100;

		$('#status_text').empty().append($green.length + ' / ' + sites.length + ' sites are live');

		if (($('.status_green').length / sites.length) === 1) {
			$('#status_text').append('<br/>All Systems Functional');
		} else {
			$('#status_text').append('<br/>Partial Problems');
		}

		if (isNaN(status_val)) {
			status_val = 100; 
		} else {
			var r = $circle.attr('r');
			var c = Math.PI*(r*2);
			if (status_val < 0) { status_val = 0;}
			if (status_val > 100) { status_val = 100;}
			$circle.css({ strokeDashoffset: -(status_val / 100 * c)});
			$('#cont').attr('data-pct', Math.floor(status_val));
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

	//Circle Graph
	// $('#percent').on('change', function(){
	// 	var val = parseInt($(this).val());

	// 	var $circle = $('#svg #bar');

	// 	if (isNaN(val)) {
	// 		val = 100; 

	// 	} else {
	// 		var r = $circle.attr('r');
	// 		var c = Math.PI*(r*2);

	// 		if (val < 0) { val = 0;}
	// 		if (val > 100) { val = 100;}

	// 		var pct = ((100-($('.status_red').length))/100)*c;

	// 		$circle.css({ strokeDashoffset: pct});

	// 		$('#cont').attr('data-pct',val);
	// 	}
	// });
});
