class Player {
  constructor(gameScreen, left, top, width, height, imageURL) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.directionX = 0;
    this.directionY = 0;

    this.element = document.createElement("img");
    this.element.src = imageURL;
    this.element.style.position = "absolute";

    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;

    this.gameScreen.appendChild(this.element);

    // Create the arrow element
    this.arrowElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    this.arrowElement.setAttribute("width", "150");
    this.arrowElement.setAttribute("height", "50");
    this.arrowElement.style.display = "absoulte";

    // Create the arrow line
    let arrowLine = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    arrowLine.setAttribute("x1", "10");
    arrowLine.setAttribute("y1", "40");
    arrowLine.setAttribute("x2", "90");
    arrowLine.setAttribute("y2", "40");
    arrowLine.setAttribute("stroke", "black");
    arrowLine.setAttribute("stroke-width", "2");

    // Make the line dashed
    arrowLine.setAttribute("stroke-dasharray", "10,5");

    // Create the arrowhead
    let arrowHead = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon"
    );
    arrowHead.setAttribute("points", "90,40 80,35 80,45");
    arrowHead.setAttribute("fill", "black");

    // Rotate the arrow
    this.arrowElement.setAttribute("transform", "translate(160, 270) rotate(-90)");

    // Append to the arrow element
    this.arrowElement.appendChild(arrowLine);
    this.arrowElement.appendChild(arrowHead);
    this.gameScreen.appendChild(this.arrowElement);

    this.updatePosition();
  }

  move() {}
  atack() {}
  updatePosition() {}
}
