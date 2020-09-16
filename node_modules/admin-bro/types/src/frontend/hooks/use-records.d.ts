import { AxiosResponse } from 'axios';
import RecordJSON from '../../backend/decorators/record-json.interface';
import { ListActionResponse } from '../../backend/actions/list-action';
export declare type UseRecordsResult = {
    records: Array<RecordJSON>;
    loading: boolean;
    page: number;
    perPage: number;
    total: number;
    direction: 'asc' | 'desc';
    sortBy?: string;
    fetchData: () => Promise<AxiosResponse<ListActionResponse>>;
};
export declare const useRecords: (resourceId: string) => UseRecordsResult;
export default useRecords;
