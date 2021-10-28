export interface IService<T> {

  /**
   * get data list (no condition)
   * @return list of data
   */
  getDataList();

  /**
   * get data list with condition
   * @param condition condition to get data list
   * @return list of data
   */
  getDataListWithCon(condition?: string);

  /**
   * update existing record
   * @param jsonReq record information
   * @return result of updating
   */
  updateRecord(jsonReq: T, id: any);

  /**
   * delete 1 specified record
   * @param jsonReq record id
   * @return result of deleting
   */
  delRecord(jsonReq: number);

  /**
   * delete multi specified record
   * @param jsonReq records id
   * @return result of deleting
   */
  delRecords(jsonReq: number[]);

  /**
   * add new record to database
   * @param jsonReq record to add
   * @return result of adding
   */
  addRecord(jsonReq: T);

}
