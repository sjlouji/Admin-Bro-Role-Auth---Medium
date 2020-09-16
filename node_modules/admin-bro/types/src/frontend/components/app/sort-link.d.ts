import React, { ReactNode } from 'react';
import { RouteComponentProps } from 'react-router';
import PropertyJSON from '../../../backend/decorators/property-json.interface';
declare type Props = {
    property: PropertyJSON;
    direction?: 'asc' | 'desc';
    sortBy?: string;
};
declare class SortLink extends React.PureComponent<Props & RouteComponentProps> {
    constructor(props: any);
    isActive(): boolean;
    render(): ReactNode;
}
declare const _default;
export default _default;
