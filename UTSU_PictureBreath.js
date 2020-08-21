//=============================================================================
// UTSU_PictureBreath.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020 Utsuda Shinou
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2020/08/21 Release
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/utsudashinou
// [Twitter]: https://twitter.com/virtualUtsuda
//=============================================================================

/*:
 * @plugindesc ピクチャ息遣い
 * @author Utsuda Shinou
 *
 * @help ピクチャに息遣いの動作を加えます。
 *
 * * スクリプト
 * UTSU.PictureBreath.on(pictureIds, speed);
 *   息遣いをする。pictureIdsは対象のピクチャIDの配列、speedは息遣いの速さ。
 *   speedは小さいほど遅い。
 *   例: UTSU.PictureBreath.on([1,2,3]), 150);
 *
 * UTSU.PictureBreath.off(pictureIds);
 *   息遣いをやめる。
 *   例: UTSU.PictureBreath.off([1,2,3]);
 *
 *
 * * プラグインコマンド
 * UTSU_PictureBreathOn pictureId0, ...pictureIdN, speed
 *   息遣いをする。pictureId*は対象のピクチャID、speedは息遣いの速さ。
 *   speedは小さいほど遅い。
 *   例: UTSU_PictureBreathOn 1 2 3 4 5 150
 *
 * UTSU_PictureBreathOff pictureId0, ...pictureIdN
 *   息遣いをやめる。
 *   例: UTSU_PictureBreathOff 1 2 3 4 5
 *
 */

this.UTSU = this.UTSU || {};
this.UTSU.PictureBreath = this.UTSU.PictureBreath || {};

(function () {
  UTSU.PictureBreath.on = function (pids, speed) {
    for (let pid of pids) {
      const picture = $gameScreen.picture(pid);
      if (picture) {
        picture._breath = "on";
        picture._breathSpeed = Number(speed);
      }
    }
  };

  UTSU.PictureBreath.off = function (pids) {
    for (let pid of pids) {
      const picture = $gameScreen.picture(pid);
      if (picture) {
        picture._breath = "off";
      }
    }
  };

  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === "UTSU_PictureBreathOn") {
      const speed = args.pop();
      UTSU.PictureBreath.on(args, speed);
    }
    if (command === "UTSU_PictureBreathOff") {
      UTSU.PictureBreath.off(args);
    }
  };

  const _Game_Picture_initBasic = Game_Picture.prototype.initBasic;
  Game_Picture.prototype.initBasic = function () {
    _Game_Picture_initBasic.call(this);
    this._breath = null;
    this._breathSpeed = 0;
  };

  const _Sprite_Picture_initialize = Sprite_Picture.prototype.initialize;
  Sprite_Picture.prototype.initialize = function (pictureId) {
    _Sprite_Picture_initialize.call(this, pictureId);
    this._zoomMax = null;
    this._zoomCount = null;
    this._breath = false;
  };

  const _Sprite_Picture_update = Sprite_Picture.prototype.update;
  Sprite_Picture.prototype.update = function () {
    _Sprite_Picture_update.call(this);
    if (this.visible) {
      this._breathCheck();
      this._breathUpdate();
    }
  };

  Sprite_Picture.prototype._breathCheck = function () {
    const picture = this.picture();
    if (!picture) {
      return;
    }
    if (picture._breath === "on") {
      this._zoomMax = picture._breathSpeed;
      this._zoomCount = 0;
      picture._breath = null;
      this._breath = true;
    }
    if (picture._breath === "off") {
      picture._breath = null;
      this._breath = false;
    }
  };

  Sprite_Picture.prototype._breathUpdate = function () {
    if (this._breath) {
      this._zoomCount = (this._zoomCount + 1) % this._zoomMax;
      const freq = Math.sin((Math.PI * this._zoomCount) / (this._zoomMax / 2));
      this.scale.y -= freq * 0.015 + 0.015;
      this.y -= Math.ceil((this.height * (1.0 - this.scale.y)) / 2);
      this.scale.x += freq * 0.005 + 0.005;
      this.x += Math.ceil(this.width * (1.0 - this.scale.x));
    }
  };
})();
