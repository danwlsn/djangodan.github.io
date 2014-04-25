$( document ).ready(function() {
	$('.jekyll').hover(function(){
		$('.hyde').css('display', 'block');
	}, function(){
		$('.hyde').css('display', 'none');
	})
});