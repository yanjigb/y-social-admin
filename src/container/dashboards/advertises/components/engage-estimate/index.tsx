import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import useAdEstimator from '../../../../../hooks/use-adestimate';
import { HtmlTooltip } from '../../../../../components/ui/html-tooltip';
import { Fade } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { currencyFormat } from '../../../../../lib/currency-format';

interface Props {
  budget: number;
  audienceSize: number;
  engagementRate: number;
}

const EngageEstimate = (props: Props) => {
  const { budget, audienceSize, engagementRate } = props;
  const { followEfficiency, estimates } = useAdEstimator(budget, audienceSize, engagementRate);
  console.log(followEfficiency)
  return (
    <div className="bg-gray-200 p-4 rounded-lg flex flex-col gap-4">
      <h5 className="font-bold">Estimated daily results</h5>

      <div className="p-3 bg-white rounded-xl flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span>Accounts Center accounts reached</span>

          <HtmlTooltip
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            placement="top-start"
            title={
              <React.Fragment>
                This is the number of Accounts Center accounts we estimate you'll reach in your audience each day.
                This has to do with factors like your bid and budget.
                Your actual reach may be higher or lower than this estimate.
              </React.Fragment>
            }
          >
            <InfoIcon sx={{ fontSize: 20 }} />
          </HtmlTooltip>
        </div>

        <span className="font-bold text-base">
          {currencyFormat(estimates.accountsReached)}
        </span>
      </div>

      <div className="p-3 bg-white rounded-xl flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span>Follows or likes</span>

          <HtmlTooltip
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            placement="top-start"
            title={
              <React.Fragment>
                This is the number of follows or likes that we estimate you can get each day based on your campaign performance and estimated daily reach.
                The actual number of follows or likes you get may be higher or lower than this estimate.
              </React.Fragment>
            }
          >
            <InfoIcon sx={{ fontSize: 20 }} />
          </HtmlTooltip>
        </div>

        <span className="font-bold text-base">
          {currencyFormat(estimates.followsOrLikes)}
        </span>
      </div>
    </div>
  );
};

export default memo(EngageEstimate, isEqual);
