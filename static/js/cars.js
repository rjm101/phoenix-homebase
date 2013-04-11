	//store cars in objects
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