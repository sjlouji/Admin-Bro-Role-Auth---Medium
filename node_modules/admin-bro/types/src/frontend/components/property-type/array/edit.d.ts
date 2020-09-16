import React, { ReactNode, MouseEvent } from 'react';
import PropertyJSON from '../../../../backend/decorators/property-json.interface';
import RecordJSON from '../../../../backend/decorators/record-json.interface';
import ResourceJSON from '../../../../backend/decorators/resource-json.interface';
declare type Props = {
    property: PropertyJSON;
    record: RecordJSON;
    onChange: (record: RecordJSON) => any;
    ItemComponent: typeof React.Component;
    resource: ResourceJSON;
    testId: string;
};
export default class Edit extends React.Component<Props> {
    constructor(props: any);
    addNew(event: MouseEvent): false;
    removeItem(i: any, event: MouseEvent): false;
    renderInput(): ReactNode;
    render(): ReactNode;
}
export {};
