
import { SecurityService } from './module/Security.Service';
import { BclassExternalEditService } from './module/bclassExternalEdit.Service';
import { CpBclassServices } from './services/CpBclass.Services';
import { CpBookServices } from './services/CpBook.Services';
import { CpBookTreeServices } from './services/CpBookTree.Services';
import { CpChapterTreeServices } from './services/CpChapterTree.Services';
import { CpChapterServices } from './services/CpChapter.Service'
import { LinksServices } from './services/Links.Services';
import { MediaLinksServices } from './services/MediaLinks.Services';
import { VegrootEditService } from './services/VegRootEdit.Services';
export const appService = [LinksServices, SecurityService, BclassExternalEditService, VegrootEditService,
    CpBclassServices, CpBookServices, CpChapterServices, CpBookTreeServices, CpChapterTreeServices, MediaLinksServices ];