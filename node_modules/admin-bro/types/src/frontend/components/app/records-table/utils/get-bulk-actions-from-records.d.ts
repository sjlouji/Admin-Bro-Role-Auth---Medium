import RecordJSON from '../../../../../backend/decorators/record-json.interface';
import ActionJSON from '../../../../../backend/decorators/action-json.interface';
declare const getBulkActionsFromRecords: (records: Array<RecordJSON>) => Array<ActionJSON>;
export default getBulkActionsFromRecords;
