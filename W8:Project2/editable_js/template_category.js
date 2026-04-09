/**
 * CATEGORY VIEW - STUDENTS IMPLEMENT
 * Group data by categories - good for understanding relationships and patterns
 */
function showCategories(data) {
  // Requirements:
  // - Group data by a meaningful category (cuisine, neighborhood, price, etc.)
  // - Show items within each group
  // - Make relationships between groups clear
  // - Consider showing group statistics

  /* JavaScript Goes Here */ 
  const grouping = {}
  data.forEach(restaurant => {
    const key = restaurant.properties.city;
    if (!grouping[key]) grouping[key] = [];
    grouping[key].push(restaurant);
  })

  const groupHTML = Object.entries(grouping).map(([city, restaurants]) => {

    const items = restaurants.map(restaurant => `
      <div class="category-item">
        <span>${restaurant.properties.name}</span>
        <span>${restaurant.properties.inspection_results}</span>
      </div>
    `).join('');

    return `
      <div class="category-section">
        <h3 class="category-sub-header">${city} (${restaurants.length})</h3>
        <div class="category-items">
          ${items}
        </div>
      </div>
    `;
  }).join('');

  console.log(grouping);
  /* html */
  return `
                <h2 class="view-title">Category View</h2>
                <div class="category-view">
                    <h3 class = "category-header">Grouped by Category</h3>
                    <div>${groupHTML}</div>
                </div>
            `;
}


export default showCategories;