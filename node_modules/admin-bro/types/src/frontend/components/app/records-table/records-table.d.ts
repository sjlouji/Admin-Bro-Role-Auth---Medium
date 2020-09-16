import React from 'react';
import ResourceJSON from '../../../../backend/decorators/resource-json.interface';
import RecordJSON from '../../../../backend/decorators/record-json.interface';
import { ActionResponse } from '../../../../backend/actions/action.interface';
export declare type Props = {
    resource: ResourceJSON;
    records: Array<RecordJSON>;
    actionPerformed?: (response: ActionResponse) => any;
    sortBy?: string;
    direction?: 'asc' | 'desc';
    isLoading?: boolean;
    selectedRecords?: Array<RecordJSON>;
    onSelect?: (record: RecordJSON) => any;
    onSelectAll?: () => any;
};
declare const RecordsTable: React.FC<Props>;
export default RecordsTable;
