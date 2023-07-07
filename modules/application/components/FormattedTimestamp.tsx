import { isSameOrAfter } from '@withbackdrop/backdrop-v3-common/utils/date';
import { isSameYear } from 'date-fns';
import format from 'date-fns/format';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import sub from 'date-fns/sub';

const getFormattedString = (timestamp, formatString, addSuffix) => {
  if (formatString) return format(new Date(timestamp), formatString);

  const isRecentDate = isSameOrAfter(new Date(timestamp), sub(new Date(), { weeks: 2 }));

  if (isRecentDate) return formatDistanceToNowStrict(new Date(timestamp), { addSuffix });

  const isCurrentYear = isSameYear(new Date(), new Date(timestamp));
  const formatting = isCurrentYear ? 'MMM d' : 'MMM d y';
  return format(new Date(timestamp), formatting);
};

const FormattedTimestamp = ({ timestamp, formatString, addSuffix = false }) => {
  const date = new Date(timestamp);
  return (
    <time dateTime={date.toString()} suppressHydrationWarning={true}>
      {getFormattedString(timestamp, formatString, addSuffix)}
    </time>
  );
};

export default FormattedTimestamp;
