import { AdminPage } from '../../admin-bro-options.interface';
import PageJSON from '../../backend/decorators/page-json.interface';
declare const pagesToStore: (pages: Record<string, AdminPage>) => Array<PageJSON>;
export default pagesToStore;
