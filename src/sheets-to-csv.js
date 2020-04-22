const fetch = require('node-fetch');
const moment = require('moment-timezone');
var fs = require('fs');

// var dir = __dirname + '/../tmp/csv/';
// if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir, { recursive: true });
// }
var dir = './tmp/csv/';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

const now = moment().unix()
var date = moment.unix(now);
formated_date = date.tz("Asia/Kolkata").format("YYYY-MM-DD");

var today_dir = dir + formated_date;
var latest_dir = dir + "latest";
if (!fs.existsSync(today_dir)) {
    fs.mkdirSync(today_dir);
}
if (!fs.existsSync(latest_dir)) {
    fs.mkdirSync(latest_dir);
}

const PUBLISHED_SHEET_ID_1 = "2PACX-1vSz8Qs1gE_IYpzlkFkCXGcL_BqR8hZieWVi-rphN1gfrO3H4lDtVZs4kd0C3P8Y9lhsT1rhoB-Q_cP4";
const PUBLISHED_SHEET_ID_2 = "2PACX-1vRodtoTyQwXckfuvuQllkMhGC_gruigaaizVc8I6-BZWeetYpmRyexnO75ep7rnSxFICd8c9dfpwU8I";

const all_sheets = [
    ["raw_data2", "0"],
    ["death_and_recovered2", "200733542"],
    ["state_wise", "1896310216"],
    ["state_wise_daily", "1395461826"],
    ["sources_list", "704389477"],
    ["statewise_tested_numbers_data", "486127050"],
    ["case_time_series", "387368559"],
    ["tested_numbers_icmr_data", "2143634168"],
    ["travel_history", "1532084277"]
];

const old_sheets = [
    ["raw_data1", "0"],
    ["death_and_recovered1", "200733542"],
];


(async function main() {
    // uncomment below and run when changes in v1 sheet
    // for (var element of old_sheets) {
    //     console.log("Reading: " + element[0]);
    //     var temp_url = "https://docs.google.com/spreadsheets/d/e/" + PUBLISHED_SHEET_ID_1 + "/pub?gid=" + element[1] + "&single=false&output=csv";
    //     console.log(temp_url);
    //     url = encodeURI(temp_url);
    //     let settings = { method: "Get" };
    //     await fetch(url, settings).then(res => res.text())
    //         .then(csv => {
    //             if (csv.includes("</html>")) {
    //                 console.error("probably not csv!");
    //                 process.exit(1);
    //                 return;
    //             } else {
    //                 fs.writeFileSync(today_dir + "/" + element[0] + ".csv", csv);
    //                 fs.writeFileSync(latest_dir + "/" + element[0] + ".csv", csv);
    //                 console.log("Write completed: " + element[0]);
    //             }
    //         });
    // };

    for (var element of all_sheets) {
        console.log("Reading: " + element[0]);
        var temp_url = "https://docs.google.com/spreadsheets/d/e/" + PUBLISHED_SHEET_ID_2 + "/pub?gid=" + element[1] + "&single=false&output=csv";
        console.log(temp_url);
        url = encodeURI(temp_url);
        let settings = { method: "Get" };
        await fetch(url, settings).then(res => res.text())
            .then(csv => {
                if (csv.includes("</html>")) {
                    console.error("probably not csv!");
                    process.exit(1);
                    return;
                } else {
                    fs.writeFileSync(today_dir + "/" + element[0] + ".csv", csv);
                    fs.writeFileSync(latest_dir + "/" + element[0] + ".csv", csv);
                    console.log("Write completed: " + element[0]);
                }
            });
    }

    // concat steps below
    console.log("merge both csv");
    var raw_data1 = fs.readFileSync('./tmp/csv/latest/raw_data1.csv', 'utf8');
    var raw_data2 = fs.readFileSync('./tmp/csv/latest/raw_data2.csv', 'utf8');
    var deaths_recoveries1 = fs.readFileSync('./tmp/csv/latest/death_and_recovered1.csv', 'utf8');
    var deaths_recoveries2 = fs.readFileSync('./tmp/csv/latest/death_and_recovered2.csv', 'utf8');

    dr = deaths_recoveries2.split("\n");;
    dr.shift();
    dr2 = dr.join("\n");
    deaths_recoveries = deaths_recoveries1 + "\n" + dr2;

    rd = raw_data2.split("\n");;
    rd.shift();
    rd2 = rd.join("\n");
    raw_data = raw_data1 + "\n" + rd2;

    fs.writeFileSync(today_dir + "/raw_data.csv", raw_data);
    fs.writeFileSync(latest_dir + "/raw_data.csv", raw_data);
    console.log("merged raw_data1 and raw_data2");
    fs.writeFileSync(today_dir + "/death_and_recovered.csv", deaths_recoveries);
    fs.writeFileSync(latest_dir + "/death_and_recovered.csv", deaths_recoveries);
    console.log("merged death_and_recovered1 and death_and_recovered2");

})();