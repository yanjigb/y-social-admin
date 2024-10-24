import Pageheader from '../../../components/common/pageheader/pageheader';
import useCurrentUser from '../../../hooks/user-current-user';
import { currencyFormat } from '../../../lib/currency-format';
import checkRole from '../../../lib/check-role';

export default function Profile() {
  const { user } = useCurrentUser();
  const username = user?.username.split('@')[0]

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
                    <img src={user?.profilePicture} alt="yanji social admin" />
                  </span>
                </div>
                <div className="flex-grow main-profile-info">
                  <div className="flex items-center !justify-between">
                    <h6 className="font-semibold mb-1 text-white text-[1rem]">@{username}</h6>
                  </div>
                </div>
              </div>

              <div className="p-6">
                update in new version
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
                <li className="list-group-item">
                  <div className="flex flex-wrap items-center">
                    <div className="me-2 font-semibold">
                      Username:
                    </div>
                    <span className="text-base text-[#8c9097] dark:text-white/50">
                      @{username}
                    </span>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="flex flex-wrap items-center">
                    <div className="me-2 font-semibold">
                      Email:
                    </div>
                    <span className="text-base text-[#8c9097] dark:text-white/50">
                      {user?.email}
                    </span>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="flex flex-wrap items-center">
                    <div className="me-2 font-semibold">
                      Balance:
                    </div>
                    <span className="text-base text-[#8c9097] dark:text-white/50">
                      {currencyFormat(user?.balance)} VND
                    </span>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="flex flex-wrap items-center">
                    <div className="me-2 font-semibold">
                      Role:
                    </div>
                    <span className="text-base text-[#8c9097] dark:text-white/50">
                      {checkRole(user?.role!)}
                    </span>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="flex flex-wrap items-center">
                    <div className="me-2 font-semibold">
                      Created at:
                    </div>
                    <span className="text-base text-[#8c9097] dark:text-white/50">
                      {new Date(user?.createdAt!).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
