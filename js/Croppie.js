var $Croppie = {
    Element: {
        init: function () {
            //            this.divCroppie = $('div.s2-main div.finBox div.img');
            this.divCroppie = $('div.s2-main div.finBox');

        }
    },
    Setting: {
        Croppie: {
            width: null,
            height: null,
        },
        init: function () {

            this.Croppie = {
                //一樣寬高
                width: $Croppie.Element.divCroppie.width(),
                height: $Croppie.Element.divCroppie.width(),
            }
        }
    },
    Var: {
        //croppie用的
        Croppie: null,

        //上傳圖片
        $upload_img_ori: null,
        $upload_img_url: null,

        //預覽和結果的遮罩連結
        $mask_url_forPreview: './asset/svg/fin-gn.svg',
        $mask_base64_forPreview: './asset/svg/fin-gn.svg',
        $mask_url_forResult: './asset/svg/fin-w-comp.svg',
        $mask_base64_forResult: './asset/svg/fin-w-comp.svg',
    },
    Function: {
        frameCreate_Preview: function (str, callback) {
            var img = document.createElement('img');
            img.setAttribute('crossOrigin', 'anonymous');
            img.onload = function () {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext("2d");
                canvas.width = 350;
                canvas.height = 350;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                ctx.save();
                ctx.textBaseline = "middle";
                ctx.textAlign = "left";
                ctx.fillStyle = '#363636';
                ctx.font = "bold +" + 36 + "px" + "'Noto Sans TC'";
                ctx.fillText(str, 160, 330, 280);

                var res = canvas.toDataURL()
                $Croppie.Var.$mask_base64_forPreview = res;
                callback(res)

            };
            img.src = $Croppie.Var.$mask_url_forPreview;
        },
        frameCreate_Result: function (str, callback) {
            var img = document.createElement('img');
            img.setAttribute('crossOrigin', 'anonymous');
            img.onload = function () {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext("2d");
                canvas.width = 350;
                canvas.height = 350;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                ctx.save();
                ctx.textBaseline = "middle";
                ctx.textAlign = "left";
                ctx.fillStyle = '#fff';
                ctx.font = "bold +" + 36 + "px" + "'Noto Sans TC'";
                ctx.fillText(str, 160, 330, 280);

                var res = canvas.toDataURL()
                $Croppie.Var.$mask_base64_forResult = res;
                callback(res)

            };
            img.src = $Croppie.Var.$mask_url_forResult;
        },
        frameCover: function (logo, frame, callback) {

            var layerOne = document.createElement('img');
            layerOne.crossOrigin = "Anonymous";
            layerOne.onload = function () {
                var layerTwo = document.createElement('img');
                var c = document.createElement('canvas');
                var ctx = c.getContext("2d");
                layerTwo.onload = function () {

                    c.width = layerTwo.width;
                    c.height = layerTwo.height;

                    ctx.drawImage(layerOne, 0, 0, c.width, c.height);
                    ctx.drawImage(layerTwo, 0, 0);
                    

                    callback(c.toDataURL());

                };
                layerTwo.src = logo;
            }
            layerOne.src = frame;

        }
    },
    listener: {

        init: function () {


        }
    },
    Create: function () {

        if (!this.Var.Croppie) {
            this.Setting.Croppie.width = this.Element.divCroppie.width();
            this.Setting.Croppie.height = this.Element.divCroppie.height();
        }
        //console.log(this.Setting.Croppie.width, this.Setting.Croppie.height)
        $Croppie.Element.divCroppie.html('')
        this.Var.Croppie = this.Element.divCroppie.croppie({
            enableExif: true,
            viewport: {
                width: this.Setting.Croppie.width,
                height: this.Setting.Croppie.height
            },

            boundary: {
                width: this.Setting.Croppie.width,
                height: this.Setting.Croppie.height
            },
            showZoomer: false,
            //mouseWheelZoom: false,
        });

    },
    Bind: function () {
        $Croppie.Var.Croppie.croppie('bind', {
            url: this.Var.$upload_img_url,
        }).
        then(function () {
            $('.cr-boundary').css("background-image", "url(" + $Croppie.Var.$mask_url_forPreview + ")");
            $('.cr-boundary').css("background-size", "calc(100%)");

        });
    },


    init: function () {
        this.Element.init();
        this.listener.init();
        this.Setting.init();
        //        this.InitCroppie();

    }
}



$(function () {
   // $Croppie.init()
})
