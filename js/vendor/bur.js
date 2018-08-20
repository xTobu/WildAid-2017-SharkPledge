$('.bur').click(function() {
	$(this).toggleClass('active');
	$('.overlay').toggleClass('open');
	return false;
});
