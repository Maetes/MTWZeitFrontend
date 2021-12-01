import { DatePicker } from './DatePickerWrapper/DatePickerWrapper';

export const TimeSelector = ({ date, setDate }) => {
  return (
    <DatePicker
      selected={date}
      onChange={(date) => setDate(date)}
      showTimeSelect
      timeFormat='HH:mm'
      timeIntervals={15}
      timeCaption='time'
      dateFormat='dd.MM.yyyy HH:mm'
    />
  );
};
