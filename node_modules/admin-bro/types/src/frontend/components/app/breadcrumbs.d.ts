import React from 'react';
import ResourceJSON from '../../../backend/decorators/resource-json.interface';
import RecordJSON from '../../../backend/decorators/record-json.interface';
/**
 * @memberof Breadcrumbs
 */
declare type Props = {
    /**
     * Resource
     */
    resource: ResourceJSON;
    /**
     * record
     */
    record?: RecordJSON | null;
    /**
     * Name of an action
     */
    actionName: string;
};
/**
 * @component
 * @private
 */
declare const Breadcrumbs: React.FC<Props>;
export default Breadcrumbs;
