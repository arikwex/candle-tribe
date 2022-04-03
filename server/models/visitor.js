
let visitorCounter = 1;

function addVisitor() {
  return visitorCounter++;
}

function getVisitorCount() {
  return visitorCounter;
}

function setVisitorCount(v) {
  visitorCounter = v;
}

export default {
  addVisitor,
  setVisitorCount,
  getVisitorCount,
};