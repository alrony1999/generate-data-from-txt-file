const fs = require("fs");
const path = require("path");
let filePath = path.join(__dirname, "files", "one.txt");

let array = fs.readFileSync(filePath).toString().split("\n");

let result = {};

result.confirmationTittle = getTitle(array);
result.date = getData(array, 'Date');
result.to = getData(array, 'To');
result.attn = getData(array, 'Attn');
result.fax = getData(array, 'Fax');
result.from = getData(array, 'From');
result.resNO = getData(array, 'Res. NO');
result.hotelName = getData(array, 'Hotel Name');
result.arrivalDate = getData(array, 'Arrival date');
result.departDate = getData(array, 'Depart. date');
result.guestName = getData(array, 'Guest Name');
result.netAccommodationCharge = getData(array, 'Net Accommodation Charge');
result.total = getData(array, 'Total');
result.municipalTax = getData(array, 'Municipal Tax');
result.vat = getData(array, 'VAT');
result.totalNetValue = getData(array, 'Total Net Value');
result.hotelRsrv = getData(array, 'Hotel Rsrv','#');

console.log(result);

function getTitle(data) {
    let sentence = "";
    data.forEach((item, index) => {
        if (index > 1 && index < 7) {
            sentence = item + sentence;
        }
    });

    if (isSubsequence('Tentative Confirmation', sentence)) {
        return 'Tentative';
    } else if (isSubsequence('Definite Confirmation', sentence)) {
        return 'Definite';
    }
    return null;
}

function getData(data, key, splitKey = ':', start = 0, end = 29) {
    let index = getIndex(data, key);
    if (index >= 0) {
        let temp = data[index].split(splitKey);

        let splitIndex = getIndex(temp, key);

        if (splitIndex >= 0) {
            return splitIndex + 1 < temp.length ? truncate(temp[splitIndex + 1], start, end).trim() : null;
        }
    }

    return null;

}

function isSubsequence(find, str) {
    let n = find.length,
        m = str.length;
    let i = 0,
        j = 0;
    while (i < n && j < m) {
        if (find[i] == str[j]) i++;
        j++;
    }
    return i == n;
}


function truncate(str, start, length) {

    if (str.length > length) {
        return str.slice(start, length);
    } else return str;
}

function getIndex(data, key) {
    let index = 0;
    while (index < data.length) {
        if (isPresent(data[index], key)) {
            break;
        }
        index++;
    }

    if (index >= 0 && index < data.length) {
        return index;
    } else {
        return -1;
    }
}

function isPresent(str, key) {
    return str.includes(key);
}
