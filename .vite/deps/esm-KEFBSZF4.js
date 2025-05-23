import {
  require_dist
} from "./chunk-4K3W7ZI6.js";
import {
  hashMessage,
  hashTypedData
} from "./chunk-OJWFZCP2.js";
import "./chunk-MWCHLMMZ.js";
import {
  encodeFunctionData
} from "./chunk-LLWKCDZ5.js";
import "./chunk-BGVTCO3P.js";
import "./chunk-MOYUCDEQ.js";
import "./chunk-ARUHFCQG.js";
import "./chunk-BZXV6R2O.js";
import {
  __toESM
} from "./chunk-ONY6HBPH.js";

// node_modules/@safe-global/safe-apps-sdk/dist/esm/version.js
var getSDKVersion = () => "9.1.0";

// node_modules/@safe-global/safe-apps-sdk/dist/esm/communication/utils.js
var dec2hex = (dec) => dec.toString(16).padStart(2, "0");
var generateId = (len) => {
  const arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join("");
};
var generateRequestId = () => {
  if (typeof window !== "undefined") {
    return generateId(10);
  }
  return (/* @__PURE__ */ new Date()).getTime().toString(36);
};

// node_modules/@safe-global/safe-apps-sdk/dist/esm/communication/messageFormatter.js
var MessageFormatter = class {
};
MessageFormatter.makeRequest = (method, params) => {
  const id = generateRequestId();
  return {
    id,
    method,
    params,
    env: {
      sdkVersion: getSDKVersion()
    }
  };
};
MessageFormatter.makeResponse = (id, data, version) => ({
  id,
  success: true,
  version,
  data
});
MessageFormatter.makeErrorResponse = (id, error, version) => ({
  id,
  success: false,
  error,
  version
});

// node_modules/@safe-global/safe-apps-sdk/dist/esm/communication/methods.js
var Methods;
(function(Methods2) {
  Methods2["sendTransactions"] = "sendTransactions";
  Methods2["rpcCall"] = "rpcCall";
  Methods2["getChainInfo"] = "getChainInfo";
  Methods2["getSafeInfo"] = "getSafeInfo";
  Methods2["getTxBySafeTxHash"] = "getTxBySafeTxHash";
  Methods2["getSafeBalances"] = "getSafeBalances";
  Methods2["signMessage"] = "signMessage";
  Methods2["signTypedMessage"] = "signTypedMessage";
  Methods2["getEnvironmentInfo"] = "getEnvironmentInfo";
  Methods2["getOffChainSignature"] = "getOffChainSignature";
  Methods2["requestAddressBook"] = "requestAddressBook";
  Methods2["wallet_getPermissions"] = "wallet_getPermissions";
  Methods2["wallet_requestPermissions"] = "wallet_requestPermissions";
})(Methods || (Methods = {}));
var RestrictedMethods;
(function(RestrictedMethods2) {
  RestrictedMethods2["requestAddressBook"] = "requestAddressBook";
})(RestrictedMethods || (RestrictedMethods = {}));

// node_modules/@safe-global/safe-apps-sdk/dist/esm/communication/index.js
var PostMessageCommunicator = class {
  constructor(allowedOrigins = null, debugMode = false) {
    this.allowedOrigins = null;
    this.callbacks = /* @__PURE__ */ new Map();
    this.debugMode = false;
    this.isServer = typeof window === "undefined";
    this.isValidMessage = ({ origin, data, source }) => {
      const emptyOrMalformed = !data;
      const sentFromParentEl = !this.isServer && source === window.parent;
      const majorVersionNumber = typeof data.version !== "undefined" && parseInt(data.version.split(".")[0]);
      const allowedSDKVersion = typeof majorVersionNumber === "number" && majorVersionNumber >= 1;
      let validOrigin = true;
      if (Array.isArray(this.allowedOrigins)) {
        validOrigin = this.allowedOrigins.find((regExp) => regExp.test(origin)) !== void 0;
      }
      return !emptyOrMalformed && sentFromParentEl && allowedSDKVersion && validOrigin;
    };
    this.logIncomingMessage = (msg) => {
      console.info(`Safe Apps SDK v1: A message was received from origin ${msg.origin}. `, msg.data);
    };
    this.onParentMessage = (msg) => {
      if (this.isValidMessage(msg)) {
        this.debugMode && this.logIncomingMessage(msg);
        this.handleIncomingMessage(msg.data);
      }
    };
    this.handleIncomingMessage = (payload) => {
      const { id } = payload;
      const cb = this.callbacks.get(id);
      if (cb) {
        cb(payload);
        this.callbacks.delete(id);
      }
    };
    this.send = (method, params) => {
      const request = MessageFormatter.makeRequest(method, params);
      if (this.isServer) {
        throw new Error("Window doesn't exist");
      }
      window.parent.postMessage(request, "*");
      return new Promise((resolve, reject) => {
        this.callbacks.set(request.id, (response) => {
          if (!response.success) {
            reject(new Error(response.error));
            return;
          }
          resolve(response);
        });
      });
    };
    this.allowedOrigins = allowedOrigins;
    this.debugMode = debugMode;
    if (!this.isServer) {
      window.addEventListener("message", this.onParentMessage);
    }
  }
};
var communication_default = PostMessageCommunicator;

// node_modules/@safe-global/safe-apps-sdk/dist/esm/types/sdk.js
var isObjectEIP712TypedData = (obj) => {
  return typeof obj === "object" && obj != null && "domain" in obj && "types" in obj && "message" in obj;
};

// node_modules/@safe-global/safe-apps-sdk/dist/esm/types/gateway.js
var import_safe_gateway_typescript_sdk = __toESM(require_dist(), 1);

// node_modules/@safe-global/safe-apps-sdk/dist/esm/txs/index.js
var TXs = class {
  constructor(communicator) {
    this.communicator = communicator;
  }
  async getBySafeTxHash(safeTxHash) {
    if (!safeTxHash) {
      throw new Error("Invalid safeTxHash");
    }
    const response = await this.communicator.send(Methods.getTxBySafeTxHash, { safeTxHash });
    return response.data;
  }
  async signMessage(message) {
    const messagePayload = {
      message
    };
    const response = await this.communicator.send(Methods.signMessage, messagePayload);
    return response.data;
  }
  async signTypedMessage(typedData) {
    if (!isObjectEIP712TypedData(typedData)) {
      throw new Error("Invalid typed data");
    }
    const response = await this.communicator.send(Methods.signTypedMessage, { typedData });
    return response.data;
  }
  async send({ txs, params }) {
    if (!txs || !txs.length) {
      throw new Error("No transactions were passed");
    }
    const messagePayload = {
      txs,
      params
    };
    const response = await this.communicator.send(Methods.sendTransactions, messagePayload);
    return response.data;
  }
};

// node_modules/@safe-global/safe-apps-sdk/dist/esm/eth/constants.js
var RPC_CALLS = {
  eth_call: "eth_call",
  eth_gasPrice: "eth_gasPrice",
  eth_getLogs: "eth_getLogs",
  eth_getBalance: "eth_getBalance",
  eth_getCode: "eth_getCode",
  eth_getBlockByHash: "eth_getBlockByHash",
  eth_getBlockByNumber: "eth_getBlockByNumber",
  eth_getStorageAt: "eth_getStorageAt",
  eth_getTransactionByHash: "eth_getTransactionByHash",
  eth_getTransactionReceipt: "eth_getTransactionReceipt",
  eth_getTransactionCount: "eth_getTransactionCount",
  eth_estimateGas: "eth_estimateGas",
  safe_setSettings: "safe_setSettings"
};

// node_modules/@safe-global/safe-apps-sdk/dist/esm/eth/index.js
var inputFormatters = {
  defaultBlockParam: (arg = "latest") => arg,
  returnFullTxObjectParam: (arg = false) => arg,
  blockNumberToHex: (arg) => Number.isInteger(arg) ? `0x${arg.toString(16)}` : arg
};
var Eth = class {
  constructor(communicator) {
    this.communicator = communicator;
    this.call = this.buildRequest({
      call: RPC_CALLS.eth_call,
      formatters: [null, inputFormatters.defaultBlockParam]
    });
    this.getBalance = this.buildRequest({
      call: RPC_CALLS.eth_getBalance,
      formatters: [null, inputFormatters.defaultBlockParam]
    });
    this.getCode = this.buildRequest({
      call: RPC_CALLS.eth_getCode,
      formatters: [null, inputFormatters.defaultBlockParam]
    });
    this.getStorageAt = this.buildRequest({
      call: RPC_CALLS.eth_getStorageAt,
      formatters: [null, inputFormatters.blockNumberToHex, inputFormatters.defaultBlockParam]
    });
    this.getPastLogs = this.buildRequest({
      call: RPC_CALLS.eth_getLogs
    });
    this.getBlockByHash = this.buildRequest({
      call: RPC_CALLS.eth_getBlockByHash,
      formatters: [null, inputFormatters.returnFullTxObjectParam]
    });
    this.getBlockByNumber = this.buildRequest({
      call: RPC_CALLS.eth_getBlockByNumber,
      formatters: [inputFormatters.blockNumberToHex, inputFormatters.returnFullTxObjectParam]
    });
    this.getTransactionByHash = this.buildRequest({
      call: RPC_CALLS.eth_getTransactionByHash
    });
    this.getTransactionReceipt = this.buildRequest({
      call: RPC_CALLS.eth_getTransactionReceipt
    });
    this.getTransactionCount = this.buildRequest({
      call: RPC_CALLS.eth_getTransactionCount,
      formatters: [null, inputFormatters.defaultBlockParam]
    });
    this.getGasPrice = this.buildRequest({
      call: RPC_CALLS.eth_gasPrice
    });
    this.getEstimateGas = (transaction) => this.buildRequest({
      call: RPC_CALLS.eth_estimateGas
    })([transaction]);
    this.setSafeSettings = this.buildRequest({
      call: RPC_CALLS.safe_setSettings
    });
  }
  buildRequest(args) {
    const { call, formatters } = args;
    return async (params) => {
      if (formatters && Array.isArray(params)) {
        formatters.forEach((formatter, i) => {
          if (formatter) {
            params[i] = formatter(params[i]);
          }
        });
      }
      const payload = {
        call,
        params: params || []
      };
      const response = await this.communicator.send(Methods.rpcCall, payload);
      return response.data;
    };
  }
};

// node_modules/@safe-global/safe-apps-sdk/dist/esm/safe/signatures.js
var MAGIC_VALUE = "0x1626ba7e";
var MAGIC_VALUE_BYTES = "0x20c13b0b";

// node_modules/@safe-global/safe-apps-sdk/dist/esm/types/permissions.js
var PERMISSIONS_REQUEST_REJECTED = 4001;
var PermissionsError = class _PermissionsError extends Error {
  constructor(message, code, data) {
    super(message);
    this.code = code;
    this.data = data;
    Object.setPrototypeOf(this, _PermissionsError.prototype);
  }
};

// node_modules/@safe-global/safe-apps-sdk/dist/esm/wallet/index.js
var Wallet = class {
  constructor(communicator) {
    this.communicator = communicator;
  }
  async getPermissions() {
    const response = await this.communicator.send(Methods.wallet_getPermissions, void 0);
    return response.data;
  }
  async requestPermissions(permissions) {
    if (!this.isPermissionRequestValid(permissions)) {
      throw new PermissionsError("Permissions request is invalid", PERMISSIONS_REQUEST_REJECTED);
    }
    try {
      const response = await this.communicator.send(Methods.wallet_requestPermissions, permissions);
      return response.data;
    } catch {
      throw new PermissionsError("Permissions rejected", PERMISSIONS_REQUEST_REJECTED);
    }
  }
  isPermissionRequestValid(permissions) {
    return permissions.every((pr) => {
      if (typeof pr === "object") {
        return Object.keys(pr).every((method) => {
          if (Object.values(RestrictedMethods).includes(method)) {
            return true;
          }
          return false;
        });
      }
      return false;
    });
  }
};

// node_modules/@safe-global/safe-apps-sdk/dist/esm/decorators/requirePermissions.js
var hasPermission = (required, permissions) => permissions.some((permission) => permission.parentCapability === required);
var requirePermission = () => (_, propertyKey, descriptor) => {
  const originalMethod = descriptor.value;
  descriptor.value = async function() {
    const wallet = new Wallet(this.communicator);
    let currentPermissions = await wallet.getPermissions();
    if (!hasPermission(propertyKey, currentPermissions)) {
      currentPermissions = await wallet.requestPermissions([{ [propertyKey]: {} }]);
    }
    if (!hasPermission(propertyKey, currentPermissions)) {
      throw new PermissionsError("Permissions rejected", PERMISSIONS_REQUEST_REJECTED);
    }
    return originalMethod.apply(this);
  };
  return descriptor;
};
var requirePermissions_default = requirePermission;

// node_modules/@safe-global/safe-apps-sdk/dist/esm/safe/index.js
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Safe = class {
  constructor(communicator) {
    this.communicator = communicator;
  }
  async getChainInfo() {
    const response = await this.communicator.send(Methods.getChainInfo, void 0);
    return response.data;
  }
  async getInfo() {
    const response = await this.communicator.send(Methods.getSafeInfo, void 0);
    return response.data;
  }
  // There is a possibility that this method will change because we may add pagination to the endpoint
  async experimental_getBalances({ currency = "usd" } = {}) {
    const response = await this.communicator.send(Methods.getSafeBalances, {
      currency
    });
    return response.data;
  }
  async check1271Signature(messageHash, signature = "0x") {
    const safeInfo = await this.getInfo();
    const encodedIsValidSignatureCall = encodeFunctionData({
      abi: [
        {
          constant: false,
          inputs: [
            {
              name: "_dataHash",
              type: "bytes32"
            },
            {
              name: "_signature",
              type: "bytes"
            }
          ],
          name: "isValidSignature",
          outputs: [
            {
              name: "",
              type: "bytes4"
            }
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        }
      ],
      functionName: "isValidSignature",
      args: [messageHash, signature]
    });
    const payload = {
      call: RPC_CALLS.eth_call,
      params: [
        {
          to: safeInfo.safeAddress,
          data: encodedIsValidSignatureCall
        },
        "latest"
      ]
    };
    try {
      const response = await this.communicator.send(Methods.rpcCall, payload);
      return response.data.slice(0, 10).toLowerCase() === MAGIC_VALUE;
    } catch (err) {
      return false;
    }
  }
  async check1271SignatureBytes(messageHash, signature = "0x") {
    const safeInfo = await this.getInfo();
    const encodedIsValidSignatureCall = encodeFunctionData({
      abi: [
        {
          constant: false,
          inputs: [
            {
              name: "_data",
              type: "bytes"
            },
            {
              name: "_signature",
              type: "bytes"
            }
          ],
          name: "isValidSignature",
          outputs: [
            {
              name: "",
              type: "bytes4"
            }
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        }
      ],
      functionName: "isValidSignature",
      args: [messageHash, signature]
    });
    const payload = {
      call: RPC_CALLS.eth_call,
      params: [
        {
          to: safeInfo.safeAddress,
          data: encodedIsValidSignatureCall
        },
        "latest"
      ]
    };
    try {
      const response = await this.communicator.send(Methods.rpcCall, payload);
      return response.data.slice(0, 10).toLowerCase() === MAGIC_VALUE_BYTES;
    } catch (err) {
      return false;
    }
  }
  calculateMessageHash(message) {
    return hashMessage(message);
  }
  calculateTypedMessageHash(typedMessage) {
    const chainId = typeof typedMessage.domain.chainId === "object" ? typedMessage.domain.chainId.toNumber() : Number(typedMessage.domain.chainId);
    let primaryType = typedMessage.primaryType;
    if (!primaryType) {
      const fields = Object.values(typedMessage.types);
      const primaryTypes = Object.keys(typedMessage.types).filter((typeName) => fields.every((dataTypes) => dataTypes.every(({ type }) => type.replace("[", "").replace("]", "") !== typeName)));
      if (primaryTypes.length === 0 || primaryTypes.length > 1)
        throw new Error("Please specify primaryType");
      primaryType = primaryTypes[0];
    }
    return hashTypedData({
      message: typedMessage.message,
      domain: {
        ...typedMessage.domain,
        chainId,
        verifyingContract: typedMessage.domain.verifyingContract,
        salt: typedMessage.domain.salt
      },
      types: typedMessage.types,
      primaryType
    });
  }
  async getOffChainSignature(messageHash) {
    const response = await this.communicator.send(Methods.getOffChainSignature, messageHash);
    return response.data;
  }
  async isMessageSigned(message, signature = "0x") {
    let check;
    if (typeof message === "string") {
      check = async () => {
        const messageHash = this.calculateMessageHash(message);
        const messageHashSigned = await this.isMessageHashSigned(messageHash, signature);
        return messageHashSigned;
      };
    }
    if (isObjectEIP712TypedData(message)) {
      check = async () => {
        const messageHash = this.calculateTypedMessageHash(message);
        const messageHashSigned = await this.isMessageHashSigned(messageHash, signature);
        return messageHashSigned;
      };
    }
    if (check) {
      const isValid = await check();
      return isValid;
    }
    throw new Error("Invalid message type");
  }
  async isMessageHashSigned(messageHash, signature = "0x") {
    const checks = [this.check1271Signature.bind(this), this.check1271SignatureBytes.bind(this)];
    for (const check of checks) {
      const isValid = await check(messageHash, signature);
      if (isValid) {
        return true;
      }
    }
    return false;
  }
  async getEnvironmentInfo() {
    const response = await this.communicator.send(Methods.getEnvironmentInfo, void 0);
    return response.data;
  }
  async requestAddressBook() {
    const response = await this.communicator.send(Methods.requestAddressBook, void 0);
    return response.data;
  }
};
__decorate([
  requirePermissions_default()
], Safe.prototype, "requestAddressBook", null);

// node_modules/@safe-global/safe-apps-sdk/dist/esm/sdk.js
var SafeAppsSDK = class {
  constructor(opts = {}) {
    const { allowedDomains = null, debug = false } = opts;
    this.communicator = new communication_default(allowedDomains, debug);
    this.eth = new Eth(this.communicator);
    this.txs = new TXs(this.communicator);
    this.safe = new Safe(this.communicator);
    this.wallet = new Wallet(this.communicator);
  }
};
var sdk_default = SafeAppsSDK;

// node_modules/@safe-global/safe-apps-sdk/dist/esm/index.js
var esm_default = sdk_default;
var export_Operation = import_safe_gateway_typescript_sdk.Operation;
var export_TokenType = import_safe_gateway_typescript_sdk.TokenType;
var export_TransactionStatus = import_safe_gateway_typescript_sdk.TransactionStatus;
var export_TransferDirection = import_safe_gateway_typescript_sdk.TransferDirection;
export {
  MessageFormatter,
  Methods,
  export_Operation as Operation,
  RPC_CALLS,
  RestrictedMethods,
  export_TokenType as TokenType,
  export_TransactionStatus as TransactionStatus,
  export_TransferDirection as TransferDirection,
  esm_default as default,
  getSDKVersion,
  isObjectEIP712TypedData
};
//# sourceMappingURL=esm-KEFBSZF4.js.map
