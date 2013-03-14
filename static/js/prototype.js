$(document).ready(function (){
	
	var my_reg;
	var product_id;
	var itemStageClicked = false;
	var checkOrCross;
	
	
	//store cars in objects
	var cars = [];
	
	cars['CAUDI'] = {	
		key: 'CAUDI',
		name: 'Audi A1 Hatchback',
		image: '10112121058280.jpg',
		bootcapacity: {
			Width: 126,
			Height: 65,
			Depth: 63
		}
	};
	
	cars['CVOLK'] = {	
		key: 'CVOLK',
		name: 'Volkswagen Gold Hatchback 5 Door',
		image: '31012121148130.jpg',
		bootcapacity: {
			Width: 130,
			Height: 68,
			Depth: 75
		}
	};
	
	cars['CFORD'] = {
		key: 'CFORD',
		name: 'Ford Focus Estate',
		image: '2061111101338.jpg',
		bootcapacity: {
			Width: 131,
			Height: 77,
			Depth: 113
		}
	};
	
	
	//map reg numbers to cars
	var reg_numbers = [];
	reg_numbers['YM3VWM1'] = cars['CAUDI'];
	reg_numbers['B4G23UM'] = cars['CVOLK'];
	reg_numbers['J8TY34M'] = cars['CFORD'];
	

	//Item details here
	var items = [];
	items['53343'] = {
		
		name: 'Provence Double Wardrobe',
		packed_dimensions: {
			width: 115,
			length: 57,
			height: 130
		},
		price: 399,
		thumb_img: '790393_R_Z001.jpg',
		does_it_fit: ['CFORD']
	};
	
	items['21344'] = {
		
		name: 'Chester Compact Sofa - Dark Stained Feet - Beige - Fabric',
		packed_dimensions: {
			width: 130,
			length: 65,
			height: 75
		},
		price: 640,
		thumb_img: '025497_R_Z001.jpg',
		does_it_fit: ['CFORD', 'CVOLK']
	};
	
	items['33421'] = {
		
		name: 'Wiltshire Lamp Table Oak',
		packed_dimensions: {
			width: 55,
			length: 48,
			height: 48
		},
		price: 99.99,
		thumb_img: 'lamp_table.jpg',
		does_it_fit: ['CFORD', 'CVOLK', 'CAUDI']
	};
	
	
	$('#content_area').hide();
	
	
	//Listen for product click
	$('.product_thumb, .product_title').bind('click', function(){
		
		var _this = $(this);
		newItemClick(_this);
	});
	
	
	//Trigger new item
	function newItemClick(_this){
		
		var clicked_item_id = _this.attr('data-id');
		
		if(typeof items[clicked_item_id] === 'undefined'){
			
			//alert("product not found");
		}else{
			
			resetState();
			loadProduct(clicked_item_id);
		}
	}
	
	
	//Reset Overlay States
	function resetState(){
		my_reg = null;
		product_id = null;
		itemStageClicked = false;
		checkOrCross = null;
		
		$('.overlay').hide();
		$('#slide_arrow').css('height', '302px');
		$('#product_selection').slideDown();
		$('#your_car').hide();
		$('#content_area').hide();
	}
	
	//Load product on page load and click
	function loadProduct(productID){
		//console.log('loading product');
				
		var product_id = productID;
		
		var price = '£'+items[productID].price;
		var title = items[productID].name;
		var thumb_img = '/static/images/products/'+items[productID].thumb_img;
		
		//Add content to container
		$('.p_title').html(title);
		$('.price').html(price);
		$('.price_col').html(price);
		$('.product_item').attr('src',thumb_img);
		$('.fit_in_car_btn, #new_reg').attr('data-id', product_id);
		
		
		$('#content_area').show();
		
		//$('#product_select_box').hide("slide", { direction: "left" }, 1000);
		$("#product_menu_box").toggleClass('slide_menu_box');
	}
	
	
	//Will this fit in my car?
	$('.fit_in_car_btn').bind('click', function(){
		
		$('.overlay').fadeIn();
		$("#product_menu_box").toggleClass('slide_menu_box');
		$("#product_menu_box").animate({
			top: '90px'
		}, 1000);
		$('.panel, #car_reg_form').show();
		$('#car_regs').slideDown();
		
		//HIDE PRODUCTS
		$('#product_selection').slideUp();
		$('#slide_arrow').css('height', '219px');
		
		
		
		//$('#product_select_box').show("slide", { direction: "left" }, 1000);
		$('#product_manu_box').show("slide", { direction: "left" }, 1000);
		
		//store product_id
		product_id = $(this).attr('data-id');
		
		//If user has already clicked on this item
		if(itemStageClicked){
			$('#car_reg_form').hide();
			$('#your_car').show();
		}
	});


	//on car reg submit
	$('#my_reg_form').submit(function() {
	    // get all the inputs into an array.
	    var inputs = $('#car_reg').val();
	    
	    my_reg = inputs;
	    
	    checkMyCar(my_reg);
	    
	    return false;
	});
	
	
	//check users registration num
	function checkMyCar(reg){
		
		//Convert to uppercase and remove white space
		reg = reg.toUpperCase().replace(/\s+/g, '');
		
		//Check if null
		if(typeof reg_numbers[reg] === 'undefined'){
			
			//alert("This Reg does not exist");
			//alert('this reg does not exist');
		}
		else{
			//alert("This Reg exists");

			//console.log('this reg exists');	
			doesItFit();
		}
	}
	
	//need to tie car with product!!
		
	//Does this product fit in my car?
	function doesItFit(){
		
		$.each(items[product_id].does_it_fit, function(key, val){
			
			//Check if this reg number has this car model matched against product
			if(reg_numbers[my_reg].key == val){
				
				checkOrCross = 'check.gif';
				displayCarData();
				
				//break loop
				return false;
				//console.log('Car matches with model');
			}else{
				checkOrCross = 'cross.gif';
				displayCarData();
				//console.log('Car does not match with model');
			}
				
		});
		
		//the empty arrays
		if(items[product_id].does_it_fit.length == 0){
			//console.log('Product doesnt fit');
			
			checkOrCross = 'cross.gif';
			displayCarData();
		}
	}
	
	
	//Display car information
	function displayCarData(){
		
		itemStageClicked = true;
		
		$('#car_reg_form').hide();
		$('#your_car').show();
		
		
		var product_width = items[product_id].packed_dimensions.width;
		var product_height = items[product_id].packed_dimensions.height;
		var product_length = items[product_id].packed_dimensions.length;
		
		var dimensions = 'width: '+product_width+' height: '+product_height+' depth: '+product_length+'cm';
		
		$('#modal_product_name').html(items[product_id].name);
		$('#modal_product_name').html(items[product_id].name);
		$('#package_dimensions').html(dimensions);

		
		//look up car info
		var car_name = reg_numbers[my_reg].name;
		var check_or_gif = '/static/images/'+checkOrCross;
		var car_thumb_img = '/static/images/cars/'+reg_numbers[my_reg].image;
		var boot_dimensions = '<strong>Boot Size:</strong> width: '+reg_numbers[my_reg].bootcapacity.Width+' height: '+reg_numbers[my_reg].bootcapacity.Height+' depth: '+reg_numbers[my_reg].bootcapacity.Depth+'cm';
				
		//Add content to container
		$('#car_name').html(car_name);
		$('#car').attr('src', car_thumb_img);
		$('#check_or_gif').attr('src', check_or_gif);
		$('#boot_size').html(boot_dimensions);
		/*$('#c_width').html('Width: '+reg_numbers[my_reg].bootcapacity.Width+'cm');
		$('#c_height').html('Height: <br>'+reg_numbers[my_reg].bootcapacity.Height+'cm');
		$('#c_depth').html('Depth: '+reg_numbers[my_reg].bootcapacity.Depth+'cm');*/
		
		if(checkOrCross == 'check.gif'){
			$('#add_to_trolley').hide();
			$('#click_and_collect').show();
		}else{
			$('#add_to_trolley').show();
			$('#click_and_collect').hide();
		}
	}
	
		
	//Close overlay
	$('.overlay').bind('click', function(){
		
		$(this).hide();
		$('#product_selection').slideDown();
		$("#product_menu_box").animate({
			top: '210px'
		}, 1000);
		$('#car_regs').slideUp();
		$('#slide_arrow').css('height', '302px');
		$('.panel').hide();
	});
	
	
	/* HIDE SHOW CONTROL USER SCENARIO PANEL */
	$('#slide_arrow').bind('click', function(){
		//$('#product_select_box').toggle("slide", { direction: "left" }, 1000);

		$("#product_menu_box").toggleClass('slide_menu_box');
	});
	
	
	/* RESET STATUS */
	$('#new_reg').bind('click', function(){
		
		my_reg = null;
		checkOrCross = null;
		
		//reset car reg number and bring up panel
		
		$("#car_reg_form").show();
		$("#your_car").hide();
		
		//clear input text field
		$('#car_Reg').val('');
	});
	
	//Add car reg to input field 
	$('#reg_nos li a').bind('click', function(){
		
		$('#car_reg').val($(this).attr('data-id'));
	});
});