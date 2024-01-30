function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

class RenderObject {
  constructor(map, type, layerObjects = []) {
    this.id = "ObjectRender-" + makeid(12);
    this.type = type;
    this.map = map;
    this.rendered = false;
    this.layerObjects = layerObjects;
  }
  _setLayerObject(layerObjects) {
    this._remove();
    this.layerObjects = layerObjects;
  }
  _add() {
    for (let i = 0; i < this.layerObjects.length; i++) {
      this.map.addLayer(this.layerObjects[i]);
    }
  }
  _remove() {
    for (let i = 0; i < this.layerObjects.length; i++) {
      this.map.removeLayer(this.layerObjects[i]);
    }
  }
  add() {
    if (this.rendered) return;
    this.rendered = true;
    this._add();
  }
  remove() {
    if (!this.rendered) return;
    this.rendered = false;
    this._remove();
  }
}

class PolygonGround extends RenderObject {
  constructor(map, listNode) {
    super(map, "PolygonGround");
    this.listNode = listNode;
    this._setLayerObject([
      L.polygon(listNode, {
        color: "red",
        fill: false,
        weight: 2,
        opacity: 1,
        dashArray: "5, 5",
      }),
    ]);
  }
}

class LimitPolygonDongDaDistrict extends PolygonGround {
  constructor(map) {
    super(map, [
      [21.019914, 105.807906],
      [21.025122, 105.811253],
      [21.027654, 105.809083],
      [21.028518, 105.805378],
      [21.030093, 105.801772],
      [21.025038, 105.798264],
      [21.022126, 105.800765],
      [21.015346, 105.805325],
      [21.009019, 105.814360],
      [21.004590, 105.817634],
      [21.003031, 105.819973],
      [21.001624, 105.818136],
      [21.000672, 105.818402],
      [21.000506, 105.819200],
      [21.001582, 105.820658],
      [20.999305, 105.825538],
      [21.001203, 105.827164],
      [20.997407, 105.842547],
      [21.000507, 105.841395],
      [21.028720, 105.841598],
      [21.032199, 105.830146],
      [21.023470, 105.819778],
      [21.016571, 105.814885],
      
    ]);
  }
}

class RouterNode extends RenderObject {
  constructor(map, listNode, color = "blue", weight = 3, opacity = 0.5) {
    super(map, "RouterNode");
    this.listNode = listNode;
    this.color = color;
    this.weight = weight;
    this.opacity = opacity;
    this._setLayerObject([
      L.polyline(listNode, {
        color: color,
        weight: weight,
        opacity: opacity,
      }),
    ]);
  }
}

class PointNode extends RenderObject {
  constructor(map, pos) {
    super(map, "PointNode");
    this.pos = pos;
    this._setLayerObject([L.circle(pos, { radius: 3 })]);
  }
}

function EasyIcon(iconUrl, iconSize) {
  return L.icon({
    iconUrl: iconUrl,
    iconSize: [iconSize, iconSize],
    iconAnchor: [iconSize / 2, iconSize / 2],
    popupAnchor: [0, -iconSize],
  });
}

class MarkerNode extends RenderObject {
  constructor(map, pos, text, icon = null) {
    super(map, "MarkerNode");
    this.pos = pos;
    this.text = text;
    this.icon = icon;
    this._setLayerObject([
      L.marker(pos, {
        title: text,
        icon: icon,
      }),
    ]);
  }
}
