import type * as maptilersdk from '@maptiler/sdk';
import { type MapboxDrawOptions } from '@mapbox/mapbox-gl-draw';

import { PROPERTY_MARKER } from './map';

const MEASUREMENT_LABEL_SOURCE_ID = 'tl-measurement-label-source';
const MEASUREMENT_LABEL_LAYER_ID = 'tl-measurement-label-layer';

enum FeatureLabelKeys {
  polygonArea = 'polygonArea',
  polygonEdgeLength = 'polygonEdgeLength',
  lineSegmentLength = 'lineSegmentLength'
}

//TODO: Change this config;
const MAP_DRAW_CONFIG: MapboxDrawOptions = {
  displayControlsDefault: false,
  controls: {
    polygon: true,
    point: true,
    trash: true,
    line_string: true
  },
  styles: [
    {
      id: 'highlight-active-points',
      type: 'symbol',
      filter: [
        'all',
        ['==', '$type', 'Point'],
        ['==', 'meta', 'feature'],
        ['==', 'active', 'true']
      ],
      layout: {
        'icon-image': PROPERTY_MARKER.id,
        'icon-overlap': 'always',
        'icon-size': 1.2,
        'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
        'text-size': 11,
        'text-transform': 'uppercase',
        'text-letter-spacing': 0.05,
        'text-offset': [0, 2.5]
      },
      paint: {
        'text-color': '#202',
        'text-halo-color': '#fff',
        'text-halo-width': 2
      }
    },
    {
      id: 'points-are-blue',
      type: 'symbol',
      filter: [
        'all',
        ['==', '$type', 'Point'],
        ['==', 'meta', 'feature'],
        ['==', 'active', 'false']
      ],
      layout: {
        'icon-image': PROPERTY_MARKER.id,
        'icon-overlap': 'always',
        'icon-size': 1.3,
        'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
        'text-size': 11,
        'text-transform': 'uppercase',
        'text-letter-spacing': 0.05,
        'text-offset': [0, 2.5]
      }
    },
    // Below code is for styling lines in polygon
    {
      id: 'gl-draw-line',
      type: 'line',
      filter: ['all', ['==', '$type', 'LineString'], ['!=', 'mode', 'static']],
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': '#FFE0B2',
        'line-width': 4
      }
    },
    // polygon fill
    {
      id: 'gl-draw-polygon-fill',
      type: 'fill',
      filter: ['all', ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
      paint: {
        'fill-color': '#FFE0B2',
        'fill-outline-color': '#FFE0B2',
        'fill-opacity': 0.4
      }
    },
    // polygon mid points
    {
      id: 'gl-draw-polygon-midpoint',
      type: 'circle',
      filter: ['all', ['==', '$type', 'Point'], ['==', 'meta', 'midpoint']],
      paint: {
        'circle-radius': 3,
        'circle-color': '#FFCC80'
      }
    },
    // polygon outline stroke
    //  This doesn't style the first edge of the polygon, which uses the line stroke styling instead
    {
      id: 'gl-draw-polygon-stroke-active',
      type: 'line',
      filter: ['all', ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': '#FFCC80',
        'line-width': 3
      }
    },
    //  vertex point halos
    {
      id: 'gl-draw-polygon-and-line-vertex-halo-active',
      type: 'circle',
      filter: [
        'all',
        ['==', 'meta', 'vertex'],
        ['==', '$type', 'Point'],
        ['!=', 'mode', 'static']
      ],
      paint: {
        'circle-radius': 5,
        'circle-color': '#000'
      }
    },
    // vertex points
    {
      id: 'gl-draw-polygon-and-line-vertex-active',
      type: 'circle',
      filter: [
        'all',
        ['==', 'meta', 'vertex'],
        ['==', '$type', 'Point'],
        ['!=', 'mode', 'static']
      ],
      paint: {
        'circle-radius': 10,
        'circle-color': '#FFB74D'
      }
    },

    // INACTIVE (static, already drawn)
    //  line stroke
    {
      id: 'gl-draw-line-static',
      type: 'line',
      filter: ['all', ['==', '$type', 'LineString'], ['==', 'mode', 'static']],
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': '#C5CAE9',
        'line-width': 3
      }
    },
    // polygon fill
    {
      id: 'gl-draw-polygon-fill-static',
      type: 'fill',
      filter: ['all', ['==', '$type', 'Polygon'], ['==', 'mode', 'static']],
      paint: {
        'fill-color': '#6B7BE1',
        'fill-outline-color': '#C5CAE9',
        'fill-opacity': 0.1
      }
    },
    // polygon outline
    {
      id: 'gl-draw-polygon-stroke-static',
      type: 'line',
      filter: ['all', ['==', '$type', 'Polygon'], ['==', 'mode', 'static']],
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': '#6B7BE1',
        'line-width': 3
      }
    }
  ]
};

const MEASUREMENT_LAYER_CONFIG: maptilersdk.LayerSpecification = {
  id: MEASUREMENT_LABEL_LAYER_ID,
  type: 'symbol',
  source: MEASUREMENT_LABEL_SOURCE_ID,
  layout: {
    'text-font': ['Lato Bold'],
    'text-field': [
      'case',
      ['has', FeatureLabelKeys.polygonEdgeLength],
      ['get', FeatureLabelKeys.polygonEdgeLength],
      ['has', FeatureLabelKeys.polygonArea],
      ['get', FeatureLabelKeys.polygonArea],
      ['has', FeatureLabelKeys.lineSegmentLength],
      ['get', FeatureLabelKeys.lineSegmentLength],
      ''
    ],
    'text-size': 14,
    'symbol-placement': 'point'
  },
  paint: {
    'text-color': '#BA5943',
    'text-halo-color': '#fff',
    'text-halo-width': 2
  }
};

const DEFAULT_SOURCE_CONFIG: maptilersdk.SourceSpecification = {
  type: 'geojson',
  data: {
    type: 'FeatureCollection',
    features: []
  }
};

export {
  DEFAULT_SOURCE_CONFIG,
  FeatureLabelKeys,
  MAP_DRAW_CONFIG,
  MEASUREMENT_LABEL_LAYER_ID,
  MEASUREMENT_LABEL_SOURCE_ID,
  MEASUREMENT_LAYER_CONFIG
};
