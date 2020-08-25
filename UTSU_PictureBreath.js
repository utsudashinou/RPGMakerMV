//=============================================================================
// UTSU_PictureBreath.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020 Utsuda Shinou
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.1.1 2020/08/25 Fix bug about init params
// 1.1.0 2020/08/23 Fix plugin does not work in a battle
//                  Fix help about parameters, speed -> period
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
 * UTSU.PictureBreath.on(pictureIds, period);
 *   息遣いをする。pictureIdsは対象のピクチャIDの配列、periodは息遣いの周期。
 *   例: UTSU.PictureBreath.on([1,2,3]), 150);
 *
 * UTSU.PictureBreath.off(pictureIds);
 *   息遣いをやめる。
 *   例: UTSU.PictureBreath.off([1,2,3]);
 *
 *
 * * プラグインコマンド
 * UTSU_PictureBreathOn pictureId0, ...pictureIdN, period
 *   息遣いをする。pictureId*は対象のピクチャID、periodは息遣いの周期。
 *   例: UTSU_PictureBreathOn 1 2 3 4 5 150
 *
 * UTSU_PictureBreathOff pictureId0, ...pictureIdN
 *   息遣いをやめる。
 *   例: UTSU_PictureBreathOff 1 2 3 4 5
 *
 */

((global) => {
  global.UTSU = global.UTSU || {};
  global.UTSU.PictureBreath = global.UTSU.PictureBreath || {};

  const STATE_NO_OPERATION = -1;
  const STATE_REQUEST_DEACTIVATE = 0;
  const STATE_REQUEST_ACTIVATE = 1;
  global.UTSU.PictureBreath.on = (pids, period) => {
    pids.forEach((pid) => {
      const picture = $gameScreen.picture(Number(pid));
      if (picture) {
        picture._breathState = STATE_REQUEST_ACTIVATE;
        picture._breathPeriod = Number(period);
      }
    });
  };

  global.UTSU.PictureBreath.off = (pids) => {
    pids.forEach((pid) => {
      const picture = $gameScreen.picture(Number(pid));
      if (picture) {
        picture._breathState = STATE_REQUEST_DEACTIVATE;
      }
    });
  };

  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === "UTSU_PictureBreathOn") {
      const period = args.pop();
      UTSU.PictureBreath.on(args, period);
    }
    if (command === "UTSU_PictureBreathOff") {
      UTSU.PictureBreath.off(args);
    }
  };

  const _Game_Picture_initBasic = Game_Picture.prototype.initBasic;
  Game_Picture.prototype.initBasic = function () {
    _Game_Picture_initBasic.call(this);
    this._breathState = STATE_NO_OPERATION;
    this._breathPeriod = 0;
    this._breathCount = 0;
    this._breathActive = false;
  };

  const _Sprite_Picture_update = Sprite_Picture.prototype.update;
  Sprite_Picture.prototype.update = function () {
    _Sprite_Picture_update.call(this);
    if (this.visible) {
      this._breathUpdate();
    }
  };

  Sprite_Picture.prototype._breathUpdate = function () {
    const picture = this.picture();
    if (!picture) {
      return;
    }
    if (picture._breathState === STATE_REQUEST_ACTIVATE) {
      picture._breathCount = 0;
      picture._breathState = STATE_NO_OPERATION;
      picture._breathActive = true;
    }
    if (picture._breathState === STATE_REQUEST_DEACTIVATE) {
      picture._breathState = STATE_NO_OPERATION;
      picture._breathActive = false;
    }
    if (picture._breathActive) {
      picture._breathCount = (picture._breathCount + 1) % picture._breathPeriod;
      const freq = Math.sin((Math.PI * picture._breathCount) / (picture._breathPeriod / 2));
      this.scale.y -= freq * 0.015 + 0.015;
      this.y -= Math.ceil((this.height * (1.0 - this.scale.y)) / 2);
      this.scale.x += freq * 0.005 + 0.005;
      this.x += Math.ceil(this.width * (1.0 - this.scale.x));
    }
  };
})(window);
