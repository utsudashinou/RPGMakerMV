//=============================================================================
// UTSU_HideSkill.js
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
 * @plugindesc 条件付きでスキルを非表示
 * @author Utsuda Shinou
 *
 * @help 封印スキルを非表示にします。（バトル中のみ）
 *
 *
 * * プラグインコマンド
 * UTSU_HideSkillOn conditions...
 *   条件付きでスキルを非表示にする。引数によって条件を変更できる。複数指定可能。
 *   Weapon: スキルを使用できる武器を装備していないとき
 *   Cost: コストを支払えないとき
 *   Sealed: スキル封印されているとき
 *   例: UTSU_HideSkillOn Sealed Cost
 *
 * UTSU_HideSkillOff conditions...
 *   条件付きでスキルを非表示にする機能を停止する。引数はUTSU_HideSkillOnと同じ。
 *   例: UTSU_HideSkillOff Sealed Cost
 *
 */

(function () {
  "use strict";
  const params = {
    Weapon: false,
    Cost: false,
    Sealed: false,
  };

  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === "UTSU_HideSkillOn") {
      args.forEach((arg) => {
        params[arg] = true;
      });
    }
    if (command === "UTSU_HideSkillOff") {
      args.forEach((arg) => {
        params[arg] = false;
      });
    }
  };

  const _Window_BattleSkill_includes = Window_BattleSkill.prototype.includes;
  Window_BattleSkill.prototype.includes = function (item) {
    return (
      _Window_BattleSkill_includes.call(this, item) &&
      (!params.Weapon || this._actor.isSkillWtypeOk(item)) &&
      (!params.Cost || this._actor.canPaySkillCost(item)) &&
      (!params.Sealed || !this._actor.isSkillSealed(item.id))
    );
  };
})();
