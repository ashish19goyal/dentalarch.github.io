$(function(){
	$("#ContactForm").submit(function(event)
	{
		event.preventDefault();
		
		$("#submitf").value='Please wait...';
		
		var contact_form=document.getElementById('ContactForm');
		var name = contact_form.elements['name'].value;   
		var email = contact_form.elements['email'].value;   
		var subject = contact_form.elements['subject'].value;   
		var comment = contact_form.elements['comment'].value;   

		$.ajax(
		{
			type:'POST',
			url:'https://mandrillapp.com/api/1.0/messages/send.json',
			data: 
			{
				'key':'N-YKkHGDlEYoT-IrqVU4bw',
	    		'message': 
	    		{
		      	'from_email': 'contact@dentalarch.in',
		      	'to': 
		      	[
		          {
		            'email': email,
		            'type': 'to'
		          }
					],
				'autotext': 'true',
		      'subject': 'Dental Arch Received Your Enquiry',
		      'html': '<b>Dear Sir/ Mam</b><br/><br/><br/>Thank you for getting in touch with us. We appreciate your time.<br/>Our team member will get back to you shortly on your query/comment.<br/><br/><br/>Thanks and Regards<br/>Team Dental Arch'
				}
			}
		}).done(function(response) 
		{
			$("#message_post").html("<div class='successMessage'>Your message has been sent successfully!</div>"); 
			$("#submitf").value='Send >>';
		});
		
		$.ajax(
		{
			type:'POST',
			url:'https://mandrillapp.com/api/1.0/messages/send.json',
			data: 
			{
				'key': 'N-YKkHGDlEYoT-IrqVU4bw',
	    		'message': 
	    		{
		      	'from_email': email,
		      	'to': 
		      	[
		          {
		            'email': 'contact@dentalarch.in',
		            'type': 'to'
		          }
				],
				'autotext': 'true',
		      'subject': 'Enquiry: '+subject,
		      'html': 'Enquiry from '+name+'<br>'+ comment
				}
			}
		});	
	});
});