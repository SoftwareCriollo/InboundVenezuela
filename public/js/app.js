var voted = false;
$(function(){
	$('#votar').one('click', function(e){
		e.preventDefault();
		if(!voted){
			var count = 0;
			$.post('vote/',function(){
				count = parseInt($('#votos_count').html())
				count = count + 1;
				$('#votos_count').html(count);
				voted =true;
			});			
		}
	});

	$("#slider").slider({
		control_next: '.slideshowleft.left a',
		control_back: '.slideshowright.right a',
		content: '.testimonialfold'
	});

});