var sites = ["baylinerapparel", "capriottisgear", "copperfoodgear", "corppromoitems", "hatterasyachtsgear", "malibuboatsgear", "marquislarsoncollection", "mercuryproteamgear", "meridianyachtsgear", "nautiquegear", "salsaritasgear", "scapparel", "searaycollection", "shopsugarlands", "whalerapparel"];

var pApp = angular.module('pApp', []);

pApp.directive('statwidg', function() {
	return {
		templateUrl : 'widgets/status.html'
	}
})
.controller("status_widget", ['$scope', function($scope) {
	$scope.sites = sites;
}]);

$(document).ready( function() {

	/* --Start Status Widget-- */
	//This whole block is spaghetti

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
	/* --End Status Widget-- */
});

//Bandwith Widget
/*
$(function () {
  
  function generateNumber(min, max) {
    min = typeof min !== 'undefined' ? min : 1;
    max = typeof max !== 'undefined' ? max : 100;
    
    return Math.floor((Math.random() * max) + min);
  }
  
  var chart,
      categories = ['Categorie 1', 'Categorie 2', 'Categorie 3', 'Categorie 4', 'ategorie 5','Categorie 6', 'ategorie 7', 'Categorie 8', 'Categorie 9', 'Categorie 10', 'Categorie 11', 'Categorie 12', 'Categorie 13', 'Categorie 14', 'Categorie 15', 'Categorie 16', 'Categorie 17', 'Categorie 18', 'Categorie 19','Categorie 20', 'Categorie 21','Categorie 22', 'Categorie 23', 'Categorie 24', 'Categorie 25', 'Categorie 26', 'Categorie 27', 'Categorie 28', 'Categorie 29', 'Categorie 30'],
      serie1 = [13, 13, 46, 61, 23,12, 24, 16, 14, 12, 12, 24, 19, 13, 11, 11, 14, 11, 11, 11, 11, 13, 22, 10, 18, 15, 24, 31, 19, 10],
      serie2 = [52, 41, 58, 63, 55, 46, 45, 41, 38, 54, 50, 39, 48, 70, 63, 60, 58, 63, 83, 89, 83, 79, 83, 100, 104, 108, 52, 46, 83, 89],
      $aapls;
  
  $(document).ready(function() {

    chart = new Highcharts.Chart({
      chart: {
        renderTo: 'graph',
        type: 'column',
        backgroundColor: 'transparent',
        height: 290,
        marginLeft: 3,
        marginRight: 3,
        marginBottom: 0,
        marginTop: 10
      },
      title: {
        text: ''
      },
      xAxis: {
        lineWidth: 0,
        tickWidth: 0,
        labels: { 
          enabled: false 
        },
        categories: categories
      },
      yAxis: {
        labels: { 
          enabled: false 
        },
        gridLineWidth: 0,
        title: {
          text: null,
        },
      },
      series: [{
        name: 'Awesomness',
        data: serie1
      }, {
        name: 'More Awesomness',
        color: '#00E676',
        type: 'line',
        data: serie2
      }],
      credits: { 
        enabled: false 
      },
      legend: { 
        enabled: false 
      },
      plotOptions: {
        column: {
          borderWidth: 0,
          color: '#263238',
          shadow: false
        },
        line: {
          marker: { 
            enabled: false 
          },
          lineWidth: 3
        }
      },
      tooltip: { 
        enabled: false
      }
    });
      
    setInterval(function() {
      chart.series[0].addPoint(generateNumber(), true, true);
      chart.series[1].addPoint(generateNumber(50, 150), true, true);
    }, 1000);
    
    
  
    setInterval(function() {
      $('.info-aapl span').each(function(index, elem) {
        $(elem).animate({
          height: generateNumber(1, 40)
        });
      });

    }, 3000);
  });


});
*/
