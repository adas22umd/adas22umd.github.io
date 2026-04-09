/**
 * STATS VIEW
 * Show aggregate statistics and insights - good for understanding the big picture
 */
function showStats(data) {
  // Requirements:
  // Replace the below "task" description with the following:
  // - One meaningful statistic calculation from the supplied dataset
  // ===- percent of restaurants not passing hand-washing, for example
  // - Present insights visually
  // - Show distributions, averages, counts, etc.
  // - Help users understand patterns in the data
  
  /* Javascript calculations here */   
  const approvedFoods = data.filter(restaurant => 
    restaurant.properties.food_from_approved_source === "In Compliance").length;
    const percentSuccessFoods = ((approvedFoods/data.length) * 100);
  
  const approvedWorkers = data.filter(restaurant => 
    restaurant.properties.ill_workers_restricted === "In Compliance").length;
    const percentSuccessWorkers = ((approvedWorkers/data.length) * 100);

  const numberOfRestaurants = data.filter(restaurant =>
    restaurant.properties.category  === "Restaurant").length;
  
  const failedHandWashing = data.filter(restaurant => 
    restaurant.properties.proper_hand_washing === "Out of Compliance"
  ).length;

  const rodentIssues = data.filter(restaurant => 
    restaurant.properties.rodent_and_insects === "Out of Compliance"
  ).length;

  const cityCounts = {};
  data.forEach(restaurant => {
    if (!cityCounts[restaurant.properties.city]) cityCounts[restaurant.properties.city] = 0;
    cityCounts[restaurant.properties.city]++;
  });
  const topCity = Object.entries(cityCounts)
    .sort((a, b) => b[1] - a[1])[0][0];

  
  /* html return */
  return `
                <h2 class="view-title">Stats View</h2>
                <div class = "stats-grid">
                <div class="stat-card">
                  <div><h3 class = "stat-label">Restaurants with approved food sources</h3></div>
                    <div class = "stat-number">${percentSuccessFoods}%</div>
                  </div>
                  <div class="stat-card">
                  <div><h3 class = "stat-label">Restaurants with approved workers</h3></div>
                    <div class = "stat-number">${percentSuccessWorkers}%</div>
                  </div>
                  <div class="stat-card">
                  <div><h3 class = "stat-label">Total no. of restaurants</h3></div>
                    <div class = "stat-number">${numberOfRestaurants}</div>
                  </div>
                  <div class="stat-card">
                  <div><h3 class = "stat-label">Failed handwashing standards</h3></div>
                    <div class = "stat-number">${failedHandWashing}</div>
                  </div>
                  <div class="stat-card">
                  <div><h3 class = "stat-label">Rodent & insects issues</h3></div>
                    <div class = "stat-number">${rodentIssues}</div>
                  </div>
                  <div class="stat-card">
                  <div><h3 class = "stat-label">Most Common City</h3></div>
                    <div class = "stat-number">${topCity}</div>
                  </div>
                </div>
                  

                
            `;
}

export default showStats