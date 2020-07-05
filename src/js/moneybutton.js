/**
 * Copyright 2019 Yours Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
// eslint-disable-next-line no-unused-vars
var moneyButton = (function(e) {
  "use strict";
  function t(e, t) {
    return t.encode
      ? t.strict
        ? encodeURIComponent(e).replace(/[!'()*]/g, (e) =>
            "%".concat(
              e
                .charCodeAt(0)
                .toString(16)
                .toUpperCase()
            )
          )
        : encodeURIComponent(e)
      : e;
  }
  var n = (e, n) => {
    if (!e) return "";
    const o = (function(e) {
        switch (e.arrayFormat) {
          case "index":
            return (n) => (o, r) => {
              const s = o.length;
              return void 0 === r || (e.skipNull && null === r)
                ? o
                : null === r
                ? [...o, [t(n, e), "[", s, "]"].join("")]
                : [...o, [t(n, e), "[", t(s, e), "]=", t(r, e)].join("")];
            };
          case "bracket":
            return (n) => (o, r) =>
              void 0 === r || (e.skipNull && null === r)
                ? o
                : null === r
                ? [...o, [t(n, e), "[]"].join("")]
                : [...o, [t(n, e), "[]=", t(r, e)].join("")];
          case "comma":
            return (n) => (o, r) =>
              null == r || 0 === r.length
                ? o
                : 0 === o.length
                ? [[t(n, e), "=", t(r, e)].join("")]
                : [[o, t(r, e)].join(",")];
          default:
            return (n) => (o, r) =>
              void 0 === r || (e.skipNull && null === r)
                ? o
                : null === r
                ? [...o, t(n, e)]
                : [...o, [t(n, e), "=", t(r, e)].join("")];
        }
      })(
        (n = Object.assign({ encode: !0, strict: !0, arrayFormat: "none" }, n))
      ),
      r = Object.assign({}, e);
    if (n.skipNull)
      for (const e of Object.keys(r))
        (void 0 !== r[e] && null !== r[e]) || delete r[e];
    const s = Object.keys(r);
    return (
      !1 !== n.sort && s.sort(n.sort),
      s
        .map((r) => {
          const s = e[r];
          return void 0 === s
            ? ""
            : null === s
            ? t(r, n)
            : Array.isArray(s)
            ? s.reduce(o(r), []).join("&")
            : t(r, n) + "=" + t(s, n);
        })
        .filter((e) => e.length > 0)
        .join("&")
    );
  };
  function o(e, t, n) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = n),
      e
    );
  }
  function r(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      t &&
        (o = o.filter(function(t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        n.push.apply(n, o);
    }
    return n;
  }
  function s(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? r(Object(n), !0).forEach(function(t) {
            o(e, t, n[t]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : r(Object(n)).forEach(function(t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
    }
    return e;
  }
  function i(e, t) {
    if (null == e) return {};
    var n,
      o,
      r = (function(e, t) {
        if (null == e) return {};
        var n,
          o,
          r = {},
          s = Object.keys(e);
        for (o = 0; o < s.length; o++)
          (n = s[o]), t.indexOf(n) >= 0 || (r[n] = e[n]);
        return r;
      })(e, t);
    if (Object.getOwnPropertySymbols) {
      var s = Object.getOwnPropertySymbols(e);
      for (o = 0; o < s.length; o++)
        (n = s[o]),
          t.indexOf(n) >= 0 ||
            (Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]));
    }
    return r;
  }
  function a(e) {
    var t = (function(e, t) {
      if ("object" != typeof e || null === e) return e;
      var n = e[Symbol.toPrimitive];
      if (void 0 !== n) {
        var o = n.call(e, t || "default");
        if ("object" != typeof o) return o;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t ? String : Number)(e);
    })(e, "string");
    return "symbol" == typeof t ? t : String(t);
  }
  class c {
    constructor(e) {
      (this.keyDefined = (t) => t in e), (this.getValue = (t) => e[t]);
    }
    get(e) {
      if (this.keyDefined(e)) return this.getValue(e);
      throw new Error("Unknown configuration: ".concat(e));
    }
  }
  const u = new (class {
    constructor() {
      this.variables = {};
    }
    build() {
      return new c(this.variables);
    }
    addValue(e, t) {
      if (void 0 === t)
        throw new Error(
          'Failed to add "'.concat(
            e,
            '" property. The value cannot be undefined'
          )
        );
      if (e in this.variables)
        throw new Error('"'.concat(e, '" already has a value defined.'));
      return (this.variables[e] = t), this;
    }
    addValueWithDefault(e, t, n) {
      if (void 0 === n)
        throw new Error(
          'Failed to add "'.concat(
            e,
            '" property. Default value cannot be undefined'
          )
        );
      return this.addValue(e, void 0 === t ? n : t);
    }
  })()
    .addValue("NETWORK", "mainnet")
    .addValue("MONEY_BUTTON_WEBAPP_PROXY_URI", "https://www.moneybutton.com")
    .build()
    .get("MONEY_BUTTON_WEBAPP_PROXY_URI");
  class l {
    constructor(e) {
      o(this, "start", () => {
        window.addEventListener("message", this._onMessageReceived, !1);
      }),
        o(this, "enableDeliver", () => {
          (this._deliverMessages = !0),
            this._pendingMessages.forEach((e) =>
              this.targetWindow.postMessage(e, "*")
            ),
            (this._pendingMessages = []);
        }),
        o(this, "finalize", () => {
          window.removeEventListener("message", this._onMessageReceived, !1);
        }),
        o(this, "subscribe", (e, t) => {
          this.handlers[e] = t;
        }),
        o(this, "unsuscribe", (e) => {
          delete this.handlers[e];
        }),
        o(this, "_onMessageReceived", async (e) => {
          if (e.source !== this.targetWindow) return;
          if (!e.data || !e.data.v1) return;
          const t = e.data.v1;
          if (t.repliesTo && this._replayQueue[t.repliesTo]) {
            const e = this._replayQueue,
              n = t.repliesTo,
              {
                [n]: { resolve: o, reject: r },
              } = e,
              s = i(e, [n].map(a));
            return (
              (this._replayQueue = s),
              void (t.errorResponse
                ? await r(t.payload, t.topic, t.messageId)
                : await o(t.payload, t.topic, t.messageId))
            );
          }
          const n = this.handlers[t.topic];
          if (n)
            try {
              const e = await n(t.payload, t.topic, t.messageId);
              t.reply &&
                this.send("".concat(t.topic, ":reply"), e, {
                  repliesTo: t.messageId,
                  errorResponse: !1,
                });
            } catch (e) {
              console.error(e),
                t.reply &&
                  this.send(
                    "".concat(t.topic, ":reply"),
                    { message: e.message },
                    { repliesTo: t.messageId, errorResponse: !0 }
                  );
            }
        }),
        o(this, "send", (e, t, n = {}) => {
          const o = {
            v1: s(
              {
                topic: e,
                payload: t,
                messageId: Math.floor(1e17 * Math.random()).toString(),
              },
              n
            ),
          };
          return (
            this._deliverMessages
              ? this.targetWindow.postMessage(o, "*")
              : (this._pendingMessages = [...this._pendingMessages, o]),
            o
          );
        }),
        o(
          this,
          "sendWithReply",
          async (e, t) =>
            new Promise((n, o) => {
              const {
                v1: { messageId: r },
              } = this.send(e, t, { reply: !0 });
              this._replayQueue = s({}, this._replayQueue, {
                [r]: { resolve: n, reject: o },
              });
            })
        ),
        o(this, "sendInsufficientBalanceError", () => {
          const e = {
            error: "insufficient balance",
            popup: {
              title: "Low balance",
              message: "Your balance is too low to make this payment.",
              buttonText: "Add Money",
              buttonUrl: "".concat(u, "/money"),
            },
          };
          this.send("error.insufficient-balance", e);
        }),
        o(this, "sendUnexpectedError", (e) => {
          const t = {
            error: "unexpected error",
            popup: { title: "Unexpected Error", message: e.message },
          };
          this.send("error.unexpected-error", t);
        }),
        o(this, "sendCryptoOperationsError", (e) => {
          const t = {
            error: "crypto operations error",
            popup: { title: "Crypto Operations error", message: e.message },
          };
          this.send("error.crypto-operations-error", t);
        }),
        o(this, "sendPaymentSuccess", (e) => {
          const t = { payment: e };
          this.send("payment-success", t);
        }),
        o(this, "sendCryptoOperationsSuccess", (e) => {
          const t = { cryptoOperations: e };
          this.send("crypto-operations-success", t);
        }),
        // eslint-disable-next-line no-unused-vars
        o(this, "sendNotLoggedInError", (e) => {
          const t = {
            error: "not logged in",
            popup: {
              title: "Money Button",
              message:
                "Money Button is a simple payment system. Join Money Button to make this payment.",
              buttonText: "Sign up",
              buttonUrl: "".concat(u, "/register"),
              buttonText2: "Log in",
              buttonUrl2: "".concat(u, "/login"),
            },
          };
          this.send("error.not-logged-in", t);
        }),
        o(this, "sendCompatibilityIssue", (e) => {
          const t = {
            error: "compatibility",
            message: e.message,
            popup: { title: "Compatibility", message: e.message },
          };
          this.send("error.compatibility", t);
        }),
        o(this, "sendSafaryIssueHint", () => {
          this.send("error.safari-compatibility", {
            error: "safari privacy",
            popup: {
              title: "Money Button",
              message:
                "Money Button is a simple payment system. Enable Money Button on Safari and log in to make this payment.",
              buttonUrl:
                "https://blog.moneybutton.com/2018/09/24/how-to-enable-money-button-on-safari-and-ios/",
              buttonText: "Enable",
            },
          });
        }),
        (this.handlers = {}),
        (this.targetWindow = e),
        (this._pendingMessages = []),
        (this._deliverMessages = !1),
        (this._replayQueue = {});
    }
  }
  let p = null;
  function d() {
    p && (p.parentNode.removeChild(p), (p = null));
  }
  function m({
    title: e,
    message: t,
    buttonText: n,
    buttonUrl: o,
    buttonText2: r,
    buttonUrl2: s,
  }) {
    d(),
      (p = document.createElement("div")),
      p.setAttribute(
        "style",
        "display: flex; justify-content: center; font-family: sans-serif;"
      );
    let i = document.getElementsByClassName("popup__moneybutton").item(0);
    null === i &&
      ((i = (function() {
        const e = document.createElement("div");
        return (
          (e.className = "popup__moneybutton"),
          (e.style.position = "relative"),
          (e.style.display = "flex"),
          (e.style.justifyContent = "center"),
          e
        );
      })()),
      document.body.appendChild(i)),
      i.appendChild(p),
      (p.innerHTML = '\n    <div class="close__moneybutton"></div>\n    <div class="hint__moneybutton">\n      <div class="content__moneybutton">\n        <span class="title__moneybutton">'
        .concat(e, '</span>\n        <span class="text__moneybutton">')
        .concat(
          t,
          '</span>\n        <div class="buttonsWrapper__moneybutton">\n          '
        )
        .concat(
          n
            ? '<a href="'
                .concat(
                  o,
                  '" target="_blank" rel="noopener noreferrer" class="button__moneybutton red__moneybutton">'
                )
                .concat(n, "</a>")
            : "",
          "\n          "
        )
        .concat(
          r
            ? '<a href="'
                .concat(
                  s,
                  '" target="_blank" rel="noopener noreferrer" class="button__moneybutton nofill__moneybutton">'
                )
                .concat(r, "</a>")
            : "",
          "\n        </div>\n      </div>\n      <style>\n        .hint__moneybutton .button__moneybutton,\n        .hint__moneybutton .title__moneybutton{\n          font-weight:700\n        }\n        .hint__moneybutton .button__moneybutton,\n        .hint__moneybutton .content__moneybutton{\n            color:#fff;\n            box-sizing:border-box;\n            display:flex;\n            font-family: 'IBM Plex Sans', sans-serif;\n        }\n        .hint__moneybutton a{\n            text-decoration:none;\n        }\n        .hint__moneybutton{\n            min-width:254px;\n            position:fixed;\n            bottom: 10px;\n            right: 10px;\n            max-width: 300px;\n            z-index: 1000;\n        }\n        .hint__moneybutton .content__moneybutton{\n          top:0;\n          left:0;\n          right:0;\n          bottom:0;\n          z-index:1\n        }\n        .hint__moneybutton .content__moneybutton{\n            background-color:#191927;\n            padding:30px;\n            border-radius:10px;\n            bottom:19px;\n            left:0;\n            right:0;\n            flex-direction:column;\n            align-content:center;\n            align-items:flex-start;\n            min-width: 260px;\n        }\n        .hint__moneybutton .title__moneybutton{\n            font-size:20px;\n            margin-bottom:10px\n        }\n        .hint__moneybutton .text__moneybutton{\n            font-size:14px;\n            margin-bottom:20px\n        }\n        .hint__moneybutton .buttonsWrapper__moneybutton{\n            width:100%;\n            display:flex;\n            justify-content:space-between;\n            position:relative;\n            z-index:2\n        }\n        .hint__moneybutton .button__moneybutton{\n            text-align:center;\n            font-size:12px;\n            width:calc(50% - 10px);\n            height:35px;\n            padding:0 10px;\n            border-radius:20px;\n            align-items:center;\n            justify-content:center;\n            transition:all 250ms ease-out;\n            cursor:pointer\n        }\n        .hint__moneybutton .button__moneybutton.add__moneybutton {\n            width: auto;\n        }\n        .hint__moneybutton .button__moneybutton.red__moneybutton{\n            background-color:#e54d3f\n        }\n        .hint__moneybutton .button__moneybutton.red__moneybutton:hover{\n            background-color:#ce4134\n        }\n        .hint__moneybutton .button__moneybutton.nofill__moneybutton{\n            border:1px solid #fff\n        }\n        .hint__moneybutton .button__moneybutton.nofill__moneybutton:hover{\n            color:#191927;\n            background-color:#fff\n        }\n        .close__moneybutton {\n          background-color: rgba(255, 255, 255, 0.6);\n          position: fixed;\n          top: 0;\n          left: 0;\n          width: 100vw;\n          height: 100vh;\n          z-index: 999;\n        }\n        @import url('https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,700');\n      </style>\n    </div>\n  "
        )),
      document
        .getElementsByClassName("close__moneybutton")
        .item(0)
        .addEventListener("click", d);
  }
  function y(e) {
    return "function" == typeof e;
  }
  function b(e, t) {
    // eslint-disable-next-line no-prototype-builtins
    return t.reduce((t, n) => (e.hasOwnProperty(n) && (t[n] = e[n]), t), {});
  }
  function h() {
    const e = (function() {
      const e = document.createElement("iframe");
      return (
        (e.style.border = "none"),
        (e.style.width = "1px"),
        (e.style.height = "1px"),
        (e.scrolling = "no"),
        (e.style.position = "fixed"),
        (e.style.bottom = "-1px"),
        (e.style.left = "-1px"),
        (e.src = "".concat(
          "https://www.moneybutton.com",
          "/iframe/imb-payments"
        )),
        e
      );
    })();
    return document.body.appendChild(e), e;
  }
  const f = [
      "amount",
      "to",
      "currency",
      "opReturn",
      "outputs",
      "cryptoOperations",
      "buttonId",
      "buttonData",
      "preserveOrder",
    ],
    g = ["amount", "currency", "to", "address", "userId", "script", "paymail"],
    _ = [
      "name",
      "method",
      "data",
      "dataEncoding",
      "value",
      "valueEncoding",
      "key",
      "algorithm",
      "publicKey",
      "paymail",
      "verified",
      "signature",
    ],
    w = (e) => {
      const t = b(e, f);
      return (
        t.outputs && (t.outputs = t.outputs.map((e) => b(e, g))),
        t.cryptoOperations &&
          (t.cryptoOperations = t.cryptoOperations.map((e) => b(e, _))),
        JSON.parse(JSON.stringify(t))
      );
    };
  class v {
    constructor(e) {
      (this.token = e),
        (this.pmClient = null),
        (this.iframe = null),
        this.resetConnection();
    }
    async swipe(e) {
      return (
        document.body.contains(this.iframe) || (await this.resetConnection()),
        this.pmClient.sendWithReply("imb.start-payment", {
          authToken: this.token,
          attributes: w(e),
        })
      );
    }
    async amountLeft() {
      return (
        document.body.contains(this.iframe) || (await this.resetConnection()),
        await this.pmClient.sendWithReply("imb.amount-left", {
          authToken: this.token,
        })
      );
    }
    async __clearData__() {
      return (
        document.body.contains(this.iframe) || (await this.resetConnection()),
        this.pmClient.send("imb:cleardata__", {})
      );
    }
    async resetConnection() {
      return new Promise((e) => {
        this.pmClient && this.pmClient.finalize(),
          (this.iframe = h()),
          (this.pmClient = new l(this.iframe.contentWindow)),
          this.pmClient.subscribe("error.insufficient-balance", (e) =>
            m(e.popup)
          ),
          this.pmClient.subscribe("error.too-long-mempool-chain", (e) =>
            m(e.popup)
          ),
          this.pmClient.subscribe("error.unexpected-error", (e) => m(e.popup)),
          this.pmClient.start(),
          (this.iframe.onload = () => {
            this.pmClient.enableDeliver(), e();
          });
      });
    }
  }
  const x = "".concat("https://www.moneybutton.com", "/iframe");
  class O {
    constructor(e) {
      (this.iframe = document.createElement("iframe")),
        (this.iframe.src = "".concat(x, "/").concat(e));
    }
    styleIframe(e) {
      Object.assign(this.iframe.style, e);
    }
    attach(e) {
      e.appendChild(this.iframe),
        (this.iframe.contentWindow.onunload = () => {
          (null !== this.iframe.contentWindow &&
            this.iframe.contentWindow.location.href !== x) ||
            (e.innerHTML = "");
        }),
        (this._pmClient = new l(this.iframe.contentWindow));
    }
    postMessageClient() {
      return this._pmClient;
    }
  }
  class P {
    constructor(e) {
      (this.storage = e),
        (this.iframe = new O("onboard-new-user")),
        this.iframe.styleIframe({
          border: "none",
          width: "100%",
          minHeight: "100vh",
        });
    }
    async start() {
      return new Promise((e, t) => {
        const n = document.createElement("div");
        (n.style.position = "fixed"),
          (n.style.top = "0px"),
          (n.style.left = "0px"),
          (n.style.width = "100vw"),
          (n.style.height = "100vh"),
          (n.style.zIndex = "1001"),
          document.body.appendChild(n),
          this.iframe.attach(n);
        const o = this.iframe.postMessageClient();
        o.subscribe("onboard-new-user:finished", () => {
          this._teardown(n), e();
        }),
          o.subscribe("create-account:canceled", () => {
            this._teardown(n), t(new Error("user_desition"));
          }),
          o.enableDeliver(),
          o.start();
      });
    }
    _teardown(e) {
      this.iframe.postMessageClient().finalize(), document.body.removeChild(e);
    }
  }
  const E = "".concat("https://www.moneybutton.com", "/iframe");
  function C(e, t) {
    const n = (function(e) {
      const t = document.createElement("iframe");
      return (
        (t.style.border = "none"),
        (t.style.width = "100%"),
        (t.style.minHeight = "100vh"),
        (t.src = "".concat(E, "/").concat(e)),
        t
      );
    })(t);
    return (
      e.appendChild(n),
      (n.contentWindow.onunload = () => {
        (null !== n.contentWindow && n.contentWindow.location.href !== E) ||
          (e.innerHTML = "");
      }),
      n
    );
  }
  const k = [
    "permission",
    "suggestedAmount",
    "minimumAmount",
    "clientIdentifier",
    "onNewPermissionGranted",
  ];
  const M = [
      "to",
      "amount",
      "currency",
      "label",
      "successMessage",
      "opReturn",
      "outputs",
      "cryptoOperations",
      "clientIdentifier",
      "buttonId",
      "buttonData",
      "type",
      "onPayment",
      "onError",
      "onLoad",
      "devMode",
      "editable",
      "disabled",
      "preserveOrder",
    ],
    j = new Map();
  function I(e, t = {}) {
    j.has(e)
      ? (function(e, t) {
          const n = j.get(e);
          n.send("attributes-updated", T(t)),
            n.subscribe("resend-attributes", async () => {
              n.send("attributes-updated", T(t));
            }),
            // eslint-disable-next-line no-unused-vars
            n.subscribe("connect-local-storage", (e) => !1),
            n.subscribe("payment-success", (e) => S(e, t)),
            n.subscribe("crypto-operations-success", (e) => D(e, t)),
            n.subscribe("error.insufficient-balance", (e) => W(e, t)),
            n.subscribe("error.unexpected-error", (e) => W(e, t)),
            n.subscribe("error.crypto-operations-error", (e) => W(e, t)),
            n.subscribe("error.not-logged-in", (e) => W(e, t)),
            n.subscribe("error.compatibility", (e) => W(e, t)),
            n.subscribe("error.safari-compatibility", (e) => W(e, t)),
            n.subscribe("error.too-long-mempool-chain", (e) => W(e, t)),
            n.subscribe("error", (e) => W(e, t));
        })(e, t)
      : (function(e, t) {
          !(function(e, t) {
            if (!(e instanceof Element))
              throw new Error("The first argument must be of type Element.");
            if (!(e instanceof Object) || 0 === Object.keys(t).length)
              throw new Error("Please, specify the button's attributes.");
            if (void 0 !== t.buttonData && "string" != typeof t.buttonData)
              throw new Error('"buttonData" should be a string.');
          })(e, t);
          // eslint-disable-next-line no-unused-vars
          const n = (function(e = {}) {
            const t = document.createElement("iframe");
            return (
              (t.style.border = "none"),
              (t.style.width = "280px"),
              (t.style.height = "50px"),
              (t.scrolling = "no"),
              (t.src = N()),
              t
            );
          })(t);
          e.appendChild(n),
            (e.style.position = "relative"),
            (e.style.display = "inline-block"),
            (e.style.width = "280px"),
            (e.style.height = "50px"),
            (n.contentWindow.onunload = () => {
              (null !== n.contentWindow &&
                n.contentWindow.location.href !== N()) ||
                (j.delete(e), (e.innerHTML = ""));
            });
          const o = new l(n.contentWindow);
          o.send("initial-attributes", T(t), {}),
            o.subscribe("ready", () => {
              o.enableDeliver(),
                t.onLoad && "function" == typeof t.onLoad && t.onLoad();
            }),
            o.subscribe("resend-attributes", () => {
              o.enableDeliver(), o.send("attributes-updated", T(t));
            }),
            // eslint-disable-next-line no-unused-vars
            o.subscribe("connect-local-storage", (e) => !1),
            o.subscribe("payment-success", (e) => S(e, t)),
            o.subscribe("crypto-operations-success", (e) => D(e, t)),
            o.subscribe("error.insufficient-balance", (e) => W(e, t)),
            o.subscribe("error.unexpected-error", (e) => W(e, t)),
            o.subscribe("error.crypto-operations-error", (e) => W(e, t)),
            o.subscribe("error.not-logged-in", (e) => W(e, t)),
            o.subscribe("error.compatibility", (e) => W(e, t)),
            o.subscribe("error.safari-compatibility", (e) => W(e, t)),
            o.subscribe("error.too-long-mempool-chain", (e) => W(e, t)),
            o.subscribe("error", (e) => W(e, t)),
            o.start(),
            j.set(e, o);
        })(e, t);
  }
  function T(e) {
    return {
      to: e.to,
      amt: e.amount,
      edt: e.editable,
      ccy: e.currency,
      lbl: e.label,
      scsmsg: e.successMessage,
      opd: e.opReturn,
      os: JSON.stringify(e.outputs),
      cid: e.clientIdentifier,
      bid: e.buttonId,
      bdt: e.buttonData,
      t: e.type,
      dev: e.devMode,
      dsbd: e.disabled,
      crop: JSON.stringify(e.cryptoOperations),
      pord: e.preserveOrder,
    };
  }
  function N() {
    return ""
      .concat("https://www.moneybutton.com", "/iframe/v2?")
      .concat(n({ format: "postmessage" }));
  }
  function S(e, t) {
    const { payment: n } = e;
    n && "function" == typeof t.onPayment && t.onPayment.call(window, n);
  }
  function D(e, t) {
    const { cryptoOperations: n } = e;
    n &&
      "function" == typeof t.onCryptoOperations &&
      t.onCryptoOperations.call(window, n);
  }
  function W(e, t) {
    const { error: n, popup: o } = e;
    o && m(o),
      n &&
        "function" == typeof t.onError &&
        t.onError.call(window, new Error(n));
  }
  function L(e) {
    const t = {};
    for (const n in e) {
      const o = e[n];
      if (M.includes(n))
        switch (n) {
          case "outputs":
            // eslint-disable-next-line no-case-declarations
            let e;
            try {
              e = JSON.parse(o);
            } catch (t) {
              e = null;
            }
            e instanceof Array
              ? (t[n] = e)
              : console.warn(
                  "The value provided for ".concat(
                    n,
                    " is not a valid JSON array."
                  )
                );
            break;
          case "cryptoOperations":
            // eslint-disable-next-line no-case-declarations
            let r;
            try {
              r = JSON.parse(o);
            } catch (e) {
              r = [];
            }
            r instanceof Array
              ? (t[n] = r)
              : console.warn("cryptoOperations should be an array");
            break;
          case "devMode":
            t[n] = "true" === o;
            break;
          case "onPayment":
          case "onError":
          case "onLoad":
            "function" == typeof window[o]
              ? (t[n] = window[o])
              : console.warn(
                  "The value provided for ".concat(
                    n,
                    " is not a function in the global scope."
                  )
                );
            break;
          default:
            t[n] = o;
        }
      else console.warn("Unexpected data attribute: ".concat(n, "."));
    }
    return t;
  }
  return (
    document.addEventListener("DOMContentLoaded", function() {
      if (window.moneyButton.alreadyLoaded) return;
      window.moneyButton.alreadyLoaded = !0;
      const e = document.getElementsByClassName("money-button");
      for (let t = 0; t < e.length; ++t) {
        const n = e.item(t);
        try {
          const e = L(n.dataset);
          Object.keys(e).length > 0 && I(n, e),
            console.log("Money Button: added button.");
        } catch (e) {
          console.error("Money Button: adding button failed.", e);
        }
      }
    }),
    (e.IMB = class {
      constructor(e) {
        (this.config = b(e, k)),
          e.permission
            ? (this.paymentProcessor = new v(e.permission))
            : (this.paymentProcessor = null);
      }
      async swipe(e) {
        null === this.paymentProcessor && (await this.askForPermission());
        try {
          const t = await this.paymentProcessor.swipe(e);
          return (
            y(e.onCryptoOperations) && e.onCryptoOperations(t.cryptoOperations),
            y(e.onPayment) && e.onPayment(t.payment),
            t
          );
        } catch (t) {
          if (
            (y(e.onError) && e.onError(t),
            "Not enough authorized amount." === t.message)
          ) {
            return (
              await this.renewPermission(), await this.paymentProcessor.swipe(e)
            );
          }
          if ("invalid token" === t.message)
            return (this.paymentProcessor = null), this.swipe(e);
          throw t;
        }
      }
      async getPermission() {
        return (
          null === this.paymentProcessor && (await this.askForPermission()),
          this.paymentProcessor.token
        );
      }
      async amountLeft(e) {
        if (null === this.paymentProcessor)
          throw new Error("No active permission.");
        return this.paymentProcessor.amountLeft(e);
      }
      async askForPermission(e = {}) {
        const t = b(this.config, [
          "clientIdentifier",
          "suggestedAmount",
          "minimumAmount",
        ]);
        e.amount &&
          e.currency &&
          (t.suggestedAmount = { amount: e.amount, currency: e.currency }),
          (e = b(t, ["clientIdentifier", "suggestedAmount", "minimumAmount"]));
        const n = {
            suggestedAmount: { amount: "5", currency: "USD" },
            minimumAmount: { amount: "0.25", currency: "USD" },
            ...t,
            ...e,
          },
          o = document.createElement("div");
        (o.style.position = "fixed"),
          (o.style.top = "0px"),
          (o.style.left = "0px"),
          (o.style.width = "100%"),
          (o.style.height = "auto"),
          (o.style.zIndex = "1001"),
          document.body.appendChild(o);
        const r = C(o, "imb-permission-grant");
        return this._askIframeForPermition(n, o, r);
      }
      async __clearData__() {
        return (
          null === this.paymentProcessor && (await this.askForPermission()),
          this.paymentProcessor.__clearData__()
        );
      }
      // eslint-disable-next-line no-unused-vars
      async renewPermission(e) {
        const t = {
            suggestedAmount: { amount: "5", currency: "USD" },
            minimumAmount: { amount: "0.25", currency: "USD" },
            ...b(this.config, [
              "clientIdentifier",
              "suggestedAmount",
              "minimumAmount",
            ]),
          },
          n = document.createElement("div");
        (n.style.position = "fixed"),
          (n.style.width = "100%"),
          (n.style.height = "350px"),
          (n.style.bottom = "20px"),
          (n.style.left = "0"),
          (n.style.display = "flex"),
          (n.style.justifyContent = "center"),
          (n.style.pointerEvents = "none"),
          (n.style.zIndex = "1001"),
          document.body.appendChild(n);
        const o = C(n, "imb-renew-permission");
        return (
          (o.style.maxWidth = "550px"),
          (o.style.width = "90%"),
          (o.style.pointerEvents = "auto"),
          this._askIframeForPermition(t, n, o)
        );
      }
      async _askIframeForPermition(e, t, n) {
        return new Promise((o, r) => {
          const s = new l(n.contentWindow);
          s.enableDeliver(),
            s.subscribe("ready", () => {
              s.send("imb.request-swipe-permission", { ...e });
            }),
            s.subscribe("imb.permission-granted", (e) => {
              if (
                ((this.paymentProcessor = new v(e.token)),
                y(this.config.onNewPermissionGranted))
              )
                try {
                  this.config.onNewPermissionGranted(e.token);
                } catch (e) {
                  console.error(
                    "There was a problem when attempting to save the permission code:",
                    e.message
                  ),
                    console.error(e);
                }
              s.finalize(),
                document.body.removeChild(t),
                (function(e) {
                  const t = document.createElement("div");
                  (t.style.position = "fixed"),
                    (t.style.bottom = "20px"),
                    (t.style.left = "0"),
                    (t.style.width = "100%"),
                    (t.innerHTML = "\n  <div class='alert__moneybutton' role='alert'>\n    <h3 class='imb-success-popup_title__moneybutton'>Permission granted</h3>\n    <span class='imb-success-popup_text__moneybutton'>\n      You can remove, change or renew your <i>"
                      .concat(
                        e,
                        "</i> permission\n      from the settings page inside your\n      <a rel='noopener noreferrer' target='_blank' class='imb-success-popup_link__moneybutton' href='"
                      )
                      .concat(
                        "https://www.moneybutton.com",
                        "/settings/apps#yourPermissions'>Money Button wallet</a>\n    </span>\n  </div>\n  <style>\n  .alert__moneybutton {\n    background-color: #4772F6;\n    padding: 45px 40px 40px 40px;\n    width: 90%;\n    max-width: 400px;\n    margin-right: auto;\n    margin-left: auto;\n    box-sizing: border-box;\n    border-radius: 20px 20px 0 20px;\n  }\n  .imb-success-popup_text__moneybutton, .imb-success-popup_title__moneybutton {\n    font-size: 12px;\n    font-family: 'IBM Plex Sans', sans-serif;\n    color: white;\n  }\n\n  .imb-success-popup_text__moneybutton {\n    font-weight: 500;\n  }\n\n  .imb-success-popup_title__moneybutton {\n    font-size: 18px;\n    margin-top: 0;\n    padding-top: 0;\n  }\n\n  .imb-success-popup_link__moneybutton {\n    color: white;\n    text-decoration: none;\n    font-weight: bold;\n  }\n  </style>\n  "
                      )),
                    document.body.appendChild(t);
                  const n = setTimeout(() => {
                      document.body.removeChild(t),
                        document.body.removeEventListener("click", o);
                    }, 6e3),
                    o = (e) => {
                      t.parentNode.removeChild(t),
                        clearTimeout(n),
                        e.currentTarget.removeEventListener(e.type, o);
                    };
                  document.body.addEventListener("click", o);
                })(e.app.name),
                o(this);
            }),
            s.subscribe("imb.permission-dennied", (e) => {
              s.finalize(), document.body.removeChild(t), r(e);
            }),
            s.subscribe("connect-local-storage", () => {}),
            s.subscribe("error.not-logged-in", (e) => {
              m(e.popup),
                s.finalize(),
                document.body.removeChild(t),
                r(new Error("no-user-logged-in"));
            }),
            s.subscribe("onboard-new-user", async () => {
              (t.style.zIndex = 0),
                (t.style.width = "1px"),
                (t.style.height = "1px"),
                (t.style.top = "-2px"),
                (t.style.left = "-2px"),
                await new P(window.localStorage).start().catch((e) => {
                  s.finalize(), document.body.removeChild(t), r(e);
                }),
                s.send("onboard-new-user:completed"),
                (t.style.zIndex = 1001),
                (t.style.width = "100vw"),
                (t.style.height = "100vh"),
                (t.style.top = "0"),
                (t.style.left = "0");
            }),
            s.subscribe("error.insufficient-balance", (e) => {
              m(e.popup);
            }),
            s.subscribe("error.safari-compatibility", (e) => {
              m(e.popup);
            }),
            s.start();
        });
      }
    }),
    (e.render = I),
    e
  );
})({});

module.exports = moneyButton;
//# sourceMappingURL=moneybutton.js.map
