import React from 'react';
import { CurrentAdmin } from '../../../current-admin.interface';
declare type Props = {
    session: CurrentAdmin;
    paths: {
        logoutPath: string;
    };
};
declare const _default: React.ComponentType<Props & {
    OriginalComponent?: React.FunctionComponent<Props> | React.ComponentClass<Props, any> | undefined;
}>;
export default _default;
