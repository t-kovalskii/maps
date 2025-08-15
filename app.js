const buildingsData = {
  currentBuilding: {
    id: "main",
    name: "United States Postal Service",
    lat: 29.7369,
    lng: -95.5523,
    type: "Government",
    address: "2800 S Post Oak Rd, Houston, TX 77056",
    description: "Main USPS facility in Westchase area",
  },
  buildings: [
    {
      id: "b1",
      name: "Houston Medical Center",
      lat: 29.7385,
      lng: -95.5498,
      type: "Healthcare",
      address: "2900 Woodridge Dr, Houston, TX",
      description: "Primary healthcare facility",
    },
    {
      id: "b2",
      name: "Westchase Business Complex",
      lat: 29.7352,
      lng: -95.5545,
      type: "Office",
      address: "2700 Post Oak Blvd, Houston, TX",
      description: "Multi-tenant office building",
    },
    {
      id: "b3",
      name: "MediaTech Institute",
      lat: 29.7341,
      lng: -95.551,
      type: "Educational",
      address: "3033 Chimney Rock Rd, Houston, TX",
      description: "Technical education center",
    },
    {
      id: "b4",
      name: "LJA Engineering",
      lat: 29.7355,
      lng: -95.5478,
      type: "Industrial",
      address: "2929 Briarpark Dr, Houston, TX",
      description: "Engineering and construction services",
    },
    {
      id: "b5",
      name: "Madison Park Apartments",
      lat: 29.7388,
      lng: -95.5465,
      type: "Multi-family",
      address: "3100 Rogerdale Rd, Houston, TX",
      description: "Luxury apartment complex",
    },
    {
      id: "b6",
      name: "Village at Westchase",
      lat: 29.7402,
      lng: -95.553,
      type: "Retail",
      address: "2800 S Gessner Rd, Houston, TX",
      description: "Shopping and dining destination",
    },
    {
      id: "b7",
      name: "Schlumberger Houston Campus",
      lat: 29.736,
      lng: -95.5455,
      type: "Office",
      address: "10001 Richmond Ave, Houston, TX",
      description: "Corporate office campus",
    },
    {
      id: "b8",
      name: "Camden Stonebridge",
      lat: 29.7375,
      lng: -95.544,
      type: "Multi-family",
      address: "10401 S Wilcrest Dr, Houston, TX",
      description: "Residential apartment community",
    },
    {
      id: "b9",
      name: "NOV Inc.",
      lat: 29.7345,
      lng: -95.5485,
      type: "Industrial",
      address: "7909 Parkwood Circle Dr, Houston, TX",
      description: "Oil and gas equipment manufacturer",
    },
    {
      id: "b10",
      name: "Quillian Memorial Center",
      lat: 29.7332,
      lng: -95.5462,
      type: "Healthcare",
      address: "10410 Westpark Dr, Houston, TX",
      description: "Medical and rehabilitation center",
    },
    {
      id: "b11",
      name: "Apex at Royal Oaks",
      lat: 29.7318,
      lng: -95.5495,
      type: "Multi-family",
      address: "3233 Rogerdale Rd, Houston, TX",
      description: "Modern apartment living",
    },
    {
      id: "b12",
      name: "Westchase Office Park",
      lat: 29.739,
      lng: -95.555,
      type: "Office",
      address: "2925 Briarpark Dr, Houston, TX",
      description: "Professional office space",
    },
  ],
};

let map;
let markers = [];
let mainMarker;
let infoWindow;

function initMap() {
  const mapCenter = { lat: 29.736, lng: -95.55 };

  map = new google.maps.Map(document.getElementById("map"), {
    center: mapCenter,
    zoom: 15,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.TOP_LEFT,
    },
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER,
    },
    scaleControl: true,
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM,
    },
    fullscreenControl: true,
    fullscreenControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP,
    },
  });

  infoWindow = new google.maps.InfoWindow();

  initializeMarker();
  addBuildingMarkers();

  initializeFilters();

  const filterControl = document.getElementById("filterControl");
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(filterControl);
}

function initializeMarker() {
  const building = buildingsData.currentBuilding;

  mainMarker = new google.maps.Marker({
    position: { lat: building.lat, lng: building.lng },
    map: map,
    title: building.name,
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      scaledSize: new google.maps.Size(40, 40),
    },
  });
}

function addBuildingMarkers() {
  buildingsData.buildings.forEach((building) => {
    const marker = new google.maps.Marker({
      position: { lat: building.lat, lng: building.lng },
      map: map,
      title: building.name,
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        scaledSize: new google.maps.Size(32, 32),
      },
    });

    markers.push(marker);
  });
}

function initializeFilters() {
  const toggleButton = document.getElementById("toggleFilters");
  const toggleText = document.getElementById("toggleText");
  const filterContent = document.getElementById("filterContent");
  const buildingTypeFilter = document.getElementById("buildingTypeFilter");

  toggleButton.addEventListener("click", () => {
    const isHidden = filterContent.classList.contains("hidden");

    if (isHidden) {
      filterContent.classList.remove("hidden");
      toggleButton.classList.remove("collapsed");
      toggleText.textContent = "Hide Filters";
    } else {
      filterContent.classList.add("hidden");
      toggleButton.classList.add("collapsed");
      toggleText.textContent = "Show Filters";
    }
  });

  buildingTypeFilter.addEventListener("change", (e) => {
    filterMarkersByType(e.target.value);
  });
}

function filterMarkersByType(selectedType) {
  markers.forEach((marker) => {
    if (selectedType === "all") {
      marker.setVisible(true);
    } else {
      const isVisible = marker.buildingData.type === selectedType;
      marker.setVisible(isVisible);
    }
  });
}
