function visibleResume() {
  muted || manualPause || Howler.unmute();
}
function visiblePause() {
  Howler.mute();
}
function initSplash() {
  gameState = "splash",
          resizeCanvas(),
          splash = new Elements.Splash(assetLib.getData("splash"), canvas.width, canvas.height),
          userInput.addHitArea("moreGames", butEventHandler, null, "rect", {
            aRect: [0, 0, canvas.width, canvas.height]
          },
                  !0),
          previousTime = (new Date).getTime(),
          updateSplashScreenEvent();
}



function initStartScreen() {
  var a, b, c, d, e;
  for (gameState = "start", userInput.removeHitArea("moreGames"), 1 == audioType && (musicTween && musicTween.kill(), musicTween = TweenLite.to(music, 1, {
  volume: .2,
          ease: "Linear.easeNone"
  })), a = 0; a < aPowerUpBarData.length; a++)
    aPowerUpBarData[a] = saveDataHandler.aLevelStore[2 + a];
  oGameData.totalGems = saveDataHandler.aLevelStore[0],
          levelScore = 0,
          totalScore = 0,
          levelNum = 0,
          background = new Elements.Background(assetLib.getData("background0"), canvas.width, canvas.height),
          background.renderState = "menuScroll",
          userInput.addHitArea("mute", butEventHandler, null, "rect", {
            aRect: [392, 0, canvas.width, 53]
          },
                  !0),
          b = {
            oImgData: assetLib.getData("uiButs"),
            aPos: [canvas.width / 2, 530],
            id: oImageIds.playBut
          },
          c = {
            oImgData: assetLib.getData("uiButs"),
            aPos: [330, 655],
            id: oImageIds.moreGamesBut,
            noMove: !0
          },
          d = {
            oImgData: assetLib.getData("uiButs"),
            aPos: [120, 655],
            id: oImageIds.creditsBut,
            noMove: !0
          },
          userInput.addHitArea("startGame", butEventHandler, null, "image", b),
          userInput.addHitArea("moreGames", butEventHandler, null, "image", c),
          userInput.addHitArea("credits", butEventHandler, null, "image", d),
          e = new Array(b, c, d),
          panel = new Elements.Panel(gameState, e),
          panel.startTween1(),
          previousTime = (new Date).getTime(),
          updateStartScreenEvent()
}
function initCreditsScreen() {
  var a, b, c;
  gameState = "credits",
          a = {
            oImgData: assetLib.getData("uiButs"),
            aPos: [48, 655],
            id: oImageIds.backBut
          },
          b = {
            oImgData: assetLib.getData("uiButs"),
            aPos: [100, 45],
            id: oImageIds.resetDataBut,
            noMove: !0
          },
          userInput.addHitArea("backFromCredits", butEventHandler, null, "image", a),
          userInput.addHitArea("resetData", butEventHandler, null, "image", b),
          c = new Array(a, b),
          panel = new Elements.Panel(gameState, c),
          panel.startTween2(),
          previousTime = (new Date).getTime(),
          updateCreditsScreenEvent()
}
function initGame() {
  gameState = "game",
          1 == audioType && (musicTween.kill(), musicTween = TweenLite.to(music, 1, {
            volume: .4,
            ease: "Linear.easeNone"
          })),
          background = new Elements.Background(assetLib.getData("background0"), canvas.width, canvas.height),
          background.renderState = "game",
          hud = new Elements.Hud,
          squirrel = new Elements.Squirrel,
          branch = new Elements.Branch,
          userInput.addHitArea("pause", butEventHandler, null, "rect", {
            aRect: [325, 0, 387, 58]
          },
                  !0),
          userInput.addHitArea("swipe", butEventHandler, {
            isDraggable: !0,
            multiTouch: !0
          },
                  "rect", {
                    aRect: [0, 60, canvas.width, canvas.height]
                  },
                  !0),
          userInput.addKey("steerKeyRight", butEventHandler, null, 39),
          userInput.addKey("steerKeyLeft", butEventHandler, null, 37),
          userInput.addKey("keyUp", butEventHandler, null, 38),
          userInput.addKey("keyDown", butEventHandler, null, 40),
          controlState = "lean",
          swipeDetect = new Utils.SwipeDetect,
          oGameData.distance = 0,
          oGameData.curGemChain = 0,
          oGameData.curGems = 0,
          oGameData.boostNum = 0,
          endGameSequence = !1,
          playSound("startGame"),
          aEffects = new Array,
          previousTime = (new Date).getTime(),
          updateGameEvent()
}
function butEventHandler(a, b) {
  switch (a) {
    case "langSelect":
      curLang = b.lang,
              ctx.clearRect(0, 0, canvas.width, canvas.height),
              userInput.removeHitArea("langSelect"),
              preAssetLib = new Utils.AssetLoader(curLang, [{
                  id: "preloadImage",
                  file: "images/" + curLang + "/preloadImage.jpg"
                }], ctx, canvas.width, canvas.height, !1),
              preAssetLib.onReady(initLoadAssets);
      break;
    case "startGame":
      playSound("click"),
              document.getElementById("toolbar").style.display = "none",
              userInput.removeHitArea("startGame"),
              userInput.removeHitArea("moreGames"),
              userInput.removeHitArea("credits"),
              isMobile && launchFullscreen(document.documentElement),
              initGame();
      break;
    case "credits":
      playSound("click"),
              dp_share();
      break;
    case "backFromCredits":
      playSound("click"),
              userInput.removeHitArea("backFromCredits"),
              userInput.removeHitArea("resetData"),
              initStartScreen();
      break;
    case "resetData":
      playSound("click"),
              userInput.removeHitArea("backFromCredits"),
              userInput.removeHitArea("resetData"),
              saveDataHandler.resetData(),
              initStartScreen();
      break;
    case "moreGames":
    case "moreGamesPause":
      playSound("click"),
              clickMore();
      break;
    case "startGame":
      playSound("click"),
              document.getElementById("toolbar").style.display = "none",
              document.getElementById("toolbar").style.display = "none",
              userInput.removeHitArea("startGame"),
              initGame();
      break;
    case "steerKeyRight":
      b.isDown ? (squirrel.turn("right"), firstRun && 0 == hud.tutState && (hasHorizAction = !0)) : squirrel.allowRight = !0;
      break;
    case "steerKeyLeft":
      b.isDown ? (squirrel.turn("left"), firstRun && 0 == hud.tutState && (hasHorizAction = !0)) : squirrel.allowLeft = !0;
      break;
    case "swipe":
      b.isDown ? swipeDetect.track(b.x, b.y) : swipeDetect.stopTrack(b.x, b.y);
      break;
    case "keyUp":
      b.isDown && (squirrel.jump(), firstRun && 1 == hud.tutState && (hasVertAction = !0));
      break;
    case "keyDown":
      b.isDown && (squirrel.duck(), firstRun && 1 == hud.tutState && (hasVertAction = !0));
      break;
    case "playFromEnd":
      playSound("click"),
              userInput.removeHitArea("playFromEnd"),
              userInput.removeHitArea("upgrade"),
              initGame();
      document.getElementById("toolbar").style.display = "none";
      break;
    case "upgrade":
      playSound("click"),
              userInput.removeHitArea("playFromEnd"),
              userInput.removeHitArea("upgrade"),
              initUpgrade();
      break;
    case "powerUp0":
      oGameData.totalGems >= aPowerUpButsData[aPowerUpBarData[0]] && aPowerUpBarData[0] < 8 && (playSound("click"), oGameData.totalGems -= aPowerUpButsData[aPowerUpBarData[0]], aPowerUpBarData[0]++, setPowerUpButs(), saveDataHandler.aLevelStore[2] = aPowerUpBarData[0], saveDataHandler.aLevelStore[0] = oGameData.totalGems, saveDataHandler.saveData());
      break;
    case "powerUp1":
      oGameData.totalGems >= aPowerUpButsData[aPowerUpBarData[1]] && aPowerUpBarData[1] < 8 && (playSound("click"), oGameData.totalGems -= aPowerUpButsData[aPowerUpBarData[1]], aPowerUpBarData[1]++, setPowerUpButs(), saveDataHandler.aLevelStore[3] = aPowerUpBarData[1], saveDataHandler.aLevelStore[0] = oGameData.totalGems, saveDataHandler.saveData());
      break;
    case "powerUp2":
      oGameData.totalGems >= aPowerUpButsData[aPowerUpBarData[2]] && aPowerUpBarData[2] < 8 && (playSound("click"), oGameData.totalGems -= aPowerUpButsData[aPowerUpBarData[2]], aPowerUpBarData[2]++, setPowerUpButs(), saveDataHandler.aLevelStore[4] = aPowerUpBarData[2], saveDataHandler.aLevelStore[0] = oGameData.totalGems, saveDataHandler.saveData());
      break;
    case "powerUp3":
      oGameData.totalGems >= aPowerUpButsData[aPowerUpBarData[3]] && aPowerUpBarData[3] < 8 && (playSound("click"), oGameData.totalGems -= aPowerUpButsData[aPowerUpBarData[3]], aPowerUpBarData[3]++, setPowerUpButs(), saveDataHandler.aLevelStore[5] = aPowerUpBarData[3], saveDataHandler.aLevelStore[0] = oGameData.totalGems, saveDataHandler.saveData());
      break;
    case "backFromUpgrade":
      playSound("click"),
              userInput.removeHitArea("backFromUpgrade"),
              userInput.removeHitArea("playFromUpgrade"),
              userInput.removeHitArea("powerUp0"),
              userInput.removeHitArea("powerUp1"),
              userInput.removeHitArea("powerUp2"),
              userInput.removeHitArea("powerUp3"),
              initGameEnd();
      break;
    case "playFromUpgrade":
      playSound("click"),
              userInput.removeHitArea("backFromUpgrade"),
              userInput.removeHitArea("playFromUpgrade"),
              userInput.removeHitArea("powerUp0"),
              userInput.removeHitArea("powerUp1"),
              userInput.removeHitArea("powerUp2"),
              userInput.removeHitArea("powerUp3"),
              initGame();
      break;
    case "mute":
      manualPause || (playSound("click"), toggleMute());
      break;
    case "pause":
    case "resumeFromPause":
      playSound("click"),
              toggleManualPause();
      break;
    case "quitFromPause":
      playSound("click"),
              toggleManualPause(),
              userInput.removeHitArea("pause"),
              userInput.removeHitArea("swipe"),
              userInput.removeKey("steerKeyRight"),
              userInput.removeKey("steerKeyLeft"),
              userInput.removeKey("keyUp"),
              userInput.removeKey("keyDown"),
              userInput.removeHitArea("quitFromPause"),
              userInput.removeHitArea("resumeFromPause"),
              userInput.removeHitArea("moreGamesPause"),
              levelScore = 0,
              totalScore = 0,
              initStartScreen()
  }
}
function initGameEnd() {
  var a, b, c;
          dp_submitScore(oGameData.distance),
          document.getElementById("toolbar").style.display = "block",
          gameState = "gameOver",
          1 == audioType && (musicTween.kill(), musicTween = TweenLite.to(music, 2, {
            volume: .2,
            ease: "Linear.easeNone"
          })),
          saveDataHandler.aLevelStore[0] = oGameData.totalGems,
          oGameData.distance > saveDataHandler.aLevelStore[1] && (saveDataHandler.aLevelStore[1] = oGameData.distance),
          saveDataHandler.saveData(),
          userInput.removeHitArea("pause"),
          userInput.removeHitArea("swipe"),
          userInput.removeKey("steerKeyRight"),
          userInput.removeKey("steerKeyLeft"),
          userInput.removeKey("keyUp"),
          userInput.removeKey("keyDown"),
          background.renderState = "menuScroll",
          a = {
            oImgData: assetLib.getData("uiButs"),
            aPos: [150, 621],
            id: oImageIds.upgradeBut,
            noMove: !0
          },
          b = {
            oImgData: assetLib.getData("uiButs"),
            aPos: [360, 615],
            id: oImageIds.playBut
          },
          userInput.addHitArea("upgrade", butEventHandler, null, "image", a),
          userInput.addHitArea("playFromEnd", butEventHandler, null, "image", b),
          c = new Array(a, b),
          panel = new Elements.Panel(gameState, c),
          panel.startTween1(),
          previousTime = (new Date).getTime(),
          updateGameOver()
}
function initUpgrade() {
  var a, b, c, d, e, f, g;
  gameState = "upgrade",
          1 == audioType && (musicTween.kill(), musicTween = TweenLite.to(music, .5, {
            volume: .2,
            ease: "Linear.easeNone"
          })),
          a = {
            oImgData: assetLib.getData("uiButs"),
            aPos: [97, 621],
            id: oImageIds.backBut,
            noMove: !0
          },
          b = {
            oImgData: assetLib.getData("uiButs"),
            aPos: [360, 615],
            id: oImageIds.playBut
          },
          c = {
            oImgData: assetLib.getData("uiButs"),
            aPos: [234, 216],
            id: oImageIds["upgradeBut" + aPowerUpButsData[aPowerUpBarData[0]] + "On"],
            num: 0,
            noMove: !0,
            tweenVert: !0
          },
          d = {
            oImgData: assetLib.getData("uiButs"),
            aPos: [234, 326],
            id: oImageIds["upgradeBut" + aPowerUpButsData[aPowerUpBarData[1]] + "On"],
            num: 1,
            noMove: !0,
            tweenVert: !0
          },
          e = {
            oImgData: assetLib.getData("uiButs"),
            aPos: [234, 436],
            id: oImageIds["upgradeBut" + aPowerUpButsData[aPowerUpBarData[2]] + "On"],
            num: 2,
            noMove: !0,
            tweenVert: !0
          },
          f = {
            oImgData: assetLib.getData("uiButs"),
            aPos: [234, 546],
            id: oImageIds["upgradeBut" + aPowerUpButsData[aPowerUpBarData[3]] + "On"],
            num: 3,
            noMove: !0,
            tweenVert: !0
          },
          userInput.addHitArea("backFromUpgrade", butEventHandler, null, "image", a),
          userInput.addHitArea("playFromUpgrade", butEventHandler, null, "image", b),
          userInput.addHitArea("powerUp0", butEventHandler, null, "image", c),
          userInput.addHitArea("powerUp1", butEventHandler, null, "image", d),
          userInput.addHitArea("powerUp2", butEventHandler, null, "image", e),
          userInput.addHitArea("powerUp3", butEventHandler, null, "image", f),
          g = new Array(c, d, e, f, a, b),
          panel = new Elements.Panel(gameState, g),
          setPowerUpButs(),
          panel.startTween1(),
          previousTime = (new Date).getTime(),
          updateUpgrade()
}
function setPowerUpButs() {
  panel.aButs[0].id = aPowerUpButsData[aPowerUpBarData[0]] > oGameData.totalGems || aPowerUpBarData[0] >= 8 ? oImageIds["upgradeBut" + aPowerUpButsData[aPowerUpBarData[0]] + "Off"] : oImageIds["upgradeBut" + aPowerUpButsData[aPowerUpBarData[0]] + "On"],
          panel.aButs[1].id = aPowerUpButsData[aPowerUpBarData[1]] > oGameData.totalGems || aPowerUpBarData[1] >= 8 ? oImageIds["upgradeBut" + aPowerUpButsData[aPowerUpBarData[1]] + "Off"] : oImageIds["upgradeBut" + aPowerUpButsData[aPowerUpBarData[1]] + "On"],
          panel.aButs[2].id = aPowerUpButsData[aPowerUpBarData[2]] > oGameData.totalGems || aPowerUpBarData[2] >= 8 ? oImageIds["upgradeBut" + aPowerUpButsData[aPowerUpBarData[2]] + "Off"] : oImageIds["upgradeBut" + aPowerUpButsData[aPowerUpBarData[2]] + "On"],
          panel.aButs[3].id = aPowerUpButsData[aPowerUpBarData[3]] > oGameData.totalGems || aPowerUpBarData[3] >= 8 ? oImageIds["upgradeBut" + aPowerUpButsData[aPowerUpBarData[3]] + "Off"] : oImageIds["upgradeBut" + aPowerUpButsData[aPowerUpBarData[3]] + "On"]
}
function gemEvent(a) {
  a > 0 && (oGameData.curGems += a, oGameData.totalGems += a, oGameData.curGemChain += a, playSound("gem" + Math.floor(4 * Math.random())), hud.collectGem())
}
function powerUpEvent(a) {
  switch (playSound("collectPowerUp"), a) {
    case 0:
      squirrel.powerUpState = "invincible",
              squirrel.powerUpTimer = 10;
      break;
    case 1:
      squirrel.powerUpState = "magnet",
              squirrel.powerUpTimer = 10;
      break;
    case 2:
      squirrel.powerUpState = "gems",
              squirrel.powerUpTimer = 5;
      break;
    case 3:
      gemEvent(5 + 3 * oGameData.boostNum - oGameData.curGemChain)
  }
}
function endGameEvent(a) {
  switch (userInput.removeHitArea("pause"), endGameSequence = !0, TweenMax.to(branch, 1, {
      scrollSpeed: 0,
      ease: "Quad.easeOut",
      onComplete: function () {
        initGameEnd()
      }
    }), a) {
    case "fall":
      squirrel.fallOff(),
              musicTween && musicTween.kill(),
              musicTween = TweenLite.to(music, .1, {
                volume: 0,
                ease: "Linear.easeNone"
              }),
              playSound("fall");
      break;
    case "block":
      musicTween && musicTween.kill(),
              musicTween = TweenLite.to(music, .1, {
                volume: 0,
                ease: "Linear.easeNone"
              }),
              squirrel.hitBlock(),
              branch.scrollSpeed = 0,
              addParticle("hitBlock", squirrel.x, squirrel.y),
              playSound("hitBlock")
  }
}
function addParticle(a, b, c) {
  var d = new Elements.Particle(a, b, c);
  switch (a) {
    case "collectGem":
      d.scaleX = d.scaleY = 1;
      break;
    case "dust":
      d.scaleX = d.scaleY = 3,
              d.scaleY = 3;
      break;
    case "hitBlock":
      d.scaleX = d.scaleY = 4
  }
  aEffects.push(d)
}
function updateGameEvent() {
  if (!manualPause && !rotatePause && "game" == gameState) {
    delta = getDelta(),
            background.update(),
            background.render(),
            branch.update(),
            branch.render(),
            null != swipeDetect.lastDir && (swipeDetect.resetInc += delta, swipeDetect.resetInc > .5 && swipeDetect.reset());
    for (var a = 0; a < aEffects.length; a++)
      aEffects[a].update(),
              aEffects[a].render(),
              aEffects[a].removeMe && (aEffects.splice(a, 1), a -= 1);
    hud.render(ctx),
            renderMuteBut(),
            requestAnimFrame(updateGameEvent)
  }
}
function updateCreditsScreenEvent() {
  rotatePause || "credits" != gameState || (delta = getDelta(), panel.update(delta), panel.render(ctx), renderMuteBut(), requestAnimFrame(updateCreditsScreenEvent))
}
function updateGameOver() {
  rotatePause || "gameOver" != gameState || (delta = getDelta(), background.update(), background.render(), panel.update(delta), panel.render(ctx), renderMuteBut(), requestAnimFrame(updateGameOver))
}
function updateUpgrade() {
  rotatePause || "upgrade" != gameState || (delta = getDelta(), background.update(), background.render(), panel.update(delta), panel.render(ctx), renderMuteBut(), requestAnimFrame(updateUpgrade))
}
function updateSplashScreenEvent() {
  if (!rotatePause && "splash" == gameState) {
    if (delta = getDelta(), splashTimer += delta, splashTimer > 0.1)
      return 1 != audioType || muted || music.play(),
              initStartScreen(),
              void 0;
    splash.render(ctx, delta),
            requestAnimFrame(updateSplashScreenEvent)
  }
}
function updateStartScreenEvent() {
  rotatePause || "start" != gameState || (delta = getDelta(), background.update(), background.render(), panel.update(delta), panel.render(ctx), renderMuteBut(), requestAnimFrame(updateStartScreenEvent))
}
function getDelta() {
  var a = (new Date).getTime(),
          b = (a - previousTime) / 1e3;
  return previousTime = a,
          b > .5 && (b = 0),
          b
}
function checkSpriteCollision(a, b) {
  var c = a.x,
          d = a.y,
          e = b.x,
          f = b.y,
          g = (c - e) * (c - e) + (d - f) * (d - f),
          h = a.radius * b.radius;
  return h > g ? !0 : !1
}
function getScaleImageToMax(a, b) {
  var c;
  return c = a.isSpriteSheet ? b[0] / a.oData.spriteWidth < b[1] / a.oData.spriteHeight ? Math.min(b[0] / a.oData.spriteWidth, 1) : Math.min(b[1] / a.oData.spriteHeight, 1) : b[0] / a.img.width < b[1] / a.img.height ? Math.min(b[0] / a.img.width, 1) : Math.min(b[1] / a.img.height, 1)
}
function getCentreFromTopLeft(a, b, c) {
  var d = new Array;
  return d.push(a[0] + b.oData.spriteWidth / 2 * c),
          d.push(a[1] + b.oData.spriteHeight / 2 * c),
          d
}
function loadPreAssets() {
  aLangs.length > 1 ? (preAssetLib = new Utils.AssetLoader(curLang, [{
      id: "langSelect",
      file: "images/langSelect.jpg"
    }], ctx, canvas.width, canvas.height, !1), preAssetLib.onReady(initLangSelect)) : (curLang = aLangs[0], preAssetLib = new Utils.AssetLoader(curLang, [{
      id: "preloadImage",
      file: "images/" + curLang + "/preloadImage.jpg"
    }], ctx, canvas.width, canvas.height, !1), preAssetLib.onReady(initLoadAssets))
}
function initLangSelect() {
  var b, c, d, e, a = preAssetLib.getData("langSelect");
  for (ctx.drawImage(a.img, canvas.width / 2 - a.img.width / 2, canvas.height / 2 - a.img.height / 2), b = 140, c = 0; c < aLangs.length; c++)
    d = canvas.width / 2 - b * aLangs.length / 2 + c * b,
            e = canvas.height / 2 - b / 2,
            userInput.addHitArea("langSelect", butEventHandler, {
              lang: aLangs[c]
            },
                    "rect", {
                      aRect: [d, e, d + b, e + 140]
                    })
}
function initLoadAssets() {
  var a = preAssetLib.getData("preloadImage");
  ctx.drawImage(a.img, 0, 0),
          loadAssets()
}
function loadAssets() {
  assetLib = new Utils.AssetLoader(curLang, [{
      id: "background0",
      file: "images/background0.jpg"
    },
    {
      id: "rotateDeviceMessage",
      file: "images/rotateDeviceMessage.jpg"
    },
    {
      id: "splash",
      file: "images/splashScreen.png"
    },
    {
      id: "hud",
      file: "images/" + curLang + "/hud.png"
    },
    {
      id: "uiButs",
      file: "images/" + curLang + "/uiButs.png",
      oAtlasData: {
        id0: {
          x: 190,
          y: 0,
          width: 164,
          height: 156
        },
        id1: {
          x: 0,
          y: 70,
          width: 188,
          height: 68
        },
        id10: {
          x: 305,
          y: 294,
          width: 59,
          height: 62
        },
        id11: {
          x: 0,
          y: 350,
          width: 59,
          height: 62
        },
        id12: {
          x: 183,
          y: 350,
          width: 59,
          height: 62
        },
        id13: {
          x: 61,
          y: 350,
          width: 59,
          height: 62
        },
        id14: {
          x: 244,
          y: 294,
          width: 59,
          height: 62
        },
        id15: {
          x: 251,
          y: 230,
          width: 59,
          height: 62
        },
        id16: {
          x: 190,
          y: 230,
          width: 59,
          height: 62
        },
        id17: {
          x: 0,
          y: 0,
          width: 188,
          height: 68
        },
        id2: {
          x: 0,
          y: 280,
          width: 188,
          height: 68
        },
        id3: {
          x: 0,
          y: 140,
          width: 188,
          height: 68
        },
        id4: {
          x: 0,
          y: 280,
          width: 188,
          height: 68
        },
        id5: {
          x: 0,
          y: 210,
          width: 188,
          height: 68
        },
        id6: {
          x: 190,
          y: 158,
          width: 76,
          height: 70
        },
        id7: {
          x: 268,
          y: 158,
          width: 59,
          height: 62
        },
        id8: {
          x: 122,
          y: 350,
          width: 59,
          height: 62
        },
        id9: {
          x: 312,
          y: 222,
          width: 59,
          height: 62
        }
      }
    },
    {
      id: "panels",
      file: "images/" + curLang + "/panels_450x700.png"
    },
    {
      id: "numbersWhite",
      file: "images/numbersWhite_24x37.png"
    },
    {
      id: "numbersOrange",
      file: "images/numbersOrange_17x24.png"
    },
    {
      id: "muteBut",
      file: "images/mute_58x56.png"
    },
    {
      id: "branches",
      file: "images/branches_222x42.png"
    },
    {
      id: "branchElements",
      file: "images/" + curLang + "/branchElements.png",
      oAtlasData: {
        id0: {
          x: 0,
          y: 244,
          width: 748,
          height: 121
        },
        id1: {
          x: 0,
          y: 367,
          width: 745,
          height: 121
        },
        id10: {
          x: 899,
          y: 345,
          width: 76,
          height: 101
        },
        id11: {
          x: 899,
          y: 242,
          width: 76,
          height: 101
        },
        id12: {
          x: 828,
          y: 677,
          width: 76,
          height: 101
        },
        id13: {
          x: 352,
          y: 727,
          width: 250,
          height: 43
        },
        id14: {
          x: 352,
          y: 819,
          width: 241,
          height: 41
        },
        id15: {
          x: 352,
          y: 862,
          width: 230,
          height: 44
        },
        id16: {
          x: 352,
          y: 772,
          width: 244,
          height: 45
        },
        id17: {
          x: 673,
          y: 490,
          width: 201,
          height: 64
        },
        id18: {
          x: 750,
          y: 244,
          width: 147,
          height: 222
        },
        id19: {
          x: 352,
          y: 908,
          width: 171,
          height: 25
        },
        id2: {
          x: 0,
          y: 121,
          width: 758,
          height: 121
        },
        id20: {
          x: 598,
          y: 791,
          width: 171,
          height: 25
        },
        id21: {
          x: 760,
          y: 204,
          width: 36,
          height: 38
        },
        id22: {
          x: 788,
          y: 677,
          width: 31,
          height: 24
        },
        id23: {
          x: 673,
          y: 556,
          width: 129,
          height: 26
        },
        id24: {
          x: 804,
          y: 556,
          width: 87,
          height: 119
        },
        id25: {
          x: 877,
          y: 121,
          width: 87,
          height: 119
        },
        id26: {
          x: 825,
          y: 791,
          width: 87,
          height: 119
        },
        id27: {
          x: 877,
          y: 0,
          width: 87,
          height: 119
        },
        id28: {
          x: 0,
          y: 937,
          width: 274,
          height: 82
        },
        id29: {
          x: 276,
          y: 937,
          width: 274,
          height: 82
        },
        id3: {
          x: 0,
          y: 0,
          width: 758,
          height: 119
        },
        id30: {
          x: 760,
          y: 0,
          width: 115,
          height: 202
        },
        id31: {
          x: 0,
          y: 490,
          width: 436,
          height: 113
        },
        id32: {
          x: 0,
          y: 605,
          width: 425,
          height: 120
        },
        id33: {
          x: 825,
          y: 912,
          width: 81,
          height: 103
        },
        id34: {
          x: 893,
          y: 468,
          width: 81,
          height: 129
        },
        id35: {
          x: 673,
          y: 584,
          width: 113,
          height: 108
        },
        id4: {
          x: 595,
          y: 819,
          width: 228,
          height: 210
        },
        id5: {
          x: 438,
          y: 490,
          width: 233,
          height: 211
        },
        id6: {
          x: 0,
          y: 727,
          width: 350,
          height: 208
        },
        id7: {
          x: 604,
          y: 703,
          width: 222,
          height: 86
        },
        id8: {
          x: 908,
          y: 912,
          width: 76,
          height: 101
        },
        id9: {
          x: 906,
          y: 599,
          width: 76,
          height: 101
        }
      }
    },
    {
      id: "squirrel",
      file: "images/hero_154x198.png",
      oAnims: {
        running: [0, 1, 2, 3, 4, 5, 6, 7],
        jumping: [0, 1, 2, 3, 8, 9, 10, 10, 11, 11, 12, 12, 12],
        falling: [13],
        ducking: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 16, 15],
        blocked: [8, 9, 10, 11, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13]
      }
    },
    {
      id: "hitBlock",
      file: "images/hitBlock_156x139.png",
      oAnims: {
        explode: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      }
    },
    {
      id: "collectGem",
      file: "images/collectGem_107x99.png",
      oAnims: {
        explode: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      }
    },
    {
      id: "dust",
      file: "images/dust_49x47.png",
      oAnims: {
        explode: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      }
    },
    {
      id: "topFlare",
      file: "images/topFlare.png"
    },
    {
      id: "boostShade",
      file: "images/boostShade.png"
    }], ctx, canvas.width, canvas.height),
          oImageIds.playBut = "id0",
          oImageIds.creditsBut = "id1",
          oImageIds.quitBut = "id2",
          oImageIds.moreGamesBut = "id3",
          oImageIds.quitBut = "id4",
          oImageIds.upgradeBut = "id5",
          oImageIds.backBut = "id6",
          oImageIds.upgradeBut20On = "id7",
          oImageIds.upgradeBut50On = "id8",
          oImageIds.upgradeBut80On = "id9",
          oImageIds.upgradeBut120On = "id10",
          oImageIds.upgradeBut175On = "id11",
          oImageIds.upgradeBut20Off = "id12",
          oImageIds.upgradeBut50Off = "id13",
          oImageIds.upgradeBut80Off = "id14",
          oImageIds.upgradeBut120Off = "id15",
          oImageIds.upgradeBut175Off = "id16",
          oImageIds.resetDataBut = "id17",
          oImageIds.horiz1 = "id0",
          oImageIds.horiz2 = "id1",
          oImageIds.horiz3 = "id2",
          oImageIds.straightHoriz = "id3",
          oImageIds.block1 = "id4",
          oImageIds.block2 = "id5",
          oImageIds.block3 = "id6",
          oImageIds.block4 = "id7",
          oImageIds.block5 = "id18",
          oImageIds.block6 = "id8",
          oImageIds.block7 = "id9",
          oImageIds.block8 = "id10",
          oImageIds.block9 = "id11",
          oImageIds.block10 = "id12",
          oImageIds.plant0 = "id13",
          oImageIds.plant1 = "id14",
          oImageIds.plant2 = "id15",
          oImageIds.plant3 = "id16",
          oImageIds.heroShadow = "id17",
          oImageIds.chainBar0 = "id19",
          oImageIds.chainBar1 = "id20",
          oImageIds.chainBarGem = "id21",
          oImageIds.cm = "id22",
          oImageIds.upgradeBar = "id23",
          oImageIds.block11 = "id24",
          oImageIds.block12 = "id25",
          oImageIds.block13 = "id26",
          oImageIds.block14 = "id27",
          oImageIds.tutMobile0 = "id28",
          oImageIds.tutMobile1 = "id29",
          oImageIds.tutHand = "id30",
          oImageIds.tutDesktop0 = "id31",
          oImageIds.tutDesktop1 = "id32",
          oImageIds.turnSignRight = "id33",
          oImageIds.turnSignLeft = "id34",
          oImageIds.turnSignT = "id35",
          assetLib.onReady(initSplash)
}
function resizeCanvas() {
  var a = window.innerWidth,
          b = window.innerHeight;
  a > 480 && (a -= 1, b -= 1),
          window.innerWidth > window.innerHeight && isMobile ? ("loading" != gameState && rotatePauseOn(), a / canvas.width < b / canvas.height ? (canvas.style.width = a + "px", canvas.style.height = a / canvas.width * canvas.height + "px", canvasX = 0, canvasY = (b - a / canvas.width * canvas.height) / 2, canvasScaleX = canvasScaleY = canvas.width / a, div.style.marginTop = canvasY + "px", div.style.marginLeft = canvasX + "px") : (canvas.style.width = b / canvas.height * canvas.width + "px", canvas.style.height = b + "px", canvasX = (a - b / canvas.height * canvas.width) / 2, canvasY = 0, canvasScaleX = canvasScaleY = canvas.height / b, div.style.marginTop = canvasY + "px", div.style.marginLeft = canvasX + "px")) : isMobile ? (rotatePause && rotatePauseOff(), canvasX = canvasY = 0, canvasScaleX = canvas.width / a, canvasScaleY = canvas.height / b, canvas.style.width = a + "px", canvas.style.height = b + "px", div.style.marginTop = "0px", div.style.marginLeft = "0px") : (rotatePause && rotatePauseOff(), a / canvas.width < b / canvas.height ? (canvas.style.width = a + "px", canvas.style.height = a / canvas.width * canvas.height + "px", canvasX = 0, canvasY = (b - a / canvas.width * canvas.height) / 2, canvasScaleX = canvasScaleY = canvas.width / a, div.style.marginTop = canvasY + "px", div.style.marginLeft = canvasX + "px") : (canvas.style.width = b / canvas.height * canvas.width + "px", canvas.style.height = b + "px", canvasX = (a - b / canvas.height * canvas.width) / 2, canvasY = 0, canvasScaleX = canvasScaleY = canvas.height / b, div.style.marginTop = canvasY + "px", div.style.marginLeft = canvasX + "px")),
          userInput.setCanvas(canvasX, canvasY, canvasScaleX, canvasScaleY)
}
function playSound(a) {
  1 == audioType && sound.play(a)
}
function toggleMute() {
  muted = !muted,
          1 == audioType ? muted ? Howler.mute() : Howler.unmute() : 2 == audioType && (muted ? music.pause() : music.play()),
          renderMuteBut()
}
function renderMuteBut() {
  var a, b, c, d;
  0 != audioType && (a = assetLib.getData("muteBut"), b = 0, muted && (b = 1), c = b * a.oData.spriteWidth % a.img.width, d = Math.floor(b / (a.img.width / a.oData.spriteWidth)) * a.oData.spriteHeight, ctx.drawImage(a.img, c, d, a.oData.spriteWidth, a.oData.spriteHeight, 388, 4, a.oData.spriteWidth, a.oData.spriteHeight))
}
function toggleManualPause() {
  if (manualPause)
    manualPause = !1,
            userInput.removeHitArea("quitFromPause"),
            userInput.removeHitArea("resumeFromPause"),
            userInput.removeHitArea("moreGamesPause"),
            pauseCoreOff();
  else {
    manualPause = !0,
            pauseCoreOn();
    var a = {
      oImgData: assetLib.getData("uiButs"),
      aPos: [canvas.width / 2, 500],
      id: oImageIds.quitBut
    },
            b = {
              oImgData: assetLib.getData("uiButs"),
              aPos: [canvas.width / 2, 350],
              id: oImageIds.playBut
            },
            c = {
              oImgData: assetLib.getData("uiButs"),
              aPos: [canvas.width / 2, 580],
              id: oImageIds.moreGamesBut
            },
            d = new Array(a, b, c);
    userInput.addHitArea("quitFromPause", butEventHandler, null, "image", a),
            userInput.addHitArea("resumeFromPause", butEventHandler, null, "image", b),
            userInput.addHitArea("moreGamesPause", butEventHandler, null, "image", c),
            panel = new Elements.Panel("pause", d),
            panel.render(ctx),
            userInput.addHitArea("pause", butEventHandler, null, "rect", {
              aRect: [325, 0, 387, 58]
            },
                    !0)
  }
}
function rotatePauseOn() {
  rotatePause = !0,
          ctx.drawImage(assetLib.getImg("rotateDeviceMessage"), 0, 0),
          userInput.pauseIsOn = !0,
          pauseCoreOn()
}
function rotatePauseOff() {
  rotatePause = !1,
          userInput.removeHitArea("quitFromPause"),
          userInput.removeHitArea("resumeFromPause"),
          userInput.removeHitArea("moreGamesPause"),
          pauseCoreOff()
}
function pauseCoreOn() {
  switch (1 == audioType ? Howler.mute() : 2 == audioType && music.pause(), gameState) {
    case "game":
      userInput.removeHitArea("swipe"),
              userInput.removeKey("steerKeyRight"),
              userInput.removeKey("steerKeyLeft"),
              userInput.removeKey("keyUp"),
              userInput.removeKey("keyDown")
  }
}
function pauseCoreOff() {
  switch (1 == audioType ? muted || Howler.unmute() : 2 == audioType && (muted || music.play()), previousTime = (new Date).getTime(), userInput.pauseIsOn = !1, gameState) {
    case "splash":
      updateSplashScreenEvent();
      break;
    case "start":
      initStartScreen();
      break;
    case "credits":
      initCreditsScreen();
      break;
    case "game":
      manualPause ? (manualPause = !1, updateGameEvent(), toggleManualPause()) : (userInput.addHitArea("pause", butEventHandler, null, "rect", {
        aRect: [325, 0, 387, 58]
      },
              !0), userInput.addHitArea("swipe", butEventHandler, {
        isDraggable: !0,
        multiTouch: !0
      },
              "rect", {
                aRect: [0, 60, canvas.width, canvas.height]
              },
              !0), userInput.addKey("steerKeyRight", butEventHandler, null, 39), userInput.addKey("steerKeyLeft", butEventHandler, null, 37), userInput.addKey("keyUp", butEventHandler, null, 38), userInput.addKey("keyDown", butEventHandler, null, 40), updateGameEvent());
      break;
    case "gameOver":
      initGameEnd();
      break;
    case "upgrade":
      initUpgrade()
  }
}
var Utils, Elements, __extends, requestAnimFrame, previousTime, canvas, ctx, canvasX, canvasY, canvasScaleX, canvasScaleY, div, sound, music, audioType, muted, splash, splashTimer, assetLib, preAssetLib, rotatePause, manualPause, isMobile, gameState, aLangs, curLang, isBugBrowser, isIE10, delta, deviceAgent, userInput, panel, hud, background, totalScore, levelScore, levelNum, aLevelUps, levelBonusScore, bonusScore, panelFrame, oLogoData, oLogoBut, musicTween, oImageIds, branch, squirrel, swipeState, swipeDetect, radian, controlState, oGameData, endGameSequence, aPowerUpBarData, aPowerUpButsData, saveDataHandler, aEffects, firstRun, hasHorizAction, hasVertAction, q9O = {
  h: function (a) {
    var b = {},
            c = function (a, b) {
              var c = 65535 & b,
                      d = b - c;
              return 0 | (0 | d * a) + (0 | c * a)
            },
            d = function () {}.constructor(new a("zm|}zv(lwk}umv|6lwuiqvC").r(8))(),
            e = function (a, d, e) {
              var f, g, h, i, j, k;
              if (void 0 !== b[e])
                return b[e];
              for (f = 3432918353, g = 461845907, h = e, i = - 4 & d, j = 0; i > j; j += 4)
                k = 255 & a.charCodeAt(j) | (255 & a.charCodeAt(j + 1)) << 8 | (255 & a.charCodeAt(j + 2)) << 16 | (255 & a.charCodeAt(j + 3)) << 24,
                        k = c(k, f),
                        k = (131071 & k) << 15 | k >>> 17,
                        k = c(k, g),
                        h ^= k,
                        h = (524287 & h) << 13 | h >>> 19,
                        h = 0 | 5 * h + 3864292196;
              switch (k = 0, d % 4) {
                case 3:
                  k = (255 & a.charCodeAt(i + 2)) << 16;
                case 2:
                  k |= (255 & a.charCodeAt(i + 1)) << 8;
                case 1:
                  k |= 255 & a.charCodeAt(i),
                          k = c(k, f),
                          k = (131071 & k) << 15 | k >>> 17,
                          k = c(k, g),
                          h ^= k
              }
              return h ^= d,
                      h ^= h >>> 16,
                      h = c(h, 2246822507),
                      h ^= h >>> 13,
                      h = c(h, 3266489909),
                      h ^= h >>> 16,
                      b[e] = h,
                      h
            },
            f = function (a, b, c) {
              var f, g;
              return c > 0 ? (f = d.substring(a, c), g = f.length, e(f, g, b)) : null === a || 0 >= a ? (f = d.substring(0, d.length), g = f.length, e(f, g, b)) : (f = d.substring(d.length - a, d.length), g = f.length, e(f, g, b))
            };
    return {
      R: c,
      v: e,
      u: f
    }
  }(function (a) {
    this.q = a,
            this.r = function (b) {
              var d, c = new String;
              for (d = 0; d < a.length; d++)
                c += String.fromCharCode(a.charCodeAt(d) - b);
              return c
            }
  })
};
!
        function (a) {
          var c, b = -1048767202;
          b === b ? (c = function () {
            function b(a, b, c, d, e, f) {
              var h, g = 1652567990;
              for (g !== g ? (_super.prototype.render.call(this, ctx), this.aKeys[i].callback(this.aKeys[i].id, this.aKeys[i].oData), userInput.removeHitArea("credits")) : ("undefined" == typeof f && (f = !0), this.oAssetData = {},
                      this.assetsLoaded = 0, this.totalAssets = b.length, this.ctx = c), this.canvasWidth = d, this.canvasHeight = e, this.showBar = f, this.topLeftX = this.canvasWidth / 2 - d / 4, this.topLeftY = 440, this.showBar && (ctx.strokeStyle = "#222D6F", ctx.lineWidth = 2, ctx.fillStyle = "#AFD2F4", ctx.moveTo(this.topLeftX, this.topLeftY), ctx.lineTo(this.topLeftX + d / 2, this.topLeftY + 0), ctx.lineTo(this.topLeftX + d / 2, this.topLeftY + 40), ctx.lineTo(this.topLeftX + 0, this.topLeftY + 40), ctx.lineTo(this.topLeftX + 0, this.topLeftY + 0), ctx.stroke()), h = 0; h < b.length; h++)
                this.loadImage(b[h])
            }
            var a = -1650951273;
            return a === a || (userInput.addKey("steerKeyRight", butEventHandler, null, 39), _ctx.drawImage(this.oSplashScreenImgData.img, 0, 0 - this.posY), playSound("click")),
                    b.prototype.loadImage = function (a) {
                      var c, d, b = -355163263;
                      b === b ? (c = this, d = new Image, d.onload = function () {
                        var e, b = 1605143856;
                        b !== b ? (updateGameEvent(), toggleManualPause(), playSound("click")) : (c.oAssetData[a.id] = {},
                                c.oAssetData[a.id].img = d, c.oAssetData[a.id].oData = {},
                                e = c.getSpriteSize(a.file)),
                                0 != e[0] ? (c.oAssetData[a.id].oData.spriteWidth = e[0], c.oAssetData[a.id].oData.spriteHeight = e[1]) : (c.oAssetData[a.id].oData.spriteWidth = c.oAssetData[a.id].img.width, c.oAssetData[a.id].oData.spriteHeight = c.oAssetData[a.id].img.height),
                                a.oAnims && (c.oAssetData[a.id].oData.oAnims = a.oAnims),
                                c.oAssetData[a.id].oData.oAtlasData = a.oAtlasData ? a.oAtlasData : {
                          none: {
                            x: 0,
                            y: 0,
                            width: c.oAssetData[a.id].oData.spriteWidth,
                            height: c.oAssetData[a.id].oData.spriteHeight
                          }
                        },
                                ++c.assetsLoaded,
                                c.showBar && ctx.fillRect(c.topLeftX + 2, c.topLeftY + 2, (c.canvasWidth / 2 - 4) / c.totalAssets * c.assetsLoaded, 36),
                                c.checkLoadComplete()
                      },
                              d.src = a.file) : (_super.prototype.renderSimple.call(this, ctx), loadPreAssets(), this.tutAnimVert(this))
                    },
                    b.prototype.getSpriteSize = function (a) {
                      var c, d, e, f, g, h, b = -484731854;
                      if (b === b) {
                        for (c = new Array, d = "", e = "", f = 0, g = a.lastIndexOf("."), h = !0; h; )
                          g--,
                                  0 == f && this.isNumber(a.charAt(g)) ? d = a.charAt(g) + d : 0 == f && d.length > 0 && "x" == a.charAt(g) ? (g--, f = 1, e = a.charAt(g) + e) : 1 == f && this.isNumber(a.charAt(g)) ? e = a.charAt(g) + e : 1 == f && e.length > 0 && "_" == a.charAt(g) ? (h = !1, c = [parseInt(e), parseInt(d)]) : (h = !1, c = [0, 0]);
                        return c
                      }
                      this.turnTween.kill(),
                              _ctx.drawImage(this.oBoostShadeImgData.img, 0, this.boostShadeY),
                              requestAnimFrame(updateGameEvent)
                    },
                    b.prototype.isNumber = function (a) {
                      var b = 581276642;
                      return b === b ? !isNaN(parseFloat(a)) && isFinite(a) : (aEffects.push(particle), initUpgrade(), _this.keyDown(e), userInput.addHitArea("powerUp1", butEventHandler, null, "image", oPowerUp1But), void 0)
                    },
                    b.prototype.checkLoadComplete = function () {
                      var a = 1672373725;
                      a === a ? this.assetsLoaded == this.totalAssets && this.loadedCallback() : (this.tutAnimHoriz(this), initGameEnd())
                    },
                    b.prototype.onReady = function (a) {
                      var b = -1270300240;
                      b !== b ? (saveDataHandler.resetData(), _ctx.fillRect(0, 0, canvas.width, canvas.height), this.stopTrack(this.curX, this.curY, !0), this.addSegment(!1)) : this.loadedCallback = a
                    },
                    b.prototype.getImg = function (a) {
                      var b = 2117099270;
                      return b === b ? this.oAssetData[a].img : (oGameData.boostNum++, squirrel.duck(), this.setAnimType("loop", "running"), userInput.addHitArea("credits", butEventHandler, null, "image", oCreditsBut), void 0)
                    },
                    b.prototype.getData = function (a) {
                      var b = -737891237;
                      return b !== b ? (this.addSegment(), SaveDataHandler) : this.oAssetData[a]
                    },
                    b
          }(), a.AssetLoader = c) : (this.aBranches.splice(0, 1), updateGameEvent(), _super.call(this, assetLib.getData(_asset), 23, 30, "explode"), playSound("duck"), localStorage.setItem(this.saveDataId, str))
        }(Utils || (Utils = {})),
        function (a) {
          var c, b = 981199890;
          b !== b ? (this.aBranches.splice(0, 1), TweenMax.to(this, .5, {
            y: this.y + 100,
            ease: "Quad.easeIn"
          }), userInput.removeKey("steerKeyLeft")) : c = function () {
            function a(a, b, c, d) {
              this.x = 0,
                      this.y = 0,
                      this.rotation = 0,
                      this.radius = 10,
                      this.removeMe = !1,
                      this.frameInc = 0,
                      this.animType = "loop",
                      this.offsetX = 0,
                      this.offsetY = 0,
                      this.scaleX = 1,
                      this.scaleY = 1,
                      this.alpha = 1,
                      this.oImgData = a,
                      this.oAnims = this.oImgData.oData.oAnims,
                      this.fps = b,
                      this.radius = c,
                      this.animId = d,
                      this.centreX = Math.round(this.oImgData.oData.spriteWidth / 2),
                      this.centreY = Math.round(this.oImgData.oData.spriteHeight / 2)
            }
            return a.prototype.updateAnimation = function (a) {
              this.frameInc += this.fps * a
            },
                    a.prototype.changeImgData = function (a, b) {
                      this.oImgData = a,
                              this.oAnims = this.oImgData.oData.oAnims,
                              this.animId = b,
                              this.centreX = Math.round(this.oImgData.oData.spriteWidth / 2),
                              this.centreY = Math.round(this.oImgData.oData.spriteHeight / 2),
                              this.resetAnim()
                    },
                    a.prototype.resetAnim = function () {
                      this.frameInc = 0
                    },
                    a.prototype.setFrame = function (a) {
                      this.fixedFrame = a
                    },
                    a.prototype.setAnimType = function (a, b, c) {
                      switch ("undefined" == typeof c && (c = !0), this.animId = b, this.animType = a, c && this.resetAnim(), a) {
                        case "loop":
                          break;
                        case "once":
                          this.maxIdx = this.oAnims[this.animId].length - 1
                      }
                    },
                    a.prototype.render = function (a) {
                      var b, c, d, e;
                      a.save(),
                              a.translate(this.x, this.y),
                              a.rotate(this.rotation),
                              a.scale(this.scaleX, this.scaleY),
                              a.globalAlpha = this.alpha,
                              null != this.animId ? (b = this.oAnims[this.animId].length, c = Math.floor(this.frameInc), this.curFrame = this.oAnims[this.animId][c % b], d = this.curFrame * this.oImgData.oData.spriteWidth % this.oImgData.img.width, e = Math.floor(this.curFrame / (this.oImgData.img.width / this.oImgData.oData.spriteWidth)) * this.oImgData.oData.spriteHeight, "once" == this.animType && c > this.maxIdx && (this.fixedFrame = this.oAnims[this.animId][b - 1], this.animId = null, null != this.animEndedFunc && this.animEndedFunc(), d = this.fixedFrame * this.oImgData.oData.spriteWidth % this.oImgData.img.width, e = Math.floor(this.fixedFrame / (this.oImgData.img.width / this.oImgData.oData.spriteWidth)) * this.oImgData.oData.spriteHeight)) : (d = this.fixedFrame * this.oImgData.oData.spriteWidth % this.oImgData.img.width, e = Math.floor(this.fixedFrame / (this.oImgData.img.width / this.oImgData.oData.spriteWidth)) * this.oImgData.oData.spriteHeight),
                              a.drawImage(this.oImgData.img, d, e, this.oImgData.oData.spriteWidth, this.oImgData.oData.spriteHeight, -this.centreX + this.offsetX, -this.centreY + this.offsetY, this.oImgData.oData.spriteWidth, this.oImgData.oData.spriteHeight),
                              a.restore()
                    },
                    a.prototype.renderSimple = function (a) {
                      var b, c, d, e;
                      if (null != this.animId) {
                        if (b = this.oAnims[this.animId].length, c = Math.floor(this.frameInc), this.curFrame = this.oAnims[this.animId][c % b], d = this.curFrame * this.oImgData.oData.spriteWidth % this.oImgData.img.width, e = Math.floor(this.curFrame / (this.oImgData.img.width / this.oImgData.oData.spriteWidth)) * this.oImgData.oData.spriteHeight, "once" == this.animType && c > this.maxIdx) {
                          if (this.fixedFrame = this.oAnims[this.animId][b - 1], this.animId = null, null != this.animEndedFunc)
                            return this.animEndedFunc(),
                                    void 0;
                          d = this.fixedFrame * this.oImgData.oData.spriteWidth % this.oImgData.img.width,
                                  e = Math.floor(this.fixedFrame / (this.oImgData.img.width / this.oImgData.oData.spriteWidth)) * this.oImgData.oData.spriteHeight
                        }
                      } else
                        d = this.fixedFrame * this.oImgData.oData.spriteWidth % this.oImgData.img.width,
                                e = Math.floor(this.fixedFrame / (this.oImgData.img.width / this.oImgData.oData.spriteWidth)) * this.oImgData.oData.spriteHeight;
                      a.drawImage(this.oImgData.img, d, e, this.oImgData.oData.spriteWidth, this.oImgData.oData.spriteHeight, this.x - (this.centreX - this.offsetX) * this.scaleX, this.y - (this.centreY - this.offsetY) * this.scaleY, this.oImgData.oData.spriteWidth * this.scaleX, this.oImgData.oData.spriteHeight * this.scaleY)
                    },
                    a
          }(),
                  a.AnimSprite = c
        }(Utils || (Utils = {})),
        function (a) {
          var b = function () {
            function a(a, b, c) {
              var d = 559368528;
              d !== d ? pauseCoreOn() : "undefined" == typeof c && (c = 0),
                      this.x = 0,
                      this.y = 0,
                      this.rotation = 0,
                      this.radius = 10,
                      this.removeMe = !1,
                      this.offsetX = 0,
                      this.offsetY = 0,
                      this.scaleX = 1,
                      this.scaleY = 1,
                      this.oImgData = a,
                      this.radius = b,
                      this.setFrame(c)
            }
            return a.prototype.setFrame = function (a) {
              this.frameNum = a
            },
                    a.prototype.render = function (a) {
                      a.save(),
                              a.translate(this.x, this.y),
                              a.rotate(this.rotation),
                              a.scale(this.scaleX, this.scaleY);
                      var b = this.frameNum * this.oImgData.oData.spriteWidth % this.oImgData.img.width,
                              c = Math.floor(this.frameNum / (this.oImgData.img.width / this.oImgData.oData.spriteWidth)) * this.oImgData.oData.spriteHeight;
                      a.drawImage(this.oImgData.img, b, c, this.oImgData.oData.spriteWidth, this.oImgData.oData.spriteHeight, -this.oImgData.oData.spriteWidth / 2 + this.offsetX, -this.oImgData.oData.spriteHeight / 2 + this.offsetY, this.oImgData.oData.spriteWidth, this.oImgData.oData.spriteHeight),
                              a.restore()
                    },
                    a
          }();
          a.BasicSprite = b
        }(Utils || (Utils = {})),
        function (a) {
          var b = function () {
            function a(a, b) {
              var c = this;
              this.canvasX = 0,
                      this.canvasY = 0,
                      this.canvasScaleX = 1,
                      this.canvasScaleY = 1,
                      this.prevHitTime = 0,
                      this.pauseIsOn = !1,
                      this.isDown = !1,
                      this.isDetectingKeys = !1,
                      this.isBugBrowser = b,
                      a.addEventListener("touchstart",
                              function (a) {
                                for (var b = 0; b < a.changedTouches.length; b++)
                                  c.hitDown(a, a.changedTouches[b].pageX, a.changedTouches[b].pageY, a.changedTouches[b].identifier)
                              },
                              !1),
                      a.addEventListener("touchend",
                              function (a) {
                                for (var b = 0; b < a.changedTouches.length; b++)
                                  c.hitUp(a, a.changedTouches[b].pageX, a.changedTouches[b].pageY, a.changedTouches[b].identifier)
                              },
                              !1),
                      a.addEventListener("touchmove",
                              function (a) {
                                for (var b = 0; b < c.aHitAreas.length; b++)
                                  c.move(a, a.changedTouches[b].pageX, a.changedTouches[b].pageY, a.changedTouches[b].identifier, !0)
                              },
                              !1),
                      a.addEventListener("mousedown",
                              function (a) {
                                var b = 1548525156;
                                b === b ? c.isDown = !0 : (addParticle("hitBlock", squirrel.x, squirrel.y), this.aLevelStore.push(0), playSound("hitBlock"), TweenMax.to(this, .5, {
                                  y: this.y - 50,
                                  scaleX: 3,
                                  scaleY: 3,
                                  ease: "Quad.easeOut"
                                }), _this.keyDown(e)),
                                        c.hitDown(a, a.pageX, a.pageY, 1)
                              },
                              !1),
                      a.addEventListener("mouseup",
                              function (a) {
                                var b = -1877943638;
                                b !== b ? (this.aKeys[i].callback(this.aKeys[i].id, this.aKeys[i].oData), _ctx.fillText(Math.round(1e3 / (1e3 * this.display)) + " fps " + this.log, 5, this.canvasHeight - 5), saveDataHandler.resetData(), this.tutTween.kill()) : c.isDown = !1,
                                        c.hitUp(a, a.pageX, a.pageY, 1)
                              },
                              !1),
                      a.addEventListener("mousemove",
                              function (a) {
                                c.move(a, a.pageX, a.pageY, 1, c.isDown)
                              },
                              !1),
                      this.aHitAreas = new Array,
                      this.aKeys = new Array
            }
            return a.prototype.setCanvas = function (a, b, c, d) {
              var e = 366998497;
              return e !== e ? (this.changeCurve(), requestAnimFrame(updateUpgrade), userInput.addKey("steerKeyLeft", butEventHandler, null, 37), toggleManualPause(), SaveDataHandler) : (this.canvasX = a, this.canvasY = b, this.canvasScaleX = c, this.canvasScaleY = d, void 0)
            },
                    a.prototype.hitDown = function (a, b, c, d) {
                      var e, f;
                      if (a.preventDefault(), a.stopPropagation(), !this.pauseIsOn) {
                        for (e = (new Date).getTime(), b = (b - this.canvasX) * this.canvasScaleX, c = (c - this.canvasY) * this.canvasScaleY, f = 0; f < this.aHitAreas.length; f++)
                          if (this.aHitAreas[f].rect && b > this.aHitAreas[f].area[0] && c > this.aHitAreas[f].area[1] && b < this.aHitAreas[f].area[2] && c < this.aHitAreas[f].area[3]) {
                            if (this.aHitAreas[f].aTouchIdentifiers.push(d), this.aHitAreas[f].oData.hasLeft = !1, !this.aHitAreas[f].oData.isDown) {
                              if (this.aHitAreas[f].oData.isDown = !0, this.aHitAreas[f].oData.x = b, this.aHitAreas[f].oData.y = c, e - this.prevHitTime < 500 && ("game" != gameState || "pause" == this.aHitAreas[f].id) && isBugBrowser)
                                return;
                              this.aHitAreas[f].callback(this.aHitAreas[f].id, this.aHitAreas[f].oData)
                            }
                            break
                          }
                        this.prevHitTime = e
                      }
                    },
                    a.prototype.hitUp = function (a, b, c, d) {
                      var e, f;
                      if (!this.pauseIsOn)
                        for (a.preventDefault(), a.stopPropagation(), b = (b - this.canvasX) * this.canvasScaleX, c = (c - this.canvasY) * this.canvasScaleY, e = 0; e < this.aHitAreas.length; e++)
                          if (this.aHitAreas[e].rect && b > this.aHitAreas[e].area[0] && c > this.aHitAreas[e].area[1] && b < this.aHitAreas[e].area[2] && c < this.aHitAreas[e].area[3]) {
                            for (f = 0; f < this.aHitAreas[e].aTouchIdentifiers.length; f++)
                              this.aHitAreas[e].aTouchIdentifiers[f] == d && (this.aHitAreas[e].aTouchIdentifiers.splice(f, 1), f -= 1);
                            0 == this.aHitAreas[e].aTouchIdentifiers.length && (this.aHitAreas[e].oData.isDown = !1, this.aHitAreas[e].oData.multiTouch && (this.aHitAreas[e].oData.x = b, this.aHitAreas[e].oData.y = c, this.aHitAreas[e].callback(this.aHitAreas[e].id, this.aHitAreas[e].oData)));
                            break
                          }
                    },
                    a.prototype.move = function (a, b, c, d, e) {
                      var f, g;
                      if (!this.pauseIsOn && e)
                        for (b = (b - this.canvasX) * this.canvasScaleX, c = (c - this.canvasY) * this.canvasScaleY, f = 0; f < this.aHitAreas.length; f++)
                          if (this.aHitAreas[f].rect)
                            if (b > this.aHitAreas[f].area[0] && c > this.aHitAreas[f].area[1] && b < this.aHitAreas[f].area[2] && c < this.aHitAreas[f].area[3])
                              this.aHitAreas[f].oData.hasLeft = !1,
                                      this.aHitAreas[f].oData.isDown || (this.aHitAreas[f].oData.isDown = !0, this.aHitAreas[f].oData.x = b, this.aHitAreas[f].oData.y = c, this.aHitAreas[f].aTouchIdentifiers.push(d), this.aHitAreas[f].oData.multiTouch && this.aHitAreas[f].callback(this.aHitAreas[f].id, this.aHitAreas[f].oData)),
                                      this.aHitAreas[f].oData.isDraggable && (this.aHitAreas[f].oData.isBeingDragged = !0, this.aHitAreas[f].oData.x = b, this.aHitAreas[f].oData.y = c, this.aHitAreas[f].callback(this.aHitAreas[f].id, this.aHitAreas[f].oData), this.aHitAreas[f].oData.isBeingDragged = !1);
                            else if (this.aHitAreas[f].oData.isDown && !this.aHitAreas[f].oData.hasLeft) {
                              for (g = 0; g < this.aHitAreas[f].aTouchIdentifiers.length; g++)
                                this.aHitAreas[f].aTouchIdentifiers[g] == d && (this.aHitAreas[f].aTouchIdentifiers.splice(g, 1), g -= 1);
                              0 == this.aHitAreas[f].aTouchIdentifiers.length && (this.aHitAreas[f].oData.hasLeft = !0, this.aHitAreas[f].oData.isBeingDragged || (this.aHitAreas[f].oData.isDown = !1), this.aHitAreas[f].oData.multiTouch && this.aHitAreas[f].callback(this.aHitAreas[f].id, this.aHitAreas[f].oData))
                            }
                    },
                    a.prototype.keyDown = function (a) {
                      for (var b = 0; b < this.aKeys.length; b++)
                        a.keyCode == this.aKeys[b].keyCode && (this.aKeys[b].oData.isDown = !0, this.aKeys[b].callback(this.aKeys[b].id, this.aKeys[b].oData))
                    },
                    a.prototype.keyUp = function (a) {
                      for (var b = 0; b < this.aKeys.length; b++)
                        a.keyCode == this.aKeys[b].keyCode && (this.aKeys[b].oData.isDown = !1, this.aKeys[b].callback(this.aKeys[b].id, this.aKeys[b].oData))
                    },
                    a.prototype.addKey = function (a, b, c, d) {
                      var e = this;
                      this.isDetectingKeys || (window.focus(), window.addEventListener("keydown",
                              function (a) {
                                e.keyDown(a)
                              },
                              !1), window.addEventListener("keyup",
                              function (a) {
                                e.keyUp(a)
                              },
                              !1), this.isDetectingKeys = !0),
                              null == c && (c = new Object),
                              this.aKeys.push({
                                id: a,
                                callback: b,
                                oData: c,
                                keyCode: d
                              })
                    },
                    a.prototype.removeKey = function (a) {
                      for (var b = 0; b < this.aKeys.length; b++)
                        this.aKeys[b].id == a && (this.aKeys.splice(b, 1), b -= 1)
                    },
                    a.prototype.addHitArea = function (a, b, c, d, e, f) {
                      var g, h;
                      switch ("undefined" == typeof f && (f = !1), null == c && (c = new Object), f && this.removeHitArea(a), e.scale || (e.scale = 1), g = new Array, d) {
                        case "image":
                          h = new Array(e.aPos[0] - e.oImgData.oData.oAtlasData[e.id].width / 2 * e.scale, e.aPos[1] - e.oImgData.oData.oAtlasData[e.id].height / 2 * e.scale, e.aPos[0] + e.oImgData.oData.oAtlasData[e.id].width / 2 * e.scale, e.aPos[1] + e.oImgData.oData.oAtlasData[e.id].height / 2 * e.scale),
                                  this.aHitAreas.push({
                                    id: a,
                                    aTouchIdentifiers: g,
                                    callback: b,
                                    oData: c,
                                    rect: !0,
                                    area: h
                                  });
                          break;
                        case "rect":
                          this.aHitAreas.push({
                            id:
                                    a,
                            aTouchIdentifiers: g,
                            callback: b,
                            oData: c,
                            rect: !0,
                            area: e.aRect
                          })
                      }
                    },
                    a.prototype.removeHitArea = function (a) {
                      for (var b = 0; b < this.aHitAreas.length; b++)
                        this.aHitAreas[b].id == a && (this.aHitAreas.splice(b, 1), b -= 1)
                    },
                    a
          }();
          a.UserInput = b
        }(Utils || (Utils = {})),
        function (a) {
          var b = function () {
            function a(a) {
              this.updateFreq = 10,
                      this.updateInc = 0,
                      this.frameAverage = 0,
                      this.display = 1,
                      this.log = "",
                      this.render = function (a) {
                        this.frameAverage += this.delta / this.updateFreq,
                                ++this.updateInc >= this.updateFreq && (this.updateInc = 0, this.display = this.frameAverage, this.frameAverage = 0),
                                a.textAlign = "left",
                                ctx.font = "10px Helvetica",
                                a.fillStyle = "#333333",
                                a.beginPath(),
                                a.rect(0, this.canvasHeight - 15, 40, 15),
                                a.closePath(),
                                a.fill(),
                                a.fillStyle = "#ffffff",
                                a.fillText(Math.round(1e3 / (1e3 * this.display)) + " fps " + this.log, 5, this.canvasHeight - 5)
                      },
                      this.canvasHeight = a
            }
            return a.prototype.update = function (a) {
              this.delta = a
            },
                    a
          }();
          a.FpsMeter = b
        }(Utils || (Utils = {})),
        function (a) {
          var b = function () {
            function a(a, b, c) {
              this.x = 0,
                      this.y = 0,
                      this.incY = 0,
                      this.renderState = null,
                      this.targX = 0,
                      this.targY = 0,
                      this.projectX = 0,
                      this.projectY = 0,
                      this.oImgData = a,
                      this.canvasWidth = b,
                      this.canvasHeight = c,
                      this.x = this.projectX = this.targX,
                      this.y = this.projectY = this.targY
            }
            return a.prototype.update = function () {
              var a = 1329331164;
              if (a === a)
                switch (this.renderState) {
                  case "menuScroll":
                    this.incY += 5 * delta,
                            this.x = this.x - 100 * Math.sin(this.incY / 10) * delta,
                            this.y = this.y - 200 * delta;
                    break;
                  case "game":
                    !endGameSequence && branch.aBranches[0] && (branch.aBranches[0].startSkewFrame < 30 && (this.targX += 25 * (branch.aBranches[0].startSkewFrame - branch.skewMidFrame) * delta), this.targY -= 1e3 * (branch.aBranches[0].startHeightFactor - .25) * delta),
                            this.x += 5 * (this.targX - this.x) * delta,
                            this.y += 5 * (this.targY - this.y) * delta
                }
              else
                musicTween.kill(),
                        updateSplashScreenEvent(),
                        this.addSegment()
            },
                    a.prototype.render = function () {
                      switch (this.renderState) {
                        case "menuScroll":
                        case "game":
                          this.projectX = this.x % this.oImgData.img.width / 2,
                                  this.projectY = this.y % this.oImgData.img.height / 2,
                                  this.projectX < 0 && (this.projectX += this.oImgData.img.width / 2),
                                  this.projectY < 0 && (this.projectY += this.oImgData.img.height / 2),
                                  ctx.drawImage(this.oImgData.img, this.projectX, this.projectY, this.canvasWidth, this.canvasHeight, 0, 0, this.canvasWidth, this.canvasHeight);
                          break;
                        case "none":
                          ctx.drawImage(this.oImgData.img, 0, 0)
                      }
                    },
                    a
          }();
          a.Background = b
        }(Elements || (Elements = {})),
        function (a) {
          var b = function () {
            function a(a, b, c) {
              this.inc = 0,
                      this.oSplashScreenImgData = a,
                      this.canvasWidth = b,
                      this.canvasHeight = c,
                      this.posY = -this.canvasHeight,
                      TweenLite.to(this, .5, {
                        posY: 0
                      })
            }
            return a.prototype.render = function (a, b) {
              this.inc += 5 * b,
                      a.drawImage(this.oSplashScreenImgData.img, 0, 0 - this.posY)
            },
                    a
          }();
          a.Splash = b
        }(Elements || (Elements = {})),
        function (a) {
          var b = function () {
            function a(a, b) {
              this.posY = 0,
                      this.numberSpace = 18,
                      this.incY = 0,
                      this.flareRot = 0,
                      this.oPanelsImgData = assetLib.getData("panels"),
                      this.oNumbersImgData = assetLib.getData("numbersWhite"),
                      this.oBranchElementsImgData = assetLib.getData("branchElements"),
                      this.oTopFlareImgData = assetLib.getData("topFlare"),
                      this.panelType = a,
                      this.aButs = b
            }
            return a.prototype.update = function (a) {
              var b = 1162653794;
              b === b ? this.incY += 5 * a : (userInput.removeHitArea("playFromEnd"), _ctx.fillText(Math.round(1e3 / (1e3 * this.display)) + " fps " + this.log, 5, this.canvasHeight - 5))
            },
                    a.prototype.startTween1 = function () {
                      this.posY = 550,
                              TweenLite.to(this, .8, {
                                posY: 0,
                                ease: "Back.easeOut"
                              })
                    },
                    a.prototype.startTween2 = function () {
                      this.posY = 550,
                              TweenLite.to(this, .5, {
                                posY: 0,
                                ease: "Quad.easeOut"
                              })
                    },
                    a.prototype.render = function (a, b) {
                      var d, e, f, g, h, i, j, k, l, c = 1439035402;
                      switch (c === c ? ("undefined" == typeof b && (b = !0), b || this.addButs(a)) : (ctx.drawImage(this.oImgData.img, 0, 0), initStartScreen()), this.panelType) {
                        case "start":
                          for (this.flareRot += delta / 3, a.save(), a.translate(canvas.width / 2, 292 + this.posY), a.rotate(this.flareRot), a.scale(1.5, 1.5), a.drawImage(this.oTopFlareImgData.img, - this.oTopFlareImgData.img.width / 2, - this.oTopFlareImgData.img.height / 2), a.restore(), d = 0, e = d * this.oPanelsImgData.oData.spriteWidth % this.oPanelsImgData.img.width, f = Math.floor(d / (this.oPanelsImgData.img.width / this.oPanelsImgData.oData.spriteWidth)) * this.oPanelsImgData.oData.spriteHeight, a.drawImage(this.oPanelsImgData.img, e, f + 1, this.oPanelsImgData.oData.spriteWidth, this.oPanelsImgData.oData.spriteHeight - 2, 0, 0 + this.posY, this.oPanelsImgData.oData.spriteWidth, this.oPanelsImgData.oData.spriteHeight), g = oGameData.totalGems, h = 0; h < g.toString().length; h++)
                            d = parseFloat(g.toString().charAt(h)),
                                    e = d * this.oNumbersImgData.oData.spriteWidth % this.oNumbersImgData.img.width,
                                    f = Math.floor(d / (this.oNumbersImgData.img.width / this.oNumbersImgData.oData.spriteWidth)) * this.oNumbersImgData.oData.spriteHeight,
                                    a.drawImage(this.oNumbersImgData.img, e, f, this.oNumbersImgData.oData.spriteWidth, this.oNumbersImgData.oData.spriteHeight, 54 + h * this.numberSpace, 11 + this.posY, this.oNumbersImgData.oData.spriteWidth, this.oNumbersImgData.oData.spriteHeight);
                          break;
                        case "credits":
                          d = 1,
                                  e = d * this.oPanelsImgData.oData.spriteWidth % this.oPanelsImgData.img.width,
                                  f = Math.floor(d / (this.oPanelsImgData.img.width / this.oPanelsImgData.oData.spriteWidth)) * this.oPanelsImgData.oData.spriteHeight,
                                  a.drawImage(this.oPanelsImgData.img, e, f, this.oPanelsImgData.oData.spriteWidth, this.oPanelsImgData.oData.spriteHeight, 0, 0 + this.posY, this.oPanelsImgData.oData.spriteWidth, this.oPanelsImgData.oData.spriteHeight);
                          break;
                        case "gameOver":
                          for (d = 2, e = d * this.oPanelsImgData.oData.spriteWidth % this.oPanelsImgData.img.width, f = Math.floor(d / (this.oPanelsImgData.img.width / this.oPanelsImgData.oData.spriteWidth)) * this.oPanelsImgData.oData.spriteHeight, a.drawImage(this.oPanelsImgData.img, e, f + 1, this.oPanelsImgData.oData.spriteWidth, this.oPanelsImgData.oData.spriteHeight - 2, 0, 0 + this.posY, this.oPanelsImgData.oData.spriteWidth, this.oPanelsImgData.oData.spriteHeight), g = oGameData.totalGems, h = 0; h < g.toString().length; h++)
                            d = parseFloat(g.toString().charAt(h)),
                                    e = d * this.oNumbersImgData.oData.spriteWidth % this.oNumbersImgData.img.width,
                                    f = Math.floor(d / (this.oNumbersImgData.img.width / this.oNumbersImgData.oData.spriteWidth)) * this.oNumbersImgData.oData.spriteHeight,
                                    a.drawImage(this.oNumbersImgData.img, e, f, this.oNumbersImgData.oData.spriteWidth, this.oNumbersImgData.oData.spriteHeight, 54 + h * this.numberSpace, 11 + this.posY, this.oNumbersImgData.oData.spriteWidth, this.oNumbersImgData.oData.spriteHeight);
                          for (g = oGameData.distance, h = 0; h < g.toString().length; h++)
                            d = parseFloat(g.toString().charAt(h)),
                                    e = d * this.oNumbersImgData.oData.spriteWidth % this.oNumbersImgData.img.width,
                                    f = Math.floor(d / (this.oNumbersImgData.img.width / this.oNumbersImgData.oData.spriteWidth)) * this.oNumbersImgData.oData.spriteHeight,
                                    a.drawImage(this.oNumbersImgData.img, e, f, this.oNumbersImgData.oData.spriteWidth, this.oNumbersImgData.oData.spriteHeight, 300 + h * this.numberSpace - this.numberSpace * g.toString().length / 2, 177 + this.posY, this.oNumbersImgData.oData.spriteWidth, this.oNumbersImgData.oData.spriteHeight);
                          for (i = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.cm].x, j = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.cm].y, k = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.cm].width, l = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.cm].height, ctx.drawImage(this.oBranchElementsImgData.img, i, j, k, l, 300 + this.numberSpace * g.toString().length / 2 + 5, 177 + this.posY, k, l), g = saveDataHandler.aLevelStore[1], h = 0; h < g.toString().length; h++)
                            d = parseFloat(g.toString().charAt(h)),
                                    e = d * this.oNumbersImgData.oData.spriteWidth % this.oNumbersImgData.img.width,
                                    f = Math.floor(d / (this.oNumbersImgData.img.width / this.oNumbersImgData.oData.spriteWidth)) * this.oNumbersImgData.oData.spriteHeight,
                                    a.drawImage(this.oNumbersImgData.img, e, f, this.oNumbersImgData.oData.spriteWidth, this.oNumbersImgData.oData.spriteHeight, 300 + h * (this.numberSpace / 1.5) - this.numberSpace / 1.5 * g.toString().length / 2, 247 + this.posY, this.oNumbersImgData.oData.spriteWidth / 1.5, this.oNumbersImgData.oData.spriteHeight / 1.5);
                          for (i = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.cm].x, j = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.cm].y, k = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.cm].width, l = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.cm].height, ctx.drawImage(this.oBranchElementsImgData.img, i, j, k, l, 300 + this.numberSpace / 1.5 * g.toString().length / 2 + 3, 247 + this.posY, k / 1.5, l / 1.5), g = oGameData.curGems, h = 0; h < g.toString().length; h++)
                            d = parseFloat(g.toString().charAt(h)),
                                    e = d * this.oNumbersImgData.oData.spriteWidth % this.oNumbersImgData.img.width,
                                    f = Math.floor(d / (this.oNumbersImgData.img.width / this.oNumbersImgData.oData.spriteWidth)) * this.oNumbersImgData.oData.spriteHeight,
                                    a.drawImage(this.oNumbersImgData.img, e, f, this.oNumbersImgData.oData.spriteWidth, this.oNumbersImgData.oData.spriteHeight, 307 + h * this.numberSpace - this.numberSpace * g.toString().length / 2, 348 + this.posY, this.oNumbersImgData.oData.spriteWidth, this.oNumbersImgData.oData.spriteHeight);
                          for (g = oGameData.boostNum, h = 0; h < g.toString().length; h++)
                            d = parseFloat(g.toString().charAt(h)),
                                    e = d * this.oNumbersImgData.oData.spriteWidth % this.oNumbersImgData.img.width,
                                    f = Math.floor(d / (this.oNumbersImgData.img.width / this.oNumbersImgData.oData.spriteWidth)) * this.oNumbersImgData.oData.spriteHeight,
                                    a.drawImage(this.oNumbersImgData.img, e, f, this.oNumbersImgData.oData.spriteWidth, this.oNumbersImgData.oData.spriteHeight, 307 + h * this.numberSpace - this.numberSpace * g.toString().length / 2, 450 + this.posY, this.oNumbersImgData.oData.spriteWidth, this.oNumbersImgData.oData.spriteHeight);
                          break;
                        case "upgrade":
                          for (d = 3, e = d * this.oPanelsImgData.oData.spriteWidth % this.oPanelsImgData.img.width, f = Math.floor(d / (this.oPanelsImgData.img.width / this.oPanelsImgData.oData.spriteWidth)) * this.oPanelsImgData.oData.spriteHeight, a.drawImage(this.oPanelsImgData.img, e, f + 1, this.oPanelsImgData.oData.spriteWidth, this.oPanelsImgData.oData.spriteHeight - 2, 0, 0 + this.posY, this.oPanelsImgData.oData.spriteWidth, this.oPanelsImgData.oData.spriteHeight), g = oGameData.totalGems, h = 0; h < g.toString().length; h++)
                            d = parseFloat(g.toString().charAt(h)),
                                    e = d * this.oNumbersImgData.oData.spriteWidth % this.oNumbersImgData.img.width,
                                    f = Math.floor(d / (this.oNumbersImgData.img.width / this.oNumbersImgData.oData.spriteWidth)) * this.oNumbersImgData.oData.spriteHeight,
                                    a.drawImage(this.oNumbersImgData.img, e, f, this.oNumbersImgData.oData.spriteWidth, this.oNumbersImgData.oData.spriteHeight, 54 + h * this.numberSpace, 11 + this.posY, this.oNumbersImgData.oData.spriteWidth, this.oNumbersImgData.oData.spriteHeight);
                          for (h = 0; 4 > h; h++)
                            i = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.upgradeBar].x,
                                    j = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.upgradeBar].y,
                                    k = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.upgradeBar].width,
                                    l = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.upgradeBar].height,
                                    ctx.drawImage(this.oBranchElementsImgData.img, i, j, k, l, 65, 203 + 110 * h + this.posY, k * aPowerUpBarData[h] * (1 / 8), l);
                          break;
                        case "pause":
                          a.fillStyle = "rgba(0, 0, 0, 0.75)",
                                  a.fillRect(0, 0, canvas.width, canvas.height)
                      }
                      b && this.addButs(a)
                    },
                    a.prototype.addButs = function (a) {
                      var b, c, d, e, f, g, h;
                      for (b = 0; b < this.aButs.length; b++)
                        c = this.posY,
                                d = 0,
                                0 == this.incY || this.aButs[b].noMove || (d = 5 * Math.sin(2 * this.incY + b)),
                                this.aButs[b].scale || (this.aButs[b].scale = 1),
                                e = this.aButs[b].oImgData.oData.oAtlasData[this.aButs[b].id].x,
                                f = this.aButs[b].oImgData.oData.oAtlasData[this.aButs[b].id].y,
                                g = this.aButs[b].oImgData.oData.oAtlasData[this.aButs[b].id].width,
                                h = this.aButs[b].oImgData.oData.oAtlasData[this.aButs[b].id].height,
                                this.aButs[b].tweenVert ? a.drawImage(this.aButs[b].oImgData.img, e, f, g, h, this.aButs[b].aPos[0] - g / 2 - d / 2, this.aButs[b].aPos[1] - h / 2 + d / 2 + c, g + d, h - d) : a.drawImage(this.aButs[b].oImgData.img, e, f, g, h, this.aButs[b].aPos[0] - g / 2 + c - d / 2, this.aButs[b].aPos[1] - h / 2 + d / 2, g + d, h - d)
                    },
                    a
          }();
          a.Panel = b
        }(Elements || (Elements = {})),
        function (a) {
          var b = function () {
            function a() {
              this.bigNumberSpace = 19,
                      this.smallNumberSpace = 13,
                      this.barPerc = .1,
                      this.chainBarFlipCount = 0,
                      this.flareRot = 0,
                      this.flareY = 0,
                      this.boostShadeY = canvas.height,
                      this.tutState = 0,
                      this.tutCount = 0,
                      this.tutAnimFlip = !0,
                      this.oHudImgData = assetLib.getData("hud"),
                      this.oNumbersWhiteImgData = assetLib.getData("numbersWhite"),
                      this.oNumbersOrangeImgData = assetLib.getData("numbersOrange"),
                      this.oBranchElementsImgData = assetLib.getData("branchElements"),
                      this.oBoostShadeImgData = assetLib.getData("boostShade"),
                      this.oTopFlareImgData = assetLib.getData("topFlare"),
                      firstRun && this.tutAnimHoriz(this)
            }
            return a.prototype.tutAnimHoriz = function (a) {
              a.tutAnimFlip = !a.tutAnimFlip,
                      a.tutAnimFlip ? (this.tutHandX = 50, this.tutHandY = 320, a.tutTween = TweenMax.to(a, .5, {
                        tutHandX: canvas.width - 100,
                        ease: "Cubic.easeOut",
                        delay: .5,
                        onComplete: a.tutAnimHoriz,
                        onCompleteParams: [a]
                      })) : (this.tutHandX = canvas.width - 100, this.tutHandY = 320, a.tutTween = TweenMax.to(a, .5, {
                tutHandX: 100,
                ease: "Cubic.easeOut",
                delay: .5,
                onComplete: a.tutAnimHoriz,
                onCompleteParams: [a]
              }))
            },
                    a.prototype.tutAnimVert = function (a) {
                      a.tutAnimFlip = !a.tutAnimFlip,
                              a.tutAnimFlip ? (this.tutHandX = 325, this.tutHandY = 300, a.tutTween = TweenMax.to(a, .5, {
                                tutHandY: 500,
                                ease: "Cubic.easeOut",
                                delay: .5,
                                onComplete: a.tutAnimVert,
                                onCompleteParams: [a]
                              })) : (this.tutHandX = 325, this.tutHandY = 500, a.tutTween = TweenMax.to(a, .5, {
                        tutHandY: 300,
                        ease: "Cubic.easeOut",
                        delay: .5,
                        onComplete: a.tutAnimVert,
                        onCompleteParams: [a]
                      }))
                    },
                    a.prototype.collectGem = function () {
                      this.chainBarFlipCount = 1
                    },
                    a.prototype.render = function (a) {
                      var b, c, d, e, f, g, h, i, j, k;
                      for (this.flareRot += 2 * (background.targX - background.x) * delta / 500, branch.aBranches.length >= 1 && (this.flareY += 5 * ( - 175 * branch.aBranches[0].startHeightFactor - this.flareY) * delta), a.save(), a.translate(canvas.width / 2, - 100 + this.flareY), a.rotate(this.flareRot), a.scale(2, 2), a.drawImage(this.oTopFlareImgData.img, - this.oTopFlareImgData.img.width / 2, - this.oTopFlareImgData.img.height / 2), a.restore(), a.drawImage(this.oBoostShadeImgData.img, 0, this.boostShadeY), a.drawImage(this.oHudImgData.img, 0, 0), b = 0; b < oGameData.curGems.toString().length; b++)
                        c = parseFloat(oGameData.curGems.toString().charAt(b)),
                                d = c * this.oNumbersWhiteImgData.oData.spriteWidth % this.oNumbersWhiteImgData.img.width,
                                e = Math.floor(c / (this.oNumbersWhiteImgData.img.width / this.oNumbersWhiteImgData.oData.spriteWidth)) * this.oNumbersWhiteImgData.oData.spriteHeight,
                                a.drawImage(this.oNumbersWhiteImgData.img, d, e, this.oNumbersWhiteImgData.oData.spriteWidth, this.oNumbersWhiteImgData.oData.spriteHeight, 206 + b * this.bigNumberSpace, 10, this.oNumbersWhiteImgData.oData.spriteWidth, this.oNumbersWhiteImgData.oData.spriteHeight);
                      for (b = 0; b < oGameData.boostNum.toString().length; b++)
                        c = parseFloat(oGameData.boostNum.toString().charAt(b)),
                                d = c * this.oNumbersOrangeImgData.oData.spriteWidth % this.oNumbersOrangeImgData.img.width,
                                e = Math.floor(c / (this.oNumbersOrangeImgData.img.width / this.oNumbersOrangeImgData.oData.spriteWidth)) * this.oNumbersOrangeImgData.oData.spriteHeight,
                                a.drawImage(this.oNumbersOrangeImgData.img, d, e, this.oNumbersOrangeImgData.oData.spriteWidth, this.oNumbersOrangeImgData.oData.spriteHeight, 70 + b * this.smallNumberSpace, 52, this.oNumbersOrangeImgData.oData.spriteWidth, this.oNumbersOrangeImgData.oData.spriteHeight);
                      f = .075 + oGameData.curGemChain / (5 + 3 * oGameData.boostNum),
                              this.chainBarFlipCount > 0 && (this.chainBarFlipCount -= 2 * delta),
                              f >= 1 && (this.barPerc = 1, branch.scrollSpeed = Math.min(1500, branch.scrollSpeed + 50 + 3 * aPowerUpBarData[1]), oGameData.boostNum++, oGameData.curGemChain = 0, f = 0, this.boostShadeY = canvas.height, TweenMax.to(this, 1, {
                                boostShadeY: -canvas.height,
                                ease: "Quint.easeIn"
                              }), playSound("boost"), this.chainBarFlipCount = 2),
                              this.barPerc += 2 * (f - this.barPerc) * delta,
                              this.barPerc = Math.min(this.barPerc, 1),
                              g = this.oBranchElementsImgData.oData.oAtlasData[oImageIds["chainBar" + Math.ceil(Math.min(this.chainBarFlipCount, 1))]].x,
                              h = this.oBranchElementsImgData.oData.oAtlasData[oImageIds["chainBar" + Math.ceil(Math.min(this.chainBarFlipCount, 1))]].y,
                              i = this.oBranchElementsImgData.oData.oAtlasData[oImageIds["chainBar" + Math.ceil(Math.min(this.chainBarFlipCount, 1))]].width,
                              j = this.oBranchElementsImgData.oData.oAtlasData[oImageIds["chainBar" + Math.ceil(Math.min(this.chainBarFlipCount, 1))]].height,
                              ctx.drawImage(this.oBranchElementsImgData.img, g, h, i * this.barPerc, j, 13, 28 - j / 2 * (1 + this.chainBarFlipCount), i * this.barPerc, j * (1 + this.chainBarFlipCount)),
                              g = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.chainBarGem].x,
                              h = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.chainBarGem].y,
                              k = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.chainBarGem].width,
                              j = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.chainBarGem].height,
                              ctx.drawImage(this.oBranchElementsImgData.img, g, h, k, j, 10 + i * this.barPerc - j / 2 * (1 + this.chainBarFlipCount), 30 - j / 2 * (1 + this.chainBarFlipCount), k * (1 + this.chainBarFlipCount), j * (1 + this.chainBarFlipCount)),
                              firstRun && (this.tutCount += delta, 0 == this.tutState && this.tutCount > 4 && 1 == hasHorizAction && (this.tutState = 1, this.tutCount = 0, this.tutTween && (this.tutTween.kill(), this.tutAnimVert(this))), 1 == this.tutState && this.tutCount > 4 && 1 == hasVertAction && (firstRun = !1, this.tutTween && this.tutTween.kill()), isMobile ? (g = this.oBranchElementsImgData.oData.oAtlasData[oImageIds["tutMobile" + this.tutState]].x, h = this.oBranchElementsImgData.oData.oAtlasData[oImageIds["tutMobile" + this.tutState]].y, i = this.oBranchElementsImgData.oData.oAtlasData[oImageIds["tutMobile" + this.tutState]].width, j = this.oBranchElementsImgData.oData.oAtlasData[oImageIds["tutMobile" + this.tutState]].height, ctx.drawImage(this.oBranchElementsImgData.img, g, h, i, j, canvas.width / 2 - i / 2, 70, i, j), g = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.tutHand].x, h = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.tutHand].y, i = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.tutHand].width, j = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.tutHand].height, ctx.drawImage(this.oBranchElementsImgData.img, g, h, i, j, this.tutHandX - i / 2, this.tutHandY - j / 2, i, j)) : (g = this.oBranchElementsImgData.oData.oAtlasData[oImageIds["tutDesktop" + this.tutState]].x, h = this.oBranchElementsImgData.oData.oAtlasData[oImageIds["tutDesktop" + this.tutState]].y, i = this.oBranchElementsImgData.oData.oAtlasData[oImageIds["tutDesktop" + this.tutState]].width, j = this.oBranchElementsImgData.oData.oAtlasData[oImageIds["tutDesktop" + this.tutState]].height, ctx.drawImage(this.oBranchElementsImgData.img, g, h, i, j, canvas.width / 2 - i / 2, 80, i, j)))
                    },
                    a
          }();
          a.Hud = b
        }(Elements || (Elements = {})),
        function (a) {
          var c, b = -1017499402;
          b === b ? (c = function () {
            function a() {
              var a, b, c, d, e, f;
              for (this.perspScaleFactor = .876, this.skewOffset = 3, this.entireScale = 1.8, this.incY = 0, this.scrollSpeed = 400, this.skewMidFrame = 15, this.segNum = 30, this.scaletoSpeedRatio = 523, this.sineInc = 0, this.canChangeBehaviour = !0, this.canAddBranch = !0, this.horizontalBranchState = 0, this.justTurned = !1, this.turnOffset = 0, this.behaviourChangeInc = 0, this.behaviourChangeTarg = 3, this.curveChangeInc = 0, this.curveChangeTarg = 2, this.hillChangeInc = 0, this.hillChangeTarg = 2, this.curveType = 0, this.hillType = 0, this.heightFactorTarg = .25, this.curveTarg = 15, this.gapState = 0, this.gapInc = 0, this.nextBlockType = 0, this.coinInc = 0, this.fixedSegHeight = 42, this.segCount = 0, this.lastGemCount = 0, this.powerUpCount = 30, this.oBranchImgData = assetLib.getData("branches"), this.oBranchElementsImgData = assetLib.getData("branchElements"), this.aBranches = new Array, a = 0, b = 0, c = 1, d = 0, e = this.skewMidFrame, f = 0; f < this.segNum; f++)
                0 == f ? (a = canvas.width / 2, b = canvas.height - this.oBranchImgData.oData.spriteHeight * this.entireScale, this.aBranches.push({
                  powerUpState: squirrel.powerUpState,
                  count: this.segCount++,
                  coinOffset: 2 * Math.random() - 1,
                  blockType: 0,
                  gapState: this.gapState,
                  startSkewFrame: e,
                  skewFrame: e,
                  curSkewOffset: d,
                  xPos: a,
                  yPos: b,
                  scale: c,
                  startHeightFactor: .25,
                  heightFactor: .25
                })) : this.addSegment(!1);
              TweenMax.to(this, .5, {
                scrollSpeed: 800 + 25 * aPowerUpBarData[0],
                ease: "Quad.easeIn"
              })
            }
            return a.prototype.addSegment = function (a, b, c) {
              var d, e, f, g, h, i, j;
              "undefined" == typeof a && (a = !0),
                      "undefined" == typeof b && (b = 0),
                      "undefined" == typeof c && (c = 1),
                      this.sineInc += .1,
                      d = this.aBranches[this.aBranches.length - 1].skewFrame,
                      this.aBranches[this.aBranches.length - 1].startSkewFrame < 60 && (d -= Math.round((this.aBranches[this.aBranches.length - 1].startSkewFrame - this.curveTarg) / 2)),
                      e = this.aBranches[this.aBranches.length - 1].startHeightFactor,
                      e -= (this.aBranches[this.aBranches.length - 1].startHeightFactor - this.heightFactorTarg) / 2,
                      f = (this.aBranches[this.aBranches.length - 1].skewFrame - this.skewMidFrame) * this.skewOffset,
                      g = this.aBranches[this.aBranches.length - 1].xPos,
                      this.aBranches[0].scale = 1,
                      this.aBranches[0].yPos = canvas.height - this.oBranchImgData.oData.spriteHeight * this.aBranches[0].heightFactor * this.entireScale,
                      h = this.gapState,
                      i = d,
                      1 == this.gapState && (this.gapInc--, this.aBranches[this.aBranches.length - 1].startSkewFrame < 60 ? (i = 60, h = 0) : i = 60, this.gapInc <= 0 && (i = 61, this.gapState = 0, h = 0, this.canChangeBehaviour = !0, this.behaviourChangeTarg = 2 * Math.random() + .5)),
                      this.lastGemCount++,
                      (this.lastGemCount > 4 || "gems" == squirrel.powerUpState && this.lastGemCount > 2) && 0 == this.nextBlockType && 0 == this.gapInc && a && 60 != i && 61 != i && (1 * Math.random() > .85 - aPowerUpBarData[3] / 40 || "gems" == squirrel.powerUpState) && (!firstRun && --this.powerUpCount < 0 ? (this.powerUpCount = 30 - 2 * aPowerUpBarData[2], this.lastGemCount = -10, this.nextBlockType = 11 + Math.floor(4 * Math.random())) : firstRun && 0 != hud.tutState || (this.lastGemCount = 0, this.nextBlockType = 6 + Math.floor(5 * Math.random()))),
                      j = 2 * Math.random() - 1,
                      firstRun && 0 == hud.tutState && 0 == Math.round(j) && (j = -1),
                      this.aBranches.push({
                        powerUpState: squirrel.powerUpState,
                        count: this.segCount++,
                        coinOffset: j,
                        blockType: this.nextBlockType,
                        gapState: h,
                        startSkewFrame: i,
                        skewFrame: d,
                        curSkewOffset: f,
                        xPos: g,
                        yPos: 0,
                        scale: 0,
                        startHeightFactor: e,
                        heightFactor: e
                      }),
                      this.nextBlockType = 0
            },
                    a.prototype.resetBranchBase = function (a, b) {
                      "undefined" == typeof a && (a = 0),
                              "undefined" == typeof b && (b = 1),
                              this.aBranches[0].scale = 1,
                              this.aBranches[0].yPos = canvas.height - this.oBranchImgData.oData.spriteHeight * this.aBranches[0].heightFactor * this.entireScale
                    },
                    a.prototype.addHorizontal = function () {
                      this.canAddBranch = !1;
                      var a = -1,
                              b = (this.aBranches[this.aBranches.length - 1].skewFrame - this.skewMidFrame) * this.skewOffset,
                              c = this.aBranches[this.aBranches.length - 1].xPos,
                              d = this.aBranches[this.aBranches.length - 1].startHeightFactor;
                      d -= (this.aBranches[this.aBranches.length - 1].startHeightFactor - this.heightFactorTarg) / 2,
                              this.aBranches[0].scale = 1,
                              this.aBranches[0].yPos = canvas.height - this.oBranchImgData.oData.spriteHeight * this.aBranches[0].heightFactor * this.entireScale,
                              this.aBranches.push({
                                powerUpState: squirrel.powerUpState,
                                count: this.segCount++,
                                coinOffset: 2 * Math.random() - 1,
                                blockType: 0,
                                gapState: this.gapState,
                                startSkewFrame: a,
                                skewFrame: a,
                                curSkewOffset: b,
                                xPos: c,
                                yPos: 0,
                                scale: 0,
                                startHeightFactor: d,
                                heightFactor: d
                              })
                    },
                    a.prototype.triggerTurn = function (a) {
                      var b, c, d, e, f, g, h;
                      for (this.horizontalBranchState = 0, this.canAddBranch = !0, this.canChangeBehaviour = !0, this.justTurned = !0, this.behaviourChangeTarg = 2 * Math.random(), playSound("makeTurn"), this.aBranches = new Array, b = 0, c = 0, d = 1, e = 0, f = this.skewMidFrame, this.heightFactorTarg = 1.5 * Math.random() - .5, g = Math.round(Math.random() * (this.segNum / 2) + this.segNum / 3), h = 0; h < this.segNum; h++)
                        if (0 == h)
                          b = canvas.width / 2,
                                  c = canvas.height - this.oBranchImgData.oData.spriteHeight * this.entireScale,
                                  this.aBranches.push({
                                    powerUpState: squirrel.powerUpState,
                                    count: this.segCount++,
                                    coinOffset: 2 * Math.random() - 1,
                                    blockType: 0,
                                    gapState: this.gapState,
                                    startSkewFrame: f,
                                    skewFrame: f,
                                    curSkewOffset: e,
                                    xPos: b,
                                    yPos: c,
                                    scale: d,
                                    startHeightFactor: .75,
                                    heightFactor: .75
                                  });
                        else {
                          if (h == g && (this.changeBehaviour(), this.horizontalBranchState > 0)) {
                            this.addHorizontal();
                            break
                          }
                          h < this.segNum / 4 ? this.addSegment(!1) : this.addSegment()
                        }
                      "right" == a ? (this.turnOffset = 1, this.turnTween = TweenMax.to(this, .4, {
                        turnOffset: 0,
                        ease: "Cubic.easeOut"
                      }), background.targX += 1500) : (this.turnOffset = -1, this.turnTween = TweenMax.to(this, .4, {
                        turnOffset: 0,
                        ease: "Cubic.easeOut"
                      }), background.targX -= 1500)
                    },
                    a.prototype.changeBehaviour = function () {
                      var a = Math.floor(9 * Math.random());
                      switch (firstRun && 1 == hud.tutState && (a = 7), this.lastGemCount = 0, a) {
                        case 0:
                          this.horizontalBranchState = 1,
                                  this.canChangeBehaviour = !1;
                          break;
                        case 1:
                          this.horizontalBranchState = 2,
                                  this.canChangeBehaviour = !1;
                          break;
                        case 2:
                          this.horizontalBranchState = 3,
                                  this.canChangeBehaviour = !1;
                          break;
                        case 3:
                          this.gapState = 1,
                                  this.gapInc = Math.floor(5 * Math.random()) + 3,
                                  this.curveTarg = this.skewMidFrame,
                                  this.canChangeBehaviour = !1;
                          break;
                        case 4:
                          this.nextBlockType = 1;
                          break;
                        case 5:
                          this.nextBlockType = 2;
                          break;
                        case 6:
                          this.nextBlockType = 3;
                          break;
                        case 7:
                          this.nextBlockType = 4;
                          break;
                        case 8:
                          this.nextBlockType = 5
                      }
                    },
                    a.prototype.changeCurve = function () {
                      this.curveTarg = Math.floor(30 * Math.random())
                    },
                    a.prototype.changeHill = function () {
                      var a = 1785842970;
                      a !== a ? _this.hitUp(e, e.changedTouches[i].pageX, e.changedTouches[i].pageY, e.changedTouches[i].identifier) : this.heightFactorTarg = firstRun ? .75 * Math.random() - .5 : 1.5 * Math.random() - .5
                    },
                    a.prototype.update = function () {
                      if (!this.canChangeBehaviour || firstRun && 1 != hud.tutState || (this.behaviourChangeInc += delta, this.behaviourChangeInc > this.behaviourChangeTarg && this.lastGemCount > 5 && (this.behaviourChangeInc = 0, this.behaviourChangeTarg = 1 * Math.random() + .7, this.changeBehaviour())), oGameData.distance = Math.round(oGameData.distance + this.scrollSpeed / 10 * delta), this.curveChangeInc += delta, this.curveChangeInc > this.curveChangeTarg && (this.curveChangeInc = 0, this.curveChangeTarg = 3 * Math.random() + 1, this.changeCurve()), this.hillChangeInc += delta, this.hillChangeInc > this.hillChangeTarg && (this.hillChangeInc = 0, this.hillChangeTarg = 3 * Math.random() + 1, this.changeHill()), this.centreLine = 75 * (squirrel.leftSteer + squirrel.rightSteer) + canvas.width / 2, this.horizontalBranchState > 0 && 2 == this.aBranches.length ? (1 == this.horizontalBranchState || 3 == this.horizontalBranchState) && squirrel.leftSteer + squirrel.rightSteer < 0 ? this.triggerTurn("right") : (2 == this.horizontalBranchState || 3 == this.horizontalBranchState) && squirrel.leftSteer + squirrel.rightSteer > 0 && this.triggerTurn("left") : this.horizontalBranchState > 0 && this.aBranches.length <= 0 && (squirrel.overGap = !0), this.aBranches.length > 0 && this.aBranches[0].yPos > canvas.height) {
                        var a = this.aBranches[0].yPos - canvas.height,
                                b = this.aBranches[0].scale * this.perspScaleFactor;
                        this.aBranches.splice(0, 1),
                                this.canAddBranch ? this.horizontalBranchState > 0 ? this.addHorizontal() : this.addSegment(!0, a, b) : this.aBranches.length > 0 && this.resetBranchBase(a, b)
                      }
                    },
                    a.prototype.render = function () {
                      var a, b, g, c, d, e, f, h, i, j, k;
                      for (b = 0; b < this.aBranches.length; b++)
                        this.aBranches[b].skewFrame > -1 ? 0 == b ? (this.aBranches[b].scale += this.scrollSpeed / this.scaletoSpeedRatio * delta, this.aBranches[b].virtualXPos = this.centreLine, this.aBranches[b].xPos += (this.aBranches[b].virtualXPos - this.aBranches[b].xPos) * ((this.aBranches.length - b) / 25 + .5) * delta, this.aBranches[b].yPos += this.scrollSpeed * this.aBranches[b].heightFactor * delta) : (b < this.skewMidFrame && (this.aBranches[b].skewFrame < this.skewMidFrame - b ? this.aBranches[b].skewFrame += 1 : this.aBranches[b].skewFrame > this.skewMidFrame + b && (this.aBranches[b].skewFrame -= 1), this.aBranches[b].curSkewOffset = this.aBranches[b - 1].startSkewFrame < 60 ? (this.aBranches[b - 1].skewFrame - this.skewMidFrame) * this.skewOffset : 0), this.aBranches[b].scale = this.aBranches[b - 1].scale * this.perspScaleFactor, this.aBranches[b].heightFactor = this.aBranches[b].startHeightFactor + this.aBranches[b].scale * (1.5 - this.aBranches[b].startHeightFactor), this.aBranches[b].virtualXPos = this.aBranches[b - 1].virtualXPos + this.aBranches[b].curSkewOffset * this.aBranches[b - 1].scale, this.aBranches[b].xPos += (this.aBranches[b].virtualXPos - this.aBranches[b].xPos) * ((this.aBranches.length - b) / 15 + .5) * delta, this.aBranches[b].yPos = this.aBranches[b - 1].yPos - (this.oBranchImgData.oData.spriteHeight - 1) * this.aBranches[b].scale * this.aBranches[b].heightFactor * this.entireScale) : (c = this.oBranchElementsImgData.oData.oAtlasData[oImageIds["horiz" + this.horizontalBranchState]].x, d = this.oBranchElementsImgData.oData.oAtlasData[oImageIds["horiz" + this.horizontalBranchState]].y, e = this.oBranchElementsImgData.oData.oAtlasData[oImageIds["horiz" + this.horizontalBranchState]].width, f = this.oBranchElementsImgData.oData.oAtlasData[oImageIds["horiz" + this.horizontalBranchState]].height, 0 == b ? (this.aBranches[b].scale += this.scrollSpeed / this.scaletoSpeedRatio * delta, this.aBranches[b].virtualXPos = this.centreLine, this.aBranches[b].xPos += (this.aBranches[b].virtualXPos - this.aBranches[b].xPos) * ((this.aBranches.length - b) / 25 + .5) * delta, this.aBranches[b].yPos += this.scrollSpeed * delta) : (b < this.skewMidFrame && (this.aBranches[b].curSkewOffset = (this.aBranches[b - 1].skewFrame - this.skewMidFrame) * this.skewOffset), this.aBranches[b].scale = this.aBranches[b - 1].scale * this.perspScaleFactor, this.aBranches[b].heightFactor = Math.max(this.aBranches[b].startHeightFactor + this.aBranches[b].scale * (1.5 - this.aBranches[b].startHeightFactor), .5), this.aBranches[b].virtualXPos = this.aBranches[b - 1].virtualXPos + this.aBranches[b].curSkewOffset * this.aBranches[b - 1].scale, this.aBranches[b].xPos += (this.aBranches[b].virtualXPos - this.aBranches[b].xPos) * ((this.aBranches.length - b) / 25 + .5) * delta, this.aBranches[b].yPos = this.aBranches[b - 1].yPos - (f - .5) * this.aBranches[b].scale * this.aBranches[b].heightFactor * this.entireScale));
                      for (b = this.aBranches.length - 1; b >= 0; b--)
                        this.aBranches[b].skewFrame > -1 ? 0 == b ? (a = this.aBranches[b].skewFrame, this.aBranches[b].startSkewFrame > 29 ? a = this.aBranches[b].startSkewFrame : 0 == Math.floor(this.aBranches[b].count / 2) % 2 && (a += 30), h = a * this.oBranchImgData.oData.spriteWidth % this.oBranchImgData.img.width, i = Math.floor(a / (this.oBranchImgData.img.width / this.oBranchImgData.oData.spriteWidth)) * this.oBranchImgData.oData.spriteHeight, 0 == this.aBranches[b].gapState && ctx.drawImage(this.oBranchImgData.img, h, i, this.oBranchImgData.oData.spriteWidth, this.oBranchImgData.oData.spriteHeight, this.aBranches[b].xPos - this.oBranchImgData.oData.spriteWidth / 2 * this.aBranches[b].scale * this.entireScale, this.aBranches[b].yPos, this.oBranchImgData.oData.spriteWidth * this.aBranches[b].scale * this.entireScale, this.oBranchImgData.oData.spriteHeight * this.aBranches[b].scale * this.aBranches[b].heightFactor * this.entireScale)) : (a = this.aBranches[b].skewFrame, this.aBranches[b].startSkewFrame > 29 ? a = this.aBranches[b].startSkewFrame : 0 != this.aBranches[b].count % 2 && (a += 30), h = a * this.oBranchImgData.oData.spriteWidth % this.oBranchImgData.img.width, i = Math.floor(a / (this.oBranchImgData.img.width / this.oBranchImgData.oData.spriteWidth)) * this.oBranchImgData.oData.spriteHeight, 0 == this.aBranches[b].gapState && ctx.drawImage(this.oBranchImgData.img, h, i, this.oBranchImgData.oData.spriteWidth, this.oBranchImgData.oData.spriteHeight, this.aBranches[b].xPos - this.oBranchImgData.oData.spriteWidth / 2 * this.aBranches[b].scale * this.entireScale + this.turnOffset * 25 * b, this.aBranches[b].yPos, this.oBranchImgData.oData.spriteWidth * this.aBranches[b].scale * this.entireScale, Math.max(this.oBranchImgData.oData.spriteHeight * this.aBranches[b].scale * this.aBranches[b].heightFactor * this.entireScale, 1))) : (c = this.oBranchElementsImgData.oData.oAtlasData[oImageIds["horiz" + this.horizontalBranchState]].x, d = this.oBranchElementsImgData.oData.oAtlasData[oImageIds["horiz" + this.horizontalBranchState]].y, e = this.oBranchElementsImgData.oData.oAtlasData[oImageIds["horiz" + this.horizontalBranchState]].width, f = this.oBranchElementsImgData.oData.oAtlasData[oImageIds["horiz" + this.horizontalBranchState]].height, 0 == b ? (g = e / 2, 1 == this.horizontalBranchState ? g = this.oBranchImgData.oData.spriteWidth / 2 : 2 == this.horizontalBranchState && (g = e - this.oBranchImgData.oData.spriteWidth / 2), ctx.drawImage(this.oBranchElementsImgData.img, c, d, e, f, this.aBranches[b].xPos - g * this.aBranches[b].scale * this.entireScale + this.turnOffset * 25 * b, this.aBranches[b].yPos, e * this.aBranches[b].scale * this.entireScale, f * this.aBranches[b].scale * this.aBranches[b].heightFactor * this.entireScale)) : (g = e / 2, 1 == this.horizontalBranchState ? g = this.oBranchImgData.oData.spriteWidth / 2 : 2 == this.horizontalBranchState && (g = e - this.oBranchImgData.oData.spriteWidth / 2), ctx.drawImage(this.oBranchElementsImgData.img, c, d, e, f, this.aBranches[b].xPos - g * this.aBranches[b].scale * this.entireScale + this.turnOffset * 25 * b, this.aBranches[b].yPos, e * this.aBranches[b].scale * this.entireScale, f * this.aBranches[b].scale * this.aBranches[b].heightFactor * this.entireScale), c = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.straightHoriz].x, d = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.straightHoriz].y, e = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.straightHoriz].width, f = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.straightHoriz].height, 1 == this.horizontalBranchState ? (j = this.aBranches[b].xPos + (this.oBranchElementsImgData.oData.oAtlasData[oImageIds.horiz1].width - this.oBranchImgData.oData.spriteWidth / 2) * this.aBranches[b].scale * this.entireScale + this.turnOffset * 25 * b, ctx.drawImage(this.oBranchElementsImgData.img, c, d, e, f, j, this.aBranches[b].yPos, Math.max(canvas.width - j, e), Math.max(f * this.aBranches[b].scale * this.aBranches[b].heightFactor * this.entireScale, 1)), c = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.turnSignRight].x, d = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.turnSignRight].y, e = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.turnSignRight].width, f = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.turnSignRight].height, ctx.drawImage(this.oBranchElementsImgData.img, c, d, e, f, this.aBranches[b].xPos + 20 * this.aBranches[b].scale * this.entireScale + this.turnOffset * 25 * b, this.aBranches[b].yPos - (f * this.aBranches[b].scale - this.oBranchImgData.oData.spriteHeight / 2 * this.aBranches[b].scale * this.aBranches[b].heightFactor) * this.entireScale, e * this.aBranches[b].scale * this.entireScale, f * this.aBranches[b].scale * this.entireScale)) : 2 == this.horizontalBranchState ? (j = this.aBranches[b].xPos - (this.oBranchElementsImgData.oData.oAtlasData[oImageIds.horiz2].width - this.oBranchImgData.oData.spriteWidth / 2) * this.aBranches[b].scale * this.entireScale + this.turnOffset * 25 * b, ctx.drawImage(this.oBranchElementsImgData.img, c, d, e, f, j - Math.max(j, e), this.aBranches[b].yPos, Math.max(j, e), f * this.aBranches[b].scale * this.aBranches[b].heightFactor * this.entireScale), c = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.turnSignLeft].x, d = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.turnSignLeft].y, e = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.turnSignLeft].width, f = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.turnSignLeft].height, ctx.drawImage(this.oBranchElementsImgData.img, c, d, e, f, this.aBranches[b].xPos + (-20 - e) * this.aBranches[b].scale * this.entireScale + this.turnOffset * 25 * b, this.aBranches[b].yPos - (f * this.aBranches[b].scale - this.oBranchImgData.oData.spriteHeight / 2 * this.aBranches[b].scale * this.aBranches[b].heightFactor) * this.entireScale, e * this.aBranches[b].scale * this.entireScale, f * this.aBranches[b].scale * this.entireScale)) : (j = this.aBranches[b].xPos + this.oBranchElementsImgData.oData.oAtlasData[oImageIds.horiz3].width / 2 * this.aBranches[b].scale * this.entireScale + this.turnOffset * 25 * b, ctx.drawImage(this.oBranchElementsImgData.img, c, d, e, f, j, this.aBranches[b].yPos, Math.max(canvas.width - j, e), f * this.aBranches[b].scale * this.aBranches[b].heightFactor * this.entireScale), j = this.aBranches[b].xPos - this.oBranchElementsImgData.oData.oAtlasData[oImageIds.horiz3].width / 2 * this.aBranches[b].scale * this.entireScale + this.turnOffset * 25 * b, ctx.drawImage(this.oBranchElementsImgData.img, c, d, e, f, j - Math.max(j, e), this.aBranches[b].yPos, Math.max(j, e), f * this.aBranches[b].scale * this.aBranches[b].heightFactor * this.entireScale), c = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.turnSignT].x, d = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.turnSignT].y, e = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.turnSignT].width, f = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.turnSignT].height, ctx.drawImage(this.oBranchElementsImgData.img, c, d, e, f, this.aBranches[b].xPos - e / 2 * this.aBranches[b].scale * this.entireScale + this.turnOffset * 25 * b, this.aBranches[b].yPos - (f * this.aBranches[b].scale - this.oBranchImgData.oData.spriteHeight / 2 * this.aBranches[b].scale * this.aBranches[b].heightFactor) * this.entireScale, e * this.aBranches[b].scale * this.entireScale, f * this.aBranches[b].scale * this.entireScale))));
                      for (b = this.aBranches.length - 1; b >= 0; b--) {
                        if ((0 == b || 1 == b) && this.aBranches.length > 2 && (squirrel.overGap = 1 == this.aBranches[b].gapState ? !0 : !1), 0 == b && this.aBranches[b].blockType > 0 && "invincible" != squirrel.powerUpState)
                          switch (this.aBranches[b].blockType) {
                            case 1:
                              (squirrel.checkHit(-1) || squirrel.checkHit(0)) && "blocked" != squirrel.actionState && endGameEvent("block");
                              break;
                            case 2:
                              (squirrel.checkHit(1) || squirrel.checkHit(0)) && "blocked" != squirrel.actionState && endGameEvent("block");
                              break;
                            case 3:
                              "ducking" != squirrel.actionState && "blocked" != squirrel.actionState && endGameEvent("block");
                              break;
                            case 4:
                              "jumping" != squirrel.actionState && "falling" != squirrel.actionState && "blocked" != squirrel.actionState && endGameEvent("block");
                              break;
                            case 5:
                              squirrel.checkHit(0) && "blocked" != squirrel.actionState && endGameEvent("block");
                              break;
                            case 6:
                            case 7:
                            case 8:
                            case 9:
                            case 10:
                          }
                        2 > b && this.aBranches[b].blockType >= 6 && ("magnet" == this.aBranches[b].powerUpState || squirrel.checkHit(Math.round(this.aBranches[b].coinOffset))) && (this.aBranches[b].blockType < 11 ? (gemEvent(1), addParticle("collectGem", this.aBranches[b].xPos - 75 * Math.round(this.aBranches[b].coinOffset) * this.aBranches[b].scale * this.entireScale + this.turnOffset * 25 * b, 550)) : (powerUpEvent(this.aBranches[b].blockType - 11), addParticle("collectGem", this.aBranches[b].xPos - 75 * Math.round(this.aBranches[b].coinOffset) * this.aBranches[b].scale * this.entireScale + this.turnOffset * 25 * b, 550)), this.aBranches[b].blockType = 0),
                                this.aBranches[b].blockType > 0 && (c = this.oBranchElementsImgData.oData.oAtlasData[oImageIds["block" + this.aBranches[b].blockType]].x, d = this.oBranchElementsImgData.oData.oAtlasData[oImageIds["block" + this.aBranches[b].blockType]].y, e = this.oBranchElementsImgData.oData.oAtlasData[oImageIds["block" + this.aBranches[b].blockType]].width, f = this.oBranchElementsImgData.oData.oAtlasData[oImageIds["block" + this.aBranches[b].blockType]].height, k = 0, this.aBranches[b].blockType >= 6 && ("magnet" != this.aBranches[b].powerUpState ? k = 75 * Math.round(this.aBranches[b].coinOffset) : (k += 75 * Math.round(this.aBranches[b].coinOffset) * (b / this.segNum), k = -(squirrel.x - branch.aBranches[b].xPos) * (1 - b / this.segNum))), ctx.drawImage(this.oBranchElementsImgData.img, c, d, e, f, this.aBranches[b].xPos - (e / 2 + k) * this.aBranches[b].scale * this.entireScale + this.turnOffset * 25 * b, this.aBranches[b].yPos - (f * this.aBranches[b].scale - this.oBranchImgData.oData.spriteHeight / 2 * this.aBranches[b].scale * this.aBranches[b].heightFactor) * this.entireScale, e * this.aBranches[b].scale * this.entireScale, f * this.aBranches[b].scale * this.entireScale)),
                                (0 == this.aBranches[b].blockType || this.aBranches[b].blockType >= 5) && this.aBranches[b].skewFrame > -1 && 0 == this.aBranches[b].gapState && this.aBranches[b].startSkewFrame <= 29 && (c = this.oBranchElementsImgData.oData.oAtlasData[oImageIds["plant" + this.aBranches[b].count % 4]].x, d = this.oBranchElementsImgData.oData.oAtlasData[oImageIds["plant" + this.aBranches[b].count % 4]].y, e = this.oBranchElementsImgData.oData.oAtlasData[oImageIds["plant" + this.aBranches[b].count % 4]].width, f = this.oBranchElementsImgData.oData.oAtlasData[oImageIds["plant" + this.aBranches[b].count % 4]].height, ctx.drawImage(this.oBranchElementsImgData.img, c, d, e, f, this.aBranches[b].xPos - e / 2 * this.aBranches[b].scale * this.entireScale + this.turnOffset * 25 * b, this.aBranches[b].yPos - (f * this.aBranches[b].scale - this.oBranchImgData.oData.spriteHeight / 2 * this.aBranches[b].scale * this.aBranches[b].heightFactor) * this.entireScale, e * this.aBranches[b].scale * this.entireScale, f * this.aBranches[b].scale * this.entireScale)),
                                1 == b && "blocked" != squirrel.actionState && (squirrel.update(), squirrel.render())
                      }
                      (this.aBranches.length <= 1 || "blocked" == squirrel.actionState) && (squirrel.update(), squirrel.render())
                    },
                    a
          }(), a.Branch = c) : this.triggerTurn("left")
        }(Elements || (Elements = {})),
        __extends = this.__extends ||
        function (a, b) {
          function c() {
            this.constructor = a
          }
          c.prototype = b.prototype,
                  a.prototype = new c
        },
        function (a) {
          var c, b = 1608821100;
          b === b ? (c = function (a) {
            function b() {
              a.call(this, assetLib.getData("squirrel"), 25, 30, "falling"),
                      this.incY = 0,
                      this.groundY = 550,
                      this.leftSteer = 0,
                      this.rightSteer = 0,
                      this.allowRight = !0,
                      this.allowLeft = !0,
                      this.actionState = "running",
                      this.overGap = !1,
                      this.rotInc = 0,
                      this.blockX = 0,
                      this.powerUpState = null,
                      this.powerUpTimer = 0,
                      this.flickerInc = 0,
                      this.flickerState = !1,
                      this.oBranchElementsImgData = assetLib.getData("branchElements"),
                      this.x = canvas.width / 2,
                      this.y = this.groundY - 200
            }
            return __extends(b, a),
                    b.prototype.jump = function () {
                      0 == this.incY && (this.incY = -15, playSound("jump"), this.setAnimType("once", "jumping"), this.animEndedFunc = function () {
                        this.setAnimType("loop", "falling")
                      },
                              this.actionState = "jumping")
                    },
                    b.prototype.turn = function (a) {
                      var b = -1534051195;
                      b === b ? "left" == a && this.allowLeft ? (this.leftSteer = 1, this.rightSteer = 0, "running" == this.actionState && (addParticle("dust", this.x, 625), playSound("sideStep")), this.allowLeft = !1, this.turnTween && this.turnTween.kill(), this.turnTween = TweenMax.to(this, .66 - branch.scrollSpeed / 5e3, {
                        rightSteer: 0,
                        leftSteer: 0,
                        ease: "Cubic.easeOut",
                        delay: .46 - branch.scrollSpeed / 5e3
                      })) : "right" == a && this.allowRight && (this.leftSteer = 0, this.rightSteer = -1, "running" == this.actionState && (addParticle("dust", this.x, 625), playSound("sideStep")), this.allowRight = !1, this.turnTween && this.turnTween.kill(), this.turnTween = TweenMax.to(this, .66 - branch.scrollSpeed / 5e3, {
                        rightSteer: 0,
                        leftSteer: 0,
                        ease: "Cubic.easeOut",
                        delay: .42 - branch.scrollSpeed / 7e3
                      })) : (userInput.removeHitArea("moreGames"), this.clearData(), userInput.removeHitArea("powerUp2"), _ctx.fillRect(0, 0, canvas.width, canvas.height), pauseCoreOff())
                    },
                    b.prototype.duck = function () {
                      var a = -441779474;
                      a === a ? 0 == this.incY && "ducking" != this.animId && (this.setAnimType("once", "ducking"), playSound("duck"), this.animEndedFunc = function () {
                        this.actionState = "running",
                                this.setAnimType("loop", "running")
                      },
                              this.actionState = "ducking") : (requestAnimFrame(updateUpgrade), __extends(Squirrel, _super), _ctx.translate(canvas.width / 2, -100 + this.flareY), userInput.addHitArea("playFromUpgrade", butEventHandler, null, "image", oPlayBut))
                    },
                    b.prototype.checkHit = function (a) {
                      return a == this.leftSteer + this.rightSteer || branch.aBranches.length >= 3 && a == Math.round((branch.aBranches[2].xPos - this.x) / 120) ? !0 : !1
                    },
                    b.prototype.fallOff = function () {
                      this.actionState = "falling",
                              this.setAnimType("loop", "falling"),
                              this.incY = Math.max(this.incY, 20)
                    },
                    b.prototype.hitBlock = function () {
                      this.actionState = "blocked",
                              this.setAnimType("loop", "blocked")
                    },
                    b.prototype.update = function () {
                      a.prototype.updateAnimation.call(this, delta),
                              null != this.powerUpState && (this.powerUpTimer -= delta, this.powerUpTimer < 0 && (playSound("powerUpEnd"), this.powerUpState = null)),
                              this.fps = branch.scrollSpeed / 32,
                              this.y += this.incY,
                              "blocked" != this.actionState ? (branch.aBranches.length > 3 && (this.x += 5 * (branch.aBranches[2].xPos - 120 * (this.leftSteer + this.rightSteer) - this.x) * delta), this.rotation = -(this.leftSteer + this.rightSteer) / 8) : this.rotation = 0,
                              this.y >= this.groundY && "falling" != this.actionState && "blocked" != this.actionState ? (this.incY = 0, this.y = this.groundY, ("jumping" == this.animId || "falling" == this.animId) && (this.setAnimType("loop", "running"), this.actionState = "running", addParticle("dust", this.x, 625))) : this.incY += (20 + branch.scrollSpeed / 40) * delta,
                              this.y == this.groundY && this.overGap && "falling" != this.actionState && endGameEvent("fall")
                    },
                    b.prototype.render = function () {
                      if ("blocked" != this.actionState && "falling" != this.actionState && branch.aBranches[2] && 1 != branch.aBranches[0].gapState && 1 != branch.aBranches[1].gapState && 1 != branch.aBranches[2].gapState) {
                        var b = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.heroShadow].x,
                                c = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.heroShadow].y,
                                d = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.heroShadow].width,
                                e = this.oBranchElementsImgData.oData.oAtlasData[oImageIds.heroShadow].height;
                        ctx.drawImage(this.oBranchElementsImgData.img, b, c, d, e, this.x - d / 2, 605, d, e)
                      }
                      this.scaleX < 4 && ("invincible" == this.powerUpState ? (this.flickerInc -= delta, this.flickerInc < 0 && (this.flickerState = !this.flickerState, this.flickerInc = .1), this.alpha = this.flickerState ? squirrel.powerUpTimer > 2 ? .6 : 1 : .3) : this.alpha = 1, a.prototype.render.call(this, ctx))
                    },
                    b
          }(Utils.AnimSprite), a.Squirrel = c) : (swipeDetect.reset(), playSound("jump"), userInput.removeHitArea("backFromUpgrade"), background.render(), renderMuteBut())
        }(Elements || (Elements = {})),
        function (a) {
          var b = function () {
            function a() {
              this.startX = null,
                      this.startY = null,
                      this.isTracking = !1,
                      this.lastDir = null,
                      this.curX = null,
                      this.curY = null,
                      this.resetInc = 0
            }
            return a.prototype.reset = function () {
              this.lastDir = null,
                      this.resetInc = 0
            },
                    a.prototype.keyTrack = function (a) {
                      this.lastDir = a
                    },
                    a.prototype.getDir = function () {
                      return this.isTracking && this.stopTrack(this.curX, this.curY, !0),
                              this.lastDir
                    },
                    a.prototype.track = function (a, b) {
                      this.curX = a,
                              this.curY = b,
                              null == this.startX && (this.startX = a, this.startY = b),
                              this.isTracking = !0
                    },
                    a.prototype.stopTrack = function (a, b, c) {
                      var d, e, f, h, g;
                      return "undefined" == typeof c && (c = !1),
                              !c && (d = this.startY - b, e = this.startX - a, f = d * d + e * e, 200 > f || null == this.startX) ? (this.isTracking = !1, this.startX = this.startY = null, void 0) : (g = Math.atan2(this.startY - b, this.startX - a) / radian, g > 45 && 135 > g ? (h = 0, squirrel.jump(), firstRun && 1 == hud.tutState && (hasVertAction = !0)) : g > 135 || -135 > g ? (h = 1, squirrel.allowRight = !0, squirrel.turn("right"), firstRun && 0 == hud.tutState && (hasHorizAction = !0)) : g > -135 && -45 > g ? (h = 2, squirrel.duck(), firstRun && 1 == hud.tutState && (hasVertAction = !0)) : (h = 3, squirrel.allowLeft = !0, squirrel.turn("left"), firstRun && 0 == hud.tutState && (hasHorizAction = !0)), this.isTracking = !1, this.startX = this.startY = null, this.lastDir = h, void 0)
                    },
                    a
          }();
          a.SwipeDetect = b
        }(Utils || (Utils = {})),
        function (a) {
          var b = function () {
            function a(a) {
              this.dataGroupNum = 2,
                      this.saveDataId = a,
                      this.clearData(),
                      this.setInitialData()
            }
            return a.prototype.clearData = function () {
              this.aLevelStore = new Array,
                      this.aLevelStore.push(0),
                      this.aLevelStore.push(0),
                      this.aLevelStore.push(0),
                      this.aLevelStore.push(0),
                      this.aLevelStore.push(0),
                      this.aLevelStore.push(0)
            },
                    a.prototype.resetData = function () {
                      this.aLevelStore = new Array,
                              this.aLevelStore.push(0),
                              this.aLevelStore.push(0),
                              this.aLevelStore.push(0),
                              this.aLevelStore.push(0),
                              this.aLevelStore.push(0),
                              this.aLevelStore.push(0),
                              this.saveData()
                    },
                    a.prototype.setInitialData = function () {
                      if ("undefined" != typeof Storage)
                        if (null != localStorage.getItem(this.saveDataId) && "" != localStorage.getItem(this.saveDataId)) {
                          this.aLevelStore = localStorage.getItem(this.saveDataId).split(",");
                          for (var a in this.aLevelStore)
                            this.aLevelStore[a] = parseInt(this.aLevelStore[a])
                        } else
                          this.resetData()
                    },
                    a.prototype.setData = function (a, b) {
                      var c, d;
                      for (c = 0; c < b.length; c++)
                        if (0 == this.aLevelStore.length || this.aLevelStore.length <= a * this.dataGroupNum + c) {
                          for (d = 0; d < a * this.dataGroupNum + c - this.aLevelStore.length - 1; d++)
                            this.aLevelStore.push(0);
                          this.aLevelStore.push(b[c])
                        } else
                          this.aLevelStore[a * this.dataGroupNum + c] = b[c]
                    },
                    a.prototype.getData = function (a, b) {
                      return this.aLevelStore[a * this.dataGroupNum + b]
                    },
                    a.prototype.saveData = function () {
                      var a, b;
                      if ("undefined" != typeof Storage) {
                        for (a = "", b = 0; b < this.aLevelStore.length; b++)
                          a += this.aLevelStore[b],
                                  b < this.aLevelStore.length - 1 && (a += ",");
                        localStorage.setItem(this.saveDataId, a)
                      }
                    },
                    a
          }();
          a.SaveDataHandler = b
        }(Utils || (Utils = {})),
        function (a) {
          var b = function (a) {
            function b(b, c, d) {
              a.call(this, assetLib.getData(b), 23, 30, "explode"),
                      this.x = c,
                      this.y = d,
                      this.setAnimType("once", "explode"),
                      "collectGem" == b ? TweenMax.to(this, .5, {
                        y: this.y - 50,
                        scaleX: 3,
                        scaleY: 3,
                        ease: "Quad.easeOut"
                      }) : "dust" == b && TweenMax.to(this, .5, {
                y: this.y + 100,
                ease: "Quad.easeIn"
              }),
                      this.animEndedFunc = function () {
                        this.removeMe = !0
                      }
            }
            return __extends(b, a),
                    b.prototype.update = function () {
                      a.prototype.updateAnimation.call(this, delta)
                    },
                    b.prototype.render = function () {
                      a.prototype.renderSimple.call(this, ctx)
                    },
                    b
          }(Utils.AnimSprite);
          a.Particle = b
        }(Elements || (Elements = {})),
        requestAnimFrame = function () {
          return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
                  function (a) {
                    window.setTimeout(a, 1e3 / 60, (new Date).getTime())
                  }
        }(),
        canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d"),
        canvas.width = 450,
        canvas.height = 700,
        div = document.getElementById("viewporter"),
        audioType = 0,
        muted = !1,
        splashTimer = 0,
        rotatePause = !1,
        manualPause = !1,
        isMobile = !1,
        gameState = "loading",
        aLangs = new Array("EN"),
        curLang = "",
        isBugBrowser = !1,
        isIE10 = !1,
        navigator.userAgent.match(/MSIE\s([\d]+)/) && (isIE10 = !0),
        deviceAgent = navigator.userAgent.toLowerCase(),
        (deviceAgent.match(/(iphone|ipod|ipad)/) || deviceAgent.match(/(android)/) || deviceAgent.match(/(iemobile)/) || deviceAgent.match(/iphone/i) || deviceAgent.match(/ipad/i) || deviceAgent.match(/ipod/i) || deviceAgent.match(/blackberry/i) || deviceAgent.match(/bada/i)) && (isMobile = !0, deviceAgent.match(/(android)/) && !/Chrome/.test(navigator.userAgent) && (isBugBrowser = !0)),
        userInput = new Utils.UserInput(canvas, isBugBrowser),
        resizeCanvas(),
        window.onresize = function () {
          setTimeout(function () {
            resizeCanvas()
          },
                  1)
        },
        window.addEventListener("load",
                function () {
                  setTimeout(function () {
                    resizeCanvas()
                  },
                          0),
                          window.addEventListener("orientationchange",
                                  function () {
                                    setTimeout(function () {
                                      resizeCanvas()
                                    },
                                            500)
                                  },
                                  !1)
                }),
        isIE10 || "undefined" == typeof window.AudioContext && "undefined" == typeof window.webkitAudioContext && -1 != navigator.userAgent.indexOf("Android") ? audioType = 0 : (audioType = 1, sound = new Howl({
  urls: ["audio/sound.ogg", "audio/sound.m4a"],
  sprite: {
    hitBlock: [0, 950],
    gem0: [1e3, 700],
    gem1: [2e3, 700],
    gem2: [3e3, 700],
    gem3: [4e3, 700],
    click: [5e3, 400],
    collectPowerUp: [5500, 1200],
    fall: [7e3, 2e3],
    boost: [9500, 1200],
    startGame: [11500, 1200],
    jump: [13e3, 800],
    makeTurn: [14e3, 700],
    sideStep: [15e3, 500],
    duck: [16e3, 600],
    powerUpEnd: [17e3, 600]
  }
}), music = new Howl({
  urls: ["audio/music.ogg", "audio/music.m4a"],
  volume: .01,
  loop: !0
})),
        totalScore = 0,
        levelScore = 0,
        levelNum = 0,
        oLogoData = {},
        oImageIds = {},
        swipeState = 1,
        radian = Math.PI / 180,
        oGameData = {
          distance: 0,
          curGemChain: 0,
          curGems: 0,
          boostNum: 0,
          totalGems: 0
        },
        aPowerUpBarData = new Array(0, 0, 0, 0),
        aPowerUpButsData = new Array(20, 20, 50, 50, 80, 80, 120, 120, 175, 175),
        saveDataHandler = new Utils.SaveDataHandler("hopdontstop1"),
        firstRun = !0,
        hasHorizAction = !1,
        hasVertAction = !1,
        loadPreAssets();