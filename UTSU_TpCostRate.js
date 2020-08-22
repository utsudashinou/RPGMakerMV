//=============================================================================
// UTSU_TpCostRate.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020 Utsuda Shinou
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2020/08/22 Release
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/utsudashinou
// [Twitter]: https://twitter.com/virtualUtsuda
//=============================================================================

/*:
 * @plugindesc TP消費率
 * @author Utsuda Shinou
 *
 * @help TP消費率を追加します。
 *
 * * ノートタグ
 * UTSU_TpCostRate
 *   TP消費率（%）を設定します。武器、防具、ステートのメモに記入してください。
 *   設定値は累積します。（武器 TP50%, ステート TP50%ならば、TP消費率は通常の25%になる）
 *   例: <UTSU_TpCostRate: 80>
 *
 * * ダメージ計算式
 * tcor
 *   TP消費率を参照する。（使いどころ不明...）
 *   例: a.tcor
 * 
 */

(function () {
  "use strict";
  const tpReducer = (a, b) => (a * Number(b.meta.UTSU_TpCostRate || 100)) / 100;

  Object.defineProperties(Game_BattlerBase.prototype, {
    // Tp COst Rate
    tcor: {
      get: function () {
        return this.traitObjects().reduce(tpReducer, 100);
      },
      configurable: true,
    },
  });

  const _Game_BattlerBase_skillTpCost = Game_BattlerBase.prototype.skillTpCost;
  Game_BattlerBase.prototype.skillTpCost = function (skill) {
    return Math.floor((_Game_BattlerBase_skillTpCost.call(this, skill) * this.tcor) / 100);
  };
})();
