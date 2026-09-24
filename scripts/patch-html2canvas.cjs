const fs = require('fs');
const path = require('path');

const helperCode = `
var _colorResolveCanvas = null;
var _resolveUnsupportedColor = function (colorName, values) {
    if (typeof document !== 'undefined') {
        try {
            if (!_colorResolveCanvas) {
                var c = document.createElement('canvas');
                c.width = 1;
                c.height = 1;
                _colorResolveCanvas = c.getContext('2d', { willReadFrequently: true });
            }
            if (_colorResolveCanvas) {
                var parts = [];
                for (var i = 0; i < values.length; i++) {
                    var v = values[i];
                    if (!v) continue;
                    if (v.type === 17 /* PERCENTAGE */ && v.number !== undefined) {
                        parts.push(v.number + '%');
                    } else if (v.number !== undefined) {
                        parts.push(v.number);
                    } else if (v.value !== undefined) {
                        parts.push(v.value);
                    }
                }
                var cssStr = colorName + '(' + parts.join(' ') + ')';
                _colorResolveCanvas.clearRect(0, 0, 1, 1);
                _colorResolveCanvas.fillStyle = '#00000000';
                _colorResolveCanvas.fillStyle = cssStr;
                _colorResolveCanvas.fillRect(0, 0, 1, 1);
                var p = _colorResolveCanvas.getImageData(0, 0, 1, 1).data;
                return pack(p[0], p[1], p[2], p[3] / 255);
            }
        } catch (e) {}
    }
    return 0;
};
`;

function patchFile(relPath) {
  const fullPath = path.resolve(process.cwd(), relPath);
  if (!fs.existsSync(fullPath)) {
    console.log('[patch-html2canvas] File not found:', relPath);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');

  if (content.includes('_resolveUnsupportedColor') || content.includes('/* patched-oklab */')) {
    console.log('[patch-html2canvas] Already patched:', relPath);
    return;
  }

  if (relPath.endsWith('.min.js')) {
    const minTarget = 'if(void 0===t)throw new Error(\'Attempting to parse an unsupported color function "\'+e.name+\'"\');return t(A,e.values)';
    if (content.includes(minTarget)) {
      content = content.replace(minTarget, '/* patched-oklab */ if(void 0===t)return 0;return t(A,e.values)');
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log('[patch-html2canvas] Successfully patched minified:', relPath);
      return;
    }
  }

  const throwPattern = /throw new Error\("Attempting to parse an unsupported color function \\"" \+ value\.name \+ "\\""\);/g;
  if (throwPattern.test(content)) {
    content = helperCode + '\n' + content.replace(throwPattern, '/* patched-oklab */ return _resolveUnsupportedColor(value.name, value.values);');
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('[patch-html2canvas] Successfully patched:', relPath);
  } else {
    console.log('[patch-html2canvas] Target pattern not found in:', relPath);
  }
}

['node_modules/html2canvas/dist/html2canvas.js',
 'node_modules/html2canvas/dist/html2canvas.esm.js',
 'node_modules/html2canvas/dist/html2canvas.min.js'
].forEach(patchFile);
