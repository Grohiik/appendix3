'use client';

import DatePicker, { DatePickerProps } from 'components/input/date-picker';
import dayjs from 'dayjs';
import { useSearchParamsState } from 'hooks/use-search-params-state';
import { useEffect, useState } from 'react';

type ParamsDatePickerProps = DatePickerProps & {
  paramName: string;
};

const ParamsDatePicker = ({ paramName, ...props }: ParamsDatePickerProps) => {
  const [dateStr, setDateStr] = useSearchParamsState(
    paramName,
    dayjs().format('YYYY-MM-DD'),
  );
  const [value, setValue] = useState<Date>();

  useEffect(() => {
    setValue(dayjs(dateStr).toDate());
  }, [dateStr]);

  return (
    <DatePicker
      {...props}
      value={value}
      onChange={(d) => setDateStr(dayjs(d).format('YYYY-MM-DD'))}
    />
  );
};

export default ParamsDatePicker;