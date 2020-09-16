import React from 'react';
import ResourceJSON from '../../../../backend/decorators/resource-json.interface';
import RecordJSON from '../../../../backend/decorators/record-json.interface';
declare type Props = {
    resource: ResourceJSON;
    selectedRecords?: Array<RecordJSON>;
};
declare const SelectedRecords: React.FC<Props>;
export default SelectedRecords;
