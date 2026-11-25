
// ======================================
// 1. Student Class - Encapsulation
// ======================================

class Student {

    #grade1;
    #grade2;
    #grade3;
    #attendance;

    constructor(name, grade1, grade2, grade3, attendance) {

        if (!name || !name.trim()) {
            throw new Error("Please enter the student name.");
        }

        this.name = name.trim();

        this.grade1 = grade1;
        this.grade2 = grade2;
        this.grade3 = grade3;
        this.attendance = attendance;
    }

    // Grade 1 Setter and Getter
    set grade1(value) {

        if (value === "" || !Number.isFinite(Number(value)) ||
            Number(value) < 0 || Number(value) > 100) {

            throw new Error("Subject 1 grade must be between 0 and 100.");
        }

        this.#grade1 = Number(value);
    }

    get grade1() {
        return this.#grade1;
    }

    // Grade 2 Setter and Getter
    set grade2(value) {

        if (value === "" || !Number.isFinite(Number(value)) ||
            Number(value) < 0 || Number(value) > 100) {

            throw new Error("Subject 2 grade must be between 0 and 100.");
        }

        this.#grade2 = Number(value);
    }

    get grade2() {
        return this.#grade2;
    }

    // Grade 3 Setter and Getter
    set grade3(value) {

        if (value === "" || !Number.isFinite(Number(value)) ||
            Number(value) < 0 || Number(value) > 100) {

            throw new Error("Subject 3 grade must be between 0 and 100.");
        }

        this.#grade3 = Number(value);
    }

    get grade3() {
        return this.#grade3;
    }

    // Attendance Setter and Getter
    set attendance(value) {

        if (value === "" || !Number.isFinite(Number(value)) ||
            Number(value) < 0 || Number(value) > 100) {

            throw new Error("Attendance must be between 0 and 100.");
        }

        this.#attendance = Number(value);
    }

    get attendance() {
        return this.#attendance;
    }

    // Calculate Student Average
    getAverage() {

        return (
            this.#grade1 +
            this.#grade2 +
            this.#grade3
        ) / 3;

    }

}


// ======================================
// 2. Students Array
// ======================================

const studentsList = [];


// ======================================
// 3. Get HTML Elements
// ======================================

const studentName = document.getElementById("studentName");

const grade1 = document.getElementById("grade1");
const grade2 = document.getElementById("grade2");
const grade3 = document.getElementById("grade3");

const attendance = document.getElementById("attendance");

const addStudentBtn = document.getElementById("addStudentBtn");
const mercyBtn = document.getElementById("mercyBtn");

const errorMessage = document.getElementById("errorMessage");

const studentsDisplay = document.getElementById("studentsDisplay");

const finalReport = document.getElementById("finalReport");


// ======================================
// 4. Add Student Function - Try / Catch
// ======================================

addStudentBtn.onclick = function () {

    try {

        errorMessage.textContent = "";
        errorMessage.classList.add("d-none");

        const student = new Student(
            studentName.value,
            grade1.value,
            grade2.value,
            grade3.value,
            attendance.value
        );

        studentsList.push(student);

        studentsDisplay.innerHTML = studentsList.map((student, index) => `

            <div class="student-item">

                <strong>${index + 1}. ${student.name}</strong>

                <br>

                Subject 1: ${student.grade1}

                <br>

                Subject 2: ${student.grade2}

                <br>

                Subject 3: ${student.grade3}

                <br>

                Average: ${student.getAverage().toFixed(2)}

                <br>

                Attendance: ${student.attendance}%

            </div>

        `).join("");

        // Clear Inputs
        studentName.value = "";
        grade1.value = "";
        grade2.value = "";
        grade3.value = "";
        attendance.value = "";

    }

    catch (error) {

        errorMessage.textContent = error.message;

        errorMessage.classList.remove("d-none");

    }

};


// ======================================
// 5. Mercy Committee - Filter / Map / Reduce
// ======================================

mercyBtn.onclick = function () {

    // Filter: Get Students With Average Between 40 and 49

    const strugglingStudents = studentsList.filter(student => {

        const average = student.getAverage();

        return average >= 40 && average <= 49;

    });


    // Map: Add 5 Mercy Marks

    const updatedStudents = strugglingStudents.map(student => {

        return {

            name: student.name,

            newAverage: student.getAverage() + 5

        };

    });


    // Reduce: Calculate Total New Averages

    const totalAverage = updatedStudents.reduce((total, student) => {

        return total + student.newAverage;

    }, 0);


    // Calculate General Average

    const generalAverage = updatedStudents.length > 0

        ? totalAverage / updatedStudents.length

        : 0;


    // Display Final Report

    if (updatedStudents.length === 0) {

        finalReport.innerHTML = `

            <p class="text-danger">

                No struggling students found.

            </p>

        `;

        return;

    }


    finalReport.innerHTML = `

        <h5>Mercy Committee Report</h5>

        <p>

            Number of struggling students:

            <strong>${updatedStudents.length}</strong>

        </p>

        <h6>Students Names and Updated Averages:</h6>

        <ul>

            ${updatedStudents.map(student => `

                <li>

                    ${student.name} -

                    ${student.newAverage.toFixed(2)}

                </li>

            `).join("")}

        </ul>

        <p>

            General Average After Mercy:

            <strong>${generalAverage.toFixed(2)}</strong>

        </p>

    `;

};
