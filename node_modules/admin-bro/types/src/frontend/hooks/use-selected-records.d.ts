import RecordJSON from '../../backend/decorators/record-json.interface';
export declare type UseSelectedRecordsResult = {
    selectedRecords: Array<RecordJSON>;
    setSelectedRecords: any;
    handleSelect: (record: RecordJSON) => void;
    handleSelectAll: () => void;
};
export declare const useSelectedRecords: (records: Array<RecordJSON>) => UseSelectedRecordsResult;
export default useSelectedRecords;
