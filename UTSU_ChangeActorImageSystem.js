//=====================================
// UTSU_ChangeActorImageSystem.js
//=====================================
// Copyright (c) 2020 Utsuda
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.1.3 2020/08/20 Update Copyright more better
// 1.1.2 2020/03/12 Fix cancel behavior on touch input
// 1.1.1 2020/03/11 Add "show cancel command" option
// 1.1.0 2020/03/10 Fork from ChangeActorImageSystem.js
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/utsudashinou
// [Twitter]: https://twitter.com/virtualUtsuda
//=============================================================================
//
// This plugin was forked from Tsumio's ChangeActorImageSystem.js, which is subject to the same license.
// Here is the original copyright notice for ChangeActorImageSystem.js:
//=====================================
// ChangeActorImageSystem.js
//=====================================
// Copyright (c) 2017 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Version
// 1.0.2 2017/5/17 背景色を指定する機能を追加（指定なしの場合の挙動も追加）
// 1.0.1 2017/5/17 1ページに表示する画像数を設定できる機能を追加
// 1.0.0 2017/5/16 公開
// ----------------------------------------------------------------------------
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================
//
//
/*:
 * @plugindesc アクターの画像を変えます
 * @author ツミオ, ウツダ
 *
 * @param 読み込むファイル名
 * @desc 読み込むファイル名を設定します(デフォルト値:Actor)
 * @default Actor
 *
 * @param 説明ウィンドウの文字
 * @desc 画面上部のウィンドウに表示する文字列。
 * (デフォルト値:の画像を選択してください。)
 * @default の画像を選択してください。
 *
 * @param ページウィンドウの表記
 * @desc 画面左部のウィンドウに表示する文字列の表記。
 * (デフォルト値:ページ)
 * @default ページ
 *
 * @param 文字色の指定
 * @desc ウィンドウスキンに準拠した文字色の指定
 * (デフォルト値:0)
 * @type number
 * @min 0
 * @max 31
 * @default 0
 *
 * @param ウィンドウスキンの指定
 * @desc ウィンドウスキンを変更する場合に指定してください。
 * (img/systemの配下にスキンを置いてください)
 * @type file
 * @dir img/system
 * @default Window
 *
 * @param ウィンドウの透明度の指定
 * @desc ウィンドウの透明度を変更する場合に指定してください(0～255)。
 * (デフォルト値:180)
 * @type number
 * @min 0
 * @max 255
 * @default 180
 *
 * @param 背景のファイル名
 * @desc 背景を指定する場合にファイル名を設定してください。
 *(img/parallaxesから読み込みます)
 * @type file
 * @dir img/parallaxes
 * @default
 *
 * @param 背景の色
 * @desc 背景色(#FFFなど)を指定してください(背景画像が優先)。指定がない場合、マップ画面をぼかしたものを背景色として表示します。
 * @default
 *
 * @param 1ページに表示する画像数
 * @desc 1ページに表示する画像数を指定してください。
 * 9以上の数値は8として認識します。(デフォルト:8)
 * @type number
 * @min 1
 * @max 8
 * @default 8
 *
 * @param SVアクター使用
 * @desc SVアクターを使用するか、使用する場合選択画面に表示する。
 * YES:使用, NO:使用しない, (デフォルト:YES)
 * @type boolean
 * @default true
 *
 * @param キャンセルコマンドの表示
 * @desc キャンセルコマンドを表示するか
 * YES:使用, NO:使用しない, (デフォルト:NO)
 * @type boolean
 * @default false
 *
 * @param キャンセルの文字列
 * @desc アクター選択時のキャンセルコマンドの文字列
 * @default 戻る
 *
 * @help
 * アクターの顔画像、歩行キャラ、[SV]戦闘キャラを変更するプラグインです。
 *
 *
 * 【使用方法】
 * 以下のプラグインコマンドを使用してください。
 *
 * Go_ChangeActorImageSystemScene PC GC ActorID File GCP
 *
 * PC - ページ数
 * GC - 読み込む画像数
 * ActorID - 変換させたいアクター番号
 * File - 読み込むファイル名(省略可能)
 * GCP - 1ページに表示する画像数(省略可能)
 * - 省略可能の箇所を省略した場合、パラメータで設定した値が渡されます。
 *
 * 例1:Go_ChangeActorImageSystemScene 30 3 1
 *   ページ30まで表示し、Actor1からActor3まで読み込み、
 *   1番のアクターを変換させる
 *
 * 例2:Go_ChangeActorImageSystemScene 10 2 3 Package
 *   ページ10まで表示し、Package1からPackage2まで読み込み、
 *   3番のアクターを変換させる
 *
 * 例3:Go_ChangeActorImageSystemScene 4 9 7 Hoge 5
 *   ページ4まで表示し、Hoge1からHoge9まで読み込み、
 *   7番のアクターを変換させる(表示する画像数は各5番まで)
 *
 * 利用規約:
 * 作者に無断で改変、再配布が可能で、
 * 利用形態(商用、18禁利用等)についても制限はありません。
 * 自由に使用してください。
 *
 */

(function() {
  'use strict';

  var param = PluginManager.parameters('UTSU_ChangeActorImageSystem');
  var $actor_file_name_CAIS = String(param['読み込むファイル名']) || 'Actor';
  var $text_helpWindow_CAIS = String(param['説明ウィンドウの文字']) || 'の画像を選択してください。';
  var $text_pageWindow_CAIS = String(param['ページウィンドウの表記']) || 'ページ';
  var $text_color_CAIS = Number(param['文字色の指定']) || 0;
  var $window_skin_CAIS = String(param['ウィンドウスキンの指定']) || 'Window';
  var $window_opacity_CAIS = Number(param['ウィンドウの透明度の指定']) || 180;
  var $window_backImage_CAIS = String(param['背景のファイル名']) || undefined;
  var $image_load_maxsize_CAIS = Number(param['1ページに表示する画像数']) || 8;
  var $color_backGround_CAIS = String(param['背景の色']) || undefined;
  var useSVActors = param['SVアクター使用'] === 'true';
  var showCancelCommand = param['キャンセルコマンドの表示'] === 'true';
  var cancelCommandText = String(param['キャンセルの文字列'] || '戻る');

  //ページの数
  var $page_CAIS = 0;
  //読み込んで欲しいアクターの数
  var $actorNumber_CAIS = 1;
  //今選んでいるページ
  var $selectingPage_CAIS = 0;
  //チェンジさせたいアクターID
  var $change_actorId_CAIS = 1;


  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'Go_ChangeActorImageSystemScene') {
      $page_CAIS = args[0];
      $actorNumber_CAIS = args[1];
      $change_actorId_CAIS = args[2]
      if (args[3] !== undefined) {
        $actor_file_name_CAIS = args[3];
      } else {
        $actor_file_name_CAIS = String(param['読み込むファイル名']) || 'Actor';
      }
      if (args[4] !== undefined) {
        $image_load_maxsize_CAIS = args[4];
      } else {
        $image_load_maxsize_CAIS = Number(param['1ページに表示する画像数']) || 8;
      }
      SceneManager.push(Scene_ChangeActorImageSystem);
    }
  };

  //----------------------------------------------------------------------------
  //  Scene_ChangeActorImageSystemクラスの定義
  //----------------------------------------------------------------------------
  function Scene_ChangeActorImageSystem() {
    this.initialize.apply(this, arguments);
  };

  Scene_ChangeActorImageSystem.prototype = Object.create(Scene_Base.prototype);
  Scene_ChangeActorImageSystem.prototype.constructor = Scene_ChangeActorImageSystem;

  //初期化
  Scene_ChangeActorImageSystem.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
    //選択を初期化
    $selectingPage_CAIS = 0;
    //バトラー表示バグ回避用
    this.preLoad = 0;
    //エラー回避用
    if ($image_load_maxsize_CAIS > 8) {
      $image_load_maxsize_CAIS = 8;
      console.log("実行されたよ");
    }
  };

  //生成メソッド
  Scene_ChangeActorImageSystem.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    //this.createActorReona(320,450,'walk');
    //背景生成
    this.createBackgroundNoImage();
    this.createBackgroundImage();
    //window用のレイヤー作成
    this.createWindowLayer();
    //実際のウインドウを生成
    this.createHelpWindow();
    this.createPageSelectWindow();
    this.createActorSelectWindow();
  };

  //背景画像生成
  Scene_ChangeActorImageSystem.prototype.createBackgroundImage = function() {
    if ($window_backImage_CAIS !== undefined) {
      var bitmap = ImageManager.loadParallax($window_backImage_CAIS);
      this.sprite_background = new Sprite(bitmap);
      this.sprite_background.x = 0;
      this.sprite_background.y = 0;
      SceneManager._scene.addChild(this.sprite_background);
    }
  };

  //背景のSprite生成
  Scene_ChangeActorImageSystem.prototype.createBackgroundNoImage = function() {
    if ($color_backGround_CAIS !== undefined) {
      //sprite作成
      var sprite = new Sprite();
      //Bitmap作成
      var bitmap = new Bitmap(Graphics.width, Graphics.height);
      try {
        bitmap.fillAll($color_backGround_CAIS);
        console.log($color_backGround_CAIS);
      } catch (e) {
        bitmap.fillAll('#000000');
        console.log(e);
      }
      //設定
      sprite.bitmap = bitmap;
      this.addChild(sprite);
    } else {
      //マップのスナップショットを背景に表示
      var _backgroundSprite = new Sprite();
      _backgroundSprite.bitmap = SceneManager.backgroundBitmap();
      this.addChild(_backgroundSprite);
    }
  };

  //説明用のウインドウ生成
  Scene_ChangeActorImageSystem.prototype.createHelpWindow = function() {
    this._helpWindow = new Window_ActorInformationAndDescription(0, 0);
    this._helpWindow.backOpacity = $window_opacity_CAIS;
    this._helpWindow.opacity = $window_opacity_CAIS;
    this.addWindow(this._helpWindow);
  };

  //ページセレクト用のウインドウ生成
  Scene_ChangeActorImageSystem.prototype.createPageSelectWindow = function() {
    this._pageSelect_Window = new Window_PageSelect(0, 70);
    this._pageSelect_Window.backOpacity = $window_opacity_CAIS;
    this._pageSelect_Window.opacity = $window_opacity_CAIS;
    this.addWindow(this._pageSelect_Window);

    this._pageSelect_Window.setHandler('cancel', this.popScene.bind(this));
    if (showCancelCommand) {
      this._pageSelect_Window.setHandler('cancel_', this.popScene.bind(this));
    }
    for (var i = 1; i <= $page_CAIS; i++) {
      var page_number = i;
      this._pageSelect_Window.setHandler('page' + page_number, this.comandSelectedPage.bind(this));
    }
  };

  //ページセレクトされたら
  Scene_ChangeActorImageSystem.prototype.comandSelectedPage = function() {
    //基本的な設定
    this._pageSelect_Window.deactivate();
    this._actorSelect_Window.activate();
    this._actorSelect_Window.select(0);
    //ここからページごとにhandleを切り替える
    for (var i = 0; i < $image_load_maxsize_CAIS; i++) {
      var actor_number = i + 1;
      this._actorSelect_Window.setHandler('actor' + actor_number, this.comandSelectedActor.bind(this));
    }
  }

  //キャラクターが選択されたら
  Scene_ChangeActorImageSystem.prototype.comandSelectedActor = function() {
    //ここからキャラチェンジ用
    var selected_actor = this.getSelectedActor();
    var isImageExsit = this.checkImageExist(selected_actor[0], selected_actor[1]);
    //ファイルが存在しなければelse
    if (isImageExsit) {
      this.setSelectedActor(selected_actor[0], selected_actor[1]);
      //ウインドウ初期化
      this._pageSelect_Window.activate();
      this._actorSelect_Window.deactivate();
      this._actorSelect_Window.select(-1);
      //効果音ならす
      SoundManager.playOk();
      SceneManager.push(Scene_Map);
    } else {
      SoundManager.playBuzzer();
      this._pageSelect_Window.deactivate();
      this._actorSelect_Window.activate();
    }
  }

  //アクター画面からキャンセルされたら
  Scene_ChangeActorImageSystem.prototype.comandCancelSelectingActor = function() {
    this._pageSelect_Window.activate();
    this._actorSelect_Window.deactivate();
    this._actorSelect_Window.select(-1);
    SoundManager.playCancel();
  }

  //選択されているアクターゲット
  Scene_ChangeActorImageSystem.prototype.getSelectedActor = function() {
    var select_page = $selectingPage_CAIS + 1;
    if (showCancelCommand) {
      select_page--;
    }
    var index = this._actorSelect_Window.index();
    var page_name = $actor_file_name_CAIS + select_page;
    var item = [];
    item.push(page_name);
    item.push(index);
    return item;
  }

  //イメージが存在するかどうかをチェックする
  Scene_ChangeActorImageSystem.prototype.checkImageExist = function(name, index) {

    /*このメソッドでファイルがチェックし、ファイルがなければfalseを返す*/
    var page = $selectingPage_CAIS + 1;
    if (showCancelCommand) {
      page--;
    }
    if ($actorNumber_CAIS < page) {
      return false;
    } else {
      return true;
    }
    //キャラクターチェック
    // ImageManager.loadCharacter(name, index);
    // //[SV]戦闘キャラ
    // var battler_index = index + 1;
    // ImageManager.loadSvActor(name + '_' + battler_index);
    // var bitmap = ImageManager.loadSystem('MiniGameArrow');
  }

  //選択されているアクターセット
  Scene_ChangeActorImageSystem.prototype.setSelectedActor = function(name, index) {
    //歩行キャラ
    $gameActors.actor($change_actorId_CAIS).setCharacterImage(name, index);
    //顔
    $gameActors.actor($change_actorId_CAIS).setFaceImage(name, index);
    //[SV]戦闘キャラ
    if (useSVActors) {
      var battler_index = index + 1;
      $gameActors.actor($change_actorId_CAIS).setBattlerImage(name + '_' + battler_index);
    }
    //変更を反映
    $gamePlayer.refresh();
  }


  //アクターセレクト用のウインドウ生成
  Scene_ChangeActorImageSystem.prototype.createActorSelectWindow = function() {
    this._actorSelect_Window = new Window_ActorSelect(200, 70);
    this._actorSelect_Window.deactivate();
    this._actorSelect_Window.select(-1);
    this._actorSelect_Window.backOpacity = $window_opacity_CAIS;
    this._actorSelect_Window.opacity = $window_opacity_CAIS;
    this.addWindow(this._actorSelect_Window);
    this._actorSelect_Window.setHandler('cancel', this.comandCancelSelectingActor.bind(this));
  };

  Scene_ChangeActorImageSystem.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
    this.inputKey();

    //バトラー表示のバグ回避用
    if (this.preLoad < 2) {
      this._actorSelect_Window.refresh();
      this.preLoad++;
    }
  };

  Scene_ChangeActorImageSystem.prototype.inputKey = function() {
    this.inputPageSelectingKey();
    this.inputActorSelecting();
  };

  Scene_ChangeActorImageSystem.prototype.inputPageSelectingKey = function() {
    if (this._pageSelect_Window.isOpenAndActive()) {
      if (Input.isRepeated('up')) {
        $selectingPage_CAIS = this._pageSelect_Window.index();
        this._actorSelect_Window.refresh();
        this.preLoad = 0;
      } else if (Input.isRepeated('down')) {
        $selectingPage_CAIS = this._pageSelect_Window.index();
        this._actorSelect_Window.refresh();
        this.preLoad = 0;
      }

      //ここからマウス操作
      if (TouchInput.isTriggered()) {
        $selectingPage_CAIS = this._pageSelect_Window.index();
        this._actorSelect_Window.refresh();
        this.preLoad = 0;
      }
    }
  };

  Scene_ChangeActorImageSystem.prototype.inputActorSelecting = function() {
    if (this._actorSelect_Window.isOpenAndActive()) {
      if (Input.isTriggered('cancel')) {
        this.comandCancelSelectingActor();
      } else if (Input.isTriggered('ok')) {
        this.comandSelectedActor();
      }
    }
  };

  //----------------------------------------------------------------------------
  // 説明用のウインドウ
  //----------------------------------------------------------------------------
  function Window_ActorInformationAndDescription() {
    this.initialize.apply(this, arguments);
  }

  Window_ActorInformationAndDescription.prototype = Object.create(Window_Base.prototype);
  Window_ActorInformationAndDescription.prototype.constructor = Window_ActorInformationAndDescription;

  Window_ActorInformationAndDescription.prototype.initialize = function() {
    Window_Base.prototype.initialize.call(this, 0, 0, Graphics.width, 70);
    //初期文章
    this.draw_helpText();
  };

  Window_ActorInformationAndDescription.prototype.refresh = function() {
    this.contents.clear();
    this.draw_helpText();
  };

  Window_ActorInformationAndDescription.prototype.draw_helpText = function() {
    //テキスト表示
    var actor_name = $gameActors.actor($change_actorId_CAIS).name();
    //console.log($gameActors.actor($change_actorId_CAIS)._characterName);
    //console.log($gameActors.actor($change_actorId_CAIS)._characterIndex);
    //console.log(actor_name);

    //文字色変更処理
    this.changeTextColor(this.textColor($text_color_CAIS));
    this.drawText(actor_name + $text_helpWindow_CAIS, 48, 0);
    this.resetTextColor();

    this.drawCharacter($gameActors.actor($change_actorId_CAIS)._characterName, $gameActors.actor($change_actorId_CAIS)._characterIndex, 20, 42);
    //this.drawCharacter($gameActors.actor($change_actorId_CAIS)._characterName, 2,1,1);
  }

  Window_ActorInformationAndDescription.prototype.loadWindowskin = function() {
    this.windowskin = ImageManager.loadSystem($window_skin_CAIS);
  };

  //----------------------------------------------------------------------------
  // ページセレクト用のウインドウ
  //----------------------------------------------------------------------------
  function Window_PageSelect() {
    this.initialize.apply(this, arguments);
  }

  Window_PageSelect.prototype = Object.create(Window_Command.prototype);
  Window_PageSelect.prototype.constructor = Window_PageSelect;

  Window_PageSelect.prototype.initialize = function(x, y, width, height) {
    Window_Command.prototype.initialize.call(this, x, y);
  };

  Window_PageSelect.prototype.makeCommandList = function() {
    this.addMainCommands();
  };

  Window_PageSelect.prototype.addMainCommands = function() {
    if (showCancelCommand) {
      this.addCommand(cancelCommandText, 'cancel_', true);
    }
    for (var i = 0; i < $page_CAIS; i++) {
      var page_number = i + 1;

      this.addCommand($text_pageWindow_CAIS + page_number, 'page' + page_number, true);
    }
  };

  Window_PageSelect.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    //文字色変更処理
    this.changeTextColor(this.textColor($text_color_CAIS));
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
    this.resetTextColor();
  };

  Window_PageSelect.prototype.windowWidth = function() {
    return 200;
  };

  Window_PageSelect.prototype.windowHeight = function() {
    return Graphics.height - 70;
  };

  Window_PageSelect.prototype.loadWindowskin = function() {
    this.windowskin = ImageManager.loadSystem($window_skin_CAIS);
  };

  //----------------------------------------------------------------------------
  // アクターセレクト用のウインドウ
  //----------------------------------------------------------------------------
  function Window_ActorSelect() {
    this.initialize.apply(this, arguments);
  }

  Window_ActorSelect.prototype = Object.create(Window_Command.prototype);
  Window_ActorSelect.prototype.constructor = Window_ActorSelect;

  Window_ActorSelect.prototype.initialize = function(x, y, width, height) {
    //画像を保存する配列
    this._actor_image = [];
    //画像ロード
    this.loadImages();

    //初期化のcall
    Window_Command.prototype.initialize.call(this, x, y);
    //リフレッシュ呼ぶ
    this.refresh();
  };

  Window_ActorSelect.prototype.makeCommandList = function() {
    this.addMainCommands();
  };

  Window_ActorSelect.prototype.addMainCommands = function() {
    for (var i = 0; i < $image_load_maxsize_CAIS; i++) {
      var actor_number = i + 1;
      this.addCommand("actor" + actor_number, 'actor' + actor_number, true);
    }
  };

  Window_ActorSelect.prototype.drawItem = function(index) {
    this.drawItemImage(index);
  };

  Window_ActorSelect.prototype.drawItemImage = function(index) {
    var actor = $gameParty.members()[index];
    var rect = this.itemRect(index);
    var offset = showCancelCommand ? -1 : 0;
    this.drawFace(this._actor_image[$selectingPage_CAIS + offset], index, rect.x + 0, rect.y + 1, Window_Base._faceWidth, Window_Base._faceHeight);
    try {
      var battle_index = index + 1;
      var battler_name = this._actor_image[$selectingPage_CAIS + offset] + '_' + battle_index;
      if (useSVActors) {
        this.drawCharacter(this._actor_image[$selectingPage_CAIS + offset], index, rect.x + 30, rect.y + 200);
        this.drawBattler(battler_name, index, rect.x + 70, rect.y + 140);
      } else {
        this.drawCharacter(this._actor_image[$selectingPage_CAIS + offset], index,
          rect.x + rect.width / 2, rect.y + 200);
      }
    } catch (e) {
      //console.log(e);
    }
  };

  //バトラー切り出す
  if (useSVActors) {
    Window_ActorSelect.prototype.drawBattler = function(characterName, characterIndex, x, y) {
      var bitmap = ImageManager.loadSvActor(characterName);
      this.contents.blt(bitmap, 0, 0, 64, 64, x, y);
    };

    Window_ActorSelect.prototype.checkBattler = function(characterName) {
      var bitmap = ImageManager.loadSvActor(characterName);
      return bitmap.isError();
    };
  }

  Window_ActorSelect.prototype.numVisibleRows = function() {
    return 2;
  };


  Window_ActorSelect.prototype.maxCols = function() {
    return 4;
  };

  Window_ActorSelect.prototype.maxItems = function() {
    return $image_load_maxsize_CAIS;
  };

  Window_ActorSelect.prototype.loadImages = function() {
    for (var i = 1; i <= $actorNumber_CAIS; i++) {
      //ロード
      ImageManager.loadFace($actor_file_name_CAIS + i);
      ImageManager.loadCharacter($actor_file_name_CAIS + i);
      //バトラー用
      if (useSVActors) {
        for (var battler_index = 1; battler_index <= $image_load_maxsize_CAIS; battler_index++) {
          // console.log($actor_file_name_CAIS + i + '_' + battler_index);
          ImageManager.loadSvActor($actor_file_name_CAIS + i + '_' + battler_index);
        }
      }
      var k = i - 1;
      //配列に代入
      this._actor_image[k] = $actor_file_name_CAIS + i;
    }
  };

  Window_ActorSelect.prototype.itemHeight = function() {
    var clientHeight = this.height - this.padding * 2;
    return Math.floor(clientHeight / this.numVisibleRows());
  };

  Window_ActorSelect.prototype.windowWidth = function() {
    return Graphics.width - 200;
  };

  Window_ActorSelect.prototype.windowHeight = function() {
    return Graphics.height - 70;
  };

  Window_ActorSelect.prototype.loadWindowskin = function() {
    this.windowskin = ImageManager.loadSystem($window_skin_CAIS);
  };


}());