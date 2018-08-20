var i18n = {
  lang: {
    en: {
      title: "Title",
      name: "123"
    },
    zh: {
      title: "標題",
      name: "五六七"
    }
  },
  config: {
    lang: "zh"
  },
  get: function(target) {
    var val;
    val = this.lang[this.config.lang][target];
    return val;
  },
  init: function() {
    this.config.lang = getUrlParameter("lang") || "zh";
  }
};
$(function() {
  i18n.init();
});
