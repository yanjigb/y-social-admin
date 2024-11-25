export default function Explain() {
  return (
    <ul className='list-decimal list-inside bg-gray-200 p-4 rounded-lg'>
      <li>
        <strong>Base Reach Efficiency: </strong>
        <span>
          This will show you how much you can reach with per your 1000 VND
        </span>
      </li>

      <li>
        <strong>Reach Efficiency: </strong>
        <span>
          This will show you how your ads efficiency base on your budget and all the user in our platform
        </span>
      </li>

      <li>
        <strong>Estimated accounts reached: </strong>
        <span>
          This will show you the estimated accounts you can reach with your budget
        </span>
      </li>

      <li>
        <strong>Engagement Rate: </strong>
        <span>
          This will show you the estimated engagement rate base on your accounts reached
        </span>
      </li>

      <li>
        <strong>Estimated follows or likes: </strong>
        <span>
          This will show you the estimated follows or likes you can get with your budget
        </span>
      </li>
    </ul>
  );
}
