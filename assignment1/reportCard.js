// reportCard.js

class Student {
    constructor(name, scores) {
        this.name = name;
        this.scores = scores;
    }

    getAverage() {
        let sum = 0;

        for (const score of this.scores) {
            sum += score;
        }

        return sum / this.scores.length;
    }

    getLetterGrade() {
        const avg = this.getAverage();

        // Grade Scale: A >= 90, B >= 80, C >= 70, D >= 60, F < 60
        if (avg >= 90) return "A";
        else if (avg >= 80) return "B";
        else if (avg >= 70) return "C";
        else if (avg >= 60) return "D";
        else return "F";
    }

    summary() {
        let highest = this.scores[0];
        let lowest = this.scores[0];

        for (const score of this.scores) {
            if (score > highest) {
                highest = score;
            }

            if (score < lowest) {
                lowest = score;
            }
        }

        return { highest, lowest };
    }
}

function getRemark(grade) {
    switch (grade) {
        case "A":
            return "Gazab 🙏";
        case "B":
            return "Great 👍";
        case "C":
            return "Good 🙂";
        case "D":
            return "Needs Improvement";
        case "F":
            return "Kyu ni hori padhai??";
        default:
            return "Unknown";
    }
}

const name = process.argv[2];

const scores = process.argv
    .slice(3)
    .map(score => Number(score));

if (!name || scores.length < 3) {
    console.error(
        "Usage: node reportCard.js \"StudentName\" score1 score2 score3 ..."
    );
    process.exit(1);
}

const student = new Student(name, scores);

const average = student.getAverage();
const grade = student.getLetterGrade();
const remark = getRemark(grade);
const { highest, lowest } = student.summary();
const [score1, score2, ...remaining] = scores;

const status = average >= 60 ? "PASS" : "FAIL";

console.log(`

-----REPORT CARD-----

Student Name : ${student.name}

Scores:

Score 1      : ${score1}
Score 2      : ${score2}
Remaining    : ${remaining.join(", ")}
Average      : ${average.toFixed(1)}
Grade        : ${grade}
Result       : ${status}
Remark       : ${remark}

Highest Score: ${highest}
Lowest Score : ${lowest}

---------------------
`);

// Bonus part
/*
const fs = require("fs");
const fileData = fs.readFileSync("./students.json", "utf8");
const studentsData = JSON.parse(fileData);

let topStudent = null;
let highestAverage = -1;

for (const studentData of studentsData) {
    const student = new Student(
        studentData.name,
        studentData.scores
    );

    const average = student.getAverage();
    const grade = student.getLetterGrade();

    const { highest, lowest } = student.summary();

    console.log(`
-----REPORT CARD-----

Name     : ${student.name}
Scores   : ${student.scores.join(", ")}
Average  : ${average.toFixed(1)}
Grade    : ${grade}
Highest  : ${highest}
Lowest   : ${lowest}
---------------------
`);

    if (average > highestAverage) {
        highestAverage = average;
        topStudent = student;
    }
}

console.log(`
TOP PERFORMER :
Name    : ${topStudent.name}
Average : ${highestAverage.toFixed(1)}
`);
*/