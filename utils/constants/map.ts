import * as maptilersdk from '@maptiler/sdk';

const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_KEY;

const MAP_DEFAULT_CONFIG: Partial<maptilersdk.MapOptions> = {
  style: maptilersdk.MapStyle.HYBRID,
  attributionControl: false,
  zoom: 12,
  navigationControl: false,
  geolocateControl: false,
  geolocate: true,
  forceNoAttributionControl: true
};

const PROPERTY_MARKER = {
  id: 'property-marker',
  path: '/images/property-marker.png'
};

const MAP_CONTAINER_ID = 'portfolio-map';

export {
  MAPTILER_API_KEY,
  MAP_DEFAULT_CONFIG,
  PROPERTY_MARKER,
  MAP_CONTAINER_ID
};
