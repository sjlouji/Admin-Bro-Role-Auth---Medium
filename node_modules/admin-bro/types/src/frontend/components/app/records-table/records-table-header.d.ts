import React from 'react';
import PropertyJSON from '../../../../backend/decorators/property-json.interface';
/**
 * @memberof RecordsTableHeader
 * @alias RecordsTableHeader
 */
declare type Props = {
    /**
     * Property which should be treated as a Title Property
     */
    titleProperty: PropertyJSON;
    /**
     * All properties which should be presented
     */
    properties: Array<PropertyJSON>;
    /**
     * Name of the property which should be marked as currently sorted by
     */
    sortBy?: string;
    /**
     * Sort direction
     */
    direction?: 'asc' | 'desc';
    /**
     * Handler function invoked when checkbox is clicked. If given extra column
     * with checkbox will be rendered
     */
    onSelectAll?: () => any;
    /**
     * Indicates if "bulk" checkbox should be checked
     */
    selectedAll?: boolean;
};
export declare const display: (isTitle: boolean) => Array<string>;
/**
 * Prints `thead` section for table with records.
 *
 * ```
 * import { RecordsTableHeader } from 'admin-bro'
 * ```
 *
 * @component
 * @subcategory Application
 * @example <caption>List with 2 properties</caption>
 * const properties = [{
 *   label: 'First Name',
 *   name: 'firstName',
 *   isSortable: true,
 * }, {
 *   label: 'Last Name',
 *   name: 'lastName',
 * }]
 * return (
 * <Box py="xl">
 *   <Table>
 *    <RecordsTableHeader
 *      properties={properties}
 *      titleProperty={properties[0]}
 *      sortBy={'firstName'}
 *      direction={'asc'}
 *    />
 *    <TableBody>
 *      <TableRow>
 *        <TableCell>John</TableCell>
 *        <TableCell>Doe</TableCell>
 *        <TableCell></TableCell>
 *      </TableRow>
 *      <TableRow>
 *        <TableCell>Max</TableCell>
 *        <TableCell>Kodaly</TableCell>
 *        <TableCell></TableCell>
 *      </TableRow>
 *    </TableBody>
 *   </Table>
 * </Box>
 * )
 */
declare const RecordsTableHeader: React.FC<Props>;
export default RecordsTableHeader;
