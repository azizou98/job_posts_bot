var calculateFullAge = require('full-age-calculator');

var getfullAge = calculateFullAge.getFullAge('2020-01-01').months
    + (calculateFullAge.getFullAge('2020-01-01').years) * 12;
// In yyyy-mm-dd format. Example: 1999-12-25
console.log(getfullAge + " month and\t" + calculateFullAge.getFullAge('2020-01-01').days + " days");
