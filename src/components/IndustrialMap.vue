<template>
  <div id="mapt">
    <!--
    <div class="info" style="height: 15%">
      <span>Center: {{ center }}</span>
      <span>Zoom: {{ zoom }}</span>
      <span>Bounds: {{ bounds }}</span>
    </div>
    -->
    <l-map
      style="height: 100vh; width: 100vw"
      :zoom="zoom"
      :center="center"
      :min-zoom="minZoom"
      :max-zoom="maxZoom"
      :options="mapOptions"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
    >
      <l-tile-layer :url="url"></l-tile-layer>
      <l-control-zoom :position="zoomPosition" />
      <l-control-scale :imperial="imperial" :position="scalePosition"/>

      <l-geo-json
        v-if="show"
        :geojson="geojson"
        :options="options"
        :options-style="styleFunction"
      >
      </l-geo-json>

      <l-control :position="'bottomright'" class="custom-control-watermark">
        Разград Индустриална Зона
      </l-control>
    </l-map>
  </div>
</template>

<script>
  import {
    LMap,
    LTileLayer,
    LControlZoom,
    LControlScale,
//    LMarker,
//    LPopup,
    LGeoJson,
//    LTooltip,
    LControl,
  } from 'vue2-leaflet';

  export default {
    name: 'IndustrialMap',
    components: {
      LMap,
      LTileLayer,
      LControlZoom,
      LControlScale,
//      LMarker,
//      LPopup,
      LGeoJson,
//      LTooltip,
      LControl,
    },
    data() {
      return {
        loading: false,
        show: true,
        enableTooltip: true,
        url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        zoom: 18,
        minZoom: 15,
        maxZoom: 20,
        zoomPosition: 'topleft',
        scalePosition: 'bottomleft',
        mapOptions: {
          zoomControl: false,
          attributionControl: false,
          zoomSnap: true,
        },
        imperial: false,
        center: [43.528832, 26.503571],
        bounds: null,
        geojson: null,
      };
    },
    computed: {
      options() {
        return {
          onEachFeature: this.onEachFeatureFunction,
        };
      },
      styleFunction() {
        const fillColor = this.fillColor;
        return () => {
          return {
            weight: 4,
            opacity: 0.75,
            color: '#16b854',
            fillOpacilty: 0.3,
            fillColor,
          };
        };
      },
      onEachFeatureFunction() {
        if (!this.enableTooltip) {
          return () => {};
        }
        if (this.zoom < 18) {
          return (feature, layer) => {
            layer.bindTooltip(
              `<div class="small-label">ПИ ${feature.properties.puid}</div>
               <div class="small-label">ПЛЩ ${feature.properties.area} кв.м.</div>
               <div class="small-label">БЕЛ. ${feature.properties.description}</div>
                `,
              { permanent: false, sticky: false, direction: 'auto' },
            );
          };
        }
        return (feature, layer) => {
          layer.bindTooltip(
            `<div class="small-label">${feature.properties.puid}</div>`,
            { permanent: true, sticky: false, direction: 'top' },
          );
        };
      },
    },
    methods: {
      zoomUpdated(zoom) {
        this.zoom = zoom;
      },
      centerUpdated(center) {
        this.center = center;
      },
      boundsUpdated(bounds) {
        this.bounds = bounds;
      },
    },
    created() {
      this.loading = true;
      this.$http.get('http://62.73.121.212:8080/industrial-zones/').then((response) => {
        this.geojson = response.data;
        this.loading = false;
      });
    },
  };
</script>

<style scoped>
  map {
    height: 80vh;
  }

  .custom-control-watermark {
    font-size: 150%;
    font-weight: bolder;
    color: #aaa;
    text-shadow: #555;
  }

  .small-label {
    font-size: 75%;
    font-weight: bold;
    color: #555555;
  }

</style>
