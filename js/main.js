$( document ).ready(function() {
	$('.jekyll').hover(function(){
		$('.hyde').css('display', 'block');
	}, function(){
		$('.hyde').css('display', 'none');
	})

	// JSON
	// Instagram
	// https://api.instagram.com/v1/users/305466902/media/recent?count=3&access_token=305466902.5b9e1e6.604c65a76da44a07945ea4429450c2a1

	// Instagram
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		cache: false,
		url: "https://api.instagram.com/v1/users/305466902/media/recent?count=4&access_token=305466902.5b9e1e6.604c65a76da44a07945ea4429450c2a1",
		success: function(data) {
				for (var i = 0; i < 15; i++) {
					$(".insta--pics").append("<li><img src=" + data.data[i].images.thumbnail.url+ " /></li>");
				}

		}
	});
});