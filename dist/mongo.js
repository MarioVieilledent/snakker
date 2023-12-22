"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.getLastNDocuments = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: "./.env" });
const mongodb_1 = require("mongodb");
const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@pazucluster.klrce.mongodb.net/?retryWrites=true&w=majority`;
const dbName = "Snakker";
const collectionMessage = "Message";
let client;
function singleInstanceClient() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!client) {
            client = new mongodb_1.MongoClient(uri, {
                serverApi: {
                    version: mongodb_1.ServerApiVersion.v1,
                    strict: true,
                    deprecationErrors: true,
                },
            });
            yield client.connect();
        }
        return client.db(dbName);
    });
}
const getLastNDocuments = (n) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield singleInstanceClient();
        const docs = yield db
            .collection(collectionMessage)
            .find()
            .sort({ _id: -1 })
            .limit(n + 1)
            .toArray();
        return docs;
    }
    catch (e) {
        console.log(`Error fetching messages: ${e}`);
    }
});
exports.getLastNDocuments = getLastNDocuments;
function sendMessage(message) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield singleInstanceClient();
        const col = db.collection(collectionMessage);
        col.insertOne(message);
    });
}
exports.sendMessage = sendMessage;
