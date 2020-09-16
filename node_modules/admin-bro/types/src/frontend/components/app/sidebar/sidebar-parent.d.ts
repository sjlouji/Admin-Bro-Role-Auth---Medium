import React from 'react';
import ResourceJSON from '../../../../backend/decorators/resource-json.interface';
declare type Props = {
    parent: {
        icon: string;
        name: string;
        resources: Array<ResourceJSON>;
    };
};
declare const SidebarParent: React.FC<Props>;
export default SidebarParent;
