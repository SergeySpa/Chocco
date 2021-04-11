let myMap;

const init = () => {
  myMap = new ymaps.Map("map", {
    center: [45.040768, 38.989612],
    zoom: 12,
    controls: [],
  });

  const coords = [
    [45.053787, 38.974663],
    [45.022882, 39.103893],
    [45.023913, 38.938908],
    [45.007112, 38.971023]
  ];

  const mediaQueryTablets = window.matchMedia('(max-width: 768px)');
  if (mediaQueryTablets.matches) {
    var myCollection = new ymaps.GeoObjectCollection({}, {
    draggable: false, 
    iconLayout: 'default#image',
    iconImageHref: "./img/marker.svg",
    iconImageSize: [43, 55],
    iconImageOffset: [-3, -42]
  });
  } else {
    var myCollection = new ymaps.GeoObjectCollection({}, {
      draggable: false, 
      iconLayout: 'default#image',
      iconImageHref: "./img/marker.svg",
      iconImageSize: [58, 73],
      iconImageOffset: [-3, -42]
    });
  }
 
  coords.forEach(coord => {
    myCollection.add(new ymaps.Placemark(coord));
  });

  myMap.geoObjects.add(myCollection);

  myMap.behaviors.disable('scrollZoom');

}

ymaps.ready(init);