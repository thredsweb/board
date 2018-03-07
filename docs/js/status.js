import sites from "js/core.js";

pApp.directive('status_widget', function() {
	return {
		templateUrl : 'widgets/status.html'
	}
})
.controller("status_widget", ['$scope', function($scope) {
	$scope.sites = sites;
}]);

$(document).ready( function() {

	//These two are kindof confusingly named, sorry
	function statusCheck() {
		for (site in sites) {
			checkStatus( sites[site] );
		}
	}

	function checkStatus (company) {
		var favid = "img." + company;
		var aid = "a." + company;
		$(aid).addClass('status_red');
		var imag = new Image();
		function statusCallback() {
			$(aid).removeClass('status_red').addClass('status_green');
		};
		imag.src = "https://www." + company + ".com/favicon.ico";
		imag.onload = statusCallback;
	}

	async function countEm() {
		var waiting = await stallForTime();
		var $circle = $('#svg #bar');
		var $green = $('.status_green');
		var status_val = ($green.length / sites.length) * 100;

		$('#status_text').empty().append($green.length + ' / ' + sites.length + ' Sites Are Live.');

		if (($('.status_green').length / sites.length) === 1) {
			$('#status_text').append('<br/>All Systems Functional');
		} else {
			$('#status_text').append('<br/>Partial Problems');
		}

		if (isNaN(status_val)) {
			status_val = 0;
		} else {
			var r = $circle.attr('r');
			var c = Math.PI*(r*2);
			if (status_val < 0) { status_val = 0;}
			if (status_val > 100) { status_val = 100;}
			$circle.css({ strokeDashoffset: -(status_val / 100 * c)});
			$('#cont').attr('data-pct', Math.floor(status_val));
		}
	}

	function resetStatus() {
		// change status_text to "checking status..."
		$('#status_text').empty().append('Checking<br/>Status...');

		// reset the circle graph
		var $circle = $('#svg #bar');
		var status_val = 0;
		var r = $circle.attr('r');
		var c = Math.PI*(r*2);
		$circle.css({ strokeDashoffset: -(status_val / 100 * c)});
		$('#cont').attr('data-pct', Math.floor(status_val));

		statusCheck();
		countEm();
	}

	function stallForTime() {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve('resolved');
			}, 999);
		});
	}

	$(document).on( 'click', '#status_reload', function () {
		resetStatus();
	});

	resetStatus();

});
