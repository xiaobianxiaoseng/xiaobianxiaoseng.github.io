// Get all image elements
const imageElements = document.querySelectorAll('.image-container img');

// Define variables for transparent parts
let transparentPart1 = null;
let transparentPart2 = null;

// Loop through each image element
imageElements.forEach((element) => {
    // Calculate transparent part
    const width = parseInt(element.style.width);
    const height = parseInt(element.style.height);
    const x = parseInt(element.style.left);
    const y = parseInt(element.style.top);
    const opacity = parseFloat(element.style.opacity);
    const color = getColorFromRGBA(parseInt(element.style.backgroundColor.substring(1)));
    const transparentWidth = Math.min(x + width * opacity, width - x);
    const transparentHeight = Math.min(y + height * opacity, height - y);
    transparentPart1 = createTransparentImage(transparentWidth, transparentHeight, color);
    transparentPart2 = createTransparentImage(transparentWidth, transparentHeight, color);

    // Add transparent parts to image
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.drawImage(element, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const newElement = document.createElement("img");
    newElement.src = dataURL;
    newElement.style.position = "absolute";
    newElement.style.left = x + transparentWidth + "px";
    newElement.style.top = y + transparentHeight + "px";
    newElement.style.opacity = opacity;
    newElement.style.zIndex = 1;
    document.querySelector(".image-container").appendChild(newElement);
};

// Helper functions for creating transparent image
function createTransparentImage(width, height, color) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, Math.sqrt(width * width - height * height), 0, 2 * Math.PI);
    ctx.fill();
    return canvas;
}

// Helper function for getting RGBA values from hexadecimal string
function getColorFromRGBA(hex) {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    const a = parseInt(hex.substr(7, 2), 16);
    return `rgb(${r}, ${g}, ${b})`;
}
