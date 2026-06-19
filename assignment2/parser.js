/*
02.251043,1,1781361332,MEYCIQD/X1FT6xssV71jT/4YVpWRuKZIGONgrM5oq6Oj6xyiBwIhAMIUMG87Feq7KkYDI+yebEILsfgI7tuHVVJAtqYhv2Nl.iitkidcard
*/

function extractRollNumber(qrString) {
    const matches = qrString.match(/\d{6}/g);

    if (!matches) {
        return null;
    }

    return (
        matches.find(num => {
            const n = Number(num);
            return n >= 240001 && n <= 240400;
        }) || null
    );
}

function isRegistered(rollNumber) {
    const n = Number(rollNumber);

    return n >= 240001 && n <= 240400;
}

module.exports = {
    extractRollNumber,
    isRegistered
};
