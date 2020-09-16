import { AxiosResponse } from 'axios';
import RecordJSON from '../../../backend/decorators/record-json.interface';
import { RecordActionResponse } from '../../../backend/actions/action.interface';
import { OnPropertyChange } from '../../components/property-type/base-property-props';
/**
 * Result of useRecord hook
 *
 * @memberof useRecord
 * @alias UseRecordResult
 */
export declare type UseRecordResult = {
    /**
     * recordJSON instance for given resource.
     */
    record: RecordJSON;
    /**
     * Function compatible with onChange method supported by all the components wrapped by
     * {@link BasePropertyComponent}.
     */
    handleChange: OnPropertyChange;
    /**
     * Triggers submission of the record. Returns a promise.
     * If custom params are given as an argument - they are merged
     * to the payload.
     */
    submit: (customParams?: Record<string, string>) => Promise<AxiosResponse<RecordActionResponse>>;
    /**
     * Flag indicates loading.
     */
    loading: boolean;
    /**
     * Upload progress
     */
    progress: number;
};
/**
 * A powerful, hook which allows you to manage an entire record of given type.
 *
 * Take a look of creating a component which renders form for some non-existing record.
 * Form have name and surname fields. After clicking "save" user will create a new record.
 * Consecutive calls will update it.
 *
 * ```javascript
 * import { BasePropertyComponent, useRecord, Box, useTranslation } from '@admin-bro/design-system'
 *
 * const MyRecordActionComponent = (props) => {
 *   const { record: initialRecord, resource, action } = props
 *
 *   const { record, handleChange, submit } = useRecord(initialRecord, resource.id)
 *   const { translateButton } = useTranslation()
 *
 *   const nameProperty = resource.editProperties.find((property) => property.name === 'name')
 *   const surnameProperty = resource.editProperties.find((property) => property.name === 'surname')
 *
 *   const handleSubmit = (event) => {
 *     submit().then(() => {
 *        // do something
 *     })
 *   }
 *
 *   return (
 *     <Box
 *       as="form"
 *       onSubmit={handleSubmit}
 *     >
 *       <BasePropertyComponent
 *         where="edit"
 *         onChange={handleChange}
 *         property={nameProperty}
 *         resource={resource}
 *         record={record}
 *       />
 *       <BasePropertyComponent
 *         where="edit"
 *         onChange={handleChange}
 *         property={surnameProperty}
 *         resource={resource}
 *         record={record}
 *       />
 *       <Button variant="primary" size="lg">
 *         {translateButton('save', resource.id)}
 *       </Button>
 *     </Box>
 *   )
 * }
 * export default MyRecordActionComponent
 * ```
 *
 * Returns {@link UseRecordResult}.
 *
 * @subcategory Hooks
 * @component
 */
export declare const useRecord: (initialRecord: RecordJSON | undefined, resourceId: string) => UseRecordResult;
export default useRecord;
