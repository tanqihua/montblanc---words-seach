export function getNormal(p1, p2) {
  let dx = p2.x - p1.x;
  let dy = p2.y - p1.y;

  let m = dy / dx;

  return -1 / m;
}
