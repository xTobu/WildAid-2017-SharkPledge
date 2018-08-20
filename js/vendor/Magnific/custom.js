var story_bar = {
  current: "",
  function: {
    createStoryUser: function(urlYT, urlImg, name, lang) {
      var nowlang =
        getUrlParameter("lang") != "zh" && getUrlParameter("lang") != "en"
          ? "zh"
          : getUrlParameter("lang");

      var user =
        '<a class="story-bar__a" href="' +
        urlYT +
        '">' +
        '    <div class="story-bar__user">' +
        '        <div class="story-bar__user-avatar ' +
        (story_bar.current == name ? "story-bar__active" : "") +
        '" style="background-image: url(' +
        urlImg +
        '"></div>' +
        '        <div class="story-bar__user-name"><span>' +
        name +
        "</span></div>" +
        "    </div>" +
        "</a>";

      //判斷語系不符合 回傳空值
      if (nowlang != lang) return "";
      return user;
    },
    createStory: function(target) {
      $(".story-bar").remove();

      $(target).append(story_bar.div());

      $(".story-bar__a").on("click", function() {
        var selected = $(this)
          .find(".story-bar__user-name span")
          .text();
        story_bar.current = selected;
      });

      $(".story-bar__a").magnificPopup({
        type: "iframe"
      });

      $.magnificPopup.instance.open = function(data) {
        $.magnificPopup.proto.open.call(this, data);
        story_bar.function.createStory(".mfp-content", function() {});
      };
    }
  },
  div: function() {
    return (
      '<div class="story-bar" style="">' +
      this.function.createStoryUser(
        "https://www.youtube.com/watch?v=bgOHPcraP8U",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/9332/thedogindie.jpg",
        "昆凌",
        "zh"
      ) +
      this.function.createStoryUser(
        "https://www.youtube.com/watch?v=ush6xLxXvrs",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/9332/thedogindie.jpg",
        "Hannah",
        "en"
      ) +
      this.function.createStoryUser(
        "https://www.youtube.com/watch?v=JVxd7fysaQo",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/9332/thedogindie.jpg",
        "胡楓",
        "zh"
      ) +
      this.function.createStoryUser(
        "https://www.youtube.com/watch?v=tkzbnJmN828",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/9332/thedogindie.jpg",
        "周杰倫",
        "zh"
      ) +
      this.function.createStoryUser(
        "https://www.youtube.com/watch?v=OpQ9uDMEPwQ",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/9332/thedogindie.jpg",
        "Jay Chou",
        "en"
      ) +
      "</div>"
    );
  },

  init: function() {}
};
