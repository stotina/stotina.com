<template>
  <div>
    <div
      id="sloganHeader"
      :title="this.backgroundAttribution"
      :style="this.backgroundStyle"
    >
      <div
        id="sloganHeaderContent"
        class="theme-bg-nav"
        :style="this.contentStyle"
      >
        <div class="title titleFont">{{ this.title }}</div>
        <p class="slogan">{{ this.description }}</p>
      </div>
      <PhoneElement
        :style="phone1Style"
        id="sloganHeaderPhone"
        :borderColor="'#555555'"
        :imagePath="'/images/screenshots/news-light_2.jpg'"
        :width="'17rem'"
      ></PhoneElement>
      <PhoneElement
        :style="phone2Style"
        id="sloganHeaderPhone2"
        :borderColor="'#555555'"
        :imagePath="'/images/screenshots/news-dark_2.jpg'"
        :width="'17rem'"
      ></PhoneElement>
    </div>
  </div>
</template>

<script>
import PhoneElement from "./PhoneElement";

export default {
  name: "SloganHeader",
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: "STOTINA",
    },
    description: {
      type: String,
      default: "Make the amazing simple.",
    },
    contentLeft: { type: Boolean, default: true },
    phone1Rotate: { type: Number, default: 40 },
    phone1PositionLeftPercent: { type: Number, default: 65 },
    phone1PositionTopPercent: { type: Number, default: -20 },
    phone2Rotate: { type: Number, default: 50 },
    phone2PositionLeftPercent: { type: Number, default: 75 },
    phone2PositionTopPercent: { type: Number, default: -120 },

    backgroundHorizontal: { type: Boolean, default: String },
    background: {
      type: String,
      default: "/images/john-adams-1xIN4FMR78A-unsplash.jpg",
    },
    backgroundAttribution: {
      type: String,
      default: "Photo by John Adams on Unsplash",
    },
    backgroundWidth: {
      type: String,
      default: "160%",
    },
  },
  components: {
    PhoneElement,
  },
  computed: {
    backgroundStyle() {
      return [
        `background-image:url('${this.background}')`,
        `background-size: 200% 100%`,
        `background-position: top ${this.backgroundHorizontal};`,
      ].join(";");
    },
    phone1Style() {
      return (
        [
          `transform: rotate(${this.phone1Rotate}deg)`,
          `position: relative`,
          `left: ${this.phone1PositionLeftPercent}%`,
          `top: ${this.phone1PositionTopPercent}%`,
        ].join("; ") + ";"
      );
    },
    phone2Style() {
      return (
        [
          `transform: rotate(${this.phone2Rotate}deg)`,
          `position: relative`,
          `left: ${this.phone2PositionLeftPercent}%`,
          `top: ${this.phone2PositionTopPercent}%`,
        ].join("; ") + ";"
      );
    },
    contentStyle() {
      return (
        "position: relative; top: 10%;" +
        (this.contentLeft ? "left: 5%" : "left: 65%")
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#sloganHeader {
  width: 100% !important;
  overflow: hidden !important;
  height: 500px;
  max-height: 70vw;
  overflow: hidden;
  transition: 1s ease;
}

#sloganHeaderContent {
  display: inline-block;
  max-width: calc(100vw - 100px);
  z-index: 2;
  padding: 40px 25px;
  border-radius: 50px;
  font-weight: bold;
}

#sloganHeaderContent .title {
  font-weight: bold;
  font-size: 2.4rem;
}
#sloganHeaderContent .slogan {
  font-weight: bold;
  font-size: 1.2rem;
}

#sloganHeaderPhone {
  transition: 1s ease-in-out;
  z-index: 1;
}
#sloganHeaderPhone2 {
  transition: 1s ease-in-out;
  z-index: 1;
}
@media only screen and (max-width: 700px) {
  #sloganHeaderPhone,
  #sloganHeaderPhone2 {
    display: none;
  }
}
</style>
