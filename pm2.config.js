module.exports = {
    apps: [
        {
            name: "manggo-webapp",
            script: "node_modules/next/dist/bin/next",
            args: "start -H 127.0.0.1 -p 37110",
            watch: false,
            instances: "max",
            exec_mode : "cluster"
        },
    ],
};
