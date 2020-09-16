import React from 'react';
import ResourceJSON from '../../../../backend/decorators/resource-json.interface';
import PropertyJSON from '../../../../backend/decorators/property-json.interface';
declare type AddNewItemButtonProps = {
    resource: ResourceJSON;
    property: PropertyJSON;
};
declare const AddNewItemButton: React.FC<AddNewItemButtonProps>;
export default AddNewItemButton;
