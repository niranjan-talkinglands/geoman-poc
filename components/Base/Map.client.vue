<template>
  <div
    :id="MAP_CONTAINER_ID"
    ref="mapContainer"
    class="w-full h-full relative"
  />
</template>

<script lang="ts" setup>
import type * as maptilersdk from '@maptiler/sdk';
import * as turf from '@turf/turf';

import '@maptiler/sdk/dist/maptiler-sdk.css';

import { Geoman, type GmOptionsPartial } from '@geoman-io/maplibre-geoman-free';
import '@geoman-io/maplibre-geoman-free/dist/maplibre-geoman.css';

import { UnitSuffix } from '~/utils/constants';
import {
  DEFAULT_SOURCE_CONFIG,
  FeatureLabelKeys,
  MEASUREMENT_LABEL_SOURCE_ID,
  MEASUREMENT_LAYER_CONFIG
} from '~/utils/constants/draw';
import { MAP_CONTAINER_ID, PROPERTY_MARKER } from '~/utils/constants/map';
import { convertSquareMetersToSquareFeet } from '~/utils/helpers/conversion';
import { addImageToMap, createMapInstance } from '~/utils/helpers/map';

const mapContainer = ref<HTMLDivElement | null>(null);

const onCreateMap = (map: maptilersdk.Map) => {
  map.on('load', async () => {
    await addImageToMap({
      map,
      ...PROPERTY_MARKER
    });

    map.addSource(MEASUREMENT_LABEL_SOURCE_ID, DEFAULT_SOURCE_CONFIG);
    map.addLayer(MEASUREMENT_LAYER_CONFIG);
  });

  const gmOptions: GmOptionsPartial = {
    settings: {},
    layerStyles: {},
    controls: {
      draw: {
        rectangle: {
          uiEnabled: false
        },
        circle_marker: {
          uiEnabled: false
        },
        text_marker: {
          uiEnabled: false
        }
      }
    }
  };

  const geoman = new Geoman(map, gmOptions);

  map.on('gm:create', (e: any) => {
    const { feature, shape } = e;
    const geoJSON = feature.getGeoJson();

    const combinedFeatures: GeoJSON.FeatureCollection['features'] = [];

    if (shape === 'polygon') {
      const area = turf.area(geoJSON);
      const centroid = turf.centroid(geoJSON);

      centroid.properties = {
        [FeatureLabelKeys.polygonArea]: `${convertSquareMetersToSquareFeet(area).toFixed(0)} ${UnitSuffix.SquareFeet}`
      };
      combinedFeatures.push(centroid);

      const coordinates = geoJSON.geometry.coordinates[0][0];
      let midpoint: any;
      for (let i = 0; i < coordinates.length - 1; i++) {
        const startPoint = turf.point(coordinates[i]);
        const endPoint = turf.point(coordinates[i + 1]);
        midpoint = turf.midpoint(startPoint, endPoint);
        const length = turf.distance(startPoint, endPoint, {
          units: 'feet'
        });

        midpoint.properties = {
          [FeatureLabelKeys.polygonEdgeLength]: `${length.toFixed(0)} ${UnitSuffix.Feet}`
        };
        combinedFeatures.push(midpoint);
      }
    } else if (shape === 'line') {
      const coordinates = geoJSON.geometry.coordinates;
      let midpoint: any;
      for (let i = 0; i < coordinates.length - 1; i++) {
        const startPoint = turf.point(coordinates[i]);
        const endPoint = turf.point(coordinates[i + 1]);
        midpoint = turf.midpoint(startPoint, endPoint);
        const length = turf.distance(startPoint, endPoint, {
          units: 'feet'
        });

        midpoint.properties = {
          [FeatureLabelKeys.lineSegmentLength]: `${length.toFixed(0)} ${UnitSuffix.Feet}`
        };
        combinedFeatures.push(midpoint);
      }
    }
    const labelSource = map.getSource(MEASUREMENT_LABEL_SOURCE_ID);
    if (labelSource) {
      //@ts-ignore
      labelSource.setData({
        type: 'FeatureCollection',
        features: combinedFeatures
      });
    }
  });
};

//TODO: Check why onMount hook is not working;
watch(mapContainer, (container) => {
  if (container) {
    createMapInstance({
      containerID: MAP_CONTAINER_ID,
      onCreateMap
    });
  }
});
</script>
