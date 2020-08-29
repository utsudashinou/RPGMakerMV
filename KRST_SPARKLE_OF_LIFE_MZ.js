//=============================================================================
// KRST_SPARKLE_OF_LIFE.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020 Velfare Nagata
// This plugin is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
// 1.0.1 2020/08/29 add line width margin to sprite
// 1.0.0 2020/08/26 first edition
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/velfare_nagata/
//=============================================================================
//
// * Contributors
//   Utsuda Shinou
//     [GitHub] : https://github.com/utsudashinou
//     [Twitter]: https://twitter.com/virtualUtsuda

/*:ja
 * @plugindesc いのちの輝きをゲームに与えます。
 *
 * @help プラグインコマンドを用いていのちの輝きをゲームに与えます。
 * プラグインパラメータでいのちの輝きを設定します。
 *
 * 1. いのちの輝きの体を配置する場合
 * KRST_SHOW_BODY {0} {1} {2} {3}
 *   {0}：X座標
 *   {1}：Y座標
 *   {2}：横幅
 *   {3}：縦幅
 *
 * 2. いのちの輝きの目玉を配置する場合
 * KRST_SHOW_EYE {0} {1} {2} {3}
 *   {0}：X座標
 *   {1}：Y座標
 *   {2}：横幅
 *   {3}：縦幅
 *
 * 3. いのちの輝きを消す場合
 * KRST_HIDE
 *
 * @author ベルファーレ長田（゜∀゜）◆AHYA/lPiZ.?, Utsuda Shinou
 *
 * @param bodyColor
 * @desc いのちの輝きの体部分の色を指定します。
 * @type struct<tone>
 * @default {"R":"255","G":"0","B":"0"}
 *
 * @param whiteEyeColor
 * @desc いのちの輝きの白目部分の色を指定します。
 * @type struct<tone>
 * @default {"R":"255","G":"255","B":"255"}
 *
 * @param blackEyeColor
 * @desc いのちの輝きの黒目部分の色を指定します。
 * @type struct<tone>
 * @default {"R":"2","G":"104","B":"178"}
 *
 * @param blinkConfig
 * @desc まばたきの設定を指定します。
 * @type struct<workConfig>
 * @default {"probability":"0.10000","frame":"15"}
 *
 * @param gazeConfig
 * @desc 視線移動の設定を指定します。
 * @type struct<workConfig>
 * @default {"probability":"1.00000","frame":"30"}
 *
 */
/*~struct~tone:ja
 *
 * @param R
 * @desc 色調(R)を指定します。
 * @type number
 * @max 255
 * @min -255
 * @decimals 0
 * @default 0
 *
 * @param G
 * @desc 色調(G)を指定します。
 * @type number
 * @max 255
 * @min -255
 * @decimals 0
 * @default 0
 *
 * @param B
 * @desc 色調(B)を指定します。
 * @type number
 * @max 255
 * @min -255
 * @decimals 0
 * @default 0
 *
 */
/*~struct~workConfig:ja
 *
 * @param probability
 * @desc 実行確率を指定します。
 * @type number
 * @max 100
 * @min 0
 * @decimals 5
 * @default 0
 *
 * @param frame
 * @desc 実行完了フレーム数を指定します。
 * @type number
 * @max 999
 * @min 1
 * @decimals 0
 * @default 1
 *
 */
/*:
 * @plugindesc Give your game sparkle of life.
 *
 * @help Give your game sparkle of life using plugin commands.
 * change settings sparkle of life using plugin parameters.
 *
 * 1. In the case of put body of sparkle of life.
 * KRST_SHOW_BODY {0} {1} {2} {3}
 *   {0}: X coordinate
 *   {1}: Y coordinate
 *   {2}: Width
 *   {3}: Height
 *
 * 2. In the case of put eye of sparkle of life.
 * KRST_SHOW_EYE {0} {1} {2} {3}
 *   {0}: X coordinate
 *   {1}: Y coordinate
 *   {2}: Width
 *   {3}: Height
 *
 * 3. In the case of hide sparkle of life.
 * KRST_HIDE
 *
 * @author Velfare Nagata, Utsuda Shinou
 *
 * @param bodyColor
 * @desc Specifies the color of body of sparkle of life.
 * @type struct<tone>
 * @default {"R":"255","G":"0","B":"0"}
 *
 * @param whiteEyeColor
 * @desc Specifies the color of white eye of sparkle of life.
 * @type struct<tone>
 * @default {"R":"255","G":"255","B":"255"}
 *
 * @param blackEyeColor
 * @desc Specifies the color of black eye of sparkle of life.
 * @type struct<tone>
 * @default {"R":"2","G":"104","B":"178"}
 *
 * @param blinkConfig
 * @desc Specifies the config of blink.
 * @type struct<workConfig>
 * @default {"probability":"0.10000","frame":"15"}
 *
 * @param gazeConfig
 * @desc Specifies the config of gaze.
 * @type struct<workConfig>
 * @default {"probability":"1.00000","frame":"30"}
 *
 */
/*~struct~tone:
 *
 * @param R
 * @desc Specifies the R of color tone.
 * @type number
 * @max 255
 * @min -255
 * @decimals 0
 * @default 0
 *
 * @param G
 * @desc Specifies the G of color tone.
 * @type number
 * @max 255
 * @min -255
 * @decimals 0
 * @default 0
 *
 * @param B
 * @desc Specifies the B of color tone.
 * @type number
 * @max 255
 * @min -255
 * @decimals 0
 * @default 0
 *
 */
/*~struct~workConfig:
 *
 * @param probability
 * @desc Specifies the probability of execution per frame.
 * @type number
 * @max 100
 * @min 0
 * @decimals 5
 * @default 0
 *
 * @param frame
 * @desc Specifies the number of frames to complete execution.
 * @type number
 * @max 999
 * @min 1
 * @decimals 0
 * @default 1
 *
 */

(function () {
  "use strict";
  var pluginName = "KRST_SPARKLE_OF_LIFE";

  // Thanks：トリアコンタン殿
  var getArgString = function (arg) {
    return convertEscapeCharacters(arg);
  };
  // Thanks：トリアコンタン殿
  var getArgNumber = function (arg, min, max) {
    min = arguments.length < 2 ? -Infinity : min;
    max = arguments.length < 3 ? -Infinity : max;

    return (parseInt(convertEscapeCharacters(arg), 10) || 0).clamp(min, max);
  };
  // Thanks：トリアコンタン殿
  var convertEscapeCharacters = function (text) {
    text = text == null ? "" : text;
    var window = SceneManager._scene._windowLayer.children[0];
    return window ? window.convertEscapeCharacters(text) : text;
  };
  // Thanks：フトコロ殿
  let paramParse = function (obj) {
    return JSON.parse(JSON.stringify(obj, paramReplace));
  };
  // Thanks：フトコロ殿
  let paramReplace = function (key, value) {
    try {
      return JSON.parse(value || null);
    } catch (e) {
      return value;
    }
  };
  // Thanks：フトコロ殿
  var getParam = function (paramNames) {
    for (var i = 0; i < paramNames.length; i++) {
      var name = PluginManager.parameters(pluginName)[paramNames[i]];
      if (name) {
        return name;
      }
    }
    return null;
  };

  // --------------------------------------------------
  // プラグインコマンド追加
  // --------------------------------------------------
  let _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.apply(this, arguments);
    let commandName = command.toUpperCase();

    switch (commandName) {
      case "KRST_SHOW_BODY":
        var x = args.length >= 1 ? getArgNumber(args[0], -9999, 9999) : 0;
        var y = args.length >= 2 ? getArgNumber(args[1], -9999, 9999) : 0;
        var w = args.length >= 3 ? getArgNumber(args[2], -9999, 9999) : 0;
        var h = args.length >= 4 ? getArgNumber(args[3], -9999, 9999) : 0;
        $gameTemp._lifeContainer.addChild(new Sprite_Body(x, y, w, h));
        break;
      case "KRST_SHOW_EYE":
        var x = args.length >= 1 ? getArgNumber(args[0], -9999, 9999) : 0;
        var y = args.length >= 2 ? getArgNumber(args[1], -9999, 9999) : 0;
        var w = args.length >= 3 ? getArgNumber(args[2], -9999, 9999) : 0;
        var h = args.length >= 4 ? getArgNumber(args[3], -9999, 9999) : 0;
        $gameTemp._lifeContainer.addChild(new Sprite_Eye(x, y, w, h));
        break;
      case "KRST_HIDE":
        while ($gameTemp._lifeContainer.children.length > 0) {
          $gameTemp._lifeContainer.removeChildAt(0);
        }
        break;
    }
  };

  class Sprite_Sparkle_Of_Life extends Sprite {
    constructor(x, y, w, h) {
      super();
      this._x = x;
      this._y = y;
      this._width = w;
      this._height = h;
      this._isDrew = true;
      this.anchor.x = 0.5;
      this.anchor.y = 0.5;
    }

    update() {
      if (this._isDrew) {
        this.draw();
        this._isDrew = false;
      }
      super.update();
    }

    draw() {
      throw Error("未実装です。");
    }

    drawTo(ctx) {
      throw Error("未実装です。");
    }
  }

  class Sprite_Body extends Sprite_Sparkle_Of_Life {
    constructor(x, y, w, h) {
      super(x, y, w, h);
      this.x = x;
      this.y = y;
      this.bitmap = new Bitmap(w, h);

      let parameters = PluginManager.parameters(pluginName);
      let color = paramParse(parameters["bodyColor"]);
      this.color = `rgb(${color.R}, ${color.G}, ${color.B})`;
    }

    draw() {
      this.bitmap.clear();
      let bmp = this.bitmap;
      let ctx = bmp.context;
      ctx.globalCompositeOperation = "source-over";
      this.drawTo(ctx);
    }

    drawTo(ctx) {
      const bmp = this.bitmap;
      const lineWidth = 2;
      const halfWidth = bmp.width / 2;
      const halfHeight = bmp.height / 2;
      const radiusX = halfWidth > lineWidth ? halfWidth - lineWidth : 0;
      const radiusY = halfHeight > lineWidth ? halfHeight - lineWidth : 0;
      const radianStart = 0 * (Math.PI / 180);
      const radianEnd = 360 * (Math.PI / 180);
      ctx.beginPath();
      ctx.ellipse(halfWidth, halfHeight, radiusX, radiusY, 0, radianStart, radianEnd);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.lineWidth = lineWidth;
      ctx.globalCompositeOperation = "source-over";
      ctx.stroke();
    }
  }

  class Sprite_Eye extends Sprite_Sparkle_Of_Life {
    constructor(x, y, w, h) {
      super(x, y, w, h);
      this.x = x;
      this.y = y;
      this.bitmap = new Bitmap(w, h);
      this.setupWhiteEye();
      this.setupBlackEye();
      this.setupEyelids();

      let parameters = PluginManager.parameters(pluginName);

      let blinkConfig = paramParse(parameters["blinkConfig"]);
      this._blinker = new EyeBlinker(this._drawerEyelids, blinkConfig.probability, blinkConfig.frame);
      this._blinker.addEventListener(() => {
        this._isDrew = true;
      });

      let gazeConfig = paramParse(parameters["gazeConfig"]);
      this._gazer = new EyeGazer(this._drawerWhiteEye, this._drawerBlackEye, gazeConfig.probability, gazeConfig.frame);
      this._gazer.addEventListener(() => {
        this._isDrew = true;
      });

      let color = paramParse(parameters["bodyColor"]);
      this.color = `rgb(${color.R}, ${color.G}, ${color.B})`;
    }

    update() {
      super.update();
      this._blinker.update();
      this._gazer.update();
    }

    setupWhiteEye() {
      let parent = this;
      let w = Math.floor(parent.width * 0.5);
      let h = Math.floor(parent.height * 0.5);
      let paddingW = Math.floor(parent.width * 0.4);
      let paddingH = Math.floor(parent.height * 0.4);
      let x = new Range(paddingW, parent.width - paddingW).random();
      let y = new Range(paddingW, parent.height - paddingH).random();
      this._drawerWhiteEye = new Drawer_White_Eye(x, y, w, h);
    }

    setupBlackEye() {
      let parent = this._drawerWhiteEye;
      let w = Math.floor(parent.width * 0.5);
      let h = Math.floor(parent.height * 0.5);
      let paddingW = Math.floor(parent.width * 0.4);
      let paddingH = Math.floor(parent.height * 0.4);
      let x = new Range(parent.x + paddingW, parent.width - paddingW).random();
      let y = new Range(parent.y + paddingH, parent.height - paddingH).random();
      this._drawerBlackEye = new Drawer_Black_Eye(x, y, w, h);
    }

    setupEyelids() {
      let parent = this._drawerWhiteEye;
      let w = parent.width;
      let h = parent.height;
      let x = parent.x;
      let y = parent.y;
      this._drawerEyelids = new Drawer_Eyelids(x, y, w, h);
    }

    draw() {
      this.bitmap.clear();
      let bmp = this.bitmap;
      let ctx = bmp.context;
      ctx.globalCompositeOperation = "source-over";
      this._drawerBlackEye.drawTo(ctx);
      ctx.globalCompositeOperation = "destination-atop";
      this._drawerWhiteEye.drawTo(ctx);
      ctx.globalCompositeOperation = "source-atop";
      this._drawerEyelids.drawTo(ctx);
      ctx.globalCompositeOperation = "destination-atop";
      this.drawTo(ctx);
    }

    drawTo(ctx) {
      const bmp = this.bitmap;
      const lineWidth = 2;
      const halfWidth = bmp.width / 2;
      const halfHeight = bmp.height / 2;
      const radiusX = halfWidth > lineWidth ? halfWidth - lineWidth : 0;
      const radiusY = halfHeight > lineWidth ? halfHeight - lineWidth : 0;
      const radianStart = 0 * (Math.PI / 180);
      const radianEnd = 360 * (Math.PI / 180);
      ctx.beginPath();
      ctx.ellipse(halfWidth, halfHeight, radiusX, radiusY, 0, radianStart, radianEnd);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.lineWidth = lineWidth;
      ctx.globalCompositeOperation = "source-over";
      ctx.stroke();
    }
  }

  class Drawer {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.width = w;
      this.height = h;
    }
  }

  class Drawer_White_Eye extends Drawer {
    constructor(x, y, w, h) {
      super(x, y, w, h);

      let parameters = PluginManager.parameters(pluginName);
      let color = paramParse(parameters["whiteEyeColor"]);
      this.color = `rgb(${color.R}, ${color.G}, ${color.B})`;
    }

    drawTo(ctx) {
      let w = this.width / 2;
      let h = this.height / 2;
      const radianStart = 0 * (Math.PI / 180);
      const radianEnd = 360 * (Math.PI / 180);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.ellipse(this.x, this.y, w, h, 0, radianStart, radianEnd);
      ctx.fill();
      ctx.closePath();
    }
  }

  class Drawer_Black_Eye extends Drawer {
    constructor(x, y, w, h) {
      super(x, y, w, h);

      let parameters = PluginManager.parameters(pluginName);
      let color = paramParse(parameters["blackEyeColor"]);
      this.color = `rgb(${color.R}, ${color.G}, ${color.B})`;
    }

    drawTo(ctx) {
      let w = this.width / 2;
      let h = this.height / 2;
      const radianStart = 0 * (Math.PI / 180);
      const radianEnd = 360 * (Math.PI / 180);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.ellipse(this.x, this.y, w, h, 0, radianStart, radianEnd);
      ctx.fill();
      ctx.closePath();
    }
  }

  class Drawer_Eyelids extends Drawer {
    constructor(x, y, w, h) {
      super(x, y - h * 2, w, h);
      this.closeRate = 0;

      let parameters = PluginManager.parameters(pluginName);
      let color = paramParse(parameters["bodyColor"]);
      this.color = `rgb(${color.R}, ${color.G}, ${color.B})`;
    }

    drawTo(ctx) {
      const radianStart = 0 * (Math.PI / 180);
      const radianEnd = 360 * (Math.PI / 180);
      let x = this.x;
      let y = this.y + this.height * 2 * this.closeRate;
      let w = this.width * 1.5;
      let h = this.height;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.ellipse(x, y, w, h, 0, radianStart, radianEnd);
      ctx.fill();
      ctx.closePath();
    }
  }

  class Animator {
    constructor(probability, frame) {
      this.isAnimating = false;
      this.probability = probability;
      this.frame = frame;
      this.nowFrame = 0;
      this.listeners = [];
    }

    update() {
      if (!this.isAnimating) {
        this.isAnimating = this.diceStartAnimation();
      }
      if (this.isAnimating) {
        this.animation();
        this.onAnimated();
        this.updateFrame();
      }
    }

    diceStartAnimation() {
      const decimals = 10000;
      let probability = Math.floor(this.probability * decimals);
      let dice = Math.floor(Math.random() * 100 * decimals);
      return probability >= dice;
    }

    animation() {
      throw Error("未実装です。");
    }

    onAnimated() {
      for (let i = 0; i < this.listeners.length; i++) {
        this.listeners[i]();
      }
    }

    updateFrame() {
      this.nowFrame++;
      if (this.nowFrame > this.frame) {
        this.nowFrame = 0;
        this.isAnimating = false;
      }
    }

    addEventListener(listener) {
      this.listeners.push(listener);
    }
  }

  class EyeBlinker extends Animator {
    constructor(eyelids, probability, frame) {
      super(probability, frame);
      this.eyelids = eyelids;
    }

    animation() {
      let halfFrame = Math.floor(this.frame / 2);
      this.eyelids.closeRate = 1 - Math.abs(this.nowFrame - halfFrame) / halfFrame;
    }
  }

  class EyeGazer extends Animator {
    constructor(whiteEye, blackEye, probability, frame) {
      super(probability, frame);
      this.whiteEye = whiteEye;
      this.blackEye = blackEye;
      this.fromX = this.blackEye.x;
      this.fromY = this.blackEye.y;
      this.toX = this.blackEye.x;
      this.toY = this.blackEye.y;
    }

    animation() {
      if (this.nowFrame === 0) {
        this.fromX = this.toX;
        this.fromY = this.toY;

        let parent = this.whiteEye;
        let paddingW = Math.floor(parent.width * 0.4);
        let paddingH = Math.floor(parent.height * 0.4);
        this.toX = new Range(parent.x + paddingW, parent.width - paddingW).random();
        this.toY = new Range(parent.y + paddingH, parent.height - paddingH).random();
      }
      let rate = 1 * (this.nowFrame / this.frame);
      this.blackEye.x = this.fromX + (this.toX - this.fromX) * rate;
      this.blackEye.y = this.fromY + (this.toY - this.fromY) * rate;
    }
  }

  class Range {
    constructor(min = 0, max = 0) {
      this.min = min;
      this.max = max;
    }

    random() {
      return Math.floor(Math.random() * (this.max - this.min) + this.min);
    }
  }

  // ---
  // 【Override】
  // $gameTempにいのちの輝きを配置するコンテナスプライトを生成します。
  // ---
  let _Game_Temp_initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function () {
    _Game_Temp_initialize.apply(this, arguments);
    this._lifeContainer = new Sprite();
    this._lifeContainer.setFrame(0, 0, Graphics.width, Graphics.height);
  };

  // ---
  // 【Override】
  // いのちの輝きを配置するコンテナスプライトをシーンに登録します。
  // ---
  var _Spriteset_Base_createUpperLayer = Spriteset_Base.prototype.createUpperLayer;
  Spriteset_Base.prototype.createUpperLayer = function () {
    _Spriteset_Base_createUpperLayer.apply(this, arguments);
    if ($gameTemp._lifeContainer) {
      this.addChild($gameTemp._lifeContainer);
    }
  };
})();
