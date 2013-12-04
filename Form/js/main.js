$(document).ready(function(){

	var form = $(".form-container"),
		msgObj = $("#msg");

	chkBrowser();

	form.fadeIn("slow");

	$("#form").on("submit", function( e ){
		
		//function validForm return boolean value. true if form is valid, fasle if not
		var valid = validForm( $(this) );

		if( valid ){

			$("body").css(
				"background", $("#form").find("input[type='color']").attr("value")
			);

			sendForm( $(this) );
		} 

		e.preventDefault();
	});

	function validForm( form ){
		var valid = true,
			invalidInputs = [];

		$( form + ":input" ).each(function(){
			var inputLabels = $(this).parent().find("label").html();

			if( this.value == "" ){
				valid = false;
				invalidInputs.push(inputLabels);
			}
		});


		if( invalidInputs.length > 0 ){

			msgObj.attr("class", "errorMsg")
				  .html("Fields <p>" + invalidInputs.join(", ") + "</p> must not be empty");
		}
		else{
			msgObj.attr("class", "successMsg")
				  .html("Your data was successfully send");
		}

		return valid;
		

	}

	function sendForm( form ){

		$.ajax({
			type	 : form.attr("method"),
			url 	 : form.attr("action"),
			data	 : toJSON(form),
			dateType : "json",
			success  : function(data) {
				alert(data);
			},
			error 	 : function(error){
				if(error.status == "404"){
					msgObj.attr("class", "errorMsg")
					      .html("File not found");
				}
			}

		}).fail(function(){
			msgObj.attr("class", "errorMsg")
				  .html("Something wrong happened");
		})
	}

	function toJSON(form){
		//function what returns JSON stringify object
		var jsonArray = [];

		$(form).find("input").each(function(){
			jsonArray.push( $(this).attr("value") );
		});

		var newJSON = JSON.stringify(jsonArray, null, 2);

		return newJSON;

	}


	function chkBrowser(){
		//this function checks browser version and add some styling if needed
		var browser = jQuery.browser;

		if(browser.webkit){
			$(":input[type='color']").addClass("input-color");
		}

	}
});