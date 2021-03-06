/*
	Dimension by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
var stat ="Unknown";

var loc = "Unkown";
var urll = document.URL;
var urls = urll.split('?')[1];
urls=urls.split('#')[0];
var glg= urls.split('=')[1];
var fir = glg.split('-')[0];
var lst = glg.split('-')[1];
nam = fir + " " + lst;
console.log(nam);
(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		$main_articles = $main.children('article');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Fix: Flexbox min-height bug on IE.
		if (browser.name == 'ie') {

			var flexboxFixTimeoutId;

			$window.on('resize.flexbox-fix', function() {

				clearTimeout(flexboxFixTimeoutId);

				flexboxFixTimeoutId = setTimeout(function() {

					if ($wrapper.prop('scrollHeight') > $window.height())
						$wrapper.css('height', 'auto');
					else
						$wrapper.css('height', '100vh');

				}, 250);

			}).triggerHandler('resize.flexbox-fix');

		}

	// Nav.
		var $nav = $header.children('nav'),
			$nav_li = $nav.find('li');

		// Add "middle" alignment classes if we're dealing with an even number of items.
			if ($nav_li.length % 2 == 0) {

				$nav.addClass('use-middle');
				$nav_li.eq( ($nav_li.length / 2) ).addClass('is-middle');

			}

	// Main.
		var	delay = 325,
			locked = false;

		// Methods.
			$main._show = function(id, initial) {

				var $article = $main_articles.filter('#' + id);

				// No such article? Bail.
					if ($article.length == 0)
						return;

				// Handle lock.

					// Already locked? Speed through "show" steps w/o delays.
						if (locked || (typeof initial != 'undefined' && initial === true)) {

							// Mark as switching.
								$body.addClass('is-switching');

							// Mark as visible.
								$body.addClass('is-article-visible');

							// Deactivate all articles (just in case one's already active).
								$main_articles.removeClass('active');

							// Hide header, footer.
								$header.hide();
								$footer.hide();

							// Show main, article.
								$main.show();
								$article.show();

							// Activate article.
								$article.addClass('active');

							// Unlock.
								locked = false;

							// Unmark as switching.
								setTimeout(function() {
									$body.removeClass('is-switching');
								}, (initial ? 1000 : 0));

							return;

						}

					// Lock.
						locked = true;

				// Article already visible? Just swap articles.
					if ($body.hasClass('is-article-visible')) {

						// Deactivate current article.
							var $currentArticle = $main_articles.filter('.active');

							$currentArticle.removeClass('active');

						// Show article.
							setTimeout(function() {

								// Hide current article.
									$currentArticle.hide();

								// Show article.
									$article.show();

								// Activate article.
									setTimeout(function() {

										$article.addClass('active');

										// Window stuff.
											$window
												.scrollTop(0)
												.triggerHandler('resize.flexbox-fix');

										// Unlock.
											setTimeout(function() {
												locked = false;
											}, delay);

									}, 25);

							}, delay);

					}

				// Otherwise, handle as normal.
					else {

						// Mark as visible.
							$body
								.addClass('is-article-visible');

						// Show article.
							setTimeout(function() {

								// Hide header, footer.
									$header.hide();
									$footer.hide();

								// Show main, article.
									$main.show();
									$article.show();

								// Activate article.
									setTimeout(function() {

										$article.addClass('active');

										// Window stuff.
											$window
												.scrollTop(0)
												.triggerHandler('resize.flexbox-fix');

										// Unlock.
											setTimeout(function() {
												locked = false;
											}, delay);

									}, 25);

							}, delay);

					}

			};

			$main._hide = function(addState) {

				var $article = $main_articles.filter('.active');

				// Article not visible? Bail.
					if (!$body.hasClass('is-article-visible'))
						return;

				// Add state?
					if (typeof addState != 'undefined'
					&&	addState === true)
						history.pushState(null, null, '#');

				// Handle lock.

					// Already locked? Speed through "hide" steps w/o delays.
						if (locked) {

							// Mark as switching.
								$body.addClass('is-switching');

							// Deactivate article.
								$article.removeClass('active');

							// Hide article, main.
								$article.hide();
								$main.hide();

							// Show footer, header.
								$footer.show();
								$header.show();

							// Unmark as visible.
								$body.removeClass('is-article-visible');

							// Unlock.
								locked = false;

							// Unmark as switching.
								$body.removeClass('is-switching');

							// Window stuff.
								$window
									.scrollTop(0)
									.triggerHandler('resize.flexbox-fix');

							return;

						}

					// Lock.
						locked = true;

				// Deactivate article.
					$article.removeClass('active');

				// Hide article.
					setTimeout(function() {

						// Hide article, main.
							$article.hide();
							$main.hide();

						// Show footer, header.
							$footer.show();
							$header.show();

						// Unmark as visible.
							setTimeout(function() {

								$body.removeClass('is-article-visible');

								// Window stuff.
									$window
										.scrollTop(0)
										.triggerHandler('resize.flexbox-fix');

								// Unlock.
									setTimeout(function() {
										locked = false;
									}, delay);

							}, 25);

					}, delay);


			};

		// Articles.
			$main_articles.each(function() {

				var $this = $(this);

				// Close.
					$('<div class="close">Close</div>')
						.appendTo($this)
						.on('click', function() {
							location.hash = '';
						});

				// Prevent clicks from inside article from bubbling.
					$this.on('click', function(event) {
						event.stopPropagation();
					});

			});

		// Events.
			$body.on('click', function(event) {

				// Article visible? Hide.
					if ($body.hasClass('is-article-visible'))
						$main._hide(true);

			});

			$window.on('keyup', function(event) {

				switch (event.keyCode) {

					case 27:

						// Article visible? Hide.
							if ($body.hasClass('is-article-visible'))
								$main._hide(true);

						break;

					default:
						break;

				}

			});

			$window.on('hashchange', function(event) {

				// Empty hash?
					if (location.hash == ''
					||	location.hash == '#') {

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Hide.
							$main._hide();

					}

				// Otherwise, check for a matching article.
					else if ($main_articles.filter(location.hash).length > 0) {

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Show article.
							$main._show(location.hash.substr(1));

					}

			});

		// Scroll restoration.
		// This prevents the page from scrolling back to the top on a hashchange.
			if ('scrollRestoration' in history)
				history.scrollRestoration = 'manual';
			else {

				var	oldScrollPos = 0,
					scrollPos = 0,
					$htmlbody = $('html,body');

				$window
					.on('scroll', function() {

						oldScrollPos = scrollPos;
						scrollPos = $htmlbody.scrollTop();

					})
					.on('hashchange', function() {
						$window.scrollTop(oldScrollPos);
					});

			}

		// Initialize.

			// Hide main, articles.
				$main.hide();
				$main_articles.hide();

			// Initial article.
				if (location.hash != ''
				&&	location.hash != '#')
					$window.on('load', function() {
						$main._show(location.hash.substr(1), true);
					});

})(jQuery);


function buildingChange(){
	var building = document.getElementById("building");
	

	var floor = document.getElementById("floor");
	removeAllChildNodes(floor);

	var quad = document.getElementById("quad");
	removeAllChildNodes(quad);

	var q = document.createElement('option');
	q.append('Quadrant');
	quad.appendChild(q);
	
	var idk = document.createElement('option');
	idk.append('unsure');
	quad.appendChild(idk);
	var NW = document.createElement('option');
	NW.append('NW');
	quad.appendChild(NW);
	var NE = document.createElement('option');
	NE.append('NE');
	quad.appendChild(NE);
	var SW = document.createElement('option');
	SW.append('SW');
	quad.appendChild(SW);
	var SE =document.createElement('option');
	SE.append('SE');
	quad.appendChild(SE);


	var LL = document.createElement('option');
	LL.append('LL');
	floor.appendChild(LL);

	var flLimit;

	if(building.value == 'Tower '){flLimit = 9;}
	else{flLimit = 4;}


	for(var i = 1; i < flLimit; i++){
		var fl = document.createElement('option');
		fl.append(i.toString());
		floor.appendChild(fl);
	}

	
}


function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


function updateStatus(data){

	var display = document.getElementById("table");
	removeAllChildNodes(display);
	var title1 = document.createElement("th");
	var title2 = document.createElement("th");
	var title3 = document.createElement("th");
	title1.textContent = "Employee Name";
	title2.textContent = "Status";
	title3.textContent = "Location";
	display.appendChild(title1);
	display.appendChild(title2);
	display.appendChild(title3);
	for (let i = 0; i < data.length; ++i){

		var current = data[i];
		
		var tar = document.createElement("tr");
		var spn = document.createElement("span");

		var name = document.createElement("td");
		name.textContent = current.name;

		var status = document.createElement("td");
		status.textContent = current.status;
		

		var location = document.createElement("td");
		location.textContent = current.location;

		if (current.status  == "Needs Help"){
			status.style.color = "#b72c2c";
			status.style.fontWeight = "Bold";
			location.style.color = "#b72c2c";
			location.style.fontWeight = "Bold";
		}



		status.append(spn);
		tar.appendChild(name);
		tar.appendChild(status);
		tar.appendChild(location);
		display.classList.add("table");
		display.appendChild(tar);
	}
}

function useXHR(){

	const xhr = new XMLHttpRequest();
	xhr.addEventListener('load', ()=>{
		updateStatus(JSON.parse(xhr.responseText));

	});

	const url = "https://jsonendpoint.com/firedrill24/endpoint/24";
	
	xhr.open("GET",url, true);
//	xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
	xhr.send();

}

//AKa1IlSoNQu2ChkfuvsZwz
function updateJSON(){

	var xhr = new XMLHttpRequest();
    var jsonRequestURL = "https://jsonendpoint.com/firedrill24/endpoint/24";
	xhr.open("GET", jsonRequestURL,true);
	var found = false;
	
	
	xhr.addEventListener('load', ()=>{
		if(xhr.readyState == 4 && xhr.status == 200)
   		 {
				//jsonArr.push({"name":"Cody", "status":"Safe","location":"Unknown"});
			var jsonArr = JSON.parse(xhr.responseText);
			var floor = document.getElementById("floor");
			var building = document.getElementById("building");
			var quad = document.getElementById("quad");
			if(building.value != "Building"){
				loc = building.value;
				loc += " ";
				loc += floor.value;
				loc += " ";
				if(quad.value != 'unsure' && quad.value != 'Quadrant'){
					loc +=quad.value;
				}
				
			}
			for(var i =0; i < jsonArr.length; i++){
				//var temp = JSON.stringify(jsonArr[i]);
				var innerArr = jsonArr[i];
				
				//console.log(innerArr.name + " " + nam);
				if(innerArr.name.toLowerCase() == nam.toLowerCase()){
					found = true;
					innerArr.status = stat;
					
				
					
					innerArr.location = loc;
					
					jsonArr[i] = innerArr;
				}
			}
			if(found == false && nam != "Unknown"){
				//push to json
				jsonArr.push({"name":nam,"status":stat,"location":loc});
			}
		
			fetch(jsonRequestURL, {
     		 method: 'POST',
		
			body: JSON.stringify(jsonArr)
			//body: '[{"name":"Jonathan Schoelwer","status":"Safe","location":"Virtual"},{"name":"Logan Tumminello","status":"Needs Help","location":" Tower 3 NW"},{"name":"Mason Lumley","status":"Unknown","location":"Unknown"},{"name":"Charles Koch","status":"Safe","location":"Unknown"}]'
    }).then(response => response.json())
	.then(data => {
	  console.log(data) 
	})
	.catch(error => console.error(error))
			
		}
	}
	);
	

	
	xhr.send();
	useXHR();



	
}

useXHR();

function updateSta(statu){
	stat = statu;
}

/*
function updateName(){
	var n = document.getElementById("userN");
	nam = n.value;
}
function updateN(){
	var n = document.getElementById("userr");
	nam = n.value;
}*/

function updateLoc(l){
	loc = l;
}

function resetJSON(){

	var xhr = new XMLHttpRequest();
    var jsonRequestURL = "https://jsonendpoint.com/firedrill24/endpoint/24";
	xhr.open("GET", jsonRequestURL,true);
	var found = false;
	
	
	xhr.addEventListener('load', ()=>{
		if(xhr.readyState == 4 && xhr.status == 200)
   		 {
				
			fetch(jsonRequestURL, {
     		 method: 'POST',
		
			
			body: '[{"name":"Charles Koch","status":"Safe","location":"Unknown"},{"name":"Logan Tumminello","status":"Needs Help","location":" Tower 3 NW"},{"name":"Mason Lumley","status":"Unknown","location":"Unknown"},{"name":"Jonathan Schoelwer","status":"Safe","location":"Virtual"}]'
    }).then(response => response.json())
	.then(data => {
	  console.log(data) 
	})
	.catch(error => console.error(error))
			
		}
	}
	);
	

	
	xhr.send();



	
}

//adding if username admin here

if(nam == "Mason Lumley"){
	var dash = document.getElementById("dash");
	var button = document.createElement("button");
	button.textContent="Reset";
	button.addEventListener("click", resetJSON);
	dash.appendChild(button);

}