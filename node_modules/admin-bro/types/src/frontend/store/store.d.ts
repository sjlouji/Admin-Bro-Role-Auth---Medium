import ResourceJSON from '../../backend/decorators/resource-json.interface';
import { BrandingOptions, VersionProps, AdminPage, Assets } from '../../admin-bro-options.interface';
import { CurrentAdmin } from '../../current-admin.interface';
import { NoticeMessage } from './with-notice';
import PageJSON from '../../backend/decorators/page-json.interface';
import { Locale } from '../../locale/config';
export declare const initializePages: (data: Array<AdminPage>) => {
    type: string;
    data: Array<AdminPage>;
};
export declare const initializeLocale: (data: Locale) => {
    type: string;
    data: Locale;
};
export declare const initializeResources: (data: Array<ResourceJSON>) => {
    type: string;
    data: Array<ResourceJSON>;
};
export declare type DashboardInState = {
    component?: string;
};
export declare const initializeDashboard: (data: DashboardInState) => {
    type: string;
    data: DashboardInState;
};
export declare const initializeBranding: (data: BrandingOptions) => {
    type: string;
    data: BrandingOptions;
};
export declare const initializeAssets: (data: Assets) => {
    type: string;
    data: Assets;
};
export declare const initializePaths: (data: Paths) => {
    type: string;
    data: Paths;
};
export declare const initializeVersions: (data: VersionProps) => {
    type: string;
    data: VersionProps;
};
export declare const setCurrentAdmin: (data?: CurrentAdmin | null) => {
    type: string;
    data: CurrentAdmin | null;
};
export declare type NoticeMessageInState = NoticeMessage & {
    message: string;
    id: string;
    type: NoticeMessage['type'];
    progress: number;
};
export declare type Paths = {
    rootPath: string;
    logoutPath: string;
    loginPath: string;
    assetsCDN?: string;
};
export declare const addNotice: (data?: NoticeMessage) => {
    type: string;
    data: NoticeMessageInState;
};
export declare const setNoticeProgress: ({ noticeId, progress }: {
    noticeId: string;
    progress: number;
}) => {
    type: string;
    data: {
        noticeId: string;
        progress: number;
    };
};
export declare const dropNotice: (noticeId: string) => {
    type: string;
    data: {
        noticeId: string;
    };
};
export declare type ReduxState = {
    resources: Array<ResourceJSON>;
    branding: BrandingOptions;
    assets: Assets;
    paths: Paths;
    session: CurrentAdmin | null;
    dashboard: DashboardInState;
    notices: Array<NoticeMessageInState>;
    versions: VersionProps;
    pages: Array<PageJSON>;
    locale: Locale;
};
declare const _default: (initialState?: {}) => import("redux").Store<import("redux").CombinedState<ReduxState>, import("redux").AnyAction>;
export default _default;
