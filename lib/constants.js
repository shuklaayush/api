const SHEET_v1 = process.env.SHEET_ID_v1;
const SHEET_v2 = process.env.SHEET_ID_v2;

const SHEET = process.env.SHEET_ID_v2;
const SHEET_RESOURCES = process.env.RESOURCES_SHEET_ID;

// Sheet IDs can be obtained here: https://spreadsheets.google.com/feeds/worksheets/<HIDDEN/private/full
const SHEET_RESOURCES_SHEET = "otcvog0";
const SHEET_RAW_DATA = "od6";
const SHEET_STATEWISE_TAB = "ovd0hzm";
const SHEET_CASES_TIME_SERIES_TAB = "o6emnqt";
const SHEET_KEY_VALUES_TAB = "owlnkho";
const SHEET_Tested_Numbers_ICMR_Data = "ozg9iqq";
const SHEET_StateWise_Tested_Numbers_Data = "o81fdow"
const SHEET_FAQ = "oknbjsw";
const SHEET_NAME_FACTOIDS = "ooka3he";
const SHEET_TRAVEL_HISTORY = "opc5w4v";
const SHEET_DATE_WISE_DELTA = "on2tlaw";
const SHEET_DEATHS_AND_RECOVERIES = "o3biev0";
const SHEET_SOURCES_LIST = "obndi9r";
const SHEET_DISTRICT_WISE = "o3rdj1v";

const DIR = "./tmp/";

const FILE_RAW_DATA = "/raw_data.json";
const FILE_RAW_DATA_1 = "/raw_data1.json";
const FILE_RAW_DATA_2 = "/raw_data2.json";
const FILE_DEATHS_RECOVERIES = "/deaths_recoveries.json";
const FILE_DEATHS_RECOVERIES_1 = "/deaths_recoveries1.json";
const FILE_DEATHS_RECOVERIES_2 = "/deaths_recoveries2.json";
const FILE_DISTRICTS = "/district_wise.json";
const FILE_DATA = "/data.json";
const FILE_FAQ = "/faq.json";
const FILE_WEBSITE_DATA = "/website_data.json";
const FILE_TRAVEL_HISTORY = "/travel_history.json";
const FILE_DATE_WISE_DELTA = "/states_daily.json";
const FILE_STATEWISE_TESTED_DATA = "/state_test_data.json";
const FILE_RESOURCES_ESSENTIALS = "/resources/resources.json";

const FILE_SOURCES_LIST = "/sources_list.json";

module.exports = {
    SHEET,
    SHEET_v1,
    SHEET_v2,
    SHEET_RESOURCES,
    SHEET_RAW_DATA,
    SHEET_STATEWISE_TAB,
    SHEET_CASES_TIME_SERIES_TAB,
    SHEET_KEY_VALUES_TAB,
    SHEET_Tested_Numbers_ICMR_Data,
    SHEET_FAQ,
    SHEET_NAME_FACTOIDS,
    SHEET_TRAVEL_HISTORY,
    SHEET_DATE_WISE_DELTA,
    SHEET_StateWise_Tested_Numbers_Data,
    SHEET_DEATHS_AND_RECOVERIES,
    SHEET_SOURCES_LIST,
    SHEET_DISTRICT_WISE,
    DIR,
    // FILE_RAW_DATA,
    FILE_RAW_DATA_1,
    FILE_RAW_DATA_2,
    // FILE_DEATHS_RECOVERIES,
    FILE_DEATHS_RECOVERIES_1,
    FILE_DEATHS_RECOVERIES_2,
    SHEET_RESOURCES_SHEET,
    FILE_DATA,
    FILE_FAQ,
    FILE_WEBSITE_DATA,
    FILE_TRAVEL_HISTORY,
    FILE_DATE_WISE_DELTA,
    FILE_STATEWISE_TESTED_DATA,
    FILE_RESOURCES_ESSENTIALS,
    FILE_SOURCES_LIST,
    FILE_DISTRICTS,
};
