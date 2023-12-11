async function fetchData() {
  try {
    const response = await fetch(`http://localhost:3000/getAttempts`);
    const data = await response.json();
    return data;
  }catch (error) {
    console.error('Error calculating decision style:', error);
    return null;
  }
}

async function populateTable() {
  const tableBody = document.getElementById('reportTable').getElementsByTagName('tbody')[0];
  const userResponses = await fetchData();

  userResponses.forEach(response => {
    const newRow = tableBody.insertRow(tableBody.rows.length);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);

    //cell1.innerHTML = response.userId;
    cell1.innerHTML = response.username;
    cell2.innerHTML = response.date;
    cell3.innerHTML = response.result;
  });
}
document.addEventListener('DOMContentLoaded', populateTable);
