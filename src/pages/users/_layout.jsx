import {Outlet} from 'react-router';

export default function UserLayout(props) {
    return (
        <div>
            <div>用户</div>
            <Outlet/>
        </div>
    );
}
