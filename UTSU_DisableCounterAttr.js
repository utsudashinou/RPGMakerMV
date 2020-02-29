//=============================================================================
// UTSU_DisableCounterAttr.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020 Utuda
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2020/02/29 Release
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/utsudashinou
//=============================================================================

/*:
 * @plugindesc カウンター属性の挙動を無効にします
 * @author Utsuda
 *
 * @help 
 *
 * @param DisableCounterAttrRegionId
 * @desc カウンター属性の挙動を無効にするリージョンID
 * @type number
 * @min 1
 * @max 255
 * @default 1
 *
 */


(function() {
  'use strict';

  const parameters = PluginManager.parameters('UTSU_DisableCounterAttr');
  const params = {};
  params.DisableCounterAttrRegionId = Number(parameters['DisableCounterAttrRegionId'] || 1);

  Game_Player.prototype.checkEventTriggerThere = function(triggers) {
    if (this.canStartLocalEvents()) {
      var direction = this.direction();
      var x1 = this.x;
      var y1 = this.y;
      var x2 = $gameMap.roundXWithDirection(x1, direction);
      var y2 = $gameMap.roundYWithDirection(y1, direction);
      this.startMapEvent(x2, y2, triggers, true);
      if (!$gameMap.isAnyEventStarting() && $gameMap.isCounter(x2, y2) && $gameMap.regionId(x2, y2) !== params.DisableCounterAttrRegionId) {
        var x3 = $gameMap.roundXWithDirection(x2, direction);
        var y3 = $gameMap.roundYWithDirection(y2, direction);
        this.startMapEvent(x3, y3, triggers, true);
      }
    }
  };

}());