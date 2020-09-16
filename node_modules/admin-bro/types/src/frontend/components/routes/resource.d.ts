import React from 'react';
import { RouteComponentProps } from 'react-router';
import ResourceJSON from '../../../backend/decorators/resource-json.interface';
import { ResourceActionParams } from '../../../backend/utils/view-helpers';
declare type PropsFromState = {
    resources: Array<ResourceJSON>;
};
declare type Props = PropsFromState & RouteComponentProps<ResourceActionParams>;
declare const _default: import("react-redux").ConnectedComponent<React.FC<Props>, Pick<Props, "match" | "location" | "history" | "staticContext">>;
export default _default;
