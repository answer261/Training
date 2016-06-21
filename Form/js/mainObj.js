var FormObject = {
/**
 * 
 * @param form - html object.
 */
	init: function (form) {
		this.form = form;

		this.bindEvents();
		this.showForm();
	},

	showForm: function () {
		this.form.fadeIn("slow");

		if (this.browser("webkit")) {
			$(":input[type='color']").addClass("input-color");
		}
	},

	bindEvents: function () {
		var that = this;
		this.form.on("submit", function(event){
			event.preventDefault();
			that.submitForm();
		});

		$("#close").on("click", function(){
			that.closeForm();
		});

		$("#show").on("click", function(){
			that.showForm();
			$(this).hide();
		})
	},

	closeForm: function () {
		this.form.hide();
		this.appendShowButton();
	},

	submitForm: function(){
		if (this.validator()) {
			var status = {};

			$.ajax({
				type	 : this.form.attr("method"),
				url 	 : this.form.attr("action"),
				data	 : this.form.serialize(),
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
				status.msg = "Something wrong happened";
				status.class = "errorMsg";
			});

			this.showStatus(status);
		}

	},
 
	validator: function() {

		//function return boolean value, true if form is valid, fasle if not
		var valid = true,
			invalidInputs = [],
			status = {};

			$( this.form + ":input" ).each(function(){
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

			this.showStatus(status);

			return valid;
	},

	/**
	 * function showStatus shows form status on the page
	 *
	 * @param status - associative array.
	 */
	showStatus: function(status) {
		$("#msg").attr("class", status["class"])
				 .html(status["msg"]);
	},

	appendShowButton: function () {
		$("#show").fadeIn("slow");
	},

	browser: function (browserName) {
		return !!$.browser[browserName];
	}
};


$(document).ready(function() {
	FormObject.init($("#form"));
});