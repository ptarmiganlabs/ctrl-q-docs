import DefaultTheme from "vitepress/theme";
import mediumZoom from "medium-zoom";
import { nextTick, onMounted, watch } from "vue";
import { useRoute } from "vitepress";

import "./custom.css";

export default {
  extends: DefaultTheme,
  setup() {
    const route = useRoute();
    const initZoom = () => {
      mediumZoom(".vp-doc img", {
        background: "rgba(0, 0, 0, 0.85)",
        margin: 24,
        scrollOffset: 0,
      });
    };

    onMounted(() => {
      initZoom();
    });

    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  },
};