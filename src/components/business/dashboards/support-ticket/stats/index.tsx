import { memo } from 'react';
import isEqual from 'react-fast-compare';

const Stats = () => {
  const stats = [
    { name: 'Total Tickets', value: '124' },
    { name: 'Open Tickets', value: '42' },
    { name: 'Avg Response Time', value: '2.4h' },
    { name: 'Customer Satisfaction', value: '94%' },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 w-full">
      {stats.map((stat) => (
        <div key={stat.name} className="box !mb-0">
          <div className='box-body'>
            <div className="text-sm font-medium text-gray-500 truncate">{stat.name}</div>
            <div className="mt-1 text-[1.125rem] font-semibold text-gray-900">{stat.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(Stats, isEqual);
