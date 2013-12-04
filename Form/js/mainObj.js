var FormObject = {};

FormObject.init = function (form) {
	this.bindEvents(form);

	this.showForm(form);

}

FormObject.showForm = function (form) {
	form.fadeIn("slow");

	if (FormObject.browser("webkit")) {
		$(":input[type='color']").addClass("input-color");
	}
}

FormObject.bindEvents = function (form) {
	form.on("submit", function(event){
		event.preventDefault();
		FormObject.submitForm(form);
	});
}

FormObject.submitForm = function(form){
	if (FormObject.validator(form)) {
		var status = {};

		$.ajax({
			type	 : form.attr("method"),
			url 	 : form.attr("action"),
			data	 : form.serialize(),
			dateType : "json",
			async	 : false,
			success  : function(data) {
				alert(data);
			},
			error 	 : function(error){
				if(error.status == "404"){
					status.msg = "File not found";
					status.class = "errorMsg";
				}
			}

		}).fail(function(){
			status.msg = "Something wrong heppened";
			status.class = "errorMsg";
		});

		FormObject.showStatus(status);
	}

}

FormObject.validator = function(form) {
	var valid = true,
		invalidInputs = [],
		status = {};

		$( form + ":input" ).each(function(){
			var inputLabels = $(this).parent().find("label").html();

			if($.trim(this.value) == ""){
				valid = false;
				invalidInputs.push(inputLabels);
			}
		});

		if( invalidInputs.length > 0 ){
			status.msg = "Fields <p>" + invalidInputs.join(", ") + "</p> must not be empty";
			status.class = "errorMsg";
		}
		else{
			status.msg = "Your data was successfully send";
			status.class = "successMsg";
		}

		FormObject.showStatus(status);

		return valid;
}


FormObject.showStatus = function(status) {
	$("#msg").attr("class", status["class"])
			 .html(status["msg"]);
}

FormObject.browser = function (browserName) {
	return !!$.browser[browserName];
}


$(document).ready(function() {
	FormObject.init($("#form"));
});