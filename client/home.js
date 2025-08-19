/* globals $ */
exports.initialize = function (dateHelper) {
  'use strict';
  const messageSpan = $('#messageSpan'),
    testDatePicker = $('#testDatePicker'),
    dislayDateCalculation = function () {
      const now = new Date(),
        year = now.getFullYear(),
        month = now.getMonth() + 1,
        day = now.getDate(),
        dateString = testDatePicker.val(),
        datePickerYear = Number(dateString.substring(0, 4)),
        datePickerMonth = Number(dateString.substring(5, 7)),
        datePickerDay = Number(dateString.substring(8)),
        date1 = new Date(year, month, day),
        date2 = new Date(datePickerYear, datePickerMonth, datePickerDay),
        dateHasPassed = dateHelper.isAfter(date1, date2),
        date1String = dateHelper.format(date1, 'MM-dd-yyyy'),
        date2String = dateHelper.format(date2, 'MM-dd-yyyy'),
        message = dateHasPassed ? `${date1String} is after ${date2String}.` : `${date1String} is not after ${date2String}.`;
      messageSpan.text(message);
    };
  testDatePicker.on('change', dislayDateCalculation);
};