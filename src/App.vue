<template>
  <div id="app" class="theme-bg-appBase theme-c-mainFont">
    <link rel="stylesheet" href="/styles/colorScheme.css" />
    <HeaderElement></HeaderElement>
    <SloganHeader
      id="sloganHeader"
      v-if="this.shouldDisplaySloganHeader"
      :title="this.sloganTitle"
      :description="this.sloganDescription"
      :phone1PositionLeftPercent="this.phone1PositionLeftPercent"
      :phone2PositionLeftPercent="this.phone2PositionLeftPercent"
      :phone1Rotate="this.phone1Rotate"
      :phone2Rotate="this.phone2Rotate"
      :backgroundHorizontal="this.backgroundHorizontal"
    ></SloganHeader>

    <div class="bellow-slogan theme-bg-main">
      <router-view></router-view>
    </div>
    <FooterElement></FooterElement>
  </div>
</template>

<script>
import HeaderElement from "./components/elements/HeaderElement";
import FooterElement from "./components/elements/FooterElement";
import SloganHeader from "./components/elements/SloganHeader";
import sloganData from "./assets/sloganHeaderAnimationData.json";

export default {
  name: "App",
  data() {
    return {
      path: "",
      shouldDisplaySloganHeader: true,
      backgroundHorizontal: "right",
      sloganTitle: "",
      sloganDescription: "",
      phone1PositionLeftPercent: 0,
      phone2PositionLeftPercent: 0,
      phone1Rotate: 0,
      phone2Rotate: 0,
    };
  },
  computed: {},
  components: { HeaderElement, FooterElement, SloganHeader },
  methods: {
    updateSloganHeader() {
      var h = window.location.hash;
      var i = h.indexOf("?");
      var path = h.substr(1, i >= 0 ? i : h.length);

      if (this.path.toString() === path) return;

      this.path = path;
      this.shouldDisplaySloganHeader = sloganData.texts[this.path] != undefined;

      if (!this.shouldDisplaySloganHeader) return;

      this.sloganTitle = sloganData.texts[this.path].title;
      this.sloganDescription = sloganData.texts[this.path].slogan;
      this.phone1PositionLeftPercent =
        sloganData.movement.positions[this.path][0];
      this.phone2PositionLeftPercent =
        sloganData.movement.positions[this.path][1];
      this.phone1Rotate = sloganData.movement.rotations[this.path][0];
      this.phone2Rotate = sloganData.movement.rotations[this.path][1];
      this.backgroundHorizontal =
        sloganData.movement.backgroundHorizontal[this.path];
    },
  },
  created() {
    this.updateSloganHeader();
    setInterval(this.updateSloganHeader, 200);
  },
};
</script>

<style>
html {
  overflow: -moz-scrollbars-vertical;
  overflow-y: scroll;
}
* {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.titleFont {
  font-weight: bold;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
.bellow-slogan {
  position: relative;
  z-index: 2;
  min-height: max(20vw, 20vh);
}
.pointer {
  cursor: pointer;
}
</style>
