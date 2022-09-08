const date_picker = document.querySelector('.date-selector');
const selected_date = document.querySelector('.date-selector .date-selected');
const dates = document.querySelector('.date-selector .dates');
const mth = document.querySelector('.date-selector .dates .month .mth');
const next_mth = document.querySelector('.date-selector .dates .month .next-mth');
const prev_mth = document.querySelector('.date-selector .dates .month .prev-mth');
const days = document.querySelector('.date-selector .dates .days');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate;
let selectedDay;
let selectedMonth;
let selectedYear;

let selectedDateTwo;
let selectedDayTwo;
let selectedMonthTwo;
let selectedYearTwo;

mth.textContent = months[month] + ' ' + year;

selected_date.textContent = formatDate(date);
selected_date.dataset.value = selectedDate;

populateDates();

date_picker.addEventListener('click', toggleDatePicker);
next_mth.addEventListener('click', goToNextMonth);
prev_mth.addEventListener('click', goToPrevMonth);

function toggleDatePicker(e) {
    if (!checkEventPathForClass(e.path, 'dates')) {
        dates.classList.toggle('active');
    }
}

function goToNextMonth(e) {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    mth.textContent = months[month] + ' ' + year;
    populateDates();
}

function goToPrevMonth(e) {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    mth.textContent = months[month] + ' ' + year;
    populateDates();
}

function populateDates(e) {
    days.innerHTML = '';
    let amount_days = 31;

    if (month == 1) {
        amount_days = 28;
    }

    if (month == 3 || month == 5 || month == 8 || month == 10) {
        amount_days = 30;
    }

    for (let i = 0; i < amount_days; i++) {
        const day_element = document.createElement('div');
        day_element.classList.add('day');
        day_element.textContent = i + 1;

        if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) {
            day_element.classList.add('selected');
        }

        if (selectedDayTwo == (i + 1) && selectedYearTwo == year && selectedMonthTwo == month) {
            day_element.classList.add('selectedTwo');
        }

        if (selectedDate && selectedDateTwo && validateRange(i)) {
            day_element.classList.add('between');
        }


        day_element.addEventListener('click', function () {

            if (!selectedDate || selectedDateTwo) {
                selectedDate = new Date(year + '-' + (month + 1) + '-' + (i + 1));
                selectedDay = (i + 1);
                selectedMonth = month;
                selectedYear = year;

                selectedDateTwo = undefined;
                selectedDayTwo = undefined;
                selectedMonthTwo = undefined;
                selectedYearTwo = undefined;

            } else if (selectedDate && !selectedDateTwo) {
                selectedDateTwo = new Date(year + '-' + (month + 1) + '-' + (i + 1));
                selectedDayTwo = (i + 1);
                selectedMonthTwo = month;
                selectedYearTwo = year;
            }

            selected_date.textContent = formatDate(selectedDate);
            selected_date.dataset.value = selectedDate;

            populateDates();
        });

        days.appendChild(day_element);
    }
}

function validateRange(currentDay) {

    if(selectedDate < selectedDateTwo &&
        (
            ((currentDay + 1) > selectedDay && (currentDay + 1) < selectedDayTwo) &&
            (year >= selectedYear && year <= selectedYearTwo) &&
            (month >= selectedMonth && month <= selectedMonthTwo)
        )) return true

        else if (selectedDate > selectedDateTwo &&
        (
            ((currentDay + 1) < selectedDay && (currentDay + 1) > selectedDayTwo) &&
            (year <= selectedYear && year >= selectedYearTwo) &&
            (month <= selectedMonth && month >= selectedMonthTwo)
        ))  return true
        else return false

        
}

function checkEventPathForClass(path, selector) {
    for (let i = 0; i < path.length; i++) {
        if (path[i].classList && path[i].classList.contains(selector)) {
            return true;
        }
    }

    return false;
}

function formatDate(d) {
    let day = d.getDate();
    if (day < 10) {
        day = '0' + day;
    }

    let month = d.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }

    let year = d.getFullYear();

    return day + ' / ' + month + ' / ' + year;
}