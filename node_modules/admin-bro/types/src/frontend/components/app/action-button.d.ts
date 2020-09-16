import React from 'react';
import ActionJSON from '../../../backend/decorators/action-json.interface';
import { ActionResponse } from '../../../backend/actions/action.interface';
/**
 * @alias ActionButtonProps
 * @memberof ActionButton
 */
export declare type ActionButtonProps = {
    /** Action to which button should redirect */
    action: ActionJSON;
    /** Id of a resource of an action */
    resourceId: string;
    /** Optional recordId for _record_ action */
    recordId?: string;
    /** Optional recordIds for _bulk_ action */
    recordIds?: Array<string>;
    /** optional callback function which will be triggered when action is performed */
    actionPerformed?: (action: ActionResponse) => any;
};
declare const _default: React.ComponentClass<ActionButtonProps, any>;
export default _default;
