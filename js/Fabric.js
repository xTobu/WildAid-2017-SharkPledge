var canvas;
var $Fabric = {
  Element: {
    init: function() {
      //            this.divCroppie = $('div.s2-main div.finBox div.img');
      this.finBox = $("div.s2-main canvas#finBox");
    }
  },
  Temp: {
    FabricWidth: null,
    FabricHeight: null,
    ScaleStep: 0.02,
    ScaleNow: 3,
    PreviewDataURL: null,
    ori_logo:null,
  },

  Var: {
    init: function() {
      this.finBox = new fabric.Canvas("finBox");
      $canvas = this.finBox;
      $canvas.on({
        "mouse:down": function(e) {
          if (e.target) {
            e.target.opacity = 0.5;
            $canvas.renderAll();
          }
        },
        "mouse:up": function(e) {
          if (e.target) {
            e.target.opacity = 1;
            $canvas.renderAll();
          }
        },
        "object:moved": function(e) {
          e.target.opacity = 0.5;
        },
        "object:modified": function(e) {
          e.target.opacity = 1;
        },

        //限制移動邊界
        "object:moving": function(e) {
          var obj = e.target;
          // if object is too big ignore
          if (
            obj.currentHeight > obj.canvas.height ||
            obj.currentWidth > obj.canvas.width
          ) {
            return;
          }
          obj.setCoords();
          // top-left  corner
          if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
            obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top);
            obj.left = Math.max(
              obj.left,
              obj.left - obj.getBoundingRect().left
            );
          }
          // bot-right corner
          if (
            obj.getBoundingRect().top + obj.getBoundingRect().height >
              obj.canvas.height ||
            obj.getBoundingRect().left + obj.getBoundingRect().width >
              obj.canvas.width
          ) {
            obj.top = Math.min(
              obj.top,
              obj.canvas.height -
                obj.getBoundingRect().height +
                obj.top -
                obj.getBoundingRect().top
            );
            obj.left = Math.min(
              obj.left,
              obj.canvas.width -
                obj.getBoundingRect().width +
                obj.left -
                obj.getBoundingRect().left
            );
          }
        }
      });
    }
  },
  Function: {
    Create: function(str, callback) {
      //this.divCroppie = $('div.s2-main div.finBox div.img');

      //            $Fabric.Var.finBox.clear();
      var w = $("div.s2-main div.finBox").width();
      var h = $("div.s2-main div.finBox").height();

      if (device.mobile() && !$Fabric.Temp.FabricWidth) {
        $Fabric.Temp.FabricWidth = w;
        $Fabric.Temp.FabricHeight = h;
      }
      // console.log($('div.s2-main div.finBox').width(), $('div.s2-main div.finBox').height())

      $Fabric.Var.finBox.setHeight(w);
      $Fabric.Var.finBox.setWidth(h);

      if ($Fabric.Temp.FabricWidth) {
        $Fabric.Var.finBox.setHeight($Fabric.Temp.FabricWidth);
        $Fabric.Var.finBox.setWidth($Fabric.Temp.FabricHeight);
      }
      //            console.log("w:"+w,"h:"+h)
      //            console.log("fw:"+$Fabric.Temp.FabricWidth,"fh:"+$Fabric.Temp.FabricHeight)

      //

      $Fabric.Var.finBox.renderAll.bind();

      //            console.log($canvas.getWidth(), $canvas.getHeight())

      fabric.Image.fromURL("./asset/svg/fin-gn.svg", function(img) {
        var $canvas = $Fabric.Var.finBox;
        var scaleWidth = $canvas.getWidth() / img.width;
        var scaleHeight = $canvas.getHeight() / img.height;
        img.set({
          scaleX: scaleWidth,
          scaleY: scaleHeight,
          originX: "left",
          originY: "top"
        });

        var text = new fabric.Text(str, {
          fontFamily: "Noto Sans TC",
          left: 0, //Take the block's position
          top: 0,
          //                  fill: '#363636',
          fill: "#231815",
          fontSize: $canvas.getWidth() / 18,
          fontWeight: "400",
          //不可選擇
          selectable: false,
          //不可選擇移動
          evented: false
        });
        //                text.set("top", ($canvas.getHeight() - text.height) * 1.01);
        //                text.set("left", ($canvas.getWidth() / 2));
        text.set("top", ($canvas.getHeight() - text.height) * 0.98);
        text.set("left", $canvas.getWidth() / 4.2 - text.width / 4);
        //                text.set("left", (($canvas.getWidth() * 1.4) - text.width) / 2);
        if ($canvas.item(0)) $canvas.remove($canvas.item(0));
        $canvas.add(text);
        $canvas.setBackgroundImage(img, $canvas.renderAll.bind($canvas));

        $("div.s2-main div.finBox").hide(0, function() {
          $("div#divFabric").fadeIn("slow", function() {              
            callback(true);
          });
        });
      });

      //1.7板可直接用SVG當背景
    },

    UploadImage: function(data, callback) {
      var $canvas = $Fabric.Var.finBox;
      fabric.Image.fromURL(data, function(img) {
        var scaleWidth = $canvas.getWidth() / img.width;
        var scaleHeight = $canvas.getHeight() / img.height;
        var scale = Math.min(scaleWidth, scaleHeight) / 2.5;
        // console.log('scale:',scale)
        $Fabric.Temp.ScaleStep = scale / 13;
        var left = $canvas.getWidth() / 4;
        var top = $canvas.getHeight() / 5;
        var oImg = img
          .set({
            left: left,
            top: top,
            angle: 0,
            hasControls: false,
            hasBorders: false
            //width: img.width,
            //height: img.height
          })
          .scale(scale);
        if ($canvas.item(1)) $canvas.remove($canvas.item(1));
        $canvas.add(oImg).renderAll();
        $Fabric.Temp.ori_logo = data;
        //                console.log($canvas.getWidth(), $canvas.getHeight())
        callback();
      });
    },
    GetDataURL_Preview: function(callback) {
      $Fabric.Temp.PreviewDataURL = $Fabric.Var.finBox.toDataURL({
        format: "png"
      });
      callback($Fabric.Temp.PreviewDataURL);
    },
    GetDataURL_Result: function(str, callback) {
      fabric.Image.fromURL("./asset/svg/fin-w-comp.svg", function(img) {
        var $canvas = $Fabric.Var.finBox;
        var scaleWidth = $canvas.getWidth() / img.width;
        var scaleHeight = $canvas.getHeight() / img.height;
        img.set({
          scaleX: scaleWidth,
          scaleY: scaleHeight,
          originX: "left",
          originY: "top"
        });

        var text = new fabric.Text(str, {
          fontFamily: "Noto Sans TC",
          left: 0, //Take the block's position
          top: 0,
          fill: "#fff",
          fontSize: $canvas.getWidth() / 18,
          fontWeight: "400",
          //不可選擇
          selectable: false,
          //不可選擇移動
          evented: false
        });
        //                text.set("top", ($canvas.getHeight() - text.height) * 1.01);
        //                text.set("left", ($canvas.getWidth() / 2));

        text.set("top", ($canvas.getHeight() - text.height) * 0.98);
        text.set("left", $canvas.getWidth() / 4.2 - text.width / 4);
        $canvas.remove($canvas.item(0));
        $canvas.add(text);
        $canvas.setBackgroundImage(img, $canvas.renderAll.bind($canvas));
        //                console.log($Fabric.Var.finBox.getWidth(), $Fabric.Var.finBox.getHeight())

        var dataURL;
        if (device.mobile()) {
          dataURL = $Fabric.Var.finBox.toDataURL({
            format: "png"
          });
        } else {
          dataURL = $Fabric.Var.finBox.toDataURL({
            format: "png",
            multiplier: 2
          });
        }
        //                console.log(dataURL)
        callback(dataURL);

        //                $('div.s2-main div.finBox').hide(0, function () {
        //                    $('div#divFabric').fadeIn('slow', function () {
        //                        callback(true);
        //                    })
        //                })
      });
    }
  },
  init: function() {
    this.Element.init();
    this.Var.init();

    //        this.listener.init();
    //        this.Setting.init();
    //        this.InitCroppie();
  }
};

$(function() {
  //$Fabric.init();
});
