// This makes sure the script doesn't act until the page is loaded.
$(document).ready(function(){

	// Build the page here.

	var sites = ["baylinerapparel", "capriottisgear", "capriottisgear", "copperfoodgear", "corppromoitems", "hatterasyachtsgear", "malibuboatsgear", "marquislarsoncollection", "mercuryproteamgear", "meridianyachtsgear", "nautiquegear", "salsaritasgear", "scapparel", "searaycollection", "shopsugarlands", "whalerapparel", "notarealsitelmao"];

	var checkStatus = function(company){
		var favid = "img." + company;
		var aid = "a." + company;
		$(aid).css({
		});

		$(favid).on('load', function() {
			$(aid).css({

			});
		});
	};

	$('#ulist').append(123);
	
	for (site in sites) {
		var website = "https://www." + sites[site] + ".com";
		var img = '<img class="' + sites[site] + '" style="display: none;" src="' + website + '/favicon.ico">';
		var li = '<li> <a class="' + sites[site] + '" href="' + website + '">' + img + sites[site] + '</a></li>';

		$("#ulist").append(li);

		checkStatus(sites[site]);
	};

//Circle Graph

$('#percent').on('change', function(){
  var val = parseInt($(this).val());
  var $circle = $('#svg #bar');
  
  if (isNaN(val)) {
   val = 100; 
  }
  else{
    var r = $circle.attr('r');
    var c = Math.PI*(r*2);
   
    if (val < 0) { val = 0;}
    if (val > 100) { val = 100;}
    
    var pct = ((100-val)/100)*c;
    
    $circle.css({ strokeDashoffset: pct});
    
    $('#cont').attr('data-pct',val);
  }
});

});
