const axios = require('axios');

// https://rancher-test.suixingpay.com/v3
// token-sr5zq
// pzf6q5dwdvfq9sgd6ksxw8qp4zrd2mdv59nh77s5vg2sm96xl5jntx
// token-sr5zq:pzf6q5dwdvfq9sgd6ksxw8qp4zrd2mdv59nh77s5vg2sm96xl5jntx

(async () => {
    const res = await axios.get('https://rancher-test.suixingpay.com/v3/project/c-bv4qc:p-sbjrp/workloads/deployment:front-center:react-admin-webpack5', {
        headers: {
            Authorization: 'Bearer token-sr5zq:pzf6q5dwdvfq9sgd6ksxw8qp4zrd2mdv59nh77s5vg2sm96xl5jntx',
        },
    });

    if (res.data && res.data.publicEndpoints && res.data.publicEndpoints.length) {
        const info = res.data.publicEndpoints[0];
        const { addresses = [], port } = info;
        if (addresses.length && port) {
            const ip = addresses[0];
            console.log(`http://${ip}:${port}`);
        }
    }
})();
