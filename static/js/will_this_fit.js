/*
 * Does this product fit in my car?
 */
function doesItFit(width, height, length){
	
	var score = [width, height, length];
		
	if(score[0] == 'yes' && score[1] == 'yes' && score[2] == 'yes'){
		
		//product fits
		yes_or_no('yes');
		
	} else if($.inArray('no', score) !== -1){
		
		//product wont fit
		yes_or_no('no');
	} else if($.inArray('maybe', score) !== -1){
		
		//product might fit
		yes_or_no('maybe');

	} else{
		console.log("nothing");
	}
}

	
/*
 * Sort JSON Car data
 */
function sortCarData(data){
	
	var make_model           = data.dvla.MAKEMODEL;
	var make                 = data.dvla.MAKE;
	var model                = data.dvla.MODEL;
	var colour               = data.dvla.COLOUR;
	var car_type             = data.dvla.DOORPLANLITERAL;
	var door_plan            = data.dvla.DOORPLAN;
	var thumb_img            = data.datastore.images.front_view;
	
	//Boot sizes
	var boot_width_top       = data.datastore.boot_aperture_width_top;
	var boot_width_middle    = data.datastore.boot_aperture_width_middle;
	var boot_width_bottom    = data.datastore.boot_aperture_width_bottom;
	
	var boot_width_sizes     = [boot_width_top, boot_width_middle, boot_width_bottom];
	var boot_width           = findLowest(boot_width_sizes);
	
	var boot_vertical_height = data.datastore.boot_aperture_verticalheight;
	var boot_aperture_height = data.datastore.boot_aperture_height;
	
	var boot_height_sizes    = [boot_vertical_height, boot_aperture_height];
	var boot_height          = findLowest(boot_height_sizes);
	
	var boot_depth           = data.datastore.boot_length;
	
	//score data
	var yom                  = data.datastore.YEAROFMANUFACTURE;
	var score_width          = data.score.width;
	var score_height         = data.score.height;
	var score_length         = data.score.length;

	doesItFit(score_width, score_height, score_length);
	displayCarData(make_model, colour, car_type, door_plan, boot_width, boot_height, boot_depth, thumb_img);

	$('#your_car').slideDown('fast', function(){
		calculateMatch(make, model, yom, door_plan);
	});
}


/*
 * Sort out array and find lowest number 
 */
function findLowest(arr){
	var sizes = arr;

	sizes.sort(function(a, b) { 
		return a - b;
	});

	if(sizes[0] !== null){
		return sizes[0];
	}
}


/*
 * Display car data on page
 */
function displayCarData(make_model, colour, car_type, door_plan, boot_width, boot_height, boot_depth, thumb_img){
	
	//Show product data
	displayProductData();

	var door_plan_trim = Math.round(door_plan);
	
	var car_title = make_model+' '+colour+' '+car_type+' '+door_plan_trim+' door';
	var car_title_lower = car_title.toLowerCase();
	var check_or_gif = '/static/images/'+checkOrCross;

	$('#ow').html(boot_width);
	$('#oh').html(boot_height);
	$('#d').html(boot_depth);

	//Add content to container
	$('#car_name').html(car_title_lower);
	$('#check_or_gif').attr('src', check_or_gif);

	//thumbnail image
	if(thumb_img !== "" || thumb_img !== null){
		$('#car').attr('src', thumb_img).error(function() {
			//image can't be found so set back to default
			$('#car').attr('src', '/static/images/cars/2061111101338.jpg');
		});
	}
	
	if(checkOrCross == 'check.gif'){
		$('#add_to_trolley').hide();
		$('#click_and_collect').show();
	}else{
		$('#add_to_trolley').show();
		$('#click_and_collect').hide();
	}
}


/*
 * Customise panel
 */
function yes_or_no(answer){

	if(answer == 'yes'){
		checkOrCross = 'check.gif';
		$("#item_list").attr('class', 'yes_item_list');
		$('#yes_label').show();
		$('#no_label, #maybe_label').hide();

	}else if(answer == 'maybe'){
		checkOrCross = 'maybe.gif';
		$("#item_list").attr('class', 'no_item_list');
		$('#maybe_label').show();
		$('#yes_label, #no_label').hide();

	}else if(answer == 'no'){
		checkOrCross = 'cross.gif';
		$("#item_list").attr('class', 'no_item_list');
		$('#no_label').show();
		$('#yes_label, #maybe_label').hide();
	}
}