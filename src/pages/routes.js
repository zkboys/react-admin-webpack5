import React from 'react';

const C0 = React.lazy(() => import('src/layout/index.jsx'));
const C1 = React.lazy(() => import('src/pages/home/index.jsx'));
const C2 = React.lazy(() => import('src/pages/index.jsx'));
const C3 = React.lazy(() => import('src/pages/users/index.jsx'));
const C4 = React.lazy(() => import('src/pages/users/[userId]/index.jsx'));
const C5 = React.lazy(() => import('src/pages/users/_layout.jsx'));

export default [
    {
        "path": "/",
        "element": <C0/>,
        children: [
            {
                "path": "/home",
                "exact": true,
                "element": <C1/>,
                "absComponent": "/Users/wangshubin/workspace/suixingpay/react-admin-webpack5/src/pages/home/index.jsx"
            },
            {
                "path": "/",
                "exact": true,
                "element": <C2/>,
                "absComponent": "/Users/wangshubin/workspace/suixingpay/react-admin-webpack5/src/pages/index.jsx"
            },
            {
                "path": "/users",
                children: [
                    {
                        "path": "/users",
                        "exact": true,
                        "element": <C3/>,
                        "absComponent": "/Users/wangshubin/workspace/suixingpay/react-admin-webpack5/src/pages/users/index.jsx"
                    },
                    {
                        "path": "/users/:userId",
                        "exact": true,
                        "element": <C4/>,
                        "absComponent": "/Users/wangshubin/workspace/suixingpay/react-admin-webpack5/src/pages/users/[userId]/index.jsx"
                    }
                ],
                "element": <C5/>,
                "absComponent": "/Users/wangshubin/workspace/suixingpay/react-admin-webpack5/src/pages/users/_layout.jsx"
            }
        ],
        "absComponent": "/Users/wangshubin/workspace/suixingpay/react-admin-webpack5/src/layout/index.jsx"
    }
]
