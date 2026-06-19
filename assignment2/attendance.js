const fs = require("fs");

const FILE = "attendance.json";

let attendance = {};

try {
    attendance = JSON.parse(
        fs.readFileSync(FILE, "utf8")
    );
} catch {
    attendance = {};
}

function markPresent(rollNumber) {
    if (attendance[rollNumber]) {
        return {
            success: false,
            reason: "already_marked",
            timestamp: attendance[rollNumber]
        };
    }

    const timestamp =
        new Date().toISOString();

    attendance[rollNumber] = timestamp;

    fs.writeFileSync(
        FILE,
        JSON.stringify(attendance, null, 2)
    );

    return {
        success: true
    };
}

function getStats() {
    const rollNumbers =
        Object.keys(attendance).sort();

    return {
        total: rollNumbers.length,
        rollNumbers
    };
}

module.exports = {
    markPresent,
    getStats
};
