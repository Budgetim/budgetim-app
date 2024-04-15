const ADD_TEST_ID = 'ca-app-pub-3940256099942544/2934735716';
const IS_PROD = !__DEV__;

export const TRANSACTIONS_ADD_ID = IS_PROD ? 'ca-app-pub-2490800653471089/8500071507' : ADD_TEST_ID;
export const STATISTICS_ADD_ID = IS_PROD ? 'ca-app-pub-2490800653471089/3524938818' : ADD_TEST_ID;
export const TRANSACTIONS_BY_CATEGORY_ADD_ID = IS_PROD ? 'ca-app-pub-2490800653471089/5959530461' : ADD_TEST_ID;
