import { Typography } from '@mui/material';

export default function Formula() {
  return <div className="flex flex-col gap-4">
    <div className="bg-gray-200 p-4 rounded-lg flex flex-col gap-4">
      <Typography variant="subtitle2">How we calculate Accounts Center accounts reached</Typography>

      <div className='flex flex-col gap-2'>
        <strong className='pl-1'>- base reach efficiency (user) = ( total user / budget ) * 1000</strong>

        <div className='flex flex-col gap-1'>
          <strong className='pl-1'>- reach efficiency (user)</strong>
          <span className='pl-1'>if total user &gt; budget</span>
          <strong className='pl-1'>
            = base reach efficiency * ( 1 - total user / budget )
          </strong>
          <span className='pl-1'>else</span>
          <strong className='pl-1'>
            = base reach efficiency
          </strong>
        </div>

        <strong className='pl-1'>- Estimated accounts reached = reach efficiency * budget</strong>
      </div>
    </div>

    <div className="bg-gray-200 p-4 rounded-lg flex flex-col gap-4">
      <Typography variant="subtitle2">How we calculate Follows or likes</Typography>

      <div className='flex flex-col gap-1'>
        <strong>
          - Engagement rate (%)
        </strong>
        <span className='pl-1'>if accounts reached &lt; 1000 = <strong>0.05</strong></span>
        <span className='pl-1'>if accounts reached &lt; 5000 = <strong>0.5</strong></span>
        <span className='pl-1'>if accounts reached &gt;= 5000 = <strong>1</strong></span>
        <strong className='pl-1'>- Estimated follows or likes = reach efficiency * engagement rate * budget</strong>
      </div>
    </div>
  </div>;
}
