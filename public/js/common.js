$(function(){
	$("#header").load("header.html");
 	$('#top').hide();
    $(window).on('load', function() {
        $('#top').fadeIn(1000);
    });
})