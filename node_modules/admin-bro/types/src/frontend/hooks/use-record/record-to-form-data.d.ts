import RecordJSON from '../../../backend/decorators/record-json.interface';
export declare const FORM_VALUE_NULL = "__FORM_VALUE_NULL__";
export declare const FORM_VALUE_EMPTY_OBJECT = "__FORM_VALUE_EMPTY_OBJECT__";
export declare const FORM_VALUE_EMPTY_ARRAY = "__FORM_VALUE_EMPTY_ARRAY__";
/**
 * Changes RecordJSON that it can be send as a FormData to the backend.
 *
 * FormData is required because we are sending files via the wire. But it has limitations.
 * Namely it can only transport files and strings. That is why we have to convert some
 * standard types like NULL to constants so they can be property converted back by the backend.
 * And thus properly handled.
 *
 *
 * @param   {RecordJSON}  record
 * @return  {FormData}
 */
export default function recordToFormData(record: RecordJSON): FormData;
