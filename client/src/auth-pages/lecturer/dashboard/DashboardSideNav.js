import {NavLink} from "react-router-dom";
import {BiBulb, BiHeadphone} from "react-icons/bi";
import logo from "../../../assets/logo.png"
import {AiFillHome} from "react-icons/ai";
import {BsGear} from "react-icons/bs";
import {FaHandshake, FaUser, FaUserTie} from "react-icons/fa";
import {SiSuperuser} from "react-icons/si";
import {GiCompanionCube, GiHouse} from "react-icons/gi";
import style from './css/Dashboard.module.css'
import {useLocation} from 'react-router-dom';
import {useState} from "react";
import {MdRateReview} from "react-icons/md";

function DashboardSideNav() {
    const [link, setLink] = useState(useLocation().pathname)
    console.log(link)

    return <section className={"side-nav"}>
        <ul>
            <li><NavLink className={`nav-link ${link.startsWith('/dashboard') ? style.active : ''}`}
                         to={"/lecturer/dashboard"}> <span className={"side-icon"}><AiFillHome
                fontSize={20}/></span>Home</NavLink>
            </li>
            <li><NavLink className={`nav-link ${link.startsWith('/students') ? style.active : ''}`}
                         to={"/lecturer/requests"}> <span
                className={"side-icon"}><MdRateReview size={24} /></span>Requests</NavLink>
            </li>
        </ul>
    </section>;
}

export default DashboardSideNav