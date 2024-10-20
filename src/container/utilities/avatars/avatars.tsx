import  { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Pageheader from '../../../components/common/pageheader/pageheader';
import { AvatarIcon, AvatarInitial, AvatarNumber, AvatarOffline, AvatarOnline, Avatarsize, StackedAvatars } from './avatarsdata';
import Showcode from '../../../components/ui/showcode/showcode';
import { avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9 } from '../../../components/ui/data/utilitiesdata';
import face1 from "../../../assets/images/faces/1.jpg";
import face2 from "../../../assets/images/faces/2.jpg";
import face3 from "../../../assets/images/faces/3.jpg";


interface AvatarsProps {}

const Avatars: FC<AvatarsProps> = () => {
  return(
  <Fragment>
            <Pageheader currentpage="Avatars" activepage="Utilities" mainpage="Avatars" />
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-4 lg:col-span-6 md:col-span-12 sm:col-span-12 col-span-12">
                    <Showcode title="Avatars" customCardBodyClass="py-4" code={avatar1}>
                            <span className="avatar me-2 avatar-radius-0">
                                <img src={face1} alt="img" />
                            </span>
                            <span className="avatar me-2">
                                <img src={face2} alt="img" />
                            </span>
                            <span className="avatar me-2 avatar-rounded">
                                <img src={face3} alt="img" />
                            </span>
                        </Showcode>
                </div>
                <div className="xl:col-span-4 lg:col-span-6 md:col-span-12 sm:col-span-12 col-span-12">
                    <Showcode title="Avatar Sizes <p class='subtitle text-muted fs-12 fw-normal'>Avatars of different sizes</p>" code={avatar2}>
                        
                            {Avatarsize.map((idx)=>(
                                
                            <span className={`avatar avatar-${idx.class} me-2`} key={Math.random()}>
                                <img src={idx.src} />
                            </span>
                            ))}
                        </Showcode>
                </div>
                <div className="xl:col-span-4 lg:col-span-6 md:col-span-12 sm:col-span-12 col-span-12">
                    <Showcode title="Avatar With Icons <p class='subtitle text-muted fs-12 fw-normal'>Avatar contains icons to perform respective action.</p>" code={avatar3}>
                            {AvatarIcon.map((idx) => (
                            <span className={`avatar avatar-${idx.class} me-2 avatar-rounded`} key={Math.random()}>
                                <img src={idx.src} alt="img" />
                                <Link aria-label="anchor" to="#" className={`badge bg-${idx.color} rounded-full avatar-badge`}><i className={`fe ${idx.icon} text-[.5rem]`}></i></Link>
                            </span>
                            ))}
                        </Showcode>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-4 lg:col-span-6 md:col-span-12 sm:col-span-12 col-span-12">
                    <Showcode title="Avatar With Online Status Indicator <p class='subtitle text-muted fs-12 fw-normal'>avatars having online status indicator.</p>" code={avatar4}>
                            {AvatarOnline.map((idx) => (
                            <span className={`avatar avatar-${idx.class} me-2 online avatar-rounded`} key={Math.random()}>
                                <img src={idx.src} alt="img" />
                            </span>
                            ))}
                        </Showcode>
                </div>
                <div className="xl:col-span-4 lg:col-span-6 md:col-span-12 sm:col-span-12 col-span-12">
                    <Showcode title="Avatar With Offline Status Indicator <p class='subtitle text-muted fs-12 fw-normal'>avatars having a offline status indicator.</p>" code={avatar5}>
                            {AvatarOffline.map((idx) => (
                            <span className={`avatar avatar-${idx.class} me-2 offline avatar-rounded`} key={Math.random()}>
                                <img src={idx.src} alt="img" />
                            </span>
                            ))}
                        </Showcode>
                </div>
                <div className="xl:col-span-4 lg:col-span-6 md:col-span-12 sm:col-span-12 col-span-12">
                    <Showcode title="Avatar With Number Badges <p class='subtitle text-muted fs-12 fw-normal'>Avatar numbers indicates the no. of unread notififactions/messages.</p>" code={avatar6}>
                            {AvatarNumber.map((idx) => (
                            <span className={`avatar avatar-${idx.class} me-2 avatar-rounded`} key={Math.random()}>
                                <img src={idx.src} alt="img" />
                                <span className={`badge rounded-full bg-${idx.color} avatar-badge`}>{idx.number}</span>
                            </span>
                            ))}
                        </Showcode>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-4 lg:col-span-6 md:col-span-12 sm:col-span-12 col-span-12">
                    <Showcode title="Avatar with Initials <p class='subtitle text-muted fs-12 fw-normal'>Avatar contains intials when user profile doesn't exist.</p>" code={avatar7}>
                            {AvatarInitial.map((idx)=>(
                            <span className={`avatar avatar-${idx.class} m-2 bg-${idx.color}`} key={Math.random()}>
                               {idx.class}
                            </span>
                            ))}
                        </Showcode>
                </div>
                <div className="xl:col-span-4 lg:col-span-6 md:col-span-12 sm:col-span-12 col-span-12">
                    <Showcode title="Stacked Avatar <p class='subtitle text-muted fs-12 fw-normal'>Group of avatars stacked together.</p>" code={avatar8}>
                            <div className="avatar-list-stacked">
                                {StackedAvatars.map((idx)=>(
                                <span className="avatar" key={Math.random()}>
                                    <img src={idx.src} alt="img" />
                                </span>
                                ))}
                                <Link className="avatar bg-primary text-white" to="#">
                                    +8
                                </Link>
                            </div>
                        </Showcode>
                </div>
                <div className="xl:col-span-4 lg:col-span-6 md:col-span-12 sm:col-span-12 col-span-12">
                    <Showcode title="Rounded Stacked Avatarsv <p class='subtitle text-muted fs-12 fw-normal'>Group of avatars stacked together.</p>" code={avatar9}>
                            <div className="avatar-list-stacked">
                            {StackedAvatars.map((idx)=>(
                                <span className="avatar avatar-rounded" key={Math.random()}>
                                    <img src={idx.src} alt="img" />
                                </span>
                                ))}
                                <Link className="avatar bg-primary avatar-rounded text-white" to="#">
                                    +8
                                </Link>
                            </div>
                        </Showcode>
                </div>
            </div>
  </Fragment>
);}

export default Avatars;
