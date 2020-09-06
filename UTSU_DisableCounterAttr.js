//=============================================================================
// UTSU_DisableCounterAttr.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020 Utuda
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.1.0 2020/09/06 Simplify and Add support RPG Maker MZ
// 1.0.0 2020/02/29 Release
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/utsudashinou
// [Twitter]: https://twitter.com/virtualUtsuda
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc カウンター属性の挙動を無効にします
 * @author Utsuda Shinou
 * @url https://github.com/utsudashinou/RPGMakerMV
 *
 * @help
 *
 * @param DisableCounterAttrRegionId
 * @text リージョンID
 * @desc カウンター属性の挙動を無効にするリージョンID
 * @type number
 * @min 1
 * @max 255
 * @default 1
 *
 */

(() => {
  "use strict";
  const parameters = PluginManager.parameters("UTSU_DisableCounterAttr");
  const params = {};
  params.DisableCounterAttrRegionId = Number(parameters["DisableCounterAttrRegionId"] || 1);

  const _Game_Map_isCounter = Game_Map.prototype.isCounter;
  Game_Map.prototype.isCounter = function (x, y) {
    return _Game_Map_isCounter.call(this, x, y) && $gameMap.regionId(x, y) !== params.DisableCounterAttrRegionId;
  };
})();
