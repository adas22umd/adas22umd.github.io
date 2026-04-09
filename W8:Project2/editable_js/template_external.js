
/**
 * EXTERNAL LIBRARY VIEW
 * Pick an external library and pipe your data to it.
 */
function showExternal(data) {
  // Requirements:
  // - Show data using an external library, such as leaflet.js or chartsjs or similar.
  // - Make a filter on this page so your external library only shows useful data.
    /*
        javascript goes here! you can return it below
    */ 
console.log("data length:", data.length);
  console.log("first item:", data[0]);
  console.log("first coordinates:", data[0].geometry.coordinates);


  const html = `
    <h2 class="view-title">Map View</h2>
    <div id="map" style="height: 600px;"></div>
  `;

  // Use setTimeout to run AFTER the div is added to the page
  setTimeout(() => {
    const map = L.map('map').setView([38.9, -76.8], 10);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    data
      .filter(r => r.geometry && r.geometry.coordinates)
      .forEach(r => {
        L.marker([r.geometry.coordinates[1], r.geometry.coordinates[0]])
          .addTo(map)
          .bindPopup(`<strong>${r.properties.name}</strong><br>${r.properties.address_line_1}<br>${r.properties.city}`);
      });
  }, 100);

  return html;
}
            



export default showExternal;