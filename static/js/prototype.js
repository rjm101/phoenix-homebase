//Global vars
var my_reg;
var product_id;
var itemStageClicked = false;
var checkOrCross     = '';
var cars             = [];
	
$(document).ready(function (){
	
	/* 
	 * Listen for product click
	 */
	$('.product_thumb, .product_title').bind('click', function(){
		
		var _this = $(this);
		newItemClick(_this);
	});
	
	
	/*
	 * Trigger new item
	 */
	function newItemClick(_this){
		
		var clicked_item_id = _this.attr('data-id');

		if(typeof items[clicked_item_id] === 'undefined'){
			
			//alert("product not found");
		}else{
			
			resetState();
			loadProduct(clicked_item_id);
		}
	}
	
	
	/*
	 * Reset Overlay States
	 */
	function resetState(){
		my_reg           = null;
		product_id       = null;
		itemStageClicked = false;
		checkOrCross     = null;

		$('#slide_arrow').css('height', '302px');
		$('#product_selection').slideDown();
		$('.overlay, #your_car, #content_area').hide();
	}
	
	
	/*
	 * Start: Will this fit in my car?
	 */
	$('.fit_in_car_btn').bind('click', function(){
		
		$('.overlay').fadeIn('fast');
		$("#product_menu_box").toggleClass('slide_menu_box').animate({
			top: '90px'
		}, 1000);
		$('.panel, #car_reg_form').show();
		$('#car_regs').slideDown();
		
		//HIDE PRODUCTS
		$('#product_selection').slideUp();
		$('#slide_arrow').css('height', '219px');
	
		//store product_id
		product_id = $(this).attr('data-id');

		$('#panel_product').attr('src', '/static/images/products/'+items[product_id].thumb_img);
		
		//If user has already clicked on this item
		if(itemStageClicked){
			$('#car_reg_form').hide();
			$('#your_car').show();
		}
	});


	/*
	 * on car reg submit
	 */
	$('#my_reg_form').bind('submit', function() {

		// get all the inputs into an array.
		var inputs = $('#car_reg').val();

		my_reg = inputs;

		getCarData(my_reg);

		return false;
	});
	
		
	/*
	 * Close overlay
	 */
	$('.overlay, #close').bind('click', function(){
		
		$('.overlay, .panel, #loader').hide();
		$('#product_selection').slideDown();
		$("#product_menu_box").animate({
			top: '210px'
		}, 1000);
		$('#car_regs').slideUp();
		$('#slide_arrow').css('height', '302px');
	});
	
	
	/* 
	 * Hide/show user scenario panel 
	 */
	$('#slide_arrow').bind('click', function(){
	
		$("#product_menu_box").toggleClass('slide_menu_box');
	});
	
	
	/*
	 * RESET STATUS 
	 */
	$('#new_reg').bind('click', function(){
		
		my_reg       = null;
		checkOrCross = null;
		
		//reset car reg number and bring up panel
		$("#car_reg_form").show();
		$("#your_car, #error").hide();
		
		//clear input text field
		$('#car_reg').val('');
	});
	
	
	/* 
	 * Add car reg to input field 
	 */
	$('#reg_nos li a').bind('click', function(){
		
		$('#car_reg').val($(this).attr('data-id'));
	});
});