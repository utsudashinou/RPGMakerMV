//=============================================================================
// UTSU_PauseSignEx.js
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
 * @plugindesc ポーズサイン拡張
 * @author Utsuda Shinou
 *
 * @help ポーズサインの表示を調節します。
 *
 * 「ポーズサイン」
 * ポーズサイン用のスプライトシート画像を img/system に配置してください。
 * そのスプライトシート画像の仕様は 横5枚、縦N枚 です。
 * 1スプライトは正方形であり、大きさは 画像の横のピクセル数 / 5 の数値を採用します。
 *
 * 「使用するスプライト数」
 * 指定すると使用するスプライト数を変更できます。
 * 0以下を指定するとスプライトシート全体（5*N枚）となります。
 * このオプションは使用したいスプライト数が5の倍数でないときに使用してください。
 *
 * 「フレームレート」
 * ポーズサインのフレームレートを変更します。単位はframes per secondです。
 * RPGツクールMVは基本60fpsです。元のポーズサインはその1/16なので、
 * 初期値は3.75fpsです。
 *
 * @param pauseSignImage
 * @text ポーズサイン
 * @desc ポーズサインのスプライトシート
 * 初期値: pauseSign
 * @type file
 * @dir img/system
 * @default pauseSign
 * @require 1
 *
 * @param pauseSignNum
 * @text 使用するスプライト数
 * @desc 使用するスプライト数（0以下の時は自動計算）
 * 初期値: 0
 * @type number
 * @default 0
 * @require 1
 *
 * @param pauseSignFrameRate
 * @text フレームレート
 * @desc フレームレート（単位はfps）
 * 初期値: 3.75
 * @type number
 * @decimals 2
 * @default 3.75
 * @require 1
 */

const parameters = PluginManager.parameters("UTSU_PauseSignEx");
const params = {};
params.pauseSignImage = parameters["pauseSignImage"] || "pauseSign";
params.pauseSignNum = Number(parameters["pauseSignNum"] || 0);
params.pauseSignFrameRate = Number(parameters["pauseSignFrameRate"] || 3.75);
params._pauseSignBitmap = null;
params._pauseSignSize = 24;
params._pauseSignSpriteCol = 5;

const _Window_Base_loadWindowskin = Window_Base.prototype.loadWindowskin;
Window_Message.prototype.loadWindowskin = function () {
  _Window_Base_loadWindowskin.call(this);
  params._pauseSignBitmap = ImageManager.loadSystem(params.pauseSignImage);
  params._pauseSignBitmap.addLoadListener((bitmap) => {
    // auto calculate params
    params._pauseSignSize = Math.floor(
      bitmap.width / params._pauseSignSpriteCol
    );
    if (params.pauseSignNum <= 0) {
      const pauseSignSpriteRow = Math.ceil(
        bitmap.height / params._pauseSignSize
      );
      params.pauseSignNum = pauseSignSpriteRow * params._pauseSignSpriteCol;
    }
  });
};

Window_Message.prototype._refreshPauseSign = function () {
  const sx = 0;
  const sy = 0;
  const p = params._pauseSignSize;
  this._windowPauseSignSprite.bitmap = params._pauseSignBitmap;
  this._windowPauseSignSprite.anchor.x = 0.5;
  this._windowPauseSignSprite.anchor.y = 1;
  this._windowPauseSignSprite.move(this._width / 2, this._height);
  this._windowPauseSignSprite.setFrame(sx, sy, p, p);
  this._windowPauseSignSprite.alpha = 0;
};

Window_Message.prototype._updatePauseSign = function () {
  const sprite = this._windowPauseSignSprite;
  const count = Math.floor(
    (this._animationCount * params.pauseSignFrameRate) / 60
  );
  const x = (count % params.pauseSignNum) % params._pauseSignSpriteCol;
  const y = Math.floor(
    (count % params.pauseSignNum) / params._pauseSignSpriteCol
  );
  const sx = 0;
  const sy = 0;
  const p = params._pauseSignSize;
  if (!this.pause) {
    sprite.alpha = 0;
  } else if (sprite.alpha < 1) {
    sprite.alpha = Math.min(sprite.alpha + 0.1, 1);
  }
  sprite.setFrame(sx + x * p, sy + y * p, p, p);
  sprite.visible = this.isOpen();
};
