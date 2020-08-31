const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialImageLoader = true;

// Unsplash API
let count = 5;
const apiKey = '_yZ_B21_rgGap8_uQR0lVn5re7m5w8zZ5VZxhSjFYr8';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if
function updateImageLoaderSize(countSize) {
	count = countSize;
	apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
}
// Check if all images were loaded
function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
		if (initialImageLoader) {
			updateImageLoaderSize(30);
			initialImageLoader = false;
		}
	}
}

// Helper Function to SEt Attributes on DOM Elements
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

//Create Elements for links and photos
function displayPhotos() {
	imagesLoaded = 0;
	totalImages = photosArray.length;
	// Run function for each object in photosArray
	photosArray.forEach((photo) => {
		// Create <a> to link to unsplash
		const item = document.createElement('a');
		setAttributes(item, {
			href: photo.links.html,
			target: '_blank'
		});
		// Create <img> for photo
		const img = document.createElement('img');
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description
		});
		// Event Listener, check when each is finished loading
		img.addEventListener('load', imageLoaded);
		// Put <img> inside <a>, then put bopth inside imageContainer Element
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}
// Get Photos from Unsplash API

async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		displayPhotos();
	} catch (err) {
		console.log(err);
	}
}

// Check to se if scrolling near bottom of page, Load more Photos
window.addEventListener('scroll', () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
		ready = false;
		getPhotos();
	}
});

// On Load
getPhotos();
