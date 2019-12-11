"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Security_Service_1 = require("./module/Security.Service");
var bclassExternalEdit_Service_1 = require("./module/bclassExternalEdit.Service");
var CpBclass_Services_1 = require("./services/CpBclass.Services");
var CpBook_Services_1 = require("./services/CpBook.Services");
var CpBookTree_Services_1 = require("./services/CpBookTree.Services");
var CpChapterTree_Services_1 = require("./services/CpChapterTree.Services");
var CpChapter_Service_1 = require("./services/CpChapter.Service");
var Links_Services_1 = require("./services/Links.Services");
var MediaLinks_Services_1 = require("./services/MediaLinks.Services");
var VegRootEdit_Services_1 = require("./services/VegRootEdit.Services");
exports.appService = [Links_Services_1.LinksServices, Security_Service_1.SecurityService, bclassExternalEdit_Service_1.BclassExternalEditService, VegRootEdit_Services_1.VegrootEditService,
    CpBclass_Services_1.CpBclassServices, CpBook_Services_1.CpBookServices, CpChapter_Service_1.CpChapterServices, CpBookTree_Services_1.CpBookTreeServices, CpChapterTree_Services_1.CpChapterTreeServices, MediaLinks_Services_1.MediaLinksServices];
//# sourceMappingURL=app.service.js.map