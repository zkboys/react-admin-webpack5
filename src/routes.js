export default [
    {
        "path": "/",
        "component": () => import('src/layout/index.jsx'),
        children: [
            {
                "path": "/home",
                "exact": true,
                "component": () => import('src/pages/home/index.jsx'),
                "absComponent": "/Users/wangshubin/workspace/suixingpay/react-admin-webpack5/src/pages/home/index.jsx"
            },
            {
                "path": "/home/roles",
                "exact": true,
                "component": () => import('src/pages/home/roles/index.jsx'),
                "absComponent": "/Users/wangshubin/workspace/suixingpay/react-admin-webpack5/src/pages/home/roles/index.jsx"
            },
            {
                "path": "/home/roles/:id?",
                "exact": true,
                "component": () => import('src/pages/home/roles/[id$].jsx'),
                "absComponent": "/Users/wangshubin/workspace/suixingpay/react-admin-webpack5/src/pages/home/roles/[id$].jsx"
            },
            {
                "path": "/home/users",
                children: [
                    {
                        "path": "/home/users",
                        "exact": true,
                        "component": () => import('src/pages/home/users/index.jsx'),
                        "absComponent": "/Users/wangshubin/workspace/suixingpay/react-admin-webpack5/src/pages/home/users/index.jsx"
                    },
                    {
                        "path": "/home/users/:userId",
                        "exact": true,
                        "component": () => import('src/pages/home/users/[userId]/index.jsx'),
                        "absComponent": "/Users/wangshubin/workspace/suixingpay/react-admin-webpack5/src/pages/home/users/[userId]/index.jsx"
                    }
                ],
                "component": () => import('src/pages/home/users/_layout.jsx'),
                "absComponent": "/Users/wangshubin/workspace/suixingpay/react-admin-webpack5/src/pages/home/users/_layout.jsx"
            }
        ],
        "absComponent": "/Users/wangshubin/workspace/suixingpay/react-admin-webpack5/src/layout/index.jsx"
    }
]