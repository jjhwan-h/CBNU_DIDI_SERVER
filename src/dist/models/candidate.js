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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_1 = __importDefault(require("./room"));
const sequelize_1 = __importStar(require("sequelize"));
var genderCategory;
(function (genderCategory) {
    genderCategory["MALE"] = "\uB0A8";
    genderCategory["FEMALE"] = "\uC5EC";
})(genderCategory || (genderCategory = {}));
class Candidate extends sequelize_1.Model {
    static initiate(sequelize) {
        Candidate.init({
            id: {
                type: sequelize_1.default.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            num: {
                type: sequelize_1.default.INTEGER,
                allowNull: false,
            },
            name: {
                type: sequelize_1.default.STRING(20),
                allowNull: false,
            },
            gender: {
                type: sequelize_1.default.ENUM(...Object.values(genderCategory)),
                allowNull: false,
            },
            age: {
                type: sequelize_1.default.STRING(20),
                allowNull: false,
            },
            img: {
                type: sequelize_1.default.STRING(200),
                allowNull: true
            },
            desc: {
                type: sequelize_1.default.STRING(500),
                allowNull: false,
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Candidate',
            tableName: 'candidate',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate() {
        Candidate.belongsTo(room_1.default, {
            foreignKey: 'RoomId',
            targetKey: 'id'
        });
    }
}
exports.default = Candidate;