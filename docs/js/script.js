// This makes sure the script doesn't act until the page is loaded.
$(document).ready(function(){

	// Build the page here.

	var title = 'Threds Board'
	var hw = 'Hello World'
	
	$('title').append(title)

	$('body').append('<h1 class="hw"></h1>');

	$('.hw').text(hw);

});
