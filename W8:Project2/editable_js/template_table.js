
/**
 * TABLE VIEW
 * Display data in sortable rows - good for scanning specific information
 */
function showTable(data) {
  // Requirements:
  // - Show data in a table format
  // - Include all important fields
  // - Make it easy to scan and compare
  // - Consider adding sorting functionality
  //   https://www.w3.org/WAI/ARIA/apg/patterns/table/examples/sortable-table/

    /*
        javascript goes here! you can return it below
    */ 

  const tableRows = data.map(restaurant =>{
    return `
    <tr>
      <td>${restaurant.properties.name}</td>
      <td>${restaurant.properties.city}</td>
      <td>${restaurant.properties.state}</td>
      <td>${restaurant.properties.owner}</td>
      <td>${restaurant.properties.zip}</td>
    </tr>`
  }).join('');

  const tableContent = `
    <h2 class = "view-title">Restaurant Table</h2>
      <table class = "restaurant-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>State</th>
            <th>Owner</th>
            <th>Zip</th>
          </tr>
        </thead>
      <tbody>
        ${tableRows}
      </tbody>
      </table>`;
  /*html*/ 
  return tableContent;
}

export default showTable;