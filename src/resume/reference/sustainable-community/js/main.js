(function($, undefined) {
	var	GOOGLE_API_KEY = 'AIzaSyC4JcblO8as1oi-1-erhWbxlLMJYBFbeNs',
		ICON_BASE_URL = 'img/markers/',
		RETINA_DISPLAY = (window.devicePixelRatio > 1),
		RETINA_IMG_MOD = RETINA_DISPLAY ? '@2x' : '',
		milesRadii = [25, 50, 75],
		mapCenter = [39.65751331590311, -85.08906841278076],
		mapZoom = 9,
		cityCenter = [39.86442543413277, -84.88856792449951],
		searchRadius = 50000,
		wayneCountyPoints = [
			[40.00447583427404, -85.20120620727539],
			[39.96067508327288, -85.20086288452148],
			[39.96054350720035, -85.20000457763672],
			[39.8739115680129, -85.20103454589844],
			[39.8732528511003, -85.2206039428711],
			[39.788357240954255, -85.220947265625],
			[39.788225333894424, -85.18335342407227],
			[39.71537404178252, -85.1850700378418],
			[39.71458175667416, -85.0345230102539],
			[39.729237557999674, -85.03435134887695],
			[39.72884149621561, -84.96929168701172],
			[39.72686115316559, -84.96963500976562],
			[39.72659710312781, -84.814453125],
			[40.00473881701517, -84.81084823608398],
			[40.00644818014026, -84.89307403564453],
			[40.0051332892275, -84.89290237426758],
			[40.00447583427404, -85.20120620727539]
		],
		locationCenters = {
			'Richmond': [39.83042268335253, -84.89032745361328],
			'Indianapolis': [39.77265852521458, -86.15615844726562],
			'Dayton': [39.75946355801398, -84.19029235839844],
			'Cincinnati': [39.10502164227716, -84.51301574707031],
			'Columbus': [39.96238554917604, -82.9962158203125],
			'Louisville': [38.25220114032733, -85.75515747070312],
			'Lexington': [38.25220114032733, -85.75515747070312],
			'Chicago': [41.88387623204764, -87.62969970703125]
		},
		placeTypes = {
			'accounting': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'airport': {
				icon: 'airport',
				category: 'lifestyle'
			},
			'amusement_park': {
				icon: 'recreation',
				category: 'recreation'
			},
			'aquarium': {
				icon: 'recreation',
				category: 'recreation'
			},
			'art_gallery': {
				icon: 'gallery',
				category: 'arts'
			},
			'atm': {
				icon: 'atm',
				category: 'lifestyle'
			},
			'bakery': {
				icon: 'food',
				category: 'food'
			},
			'bank': {
				icon: 'atm',
				category: 'lifestyle'
			},
			'bar': {
				icon: 'bar',
				category: 'food'
			},
			'beauty_salon': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'bicycle_store': {
				icon: 'recreation',
				category: 'recreation'
			},
			'book_store': {
				icon: 'library',
				category: 'lifestyle'
			},
			'bowling_alley': {
				icon: 'recreation',
				category: 'recreation'
			},
			'bus_station': {
				icon: 'bus',
				category: 'lifestyle'
			},
			'cafe': {
				icon: 'coffee',
				category: 'food'
			},
			'campground': {
				icon: 'camping',
				category: 'recreation'
			},
			'car_dealer': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'car_rental': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'car_repair': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'car_wash': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'casino': {
				icon: 'recreation',
				category: 'recreation'
			},
			'cemetery': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'church': {
				icon: 'church',
				category: 'lifestyle'
			},
			'city_hall': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'clothing_store': {
				icon: 'mall',
				category: 'lifestyle'
			},
			'convenience_store': {
				icon: 'shoppingcart',
				category: 'lifestyle'
			},
			'courthouse': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'dentist': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'department_store': {
				icon: 'shoppingcart',
				category: 'lifestyle'
			},
			'doctor': {
				icon: 'hospital',
				category: 'lifestyle'
			},
			'electrician': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'electronics_store': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'embassy': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'establishment': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'finance': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'fire_station': {
				icon: 'firestation',
				category: 'lifestyle'
			},
			'florist': {
				icon: 'garden',
				category: 'arts'
			},
			'food': {
				icon: 'food',
				category: 'food'
			},
			'funeral_home': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'furniture_store': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'gas_station': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'general_contractor': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'grocery_or_supermarket': {
				icon: 'shoppingcart',
				category: 'lifestyle'
			},
			'gym': {
				icon: 'recreation',
				category: 'recreation'
			},
			'hair_care': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'hardware_store': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'health': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'hindu_temple': {
				icon: 'church',
				category: 'lifestyle'
			},
			'home_goods_store': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'hospital': {
				icon: 'hospital',
				category: 'lifestyle'
			},
			'insurance_agency': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'jewelry_store': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'laundry': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'lawyer': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'library': {
				icon: 'library',
				category: 'lifestyle'
			},
			'liquor_store': {
				icon: 'bar',
				category: 'food'
			},
			'local_government_office': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'locksmith': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'lodging': {
				icon: 'offices',
				category: 'lifestyle'
			},
			'meal_delivery': {
				icon: 'food',
				category: 'food'
			},
			'meal_takeaway': {
				icon: 'food',
				category: 'lifestyle'
			},
			'mosque': {
				icon: 'church',
				category: 'lifestyle'
			},
			'movie_rental': {
				icon: 'movies',
				category: 'recreation'
			},
			'movie_theater': {
				icon: 'movies',
				category: 'recreation'
			},
			'moving_company': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'museum': {
				icon: 'museum',
				category: 'arts'
			},
			'night_club': {
				icon: 'club',
				category: 'food'
			},
			'painter': {
				icon: 'gallery',
				category: 'arts'
			},
			'park': {
				icon: 'pinetree',
				category: 'recreation'
			},
			'parking': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'pet_store': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'pharmacy': {
				icon: 'pharmacy',
				category: 'lifestyle'
			},
			'physiotherapist': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'place_of_worship': {
				icon: 'church',
				category: 'lifestyle'
			},
			'plumber': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'police': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'post_office': {
				icon: 'postoffice',
				category: 'lifestyle'
			},
			'real_estate_agency': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'restaurant': {
				icon: 'restaurant',
				category: 'food'
			},
			'roofing_contractor': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'rv_park': {
				icon: 'recreation',
				category: 'recreation'
			},
			'school': {
				icon: 'elementary',
				category: 'lifestyle'
			},
			'shoe_store': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'shopping_mall': {
				icon: 'mall',
				category: 'lifestyle'
			},
			'spa': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'stadium': {
				icon: 'recreation',
				category: 'recreation'
			},
			'storage': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'store': {
				icon: 'shoppingcart',
				category: 'lifestyle'
			},
			'subway_station': {
				icon: 'train',
				category: 'lifestyle'
			},
			'synagogue': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'taxi_stand': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'train_station': {
				icon: 'train',
				category: 'lifestyle'
			},
			'travel_agency': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'university': {
				icon: 'university',
				category: 'lifestyle'
			},
			'veterinary_care': {
				icon: 'lifestyle',
				category: 'lifestyle'
			},
			'zoo': {
				icon: 'zoo',
				category: 'recreation'
			}
		},
		$searchBox = $('#search input'),
		$closeButton = $('.close'),
		$filterDiv = $('#filter'),
		$zoomIn = $('.zoom-in'),
		$zoomOut = $('.zoom-out'),
		$proximity = $('.proximity'),
		$toolbar = $('#toolbar'),
		$filters = $('ul.categories > li'),
		$filter = {
			arts: $('ul.categories > li.blue'),
			lifestyle: $('ul.categories > li.green'),
			food: $('ul.categories > li.orange'),
			recreation: $('ul.categories > li.yellow')
		},
		initialQuery = 'attractions',
		query = initialQuery,
		map,
		infoWindow,
		placesService,
		directionsService,
		directionsRenderer,
		circles = [],
		circleLabels = [],
		wayneCountyOverlay,
		searchResultsMarkers = [],
		searchResults = {
			centers: {},
			places: {}
		};
		
	// Add in the Google Maps api
	document.write('<script src="//maps.googleapis.com/maps/api/js?libraries=geometry,places&key=' + GOOGLE_API_KEY + '&sensor=false"><\/script>');

	/**
	 *	Initialize the map.
	 */
	function initMap() {
		cityCenter = new google.maps.LatLng(cityCenter[0], cityCenter[1]);
		mapCenter = new google.maps.LatLng(mapCenter[0], mapCenter[1]);

        var mapOptions = {
			center: mapCenter,
			zoom: mapZoom,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			panControl: false,
			zoomControl: false,
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			overviewMapControl: false
		};

		// Create the map
		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

		// Set up the map style
		map.mapTypes.set('wayne_co_style', 
			new google.maps.StyledMapType([
                {
					stylers: [
						{ hue: "#0069b5" }
					]
                }],
                {
                    name: 'Wayne County Custom Style'
                }
            )
        );
        map.setMapTypeId('wayne_co_style');

		// Create the infoWindow for when we need it
		infoWindow = new google.maps.InfoWindow();
		
		// Add the circle overlays and labels
		for (var i = 0; i < milesRadii.length; i++) {
			var radius = milesRadii[i] * 1609.34 /* miles to meters conversion */
			circles.push(new google.maps.Circle({
				strokeColor: '#e8613a', // "#19af5a",
				strokeOpacity: 0.8,
				strokeWeight: 1,
				fillColor: '#e8613a',
				fillOpacity: 0.05,
				map: map,
				center: cityCenter,
				radius: radius
			}));

			var markerPoint = google.maps.geometry.spherical.computeOffset(cityCenter, radius, 210);
			circleLabels.push(new google.maps.Marker({
				map: map,
				icon: {
					url: ICON_BASE_URL + milesRadii[i] + 'miles' + RETINA_IMG_MOD + '.png',
					scaledSize: new google.maps.Size(61, 18)
				},
				clickable: false,
				flat: true,
				position: markerPoint
			}));
		}

		// Add the Wayne County overlay
		for (var i = 0; i < wayneCountyPoints.length; i++) {
			wayneCountyPoints[i] = new google.maps.LatLng(wayneCountyPoints[i][0], wayneCountyPoints[i][1]);
		}
		wayneCountyOverlay = new google.maps.Polygon({
			path: wayneCountyPoints,
			strokeColor: "#e8613a",
			strokeOpacity: 0.8,
			strokeWeight: 1.5,
			fillColor: '#e8613a',
			fillOpacity: 0.05,
			map: map
		});
		placesService = new google.maps.places.PlacesService(map);
		directionsService = new google.maps.DirectionsService();
		directionsRenderer = new google.maps.DirectionsRenderer({
			suppressMarkers: true
		});
		directionsRenderer.setMap(map);
	}




	/**
	 * Initialize our UI elements.
	 */
	function initUI() {

		// Wire up the search box
		$searchBox
			.keypress(function(e) {
				if (e.keyCode == '13') {
					e.preventDefault();
					query = $searchBox.val();
					$filters.addClass('active');
					dockToolbar();
					clearSearchResults();
					search();
				}
			})
			.keyup(function(e) {
				if (e.keyCode == '27') {
					e.preventDefault();
					$searchBox.trigger('blur');
				}
			})
			.focus(function() {
				$filterDiv.addClass('active');
			})
			.blur(function() {
				if ($searchBox.val() === '') {
					$filterDiv.removeClass('active');
				}
			})
			.keyup(function() {
				if ($searchBox.val() === '') {
					$searchBox.removeClass('populated');
				} else {
					$searchBox.addClass('populated');
				}
			});

		// Wire up the close button
		$closeButton.click(function() {
			$searchBox.val('').trigger('blur');
			clearSearchResults();
			query = initialQuery;
			map.panTo(mapCenter);
			map.setZoom(mapZoom);
			search();
			return false;
		});

		// Wire up the actions for when the map is clicked
		$('#map-canvas').mousedown(function() {
			$searchBox.trigger('blur');
			dockToolbar();
		});

		google.maps.event.addListener(map, 'bounds_changed', function(){
			search();
		});

		// Wire up the zoom in/out buttons
		$zoomIn.click(function(e) {
			map.setZoom(map.getZoom() + 1);
		});
		$zoomOut.click(function(e) {
			map.setZoom(map.getZoom() - 1);
		});

		// Wire up the proximity button
		$proximity.click(function(e) {
			$this = $(this);
			if ($this.hasClass('off')) {
				$this.removeClass('off');
				toggleCircles(true);
			} else {
				$this.addClass('off');
				toggleCircles();
			}
		});

		// Wire up the filter checkboxes
		$filters.click(function(e){
			$(this).toggleClass('active');
			filterSearchResults();
		});

		// Wire up the toolbar animation when moving the map
		google.maps.event.addListener(map, 'center_changed', function(){dockToolbar();});

	}




	/** 
	 * Initialize the page
	 */
	function init() {
		initMap();
		initUI();
		search();
	}



	/**
	 * Toggles circles on and off
	 * 
	 * @param  on (optional) Set to true to turn circles on, otherwise circles will be removed.
	 */
	function toggleCircles(on) {
		var newMap = !!on ? map : null;

		for (var i = 0; i< circles.length; i++) {
			circles[i].setMap(newMap);
		}

		for (var i = 0; i < circleLabels.length; i++) {
			circleLabels[i].setMap(newMap);
		}

	}




	/**
	 *
	 */
	function dockToolbar() {
		if (!$toolbar.hasClass('docked')) {
			$toolbar.animate({
				top: '8%',
				marginTop: 0
			}, 750);
			$toolbar.addClass('docked');
		}
	}




	/**
	 * Run a search
	 */
	function search() {
		var bounds = map.getBounds();

		if (query === '') { return; }

		locationCenters['map-center'] = [map.getCenter().lat(), map.getCenter().lng()];

		$.each(locationCenters, function(location, coord) {

			var center = new google.maps.LatLng(coord[0], coord[1]);

			if (searchResults.centers[center.toString()] === true) {return;}  // Already searched this location

			if (location === 'map-center' && !$.isEmptyObject(searchResults.places)){return;}

			if (bounds === undefined || bounds.contains(center)) {	
				var request = {
					location: center,
					radius: searchRadius,
					keyword: query
				};

				searchResults.centers[center.toString()] = true;
				
				placesService.nearbySearch(request, function(results, status, pagination) {
					if (status == google.maps.places.PlacesServiceStatus.OK) {
						for (var i = 0; i < results.length; i++) {
							var place = results[i];

							addResult(place, i);
						}
					}
				});
			}
		});
	}
window.x = searchResults.centers;


	/**
	 *
	 */
	function addResult(place, rank) {
		var type = place.types[0],
			category = (placeTypes[type] === undefined ? false : placeTypes[type].category),
			reference = place.reference,
			key = place.geometry.location.toString() + place.name;

		// If it is not one of the known categories then don't add it.
		// Or of it has already been added, then don't add it.
		if (category === false || searchResults.places[key] !== undefined) {return false;}


		// Create the marker
		var marker = new google.maps.Marker({
				map: map,
				icon: {
					url: ICON_BASE_URL + placeTypes[type].icon + RETINA_IMG_MOD + '.png',
					scaledSize: new google.maps.Size(28, 36)
				},
				shadow: {
					url: ICON_BASE_URL + 'marker-shadow' + RETINA_IMG_MOD + '.png',
					scaledSize: new google.maps.Size(37, 35),
					anchor: new google.maps.Point(8, 30)
				},
				position: place.geometry.location,
				title: place.name,
				visible: $filter[category].hasClass('active')
			});


		// Record the search result in our catalog
		searchResults.places[key] = {
			marker: marker,
			rank: rank,
			category: category
		}


		// Wire up the handling of the click
		google.maps.event.addListener(marker, 'click', function() {
			var thisMarker = this,
				request = {reference: place.reference};

			placesService.getDetails(request, function(placeInfo, status) {
				if (status == google.maps.places.PlacesServiceStatus.OK) {

					// Create the base HTML for the infoWindow
					var infoHtml = '<strong>' + placeInfo.name + '</strong>';
					if (placeInfo.formatted_phone_number !== undefined) {
						infoHtml += '<br/>' + placeInfo.formatted_phone_number;
					}
					if (placeInfo.formatted_address !== undefined) {
						infoHtml += '<br/>' + placeInfo.formatted_address;
					}
					if (placeInfo.website !== undefined) {
						infoHtml += '<br/><a href="' + placeInfo.website + '">' + placeInfo.website + '</a>';
					}
					if (placeInfo.photos !== undefined && placeInfo.photos.length > 0) {
						var randPhoto = placeInfo.photos[Math.floor(Math.random()*placeInfo.photos.length)];
						infoHtml += '<img style="float: right;" src="';
						infoHtml += randPhoto.getUrl({maxWidth: 150, maxHeight: 150});
						infoHtml += '" />';
					}
					if (placeInfo.rating !== undefined) {
						infoHtml += '<br/>';
						for (var i = 0; i < Math.round(placeInfo.rating); i++) {
							infoHtml += '&#9733;';  // Star character
						}
					}
					

					// Draw the driving directions and add the driving stats to the info window
					directionsService.route({
						origin: cityCenter,
						destination: place.geometry.location,
						travelMode: google.maps.TravelMode.DRIVING,
						unitSystem: google.maps.UnitSystem.IMPERIAL
					}, function(result, status) {
						if (status == google.maps.DirectionsStatus.OK) {
							directionsRenderer.setDirections(result);
							directionsRenderer.setMap(map);
							infoHtml += '<br/>Distance: ' + result.routes[0].legs[0].distance.text;
							infoHtml += '<br/>Drive Time: ' + result.routes[0].legs[0].duration.text;
						}

						// Show the infoWindow
						infoWindow.setContent(infoHtml);
						infoWindow.open(map, thisMarker);
					});
				}
			});
		});
	}




	/**
	 *
	 */
	function filterSearchResults() {
		$.each(searchResults.places, function(reference, result){
			result.marker.setVisible($filter[result.category].hasClass('active'));
		});
	}




	/**
	 *
	 */
	function clearSearchResults() {

		$.each(searchResults.places, function(reference, result){
			result.marker.setMap(null);
		});

		searchResults.centers = {};
		searchResults.places = {};
		directionsRenderer.setMap(null);
	}




	// Set it all up when the page is ready
	$(document).ready(function(){
		init();
	});

})(jQuery);