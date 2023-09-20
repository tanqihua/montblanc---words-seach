export function getNormal(p1, p2) {
  let dx = p2.x - p1.x;
  let dy = p2.y - p1.y;

  let m = dy / dx;

  return -1 / m;
}

export function findClosestValue(array, degree) {
  // Initialize variables to keep track of the closest value and its difference
  let closestValue = array[0];
  let minDifference = Math.abs(degree - array[0]);

  // Iterate through the array
  for (let i = 1; i < array.length; i++) {
    const currentDifference = Math.abs(degree - array[i]);

    // Check if the current element has a smaller difference
    if (currentDifference < minDifference) {
      closestValue = array[i];
      minDifference = currentDifference;
    }
  }

  return closestValue;
}
