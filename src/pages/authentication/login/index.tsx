import { FC, Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Login as LoginUser } from "../../../services/auth.service";
import { getDynamicRoute } from "../../../lib/get-dynamic-route";
import { RouteNames } from "../../../constants/routes";
import { LocalStorageBackup } from "../../../components/common/switcher/switcherdata/switcherdata";
import { ThemeChanger } from "../../../redux/action";
import LocalStorageKeys from "../../../constants/local-storage-keys";

interface LoginProps { }

const Login: FC<LoginProps> = ({ ThemeChanger }: any) => {
  const navigate = useNavigate();

  const path = getDynamicRoute(RouteNames.ADVERTISES);
  const isExistedusername = localStorage.getItem(LocalStorageKeys.USERNAME);
  const isExistedPassword = localStorage.getItem(LocalStorageKeys.PASSWORD);
  if (isExistedusername && isExistedPassword) {
    navigate(path);
  }

  const [passwordshow1, setpasswordshow1] = useState(false);
  const [err, setError] = useState("");
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = data;
  const changeHandler = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
  };
  const routeChange = () => {
    const path = getDynamicRoute(RouteNames.ADVERTISES);
    localStorage.setItem(LocalStorageKeys.USERNAME, username);
    localStorage.setItem(LocalStorageKeys.PASSWORD, password);
    navigate(path);
  };


  const Login1 = () => {
    if (!username || !password) {
      alert("Please enter all the fields");
      return;
    }

    LoginUser(data).then((res) => {
      routeChange()
      localStorage.setItem(LocalStorageKeys.USER_ID, res.data._id);
      localStorage.setItem(LocalStorageKeys.ROLE, res.data.role);
    }).catch(() => {
      setError("Invalid username or password");
    })
  };

  useEffect(() => {
    LocalStorageBackup(ThemeChanger);
  }, []);

  return (
    <Fragment>
      <div className="container">
        <div className="authentication authentication-basic items-center h-full text-defaultsize text-defaulttextcolor">
          <div className="grid grid-cols-12">
            <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-3 sm:col-span-2"></div>
            <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-8 col-span-12">
              <div className="box my-[6.5rem]">
                <div
                  className="box-body !p-[3rem]"
                  role="tabpanel"
                  id="pills-with-brand-color-01"
                  aria-labelledby="pills-with-brand-color-item-1"
                >
                  <p className="h5 font-semibold mb-2 text-center">Sign In</p>
                  <p className="mb-4 text-[#8c9097] dark:text-white/50 opacity-[0.7] font-normal text-center">
                    Welcome back
                  </p>
                  {err && (
                    <div
                      className="alert-danger px-4 py-3 shadow-md mb-2"
                      role="alert"
                    >
                      <div className="flex">
                        <div className="py-1"></div>
                        <div>{err}</div>
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-12 gap-y-4">
                    <div className="xl:col-span-12 col-span-12">
                      <label
                        htmlFor="signin-username"
                        className="form-label text-default"
                      >
                        Username
                      </label>
                      <input
                        type="username"
                        name="username"
                        className="form-control form-control-lg w-full !rounded-md"
                        onChange={changeHandler}
                        value={username}
                        id="signin-username"
                        placeholder="user name"
                      />
                    </div>
                    <div className="xl:col-span-12 col-span-12 mb-2">
                      <label
                        htmlFor="signin-password"
                        className="form-label text-default block"
                      >
                        Password
                      </label>
                      <div className="input-group">
                        <input
                          type={passwordshow1 ? "text" : "password"}
                          className="form-control form-control-lg !rounded-s-md"
                          name="password"
                          placeholder="password"
                          value={password}
                          onChange={changeHandler}
                        />
                        <button
                          onClick={() => setpasswordshow1(!passwordshow1)}
                          aria-label="button"
                          className="ti-btn ti-btn-light !rounded-s-none !mb-0"
                          type="button"
                          id="button-addon2"
                        >
                          <i
                            className={`${passwordshow1 ? "ri-eye-line" : "ri-eye-off-line"
                              } align-middle`}
                          ></i>
                        </button>
                      </div>
                    </div>
                    <div className="xl:col-span-12 col-span-12 grid mt-2">
                      <button
                        className="ti-btn ti-btn-primary !bg-primary !text-white !font-medium"
                        onClick={Login1}
                      >
                        Sign In
                      </button>
                      <p className="mt-4 text-[#8c9097] dark:text-white/50 opacity-[0.7] font-normal text-center">use account yanji social to login your admin dashboard</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-3 sm:col-span-2"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  local_varaiable: state,
});

export default connect(mapStateToProps, { ThemeChanger })(Login);
