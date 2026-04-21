
var canvas = document.querySelector('#bg-canvas'),
    ctx = canvas.getContext('2d'),
    W = canvas.width = window.innerWidth,
    H = canvas.height = window.innerHeight,
    pixels = [];

const waveLayers = [
  { yOffset:   0, amp: 25, freq: 15, speed: 450 },
  { yOffset:  60, amp: 18, freq: 10, speed: 620 },
  { yOffset: 120, amp: 12, freq: 20, speed: 310 },
];

for (const layer of waveLayers) {
  const start = pixels.length;
  for (var x = -400; x < 400; x += 5) {
    for (var z = -250; z < 250; z += 5) {
      pixels.push({ x, y: 100, z, layer, localStart: start });
    }
  }
  pixels[pixels.length - 1].layerEnd = pixels.length;
  const end = pixels.length;
  for (var j = start; j < end; j++) pixels[j].layerLen = end - start;
}

function render(ts) {
  var imageData = ctx.getImageData(0, 0, W, H),
      len = pixels.length,
      fov = 250,
      pixel, scale,
      x2d, y2d, c;

  for (var i = 0; i < len; i++) {
    pixel = pixels[i];
    scale = fov / (fov + pixel.z);
    x2d = pixel.x * scale + W / 2;
    y2d = pixel.y * scale + H / 2;
    if(x2d >= 0 && x2d <= W && y2d >= 0 && y2d <= H) {
      c = (Math.round(y2d) * imageData.width + Math.round(x2d)) * 4;
      // Cycle through the same colours as the card borders (6s loop)
        const t = (ts % 6000) / 6000; // 0 → 1 over 6 seconds
        const stops = [
        [255, 0, 80],    // #ff0050
        [255, 140, 0],   // #ff8c00
        [0, 255, 135],   // #00ff87
        [0, 212, 255],   // #00d4ff
        [124, 58, 237],  // #7c3aed
        [255, 0, 170],   // #ff00aa
        [255, 0, 80],    // back to start
        ];
        const segment = t * (stops.length - 1);
        const idx = Math.floor(segment);
        const frac = segment - idx;
        const r = Math.round(stops[idx][0] + (stops[idx + 1][0] - stops[idx][0]) * frac);
        const g = Math.round(stops[idx][1] + (stops[idx + 1][1] - stops[idx][1]) * frac);
        const b = Math.round(stops[idx][2] + (stops[idx + 1][2] - stops[idx][2]) * frac);

        imageData.data[c]     = r;
        imageData.data[c + 1] = g;
        imageData.data[c + 2] = b;
        imageData.data[c + 3] = 255;
    }
    pixel.z -= 0.4;
    const li = (i - pixel.localStart) / pixel.layerLen;
    pixel.y = H / 14 + pixel.layer.yOffset
        + Math.sin(li * pixel.layer.freq + (ts / pixel.layer.speed)) * pixel.layer.amp
        - pixel.x * 0.4;
    if (pixel.z < -fov) pixel.z += 2 * fov;
  }
  ctx.putImageData(imageData, 0, 0);
}

(function drawFrame(ts){
  requestAnimationFrame(drawFrame);
  ctx.fillStyle = '#0a0a0f';
  ctx.fillRect(0, 0, W, H);
  render(ts);
}());