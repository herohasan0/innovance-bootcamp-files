// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"user_information.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.user = void 0;
var accounts = [{
  id: '1',
  name: 'Ankara Şube',
  iban: 'TR640006224173381322375494',
  balance: 100
}, {
  id: '2',
  name: 'İstanbul Şube',
  iban: 'TR200006272327399147534469',
  balance: 5040
}, {
  id: '3',
  name: 'Antalya Şube',
  iban: 'TR490006259546937863731562',
  balance: 10594
}, {
  id: '4',
  name: 'İzmir Şube',
  iban: 'TR810006265344518214278176',
  balance: 43562
}];
var user = {
  name: 'Jane',
  surname: 'Doe',
  accounts: accounts
};
exports.user = user;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _user_information = require("./user_information");

//gönderen hesabi sectirdigimiz alanın icerigini degistirebilmek icin o alani seciyoruz
var accordion = document.querySelector('#accountArea');
var balance = 100; //hesap bilgileri adedi kadar accordion elemanini yukarida sectigimiz alana ekliyoruz

_user_information.user.accounts.map(function (account) {
  accordion.innerHTML += "\n  <div class=\"accordion-item\">\n          <h2 class=\"accordion-header\" id=\"heading-".concat(account.id, "\">\n            <button id=\"accordion-button-").concat(account.id, "\" class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#collapse-").concat(account.id, "\" aria-expanded=\"false\" aria-controls=\"collapse-").concat(account.id, "\">\n              ").concat(account.name, "<div class=\"account-balance\" id=\"account-balance-").concat(account.id, "\">").concat(account.balance, "</div><div>\u20BA</div>\n            </button>\n          </h2>\n          <div id=\"collapse-").concat(account.id, "\" class=\"accordion-collapse collapse\" aria-labelledby=\"heading-").concat(account.id, "\" data-bs-parent=\"#accountArea\">\n            <div class=\"accordion-body\">\n              ").concat(account.iban, "\n            </div>\n          </div>\n        </div>\n");
}); //bootstrap stillendirmelerini dogru yapabilmek icin sadece ilk elemanin butonunun attribute ve class degerlerini ayarliyoruz


var accordionBtn = document.querySelector('#accordion-button-1');
accordionBtn.attributes[5].value = 'true';
accordionBtn.classList.remove('collapsed'); //ilk elemanın default olarak acik olmasi icin class listesine show class'ini ekliyoruz

var collapseItem = document.querySelector('#collapse-1');
collapseItem.classList.add('show'); //iban ve miktar inputlariyla islem yapabilmek icin en basta secimlerimizi yapiyoruz

var inputIban = document.querySelector('#inputIban');
var inputAmount = document.querySelector('#inputAmount'); //acik olan hesabin id'sini alabilmek icin
//show class'i olan elemani seciyoruz. bu class sadece acik olan hesapta oluyor. hesap penceresi kapaninca show class adi siliniyor

var openedItem = document.querySelector('.show'); //show class adina sahip olan div'in id'si collapse-1 geliyor. bunu split fonksiyonu ile ayirip son eleman olan 1 degerini aliyoruz

var openedItemSplit = openedItem.id.split('-');
var openedItemId = openedItemSplit[openedItemSplit.length - 1]; //her hesabin bakiyesinin bulundugu div id'si account-balance-1 gibi oldugu icin acik olarak gelen kismi bu sekilde seciyoruz

var openedAccountBalance = document.querySelector("#account-balance-".concat(openedItemId)); //iban girdigimiz alana her sayi girisinde calisacak fonksiyonu yaziyoruz

inputIban.addEventListener('input', function () {
  //TR'de iban uzunlukları 24 oldugu icin iban alanına girilen deger 24 karaktere ulastiginda miktar girilecek alanın disabled ozelligini kaldiriyoruz
  if (inputIban.value.length == 24) {
    inputAmount.removeAttribute('disabled');
  } else {
    //eger girilen deger 24'den buyuk olursa yine disabled ozelligi ekliyor ve miktar girisine izin vermiyoruz
    inputAmount.setAttribute('disabled', ''); //ayrica bu alani temizliyoruz

    inputAmount.value = '';
  }
});
var typedAmount = 0;
var sendBtn = document.querySelector('#sendBtn');
var modalBody = document.querySelector('.modal-body');
var form = document.querySelector('#form');
var modeTitle = document.querySelector('#exampleModalLabel');
var sendModalBtn = document.querySelector('#sendModalBtn');
console.log(openedAccountBalance);

function success() {
  sendModalBtn.classList.add('none');
  modalBody.innerHTML = 'Paracıklar yolda 💸';
  inputIban.value = '';
  inputAmount.value = '';
  inputAmount.setAttribute('disabled', '');
  sendBtn.classList.add('disabled');
  openedAccountBalance.textContent = openedAccountBalance.textContent - typedAmount;
  balance = balance - typedAmount;
}

sendBtn.addEventListener('click', function (event) {
  event.preventDefault();

  if (typedAmount < 500) {
    success();
  } else {
    modeTitle.textContent = 'Son bir şey daha ';
    form.classList.remove('form-none');
  }
});
var codeInput = document.querySelector('#recipient-name');
var denemeHakki = 4;
var fieldSet = document.querySelector('fieldset');
sendModalBtn.addEventListener('click', function (event) {
  if (codeInput.value == 1234) {
    success();
  } else {
    denemeHakki--;
    modeTitle.textContent = "Hatal\u0131 \u015Eifre! ".concat(denemeHakki, " deneme hakk\u0131n\u0131z kald\u0131!");
    codeInput.value = '';

    if (denemeHakki == 0) {
      modeTitle.textContent = 'Üzgünüz';
      modalBody.innerHTML = 'Hesabınız blokelendi';
      fieldSet.setAttribute('disabled', '');
      clearInterval(setInt);
      sendModalBtn.classList.add('disabled');
    }
  }
});
inputAmount.addEventListener('input', function (event) {
  typedAmount = event.target.value;
  console.log(balance);

  if (typedAmount && balance >= typedAmount) {
    sendBtn.classList.remove('disabled');
  } else {
    sendBtn.classList.add('disabled');
  }
});

var calc = function calc(event) {
  var wholeId = event.target.id.split('-');
  var id = wholeId[wholeId.length - 1];
  var balanceTag = document.querySelector("#account-balance-".concat(id));
  balance = parseInt(balanceTag.textContent);
  openedAccountBalance = balanceTag;
};

var btn = document.querySelectorAll('.accordion-button');
btn.forEach(function (item) {
  item.addEventListener('click', calc);
});
var countDownLabel = document.querySelector('#countdown');
var setInt = setInterval(function () {
  countDownLabel.textContent = countDownLabel.textContent - 1;

  if (countDownLabel.textContent == 0) {
    fieldSet.setAttribute('disabled', '');
    clearInterval(setInt);
  }
}, 1000);
},{"./user_information":"user_information.js"}],"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62583" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/03-homework.e31bb0bc.js.map