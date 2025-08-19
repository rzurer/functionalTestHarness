/* globals $ */
exports.initialize = function (dateHelper) {
  'use strict';
  const messageSpan = $('#messageSpan'),
    currentDateSpan = $('#currentDateSpan'),
    testDatePicker = $('#testDatePicker'),
    getCurrentDate = function () {
      const date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth(),
        day = date.getDate();
      return new Date(year, month, day);
    },
    getChosenDate = function () {
      const dateString = testDatePicker.val(),
        year = Number(dateString.substring(0, 4)),
        month = Number(dateString.substring(5, 7)) - 1,
        day = Number(dateString.substring(8));
      return new Date(year, month, day);
    },
    dislayDateCalculation = function () {
      const dateString = testDatePicker.val(),
        chosenDateString = dateHelper.format(getChosenDate(), 'MM-dd-yyyy'),
        currentDateIsEqualToChosenDate = dateHelper.compareCurrentDateToChosenDate(dateString, 'equal'),
        currentDateIsBeforeChosenDate = dateHelper.compareCurrentDateToChosenDate(dateString, 'before');
      if (currentDateIsEqualToChosenDate) {
        messageSpan.text(`Today is equal to ${chosenDateString}.`);
        return;
      }
      if (currentDateIsBeforeChosenDate) {
        messageSpan.text(`Today is before ${chosenDateString}.`);
        return;
      }
      messageSpan.text(`Today is after ${chosenDateString}.`);
    };
    // dislayDateCalculation = function () {
    //   const currentDate = getCurrentDate(),
    //     chosenDate = getChosenDate(),
    //     chosenDateIsEqualToCurrentDate = dateHelper.isEqual(chosenDate, currentDate),
    //     chosenDateIsAfterCurrentDate = dateHelper.isAfter(chosenDate, currentDate),
    //     chosenDateString = dateHelper.format(chosenDate, 'MM-dd-yyyy');
    //   if (chosenDateIsEqualToCurrentDate) {
    //     messageSpan.text(`Today is ${chosenDateString}.`);
    //     return;
    //   }
    //   if (chosenDateIsAfterCurrentDate) {
    //     messageSpan.text(`Today is before ${chosenDateString}.`);
    //     return;
    //   }
    //   messageSpan.text(`Today is after ${chosenDateString}.`);
    // };
  currentDateSpan.text(dateHelper.format(getCurrentDate(), 'MM-dd-yyyy'));
  testDatePicker.on('change', dislayDateCalculation);
};