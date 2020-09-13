	/* form validation */
	$('div.alert label[for]').each( function () {
		$('#' + $(this).attr('for') ).closest('.form-group').addClass('has-danger');
		if ( $('#' + $(this).attr('for') ).length )
		{
			var helpBlockId	= $(this).attr('for') + '-feedback';
			$('#' + $(this).attr('for') ).after('<p id="' + helpBlockId + '" class="help-block"><small>' + $(this).text() + '</small></p>');
			$('#' + $(this).attr('for') ).attr('aria-describedby', helpBlockId);
			$('#' + $(this).attr('for') ).on('change', function () {
				$(this).closest('.has-danger').removeClass('has-danger').find('.help-block').slideUp();
			});
			$(this).parent('li').addClass('sr-only');
		}
	});
	if ( $('div.alert .errorlist li:not(.sr-only)').length > 0 ) {
		$('div.alert .errorlist').closest('.sr-only').css('display','none').removeClass('sr-only').slideDown();
	}
	$('textarea').each(function(){
		var lines = $(this).val().split("\n").length;
		if ( lines > 2 ) {
			$(this).attr('rows', lines );
		}
	});
	if ( $('.main-html').length ) {
		$('main').html( $('.main-html').wrap('<div>').parent().html() );
	}
	
	var formInitializationTime = null;
	$('form.human_check .form-control').bind('keypress change click', function () {
		if (!formInitializationTime) {
			formInitializationTime = new Date();
			$('form.human_check').append('<input type="hidden" name="time_spent" value="0" />');
		}
	});
	$('form.human_check [name="form-sum"]').closest('.form-group').insertBefore( $('form.human_check .form-group:first') );
	$('form.human_check').on('submit', function () {
		$('form.human_check button[type="submit"]').prop('disabled', true).addClass('disabled');
		$('form.human_check input[name="time_spent"]').val( formInitializationTime ? new Date() - formInitializationTime: 0 );
	});
	