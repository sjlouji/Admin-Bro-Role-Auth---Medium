import React from 'react';
import ResourceJSON from '../../../backend/decorators/resource-json.interface';
declare type Props = {
    resource: ResourceJSON;
    toggleFilter: () => void;
    isVisible: boolean;
};
declare const FilterContainer: React.FC<Props>;
export default FilterContainer;
