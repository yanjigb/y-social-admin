import { Personalinfodata } from './profiledata';
import Pageheader from '../../../components/common/pageheader/pageheader';

export default function Profile() {
  return (
    <>
      <Pageheader currentpage="Profile" activepage="Pages" mainpage="Profile" />
      <div className="grid grid-cols-12 gap-x-6">
        <div className="xxl:col-span-4 xl:col-span-12 col-span-12">
          <div className="box overflow-hidden">
            <div className="box-body !p-0">
              <div className="sm:flex flex-col items-center p-6 main-profile-cover">
                <div>
                  <span className="avatar avatar-xxl avatar-rounded online">
                    <img src="https://i.pinimg.com/564x/97/51/2d/97512d6a341d68ef26f8fd4ce2890a93.jpg" alt="" />
                  </span>
                </div>
                <div className="flex-grow main-profile-info">
                  <div className="flex items-center !justify-between">
                    <h6 className="font-semibold mb-1 text-white text-[1rem]">@username</h6>
                  </div>
                </div>
              </div>

              <div className="p-6">
                something in here
              </div>
            </div>
          </div>
        </div>
        <div className="xxl:col-span-8 xl:col-span-12 col-span-12">
          <div className="box">
            <div className="box-header">
              <div className="box-title">
                Personal Info
              </div>
            </div>
            <div className="box-body">
              <ul className="list-group">
                {Personalinfodata.map((idx) => (

                  <li className="list-group-item" key={Math.random()}>
                    <div className="flex flex-wrap items-center">
                      <div className="me-2 font-semibold">
                        {idx.text1}
                      </div>
                      <span className="text-base text-[#8c9097] dark:text-white/50">{idx.text2}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
