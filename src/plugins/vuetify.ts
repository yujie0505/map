import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib";

import "@/assets/twicon/twicon.css";
import Icon from "@/components/Icon.vue";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    values: {
      product: {
        component: Icon,
        props: {
          name: "product",
        },
      },
    },
  },
});
