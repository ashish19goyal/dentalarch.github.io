	function job_posting_email(contact_form)
	{
		console.log('contacting..');		
		var name = contact_form.elements['name'].value;   
		var email = contact_form.elements['email'].value;   
		var phone = contact_form.elements['phone'].value;   
		var subject = contact_form.elements['subject'].value;   
		var comment = contact_form.elements['comment'].value;   
		var submit_button=contact_form.elements['submitf'];
		submit_button.value='Please wait...';
		
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
		      'html': 'Enquiry from '+name+'<br>Email: '+email+'<br>Phone: '+phone+'<br>Cover note: '+ comment
				}
			}
		});
		
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
		      'subject': 'Dental Arch Received Your application',
		      'html': '<b>Dear Sir/ Mam</b><br/><br/><br/>Thank you for getting in touch with us. We appreciate your time.<br/>Our team member will get back to you shortly.<br/><br/><br/>Thanks and Regards<br/>Team Dental Arch'
				}
			}
		}).done(function(response) 
		{
			$("#message_post").html("<div class='successMessage'>Your message has been sent successfully!</div>"); 
			submit_button.value='Send >>';
		});	
	}