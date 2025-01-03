<template>
  <div
    :id="MAP_CONTAINER_ID"
    ref="mapContainer"
    class="w-full h-full relative"
  />
</template>

<script lang="ts" setup>
import type * as maptilersdk from '@maptiler/sdk';

import '@maptiler/sdk/dist/maptiler-sdk.css';

import {
  Geoman,
  type GMEvent,
  type GmOptionsPartial
} from '@geoman-io/maplibre-geoman-free';
import '@geoman-io/maplibre-geoman-free/dist/maplibre-geoman.css';

import {
  DEFAULT_SOURCE_CONFIG,
  MEASUREMENT_LABEL_SOURCE_ID,
  MEASUREMENT_LAYER_CONFIG
} from '~/utils/constants/draw';
import { MAP_CONTAINER_ID, PROPERTY_MARKER } from '~/utils/constants/map';
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
    controls: {
      draw: {
        circle_marker: {
          uiEnabled: false
        },
        text_marker: {
          uiEnabled: false
        },
        rectangle: {
          uiEnabled: false
        }
      }
    }
  };

  const geoman = new Geoman(map, gmOptions);

  // map.on('gm:create', (event: GMEvent) => {
  //   console.debug('A shape is created', event);
  // });
  // map.on('gm:drawstart', (event: GMEvent) => {
  //   console.debug('A draw control is activated', event);
  // });
  // map.on('gm:drawend', (event: GMEvent) => {
  //   console.debug('A draw control is deactivated', event);
  // });

  // Mode events
  // map.on('gm:globaldrawmodetoggled', () => {
  //   console.log('A draw control is toggled');
  // });
  // map.on('gm:globaleditmodetoggled', () => {
  //   console.log('An edit control is toggled');
  // });
  // map.on('gm:globalremovemodetoggled', () => {
  //   console.log('this is not working');
  // });
  // map.on('gm:globalrotatemodetoggled', () => {
  //   console.log('rotate mode is toggled');
  // });

  //Having inconsistencies in toggling modes
  // map.on('gm:globaldragmodetoggled', () => {
  //   console.log('drag mode is toggled');
  // });
  // map.on('gm:globalcutmodetoggled', () => {
  //   console.log('cut mode is toggled');
  // });
  // map.on('gm:globalsnappingmodetoggled', () => {
  //   console.log('snapping mode is toggled');
  // });

  //not working
  // map.on('gm:editstart', () => {
  //   console.log('edit mode started');
  // });
  // map.on('gm:editend', () => {
  //   console.log('drawing');
  // });

  // Remove events
  // map.on('gm:remove', () => {
  //   console.log('when a polygon is removed');
  // });

  //Rotate Event - works fine
  // map.on('gm:rotatestart', () => {
  //   console.log('rotate mode is started');
  // });
  // map.on('gm:rotateend', () => {
  //   console.log('rotate mode is ended');
  // });

  //Drag event - working fine
  // map.on('gm:dragstart', () => {
  //   console.log('drag mode is started');
  // });
  // map.on('gm:dragend', () => {
  //   console.log('drag mode is ended');
  // });

  // map.on('gm:cut', () => {
  //   console.log('when a polygon is cut');
  // });

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
