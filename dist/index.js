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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv = __importStar(require("dotenv"));
const userRoutes_1 = __importDefault(require("./User/routes/userRoutes"));
const errorHandlers_1 = require("./shared/middlewares/errorHandlers");
const notFoundHandlers_1 = require("./shared/middlewares/notFoundHandlers");
const productRoutes_1 = __importDefault(require("./product/routes/productRoutes"));
const purchaseOrderRoutes_1 = __importDefault(require("./purchase_order/routes/purchaseOrderRoutes"));
const roleRoutes_1 = __importDefault(require("./role/routes/roleRoutes"));
const categoryRoutes_1 = __importDefault(require("./category/routes/categoryRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const statusRoutes_1 = __importDefault(require("./status/routes/statusRoutes"));
const calendarEventRoutes_1 = __importDefault(require("./calendarEvent/routes/calendarEventRoutes"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
dotenv.config();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const corsOptions = {
    origin: ['https://ferreteriaapi.integrador.xyz', 'https://ferreteria.integrador.xyz'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use('/api/users', userRoutes_1.default);
app.get('/', (_req, res) => {
    res.send('Hola, mundo!');
});
app.use('/api/rol', roleRoutes_1.default);
app.use('/api/products', productRoutes_1.default);
app.use("/api/categories", categoryRoutes_1.default);
app.use('/api/purchaseOrders', purchaseOrderRoutes_1.default);
app.use('/api/status', statusRoutes_1.default);
app.use('/api/event', calendarEventRoutes_1.default);
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../src/uploads')));
app.use(notFoundHandlers_1.notFoundHandler);
app.use(errorHandlers_1.errorHandler);
app.get('/', (_req, res) => {
    res.send('CORS configurado correctamente!');
});
const port = parseInt(process.env.PORT, 10) || 3002;
app.listen(port, () => {
    console.log('Serving static files from:', path_1.default.join(__dirname, '../src/uploads'));
    console.log(`Servidor corriendo en:${port}`);
});
const options = {
    key: fs_1.default.readFileSync('privkey.pem'),
    cert: fs_1.default.readFileSync('fullchain.pem')
};
https_1.default.createServer(options, app).listen(port, () => {
    console.log(`Servidor HTTPS corriendo en el puerto ${port}`);
});
