//=============================================================================
// UTSU_ItemNumberDisplay.js
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
 * @plugindesc Change Item Number Display
 * @author Utsuda
 *
 * @help Change item number display and Delimiter(default: ':')
 *
 * @param ItemNumberDisplay
 * @desc Item number display mode
 * @type select
 * @option none
 * @value 0
 * @option showAlways
 * @value 1
 * @option showOnlyPlural
 * @value 2
 * @default 1
 *
 * @param BattleItemNumberDisplay
 * @desc Item number display mode in battle
 * @type select
 * @option none
 * @value 0
 * @option showAlways
 * @value 1
 * @option showOnlyPlural
 * @value 2
 * @default 1
 *
 * @param EquipItemNumberDisplay
 * @desc Item number display mode on [Equip]
 * @type select
 * @option none
 * @value 0
 * @option showAlways
 * @value 1
 * @option showOnlyPlural
 * @value 2
 * @default 1
 *
 * @param ShopSellItemNumberDisplay
 * @desc Item number display mode on [Shop Sell]
 * @type select
 * @option none
 * @value 0
 * @option showAlways
 * @value 1
 * @option showOnlyPlural
 * @value 2
 * @default 1
 *
 * @param ItemSelcetNumberDisplay
 * @desc Item number display mode on [Item Select]
 * @type select
 * @option none
 * @value 0
 * @option showAlways
 * @value 1
 * @option showOnlyPlural
 * @value 2
 * @default 1
 *
 * @param Delimiter
 * @desc Delimiter (recommend one char)
 * @default :
 *
 */

/*:ja
 * @plugindesc アイテムの個数表示を変更
 * @author ウツダ
 *
 * @help アイテムの個数の表示方法を変更します。おまけで区切り字(:)の変更も。
 * 
 * @param ItemNumberDisplay
 * @desc アイテムの個数の表示方法
 * @type select
 * @option 非表示
 * @value 0
 * @option 常時
 * @value 1
 * @option 複数のみ
 * @value 2
 * @default 1
 *
 * @param BattleItemNumberDisplay
 * @desc バトル中のアイテムの個数の表示方法
 * @type select
 * @option 非表示
 * @value 0
 * @option 常時
 * @value 1
 * @option 複数のみ
 * @value 2
 * @default 1
 *
 * @param EquipItemNumberDisplay
 * @desc 装備メニューのアイテムの個数の表示方法
 * @type select
 * @option 非表示
 * @value 0
 * @option 常時
 * @value 1
 * @option 複数のみ
 * @value 2
 * @default 1
 *
 * @param ShopSellItemNumberDisplay
 * @desc ショップで売るメニューのアイテムの個数の表示方法
 * @type select
 * @option 非表示
 * @value 0
 * @option 常時
 * @value 1
 * @option 複数のみ
 * @value 2
 * @default 1
 *
 * @param SelectItemNumberDisplay
 * @desc アイテム選択メッセージのアイテムの数の表示
 * @type select
 * @option 非表示
 * @value 0
 * @option 常時
 * @value 1
 * @option 複数のみ
 * @value 2
 * @default 1
 *
 * @param Delimiter
 * @desc 区切り字（1文字推奨）
 * @default :
 *
 */

(function() {
  'use strict';

  const DISP_MODE_NONE = 0;
  const DISP_MODE_SHOW_ALWAYS = 1;
  const DISP_MODE_SHOW_ONLY_PLURAL = 2;

  const parameters = PluginManager.parameters('UTSU_ItemNumberDisplay');
  const params = {};
  params.ItemNumberDisplay = Number(parameters['ItemNumberDisplay'] || DISP_MODE_SHOW_ALWAYS);
  params.BattleItemNumberDisplay = Number(parameters['SelectItemNumberDisplay'] || DISP_MODE_SHOW_ALWAYS);
  params.EquipItemNumberDisplay = Number(parameters['SelectItemNumberDisplay'] || DISP_MODE_SHOW_ALWAYS);
  params.ShopSellItemNumberDisplay = Number(parameters['SelectItemNumberDisplay'] || DISP_MODE_SHOW_ALWAYS);
  params.SelectItemNumberDisplay = Number(parameters['SelectItemNumberDisplay'] || DISP_MODE_SHOW_ALWAYS);
  params.Delimiter = String(parameters['Delimiter'] || ':');

  Window_ItemList.prototype._drawItemNumber = function(item, x, y, width, displayMode) {
    if (displayMode === DISP_MODE_NONE) {
      return;
    }
    const itemNum = $gameParty.numItems(item);
    if (displayMode === DISP_MODE_SHOW_ALWAYS ||
      (displayMode === DISP_MODE_SHOW_ONLY_PLURAL && itemNum > 1)) {
      this.drawText(params.Delimiter, x, y, width - this.textWidth('00'), 'right');
      this.drawText(itemNum, x, y, width, 'right');
    }
  };

  Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {
    this._drawItemNumber(item, x, y, width, params.ItemNumberDisplay);
  };

  Window_BattleItem.prototype.drawItemNumber = function(item, x, y, width) {
    this._drawItemNumber(item, x, y, width, params.BattleItemNumberDisplay);
  };

  Window_EquipItem.prototype.drawItemNumber = function(item, x, y, width) {
    this._drawItemNumber(item, x, y, width, params.EquipItemNumberDisplay);
  };

  Window_ShopSell.prototype.drawItemNumber = function(item, x, y, width) {
    this._drawItemNumber(item, x, y, width, params.ShopSellItemNumberDisplay);
  };

  Window_EventItem.prototype.drawItemNumber = function(item, x, y, width) {
    this._drawItemNumber(item, x, y, width, params.SelectItemNumberDisplay);
  };

}());