import React from 'react';
import ResourceJSON from '../../../../backend/decorators/resource-json.interface';
import RecordJSON from '../../../../backend/decorators/record-json.interface';
import { ActionResponse } from '../../../../backend/actions/action.interface';
declare type Props = {
    resource: ResourceJSON;
    record: RecordJSON;
    actionPerformed?: (action: ActionResponse) => any;
    isLoading?: boolean;
    onSelect?: (record: RecordJSON) => void;
    isSelected?: boolean;
};
declare const RecordInList: React.FC<Props>;
export default RecordInList;
