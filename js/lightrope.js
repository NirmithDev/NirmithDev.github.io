const lightropeContainer = document.getElementById('lightropeContainer');

function generateListItems(numItems) {
  for (let i = 0; i < numItems; i++) {
    const listItem = document.createElement('li');
    lightropeContainer.appendChild(listItem);
  }
}

// Generate 20 list items (adjust the number as needed)
generateListItems(100);